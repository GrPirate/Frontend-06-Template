const css = require('css')

const layout = require('./layout.js');

let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{ type: 'document', children: [] }]

// 加入一个新的函数，addCSSRules, 这时我们把CSS规则暂时存到一个数组里
let rules = []
function addCSSRules(text) {
  const ast = css.parse(text)
  console.log(JSON.stringify(ast, null, '    '))
  rules.push(...ast.stylesheet.rules)
}

/**
 *
 * @param {string} element
 * @param {string} selector
 *
 * 三种简单选择器： .a, #a, div
 */
function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  
  const tags = selector.match(/^\w+/g);
  const ids = selector.match(/\#[-_a-zA-Z]+/g);
  const classNames = selector.match(/\.[-_a-zA-Z]+/g);
  
  if (ids) {
    const attr = element.attributes.filter(item => item.name === 'id')[0];
    if (attr && attr.value === ids[0].replace('#', '')) {
      return true;
    }
  }
  
  if (classNames) {
    const attr = element.attributes.filter(item => item.name === 'class')[0];
    if (!attr || !attr.value) {
      return false;
    }
    const elementClassNames = attr.value.split(' ');
    if (classNames.every(item => elementClassNames.includes(item.replace('.', '')))) {
      return true;
    } 
  }
  
  if (tags) {
    if (element.tagName === tags[0]) {
      return true;
    }
  }

  return false;
}

function specificity(selector) {
  const p = [0, 0, 0, 0];
  const selectorParts = selector.split(' ');
  for (const part of selectorParts) {
    const ids = part.match(/\#\w+/g);
    const classes = part.match(/\.\w+/g);
    if (ids) {
      p[1] += ids.length;
    }
    if (classes) {
      p[2] += classes.length;
    }
    if (part.charAt(0) !== '#' && part.charAt(0) !== '.') {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) return sp1[0] - sp2[0]
  if (sp1[1] - sp2[1]) return sp1[1] - sp2[1]
  if (sp1[2] - sp2[2]) return sp1[2] - sp2[2]

  return sp1[3] - sp2[3]
}

function computeCSS(element) {
  // slice 没有参数的时候就是复制一遍 array
  // 标签匹配是从当前元素往外匹配，所以要进行 reverse
  let elements = stack.slice().reverse()

  if (!element.computedStyle) element.computedStyle = {}

  for (let rule of rules) {
    // rule.selector[0]: "body div #myid"
    // 为了和 elements 顺序一致，选择器也执行一次 reverse
    let selectorParts = rule.selectors[0].split(' ').reverse()

    if (!match(element, selectorParts[0])) continue

    let matched = false

    // j 表示当前选择器的位置
    let j = 1
    // i 表示当前元素的位置
    for (let i = 0; i < elements.length; i++) {
      /**
       * element[0] 为刚入栈的元素，它要与 #myid 和 img 分别进行匹配
       * 如果匹配成功，elemnt 和 selecotr 都向外层延申并尝试匹配
       */
      if (match(elements[i], selectorParts[j])) {
        // 元素能够匹配选择器时，j 自增，去匹配 j 外层的选择器
        j++
      }
    }
    // 如果所有的选择器都匹配到了，就认为只 matched
    if (j >= selectorParts.length) matched = true

    if (matched) {
      // 如果匹配到，加入样式
      let sp = specificity(rule.selectors[0])
      let computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property])
          computedStyle[declaration.property] = {}

        // 如果还没有 computedStyle 添加属性和值
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          console.log(
            'computedStyle[declaration.property].value: ',
            computedStyle[declaration.property].value
          )
          computedStyle[declaration.property].specificity = sp
          // 如果已经有 computedStyle，但新的 specificity 更大，覆盖之前的值
        } else if (
          compare(computedStyle[declaration.property].specificity, sp) < 0
        ) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
      // console.log('element: ', element, 'matched rule', rule);
      console.log('element.computedStyle: ', element.computedStyle)
    }
  }
}

function emit(token) {
  // 用token构建DOM树

  let top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    }
    element.tagName = token.tagName

    for (let p of token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        })
      }
    }

    computeCSS(element)

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) stack.push(element)

    currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      // ****************** 遇到style标签时，执行添加CSS规范操作***************//
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      layout(top);
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
  console.log(token)
}

const EOF = Symbol('EOF')

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: 'EOF',
    })
    return
  } else {
    emit({
      type: 'text',
      content: c,
    })
    return data
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    }
    return tagName(c)
  } else if (c === EOF) {
  } else {
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c;
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>' || c === '/' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
  } else {
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === "'" || c === '"' || c === '<') {
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function afterAttributeName(c) {
  if (c.match(/^\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function beforeAttributeValue() {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue
  } else if (c == '"') {
    return doubleQuoteAttributeValue
  } else if (c == "'") {
    return singleQuoteAttributeValue
  } else if (c == '>') {
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuoteAttributeValue(c) {
  if (c == '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c == '\u0000') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}

function singleQuoteAttributeValue(c) {
  if (c == "'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return
  } else if (c == '\u0000') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c == '\u0000') {
  } else if (c == '"' || c == "'" || c == '<' || c == '=' || c == '`') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    return data
  } else if (c === EOF) {
  } else {
  }
}

module.exports.parseHTML = function parseHTNL(html) {
  let state = data
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  return stack
}

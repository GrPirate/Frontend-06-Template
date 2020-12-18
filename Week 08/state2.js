// 使用状态机完成”abababx”的处理。

function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') return foundA
  else return start
}

function foundA(c) {
  if (c === 'b') return foundB
  else return start(c)
}

function foundB(c) {
  if (c === 'a') return foundA2
  else return start(c)
}

function foundA2(c) {
  if (c === 'b') return foundB2
  else return start(c)
}

function foundB2(c) {
  if (c === 'a') return foundA3
  else return start(c)
}

function foundA3(c) {
  if (c === 'b') return foundB3
  else return start(c)
}

function foundB3(c) {
  if (c === 'x') return end
  else return foundB2(c)
}

function end(c) {
  return end
}

console.log(match('abxababxabababx'))

// abababx
// 部分匹配值
// a 0
// ab 0
// aba  a ab ba a 1
// abab a ab aba bab ab b 2
// ababa a ab aba abab baba aba ba a 3
// ababab a ab aba abab ababa  4
//        b ab bab abab babab
// abababx a ab aba abab ababa ababab 0
// 0012340 x bx abx babx ababx bababx

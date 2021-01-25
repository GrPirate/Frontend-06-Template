重学HTML

# DOM API

## ELement：元素型节点

1. HTMLElement
* appendChild()	将新的子节点添加到该节点的子节点列表的末尾
* cloneNode()	克隆节点
* compareDocumentPosition()	比较两个节点的文档位置
* getAttribute()	返回属性的值
* getAttributeNS()	返回属性的值（带有名称空间）
* getAttributeNode()	返回属性节点作为Attribute对象
* getAttributeNodeNS()	返回属性节点（带有名称空间）作为`Attribute`对象
* getElementsByTagName()	返回匹配元素节点及其子节点的NodeList
* getElementsByTagNameNS()	返回匹配元素节点（带有名称空间）及其子节点的NodeList
* getFeature(feature,version)	返回一个DOM对象，该对象实现指定功能和版本的专用API
* getUserData(key)	返回与此节点上的键关联的对象。 首先必须通过使用相同的键调用`setUserData`将该对象设置为此节点
* hasAttribute()	返回元素是否具有与指定名称匹配的任何属性
* hasAttributeNS()	返回元素是否具有与指定名称和名称空间匹配的任何属性
* hasAttributes()	返回元素是否具有任何属性
* hasChildNodes()	返回元素是否有任何子节点
* insertBefore()	在现有子节点之前插入新的子节点
* isDefaultNamespace(URI)	返回指定的`namespaceURI`是否为默认值
* isEqualNode()	检查两个节点是否相等
* lookupNamespaceURI()	返回与指定前缀匹配的名称空间UR
* lookupPrefix()	返回与指定名称空间URI匹配的前缀
* normalize()	将此元素（包括属性）下面的所有文本节点放入“常规”形式，其中只有结构（例如，元素，注释，处理指令，CDATA部分和实体引用）分隔文本* 节点，即，不存在相邻的Text节点， 空的Text节点
* removeAttribute()	删除指定的属性
* removeAttributeNS()	删除指定的属性（带有名称空间）
* removeAttributeNode()	删除指定的属性节点
* removeChild()	删除子节点
* replaceChild()	替换子节点
* setUserData(key,data,handler)	将对象与元素上的键关联
* setAttribute()	添加一个新属性
* setAttributeNS()	添加一个新属性（带有名称空间）
* setAttributeNode()	添加一个新的属性节点
* setAttributeNodeNS(attrnode)	添加一个新的属性节点（带有名称空间）
* setIdAttribute(name,isId)	如果`Attribute`对象的isId属性为true，则此方法将指定的属性声明为用户确定的ID属性。
* setIdAttributeNS(uri,name,isId)	如果`Attribute`对象的isId属性为true，则此方法将指定的属性（带有名称空间）声明为用户确定的ID属性。
* setIdAttributeNode(idAttr,isId)	如果 `Attribute` 对象的 isId 属性为 true，则此方法将指定的属性声明为用户确定的ID属性。

2. SVGElement

# 导航类操作API

* parentNode 属性返回指定元素的父节点。
* childNodes 属性返回一个 NodeList，其中包含选定节点的子节点。 
* firstChild 返回元素的第一个孩子
* lastChild  返回元素的最后一个孩子
* nextSibling 属性返回所选元素的下一个同级节点（同一树级别中的下一个节点）  
* previousSibling  属性返回所选元素的前一个同级节点（同一树级别中的前一个节点）
* parentElement  返回指定元素的父元素
* children 返回元素的子元素的集合
* firstElementChild 返回指定元素的第一个子元素
* lastElementChild  返回指定元素的最后一个子元素
* nextElementSibling 属性在同一树级别中返回紧跟指定元素之后的元素
* previousElementSibling  返回指定元素的上一个元素。

# 修改操作API

* appendChild  方法在指定元素节点的最后一个子节点之后添加一个节点。
* insertBefore  方法在现有子节点之前插入一个新的子节点。
* removeChild() 方法删除一个子节点。  
* replaceChild  方法将一个子节点替换为另一个子节点。
 
# Document：文档根节点

* activeElement  返回文档中当前聚焦的元素
* addEventListener()  将事件处理程序附加到文档
* adoptNode()  从另一个文档中采用节点
* anchors	返回文档中具有`name`属性的所有`a`元素的集合
* applets	返回文档中所有`<applet>`元素的集合
* baseURI	返回文档的绝对基URI
* body	设置或返回文档的正文（`<body>`元素）
* close()	关闭先前使用`document.open()`打开的输出流
* cookie	返回文档中`cookie`的所有名称/值对
* charset	已过时。请改用`characterSet`。返回文档的字符编码
* characterSet	返回文档的字符编码
* createAttribute()	创建属性节点
* createComment()	创建具有指定文本的`Comment`节点
* createDocumentFragment()	创建一个空的`DocumentFragment`节点
* createElement()	创建一个`Element`节点
* createEvent()	 创建一个新事件
* createTextNode()	创建一个`Text`节点
* defaultView	返回与文档关联的窗口对象，如果没有，则返回`null`。
* designMode	控制整个文档是否应该可编辑。
* doctype	返回与文档关联的文档类型声明
* documentElement	返回文档的`Document`元素（`<html>`元素）
* documentMode	返回浏览器用于呈现文档的模式
* documentURI	设置或返回文档的位置
* domain	返回加载文档的服务器的域名
* domConfig	 已过时。返回文档的`DOM`配置
* embeds	返回文档的所有`<embed>`元素的集合
* execCommand()	 在当前具有焦点的元素上调用指定的剪贴板操作。
* forms	 返回文档中所有`<form>元`素的集合
* fullscreenElement	 返回以全屏模式显示的当前元素
* fullscreenEnabled()	返回一个布尔值，指示是否可以在全屏模式下查看文档
* getElementById()	 返回具有指定值的ID属性的元素
* getElementsByClassName()	返回包含具有指定类名的所有元素的`NodeList`
* getElementsByName()	返回包含具有指定名称的所有元素的`NodeList`
* getElementsByTagName()	返回包含具有指定标记名称的所有元素的`NodeList`
* hasFocus()	返回一个布尔值，指示文档是否具有焦点
* head	返回文档的`<head>`元素
* images	返回文档中所有`<img>`元素的集合
* implementation	返回处理此文档的`DOMImplementation`对象
* importNode()	 从另一个文档导入节点
* inputEncoding	 返回用于文档的编码，字符集
* lastModified	 返回上次修改文档的日期和时间
* links	 返回文档中具有`href`属性的所有`<a>`和`<area>`元素的集合
* normalize()	删除空文本节点，并连接相邻节点
* normalizeDocument()	删除空文本节点，并连接相邻节点
* open()	打开HTML输出流以收集`document.write()`的输出
* querySelector()	返回与文档中指定的`CSS选择器`匹配的第一个元素
* querySelectorAll()	返回一个静态`NodeList`，其中包含与文档中指定的`CSS`选择器匹配的所有元素
* readyState	返回文档的（加载）状态
* referrer	返回加载当前文档的文档的URL
* removeEventListener()	从文档中删除事件处理程序（已使用`addEventListener()`方法附加）
* renameNode()	重命名指定的节点
* scripts	返回文档中`<script>`元素的集合
* strictErrorChecking	设置或返回是否强制执行错误检查
* title	设置或返回文档的标题
* URL	返回`HTML`文档的完整`URL`
* write()	将`HTML`表达式或`JavaScript`代码写入文档
* writeln()	与`write()`相同，但在每个语句后添加换行符


# CharacterData：字符数据
* Text 文本
* replaceWholeText(text)	用指定的文本替换此节点和所有相邻文本节点的文本
* splitText()	将此节点按指定的偏移量拆分为两个节点，并返回包含偏移量后文本的新节点
* substringData()	从节点提取数据
* Comment 注释
* appendData()	将数据追加到节点
* deleteData()	从节点删除数据
* insertData()	将数据插入节点
* replaceData()	替换节点中的数据
* substringData()	从节点提取数据
* ProcessingInstruction 对象可表示处理指令

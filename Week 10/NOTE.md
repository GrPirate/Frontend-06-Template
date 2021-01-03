学习笔记

## 排版

### 第一步 根据浏览器属性进行排版

- 预处理
- 处理掉了 flexDirection 和 wrap 相关的属性
- 把具体的 width，height，left，right，top，bottom 等属性抽象成 main，cross 相关的属性

#### flex

CSS 三代排版技术：

- 正常流
  - position
  - display
  - float
  - ...
- Flex
- Grid
- Houdini


### 第二步 收集元素进行

- 分行
  - 根据主轴尺寸(元素尺寸超过主轴)，把元素分进行
  - 若设置了 no-wrap，则强行分配进第一行


### 第三步 计算主轴

- 计算主轴方向
  - 找出所有 Flex 元素
  - 把主轴方向的剩余尺寸按 flex 值的比例分为给这些元素
  - 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余空间

### 第四步 计算交叉轴

- 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高 flex-align 和 item-align，确定元素具体位置


## 渲染

### 第一步 绘制单个元素

- 绘制需要依赖一个图形环境
- 我们这里采用了 npm 包 images
- 绘制在一个 viewport 上进行
- 与绘制相关的属性： background-color, border, background-image 等

### 第二步 绘制 DOM 树

- 递归调用子元素的绘制方法完成 DOM 树的绘制
- 忽略一些不需要绘制的节点
- 实际的浏览器中，文字绘制是难点，需要依赖字体库，我们这里忽略
- 实际的浏览器中，还会对一些图层左 compositing， 我们这里也忽略了
学习笔记

# 有限状态机

- 每一个状态都是一个机器
    - 在每一个机器里，我们可以做计算、存储、输出...
    - 所有的这些机器接受的输入是一致的
    - 状态机的每一个机器本身没有状态，如果我么用函数表示的话，她应该是纯函数（无副作用）

- 每一个机器知道下一个状态
    - 每个机器都有确定的下一个状态（Moore）
    - 每个机器根据输入决定下一个状态（mealy）

# JS中的有限状态机（Mealy）

```js
// 每个函数是一个状态
function state (input) { // 函数参数就是输入
    // 在函数中可以自由的编写代码，处理每个状态的逻辑
    return next; // 返回值作为下一个状态
}

//////以下是调用//////
while(input) {
    // 获取输入
    state = state(input); // 把状态机的返回值作为下一个状态
}
```


# 字符转匹配的KMP算法

[http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)
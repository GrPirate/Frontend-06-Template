学习笔记

# LL算法

## 理解编译原理：一个四则运算的解释器

### 分析（四步）

- 定义四则运算：产出四则运算的词法定义和语法定义。
- 词法分析：把输入的字符串流变成 token。
- 语法分析：把 token 变成抽象语法树 AST。
- 解释执行：后序遍历 AST，执行得出结果。

### 定义四则运算

#### 词法定义

- Token:
    - 1 2 3 4 5 6 7 8 9 0 的组合
    - Operator: +、-、*、/之一
- Whitespace: \<SP>
- LineTerminator: \<LF><CR>


#### 语法定义

BNF（Backus-Naur Form）范式

> 以美国人巴科斯(Backus)和丹麦人诺尔(Naur)的名字命名的一种形式化的语法表示方法。

- 语法：

1. 在双引号中的字("word")代表着这些字符本身。而double_quote用来代表双引号。

2. 在双引号外的字（有可能有下划线）代表着语法部分。

3. 尖括号( < > )内包含的为必选项。

4. 方括号( [ ] )内包含的为可选项。

5. 大括号( { } )内包含的为可重复0至无数次的项。

6. 竖线( | )表示在其左右两边任选一项，相当于"OR"。

7. ::= 是“被定义为”。

采用BNF范式定义语法

加法：

```
<Expression> ::= 
    <AdditiveExpression><EOF>

<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```

乘法：

```
<MultiplicativeExpression> ::= 
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

### 词法分析：状态机


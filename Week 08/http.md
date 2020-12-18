# 第一步 HTTP 请求总结

- 设计一个HTTP请求的类
- content-type是一个必要的字段，要有默认值
-  body是KV格式
- 不同的content-type 影响body的格式

# 第二部 send函数总结

- 在Request的构造器中收集必要的信息
- 设计一个send函数，把请求真实发送到服务器
- send函数应该是异步的，所以返回Promise

# 第三部 发送请求

- 设计支持已有的connection或者自己新建connection
- 收到数据传给parser
- 根据parser的状态resolve Promise

# 第四部 ResponseParser总结

- Response必须分段构造，所以我们要用一个ResponseParser来“装配”
- ResponseParser分段处理ResponseText，我们用状态机来分析文本结构

# 第五部 BodyParser总结

- Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
- 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式
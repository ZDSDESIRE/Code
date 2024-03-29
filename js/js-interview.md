### JavaScript 面试题

#### 常见的基础面试题

##### 1、js 有哪些垃圾回收机制？

有以下垃圾回收机制：

- 标记清除（mark and sweep）
  这是 js 最常见的垃圾回收方式。当变量进入执行环境的时候，比如在函数中声明一个变量，垃圾回收器将其标记为“进入环境”。当变量离开环境的时候（函数执行结束），将其标记为“离开环境”。

  垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量，以及被环境中变量所引用的变量（闭包）的标记。在完成这些之后仍然存在的变量即为要删除的变量。

- 引用计数（reference counting）
  在低版本的 IE 中经常发生内存泄漏，很多时候就是因为它采取引用计数的方式进行垃圾回收。引用计数的策略就是跟踪记录每个值被使用的次数。

  当声明一个变量并将一个引用类型赋值给该变量的时候，这个值的引用次数就加 1；如果该变量变成另一个变量，则减 1；当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问。

  因此，可以将它占用的空间进行回收，这样的垃圾回收器会在运行的时候清理引用次数为 0 的值所占用的空间，虽然 js 对象是通过标记清除的方式进行垃圾回收，但是 BOM 和 DOM 对象是通过引用计数的方式回收垃圾的。即在涉及 BOM 和 DOM 时，会出现循环引用的问题。

##### 2、列举几种类型的 DOM 节点？

有以下几类 DOM 节点：

- 整个文档是一个文档（Document）节点
- 每个 HTML 标签是一个元素（Element）节点
- 每个 HTML 属性是个属性（Attribute）节点
- 包含在 HTML 元素中的文本是文本（Text）节点

##### 3、谈谈 script 标签中 defer 和 async 属性的区别？

区别如下：

- defer 属性规定是否延迟执行脚本，直到页面加载为止，async 属性规定脚本一旦可用，就异步执行。
- defer 并行加载 js 文件，会按照页面上的 script 标签的顺序执行，async 并行加载 js 文件，下载完成后立即执行，不会按照页面上的 script 标签的顺序执行。

##### 4、说说你对闭包的理解？

使用闭包主要是为了设计私有的方法和变量。闭包的优点就是可以避免全局变量的污染，缺点是闭包会常驻内存，增加内存使用量，使用不当很容易造成内存泄漏。在 js 中，函数即闭包，只有函数才会产生作用域。闭包有以下 3 个特性：

- 函数嵌套函数
- 在函数内部可以引用外部的参数和变量
- 参数和变量不会以垃圾回收机制回收

##### 5、unshift()？

该方法在数组启动时起作用，与 push()不同。它将参数成员添加到数组的顶部。示例如下：

```js
var name = ["john"];
name.unshift("charlie");
name.unshift("joseph", "Jane");
console.log(name); // ['joseph', 'Jane', 'charlie', 'john']
```

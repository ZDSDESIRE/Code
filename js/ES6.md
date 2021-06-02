### ES6 相关

#### 一、ES6 实用特性（9 个）

1. 展开操作符
   顾名思义，用于对象或数组之前的展开操作符（…），将一个结构展开为列表。
   例如：

   ```js
   let firstHalf = [one, two];
   let secondHalf = [three, four, ...firstHalf];
   ```

   不使用展开操作符：

   ```js
   let firstHalf = [  one ,  two ];
   let secondHalf = [ three ,  four ];
   for(var i=0, i <firstHalf.length; i++ ) {
   secondHalf.push(firstHalf[i]);
   }
   ```

   展开操作符也适用于合并对象的属性：

   ```js
   const hero = {
   name:  Xena - Warrior Princess ,
   realName:  Lucy Lawless
   }
   const heroWithSword = {
   ...hero,
   weapon:  sword
   }
   ```

   不用展开操作符的话，需要遍历对象的属性：

   ```js
   let keys = Object.keys(hero);
   let obj = {};

   for (var i = 0; i < keys.length; i++) {
     obj[keys[i]] = keys[props[i]];
   }
   ```

2. 剩余参数
   剩余参数将剩余的参数收入数列。JavaScript 的特性是参数数目很灵活。通常会有一个 arguments 变量收集参数。
   如：

   ```js
   function add(first, second, ...remaining) {
     return first + second + remaining.reduce((acc, curr) => acc + curr, 0);
   }
   ```

   …remaining 收集了剩余的参数，为我们提供了这些参数的命名，清楚地表明我们打算处理剩余的参数。

3. 字符串插值

   ```js
   class Product {
     constructor(name, description, price) {
       this.name = name;
       this.description = description;
       this.price = price;
     }
     getDescription() {
       return (
         " Full description" +
         " name: " +
         this.name +
         " description: " +
         this.description
       );
     }
   }
   ```

   上述代码中的 getDescription() 方法可使用 \${} 插值简化为：

   ```js
   getDescription() {
   return `Full description :
   name: ${this.name}
   description ${this.description}
   `;
   }
   ```

4. 简写属性
   在 ES5 中必须这么写：

   ```js
   function createCoord(x, y) {
     return {
       x: x,
       y: y,
     };
   }
   ```

   ES6 以后可以使用简写属性：

   ```js
   function createCoord(x, y) {
     return {
       x,
       y,
     };
   }
   ```

5. 方法属性
   方法属性是在对象中定义指向方法的属性。
   ES5 例子：

   ```js
   const math = {
     add: function (a, b) {
       return a + b;
     },
     sub: function (a, b) {
       return a - b;
     },
     multiply: function (a, b) {
       return a * b;
     },
   };
   ```

   ES6：

   ```js
   const math = {
     add(a, b) {
       return a + b;
     },
     sub(a, b) {
       return a - b;
     },
     multiply(a, b) {
       return a * b;
     },
   };
   ```

6. 解构赋值
   如从对象的不同层次获取数据：

   ```js
   function handle(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.url;
    log( url endpoint , url);
    // 大量代码逻辑
    dbService.createPerson(name, description)
   }
   ```

   简化为：

   ```js
   function handle(req, res) {
    const { body: { name, description }, url } = req;
    log( url endpoint , url);
    // 大量代码逻辑
    dbService.createPerson(name, description)
   }
   ```

   解构赋值并不仅仅局限于对象。它同样适用于数组。
   如：

   ```js
   const array = [1, 2, 3, 4, 5, 6];
   const a = array[0];
   const c = array[2];
   ```

   简化为：

   ```js
   const array = [1, 2, 3, 4, 5, 6];
   const [a, , c, ...remaining] = arr;
   // remaining = [4,5,6]
   ```

   我们可以使用上面的模式匹配分解数组的值。我们使用 , , 跳过某些值。上面提到过的剩余参数这里也能用，在这里我们通过剩余参数捕获了剩余的数组成员。

   解构赋值还可以用于函数和参数。函数有不止 2-3 个参数时，使用一个对象收集所有参数是 JavaScript 的事实标准。
   如：

   ```js
   function doSomething(config) {
    if(config.a) { ... }
    if(config.b) { ... }
    if(config.c) { ... }
   }
   ```

   有更好的写法：

   ```js
   function doSomething({ a, b, c }) {
    if(a) { ... }
    if(b) { ... }
    if(c) { ... }
   }
   ```

7. 数组方法
   ES6 引入了许多有用的数组方法，例如：

   - find()，查找列表中的成员，返回 null 表示没找到
   - findIndex()，查找列表成员的索引
   - some()，检查某个断言是否至少在列表的一个成员上为真
   - includes，列表是否包含某项

   具体用法：

   ```js
   const array = [{ id: 1, checked: true }, { id: 2 }];
   arr.find((item) => item.id === 2); // { id: 2 }
   arr.findIndex((item) => item.id === 2); // 1
   arr.some((item) => item.checked); // true

   const numberArray = [1, 2, 3, 4];
   numberArray.includes(2); // true
   Promises + Async / Await;
   ```

8. 异步方案
   以前的回调函数：

   ```js
   function doSomething(cb) {
    setTimeout(() =>  {
      cb( done )
    }, 3000)
   }

   doSomething((arg) => {
    console.log( done here , arg);
   })
   ```

   js 对 promise 的原生支持：

   ```js
   function doSomething() {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(done);
       }, 3000);
     });
   }

   doSomething().then(arg => {
    console.log( done here , arg);
   })
   ```

   将 promise 串起来调用：

   ```js
   getUser()
     .then(getOrderByUser)
     .then(getOrderItemsByOrder)
     .then((orderItems) => {
       // 处理排序后的成员
     });
   ```

   最后有了 async/await：

   ```js
   async function getItems() {
    try {
      const user = await getUser();
      const order = await getOrderByUser(user);
      const items = await getOrderItemsByOrder(order);
      return items;
    } catch(err) {
      // 在这里处理错误，建议返回某个值或者重新抛出错误
    }
   }

   getItems().then(items => {
    // 处理排序后的成员
   }
   ```

9. 模块
   将代码分为多个文件，每个文件是一个自我包含的单元（模块）。

   ```js
   // math.js
   export function add(a,b) { return a + b; }
   export function sub(a,b) { return a - b; }
   export default mult(a,b) => a * b;
   // main.js
   import mult, { add, sub } from  ./math ;
   mult(2, 4) // 8
   add(1,1)   // 2
   sub(1,2)   // -1
   ```

   export 关键字注明了 add 和 sub 这两个结构对任何引入该模块的模块都公开可见。
   export default 关键字则注明仅仅 import 模块时得到的结构。
   在 main.js 中，我们将导入的 default 命名为 mult，同时指明我们引入 add() 和 sub() 这两个方法。箭头函数和字典作用域 this。

#### 二、ES6 实用的代码片段（24 个）

1. 如何隐藏所有指定的元素？

   ```js
   const hide = (...el) =>
     [...el].forEach((e) => (e.style, (display = "none")));
   // Example
   hide(document.querySelectorAll("img")); // 隐藏页面上的所有元素
   ```

2. 如何确认元素是否具有指定的类？

   ```js
   const hasClass = (el, className) => el.classList.contains(className);
   // Example
   hasClass(document.querySelector('p.special), 'special')
   ```

3. 如何切换元素的类？

   ```js
   const toggleClass = (el, className) => el.classList.toggle(className);
   // Example
   toggleClass(document.querySelector("p.special"), "special");
   ```

4. 如何获取当前页面的滚动位置？

   ```js
   const getScrollPosition = (el = window) => ({
     x: el.pageXOffeset !== undefined ? el.pageXOffeset : el.scrollLeft,
     y: el.pageXOffeset !== undefined ? el.pageXOffeset : el.scrollTop,
   });
   // Example
   getScrollPosition(); // {x : 0, y : 200}
   ```

5. 如何平滑滚动到页面底部？

   ```js
   const scrollToTop = () => {
     const c = document.documentElement.scrollTop || document.body.scrollTop;
     if (c > 0) {
       window.requestAnimationFrame(scrollToTop);
       window.scrollTo(0, c - c / 8);
     }
   };
   // Example
   scrollToTop();
   ```

6. 如何确认父元素是否包含子元素？

   ```js
   const elementContains = (parent, child) =>
     parent !== child && parent.contains(child);
   // Example
   elementContains(
     document.querySelector("head"),
     document.querySelector("title")
   ); // true
   elementContains(
     document.querSelector("body"),
     document.querySelector("body")
   ); // false
   ```

7. 如何确认指定元素是否在视口可见？

   ```js
   const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
       const { topm left, bottom, right } = el.getBoundingClientRect();
       const { innerHeight, innerWidth } = window;
       return partiallyVisible
           ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left < innerWidth) || (right > 0 && right < innerWidth))
           : top >= 0 && left >= 0 && bottom <= innerHeight && right < innerWidth;
   };
   // Example
   elementIsVisibleInViewport(el);  // （不完全可见）
   elementIsVisibleInViewport(el, true);  // （部分可见）
   ```

8. 如何获取一个元素内的所有图像？

   ```js
   const getImages = (el, includeDuplicates = false) => {
     const images = [...el.getElementsByTagName("img")].map((img) =>
       img.getAttribute("hide")
     );
     return includeDuplicates ? images : [...new set(images)];
   };
   // Example
   getImages(document, true);
   getImages(document, false);
   ```

9. 如何分辨设备是移动设备还是桌面设备？

   ```js
   const detectDeviceType = () =>
     /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
       navigator.userAgent
     )
       ? "Mobile"
       : "Desktop";
   // Example
   detectDeviceType(); // "Mobile" or "DeskTop"
   ```

10. 如何获取当前大的 URL？

    ```js
    const currenURL = () = window.location.href;
    // Example
    currentURL();  // 'https://google.com'
    ```

11. 如何创建一个包含当前 URL 参数的对象？

    ```js
    const getURLParameters = (url) =>
      (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
          (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
        ),
        {}
      );
    // Examples
    getURLParameters("http://url.com/page?n=Adam&s;=Smith"); // {n: 'Adam', s: 'Smith'}
    getURLParameters("google.com"); // {}
    ```

12. 如何将一组表单元素编码为一个对象？

    ```js
    const formToObject = (form) =>
      Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      );
    // Example
    formToObject(document.querySelector("#form")); // { email: 'test@email.com', name: 'Test Name' }
    ```

13. 如何从对象中检索给定选择器指示的一组属性？

    ```js
    const get = (from, ...selectors) =>
      [...selectors].map((s) =>
        s
          .replace(/\[([^\[\]]*)\]/g, ".$1.")
          .split(".")
          .filter((t) => t !== "")
          .reduce((prev, cur) => prev && prev[cur], from)
      );
    const obj = {
      selector: { to: { val: "val to select" } },
      target: [1, 2, { a: "test" }],
    };
    // Example
    get(obj, "selector.to.val", "target[0]", "target[2].a"); // ['val to select', 1, 'test']
    ```

14. 如何在等待一定时间后调用提供的函数（单位毫秒）？

    ```js
    const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);
    delay(
      function (text) {
        console.log(text);
      },
      1000,
      "later"
    );
    // 一秒后记录 'later'。
    ```

15. 如何在给定元素上触发特定事件，且可选传递自定义数据？

    ```js
    const triggerEvent = (el, evenType, detail) =>
      el.dispatchEvent(new CustomEvent(evenType, { detail }));
    // Example
    triggerEvent(document.getElementById("myId"), "click");
    triggerEvent(document.getElementById("myId"), "click", { username: "bob" });
    ```

16. 如何移除一个元素的事件侦听器？

    ```js
    const off = (el, wvt, fn, opts = false) =>
      el.removeEventListenter(evt, fn, opts);
    const fn = () => console.log("!");
    document.body.addEventListener("click", fn);
    off(document.body, "click", fn); // no longer logs '!' upon clicking on the page
    ```

17. 如何获得给定毫秒数的可读格式？

    ```js
    const formatDuration = (ms) => {
      if (ms < 0) ms = -ms;
      const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms/60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
      };
      return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => '${val} ${key}${val !== 1 ? 's' : ''}')
        .join('，');
    };
    // Example
    formatDuration(1001); // '1 second, 1 millisecond'
    formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
    ```

18. 如何获取两个日期之间的天数间隔？

    ```js
    const getDaysDiffBetweeenDates = (dataInitial, dateFianl) =>
      (dateFinal - dateInitial) / (1000 * 3600 * 24);
    // Example
    getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")); // 9
    ```

19. 如何对传递的 URL 进行 GET 请求？

    ```js
    const httpGet = (url, callback, err = console.error) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onload = () => callback(request.responseText);
      request.onerror = () => err(request);
      request.send();
    };
    // Example
    httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log); // Logs: {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}
    ```

20. 如何对传递的 URL 进行 Post 请求？

    ```js
    const httpPost = (url, data, callback, err = console.error) => {
      const request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );
      request.onload = () => callback(request.responseText);
      request.onerror = () => err(request);
      request.send(data);
    };
    const newPost = {
      userId: 1,
      id: 1337,
      title: "Foo",
      body: "bar bar bar",
    };
    const data = JSON.stringify(newPost);
    httpPost("https://jsonplaceholder.typicode.com/posts", data, console.log);
    // Logs: {"userId": 1, "id": 1337, "title": "Foo", "body": "bar bar bar"}
    ```

21. 如何为指定选择器创建具有指定范围、步长和持续时间的计时器？

    ```js
    const counter = (selector, start, end, step = 1, duration = 2000) => {
      let current = start,
        _step = (end - start) * step < 0 ? -step : step,
        timer = setInterval(() => {
          current += _step;
          document.querySelector(selector).innerHTML = current;
          if (current >= end) document.querySelector(selector).innerHTML = end;
          if (current >= end) clearInterval(timer);
        }, Math.abs(Math.floor(duration / (end - start))));
      return timer;
    };
    // Example
    counter("#my-id", 1, 1000, 5, 2000); // 为 id="my-id" 的元素创建一个两秒的计时器
    ```

22. 如何将一个字符串复制到剪贴板？

    ```js
    const copyToClipboard = (str) => {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    };
    // Example
    copyToClipboard("Lorem ipsum"); // 'Lorem ipsum' copied to clipboard.
    ```

23. 如何确定页面的浏览器选项卡是否处于前台活跃状态？

    ```js
    const isBrowserTabFocused = () => !document.hidden;
    // Example
    isBrowserTabFocused(); // true
    ```

24. 如果一个目录不存在，如何创建它？

    ```js
    const fs = require("fs");
    const createDirIfNotExits = (dir) =>
      !fs.existsSync(dir) ? fs.mkdirSync(dir) : underfined;
    // Example
    createDirIfNotExists("test"); // creates the directory 'test', if it doesn't exist
    ```

#### 三、ES6 面试题（20 个）

1. ES5 和 ES6 的区别？
   ECMAScript 5 (ES5)：ECMAScript 的第五版，于 2009 年标准化，该标准已在所有现代浏览器中完全支持。
   ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)：ECMAscript 第 6 版，2015 年标准化。这个标准已经在大多数现代浏览器中部分实现。
   主要区别如下：
   **箭头函数和字符串插值**

   ```js
   const greetings = (name) => {
     return `hello ${name}`;
   };
   // 或写为 const greetings = name => `hello ${name}`;
   ```

   **const**
   const 表示无法修改变量的原始值。需要注意的是，const 表示对值的常量引用，咱们可以改变被引用的对象的属性值，但不能改变引用本身。

   ```js
   const NAMES = [];
   NAMES.push("Jim");
   console.log(NAMES.length === 1); // true
   NAMES = ["Steve", "John"]; // error
   ```

   **块作用域**
   ES6 中 let, const 会创建块级作用域，不会像 var 声明变量一样会被提升。

   **默认参数**
   默认参数使咱们可以使用默认值初始化函数。当参数省略或 undefined 时使用默认参数值。

   ```js
   function multiply(a, b = 2) {
     return a * b;
   }
   multiply(5); // 10
   ```

   **类定义与继承**
   ES6 引入了对类(class 关键字)、构造函数(constructor 关键字)和 extend 关键字(用于继承)的语言支持。

   **for-of 运算符**
   for...of 语句创建一个遍历可迭代对象的循环。

   **展开操作符**

   ```js
   const obj1 = { a: 1, b: 2 };
   const obj2 = { a: 2, c: 3, d: 4 };
   const obj3 = { ...obj1, ...obj2 };
   ```

   **Promises**
   Promises 提供了一种机制来处理异步操作的结果和错误。可以使用回调来完成相同的事情，但是 Promises 通过方法链接和简洁的错误处理来提高可读性。

   ```js
   const isGreater = (a, b) => {
     return new Promise((resolve, reject) => {
       if (a > b) {
         resolve(true);
       } else {
         reject(false);
       }
     });
   };
   isGreater(1, 2)
     .then((result) => {
       console.log("greater");
     })
     .catch((result) => {
       console.log("smaller");
     });
   ```

   **模块导出**

   ```js
   const myModule = {
     x: 1,
     y: () => {
       console.log("This is ES5");
     },
   };
   export default myModule;
   ```

   **模块导入**

   ```js
   import myModule from "./myModule";
   ```

2. 什么是 IIFE (立即调用的函数表达式)？
   IIFE 是一个立即调用的函数表达式，它在创建后立即执行

   ```js
   (function IIFE() {
     console.log("Hello!");
   })();
   // "Hello!"
   ```

   常常使用此模式来避免污染全局命名空间，因为在 IIFE 中使用的所有变量(与任何其他普通函数一样)在其作用域之外都是不可见的。

3. 何时在 ES6 中使用箭头函数？
   一般地：

   - 在全局作用域内和 Object.prototype 属性中使用 function 。
   - 为对象构造函数使用 class。
   - 其它情况使用箭头函数。

   为啥大多数情况都使用箭头函数？

   - **作用域安全性**:当箭头函数被一致使用时，所有东西都保证使用与根对象相同的 thisObject。如果一个标准函数回调与一堆箭头函数混合在一起，那么作用域就有可能变得混乱。
   - **紧凑性**:箭头函数更容易读写。
   - **清晰度**:使用箭头函数可明确知道当前 this 指向。

4. 将 Symbol 引入 ES6 的目的是什么？
   Symbol 是一种新的、特殊的对象，可以用作对象中惟一的属性名。使用 Symbol 替换 string 可以避免不同的模块属性的冲突。还可以将 Symbol 设置为私有，以便尚无直接访问 Symbol 权限的任何人都不能访问它们的属性。
   Symbol 是 JS 新的基本数据类型。与 number、string 和 boolean 原始类型一样，Symbol 也有一个用于创建它们的函数。与其他原始类型不同，Symbol 没有字面量语法。创建它们的唯一方法是使用以下方法中的 Symbol 构造函数

   ```js
   let symbol = Symbol();
   ```

5. 在 ES6 中使用展开(spread)语法有什么好处? 它与剩余(rest)语法有什么不同？
   ES6 的展开语法在以函数形式进行编码时非常有用，因为咱们可以轻松地创建数组或对象的副本，而无需求助于 Object.create，slice 或库函数。Redux 和 rx.js 项目中经常使用此特性。

   ```js
   function putDookieInAnyArray(arr) {
     return [...arr, "dookie"];
   }

   const result = putDookieInAnyArray(["I", "really", "don't", "like"]);
   // ["I", "really", "don't", "like", "dookie"]

   const person = {
     name: "Todd",
     age: 29,
   };

   const copyOfTodd = { ...person };
   ```

   ES6 的 rest 语法提供了一种捷径，其中包括要传递给函数的任意数量的参数。
   就像展开语法的逆过程一样，它将数据放入并填充到数组中而不是展开数组，并且它在函数变量以及数组和对象解构分中也经常用到。

   ```js
   function addFiveToABunchOfNumbers(...numbers) {
     return numbers.map((x) => x + 5);
   }

   const result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]

   const [a, b, ...rest] = [1, 2, 3, 4]; // a: 1, b: 2, rest: [3, 4]

   const { e, f, ...others } = {
     e: 1,
     f: 2,
     g: 3,
     h: 4,
   }; // e: 1, f: 2, others: { g: 3, h: 4 }
   ```

6. ES6 类和 ES5 函数构造函数有什么区别？

   ```js
   // ES5 Function Constructor
   function Person(name) {
     this.name = name;
   }

   // ES6 Class
   class Person {
     constructor(name) {
       this.name = name;
     }
   }
   ```

   对于简单的构造函数，它们看起来非常相似。

   构造函数的主要区别在于使用继承。如果咱们创建一个继承 Person 类的 Student 子类并添加一个 studentId 字段，以下是两种方式的使用：

   ```js
   // ES5 Function Constructor
   function Student(name, studentID) {
     // 调用你类的构造函数以初始化你类派生的成员。
     Person.call(this.name);
     // 初始化子类的成员。
     this.studentId = studentId;
   }

   Student.prototype = Object.create(Person.prototype);
   Student.prototype.constructor = Student;

   // ES6 Class
   class Student extends Person {
     constructor(name, studentId) {
       super(name);
       this.studentId = studentId;
     }
   }
   ```

   在 ES5 中使用继承要复杂得多，而且 ES6 版本更容易理解和记住。

7. call 和 .apply 区别是啥？
   .call 和.apply 均用于调用函数，并且第一个参数将用作函数中 this 的值。但是，.call 将逗号分隔的参数作为下一个参数，而.apply 将参数数组作为下一个参数。简单记忆法：C 用于 call 和逗号分隔，A 用于 apply 和参数数组。

   ```js
   function add(a, b) {
     return a + b;
   }

   console.log(add.call(null, 1, 2)); // 3
   console.log(add.apply(null, [1, 2])); // 3
   ```

8. 为什么要使用 ES6 类？

   - 语法更简单，更不容易出错。
   - 使用新语法比使用旧语法更容易(而且更不易出错)地设置继承层次结构。
   - class 可以避免构造函数中使用 new 的常见错误（如果构造函数不是有效的对象，则使构造函数抛出异常）。
   - 用新语法调用父原型方法的版本比旧语法要简单得多，用 super.method()代替 ParentConstructor.prototype.method.call(this) 或 Object.getPrototypeOf(Object.getPrototypeOf(this)).method.call(this)

9. 在 JS 中定义枚举的首选语法是什么？
   可以 Object.freeze 来实现枚举

   ```js
   var DaysEnum = Object.freeze({
   "monday": 1,
   "tuesday": 2,
   "wednesday": 3,
   ...
   })
   // 或
   var DaysEnum = {
   "monday": 1,
   "tuesday": 2,
   "wednesday": 3,
   ...
   }
   Object.freeze(DaysEnum)
   ```

   但是，这阻止咱们把值分配给变量：

   ```js
   let day = DaysEnum.tuesday;
   day = 298832342; // 不会报错
   ```

10. 解释一下 Object.freeze() 和 const 的区别？
    const 和 Object.freeze 是两个完全不同的概念。
    const 声明一个只读的变量，一旦声明，常量的值就不可改变：

    ```js
    const person = {
      name: "Leonardo",
    };
    let animal = {
      species: "snake",
    };
    person = animal; // ERROR "person" is read-only
    ```

    Object.freeze 适用于值，更具体地说，适用于对象值，它使对象不可变，即不能更改其属性。

    ```js
    let person = {
      name: "Leonardo",
    };
    let animal = {
      species: "snake",
    };
    Object.freeze(person);
    person.name = "Lima"; //TypeError: Cannot assign to read only property 'name' of object
    console.log(person);
    ```

11.

### 前端面试题汇总

1. 什么是跨域？为什么会形成跨域？常见的前端跨域解决方案有哪些？

   跨域是指浏览器允许向服务器发送跨域请求，从而克服 Ajax 只能同源使用的限制。
   不是一个源的文件操作另一个源的文件就会形成跨域。当请求端的协议、域名、端口号和服务器的协议、域名、端口号有一个不一致就会发生跨域。

   前端跨域解决方案有：
   (1) JSONP 跨域
   原理就是利用 \<script> 标签没有跨域限制，通过 \<script> 标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到 callback 函数中，返回给浏览器，浏览器解析执行，从而拿到 callback 函数返回的数据。
   如：

   ```js
   // 1、原生 JS 实现
   <script>
       var script = document.createElement('script');
       script.type = 'text/javascript';

       // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
       script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
       document.head.appendChild(script);

       // 回调执行函数
       function handleCallback(res) {
           alert(JSON.stringify(res));
       }
   </script>

   // 服务端返回全局函数：
   handleCallback({"success": true, "user": "admin"})

   // 2、JQuery Ajax 实现
    $.ajax({
      url: 'http://www.domain2.com:8080/login',
      type: 'get',
      dataType: 'jsonp',  // 请求方式为jsonp
      jsonpCallback: "handleCallback",  // 自定义回调函数名
      data: {}
   });

   // 3、Vue Axios 实现
   this.$http = axios;
   this.$http.jsonp('http://www.domain2.com:8080/login', {
      params: {},
      jsonp: 'handleCallback'
   }).then((res) => {
      console.log(res);
   });

   // 后端 Node.js 代码
   var querystring = require("querystring");
   var http = require("http");
   var server = http.createServer();
   server.on("request", function (req, res) {
      var params = querystring.parse(req.url.split("?")[1]);
      var fn = params.callback;
      // jsonp返回设置
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(fn + "(" + JSON.stringify(params) + ")");
      res.end();
   });
   server.listen("8080");
   console.log("Server is running at port 8080...");
   ```

   jsonp 跨域的缺点是：只能发送 get 一种请求。

   (2) 跨域资源共享（Cross-origin Resource Sharing, CORS）
   CORS 是以一个 W3C 标准。它允许浏览器向跨源服务器发出 XMLHttpRequest 请求，从而克服了 Ajax 只能同源使用的限制。
   CORS 需要浏览器和服务器同时支持。目前所有浏览器都支持该功能，IE 不低于 IE11。

   浏览器将 CORS 跨域请求分为简单请求和非简单请求。

   - 简单请求
     同时满足以下两个条件：
     ① 使用 head、get、post 等方法之一。
     ② 请求的 Header 是 Accept；Accept-Language；Content-Language；Content-Type: 只限于 application/x-www-form-urlencoded、multipart/form-data、text/plain 三个值。
     对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 Origin 字段。
   - 非简单请求
     不满足上述条件的即为非简单请求。
     非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 Content-Type 字段的类型是 application/json。非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求（Preflight）。

   CORS 跨域示例：

   ```js
   // 原生 Ajax：
   var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

   // 前端设置是否带 cookie
   xhr.withCredentials = true;

   xhr.open('post', 'http://www.domain2.com:8080/login', true);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.send('user=admin');

   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
     alert(xhr.responseText);
     }
   };
   // jQuery Ajax：
   $.ajax({
     ...
     xhrFields: {
     withCredentials: true // 前端设置是否带 cookie
     },
     crossDomain: true, // 会让请求头中包含跨域的额外信息，但不会含 cookie
     ...
   });

   // 服务端 Node.js 代码
   var http = require('http');
   var server = http.createServer();
   var qs = require('querystring');

   server.on('request', function(req, res) {
        var postData = '';
        // 数据块接收中
        req.addListener('data', function(chunk) {
            postData += chunk;
        });
        // 数据接收完毕
        req.addListener('end', function() {
            postData = qs.parse(postData);
            // 跨域后台设置
            res.writeHead(200, {
                'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
                'Access-Control-Allow-Origin': 'http://www.domain1.com',    // 允许访问的域（协议+域名+端口）
                /*
                * 此处设置的cookie还是domain2的而非domain1，因为后端也不能跨域写cookie(nginx反向代理可以实现)，
                * 但只要domain2中写入一次cookie认证，后面的跨域接口都能从domain2中获取cookie，从而实现所有的接口都能跨域访问
                */
                'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
            });
            res.write(JSON.stringify(postData));
            res.end();
        });
    });

    server.listen('8080');
    console.log('Server is running at port 8080...');
   ```

   (3) Nginx 代理跨域
   其实质和 CORS 跨域原理一样，通过配置文件设置请求响应头 Access-Control-Allow-Origin...等字段。

   - Niginx 配置解决 iconfont 跨域
     浏览器跨域访问 js、css、img 等常规静态资源被同源策略许可，但 iconfont 字体文件（eot|otf|ttf|woff|svg）例外，此时可以在 nginx 的静态资源服务器中加入如下配置：

     ```nginx
     location/ {
       add_header Access-Control-Allow-Origin *;
     }
     ```

   - Nginx 反向代理接口跨域
     跨域问题：同源策略仅是针对浏览器的安全策略。服务器端调用 HTTP 接口只是使用 HTTP 协议 需要同源策略，也就不存在跨域问题。
     实现思路：通过 Nginx 配置一个代理服务器域名（与 domain1 相同，端口不同）做跳板机，反向访问 domain2 接口，并且可以顺便修改 cookie 中的 domain 信息，方便当前域 cookie 写入，实现跨域访问。

     ```nginx
     # proxy 服务器
     server {
     listen 81;
     server_name www.domain1.com;

       location / {
           proxy_pass   http://www.domain2.com:8080;  #反向代理
           proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
           index  index.html index.htm;

           # 当用 webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
           add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
           add_header Access-Control-Allow-Credentials true;
         }
     }
     ```

   (4) Node.Js 中间件代理跨域
   Node 中间件实现跨域代理，原理大致与 Nginx 相同，都是通过启动一个代理服务器，实现数据的转发，也可以通过设置 cookieDomainRewrrite 参数修改响应头中 cookie 中的域名，实现当前域的 cookie 写入，方便接口登录认证。

   - 非 vue 框架的跨域
     使用 node+express + http-proxy-middleware 搭建一个 proxy 服务器。

     ```js
     // 前端代码
     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true; // 浏览器是否读写cookie：true
     xhr.open("get", "http://www.domain1.com:3000/login?user=admin", true);
     xhr.send();
     ```

     ```js
     var express = require("express");
     var proxy = require("http=proxy-middleware");
     var app = express();

     app.use(
       "/",
       proxy({
         // 代理跨域目标接口
         target: "http://www.domain2.com:8080",
         changeOrigin: true,
         // 修改响应头信息，实现跨域并允许携带cookie
         onProxyRes: function (proxyRes, req, res) {
           res.header("Access-Control-Allow-Origin", "http://www.domain1.com");
           res.header("Access-Control-Allow-Credentials", "true");
         },
         // 修改相应信息中的 cookie 域名
         cookieDomainRewrite: "www.domain1.com", // 可以为 false，表示不修改
       })
     );

     app.listen(3000);
     console.log("Proxy server is listen at port 3000...");
     ```

   - vue 框架的跨域
     node + vue + webpack + webpack-dev-server 搭建的项目，跨域请求接口，直接修改 webpack.config.js 配置，开发环境下，vue 渲染服务和接口代理服务都是 webpack-dev-server 同一个，所以页面和代理接口之间不存在跨域问题。

     ```js
     module.exports = {
       entry: {},
       module: {},
       ...
       devServer: {
         historyApiFallback: true,
         proxy: [{
           context: '/login',
           target: 'http://www.domain2.com:8080', // 代理跨域目标接口
           changeOrigin: true,
           secure: false,
           cookieDomainRewrite: 'www.domain1.com' // 可以为 false，表示不修改
         }],
         noInfo: true
       }
     }
     ```

   (5) document.domain + iframe 跨域
   此方案仅限主域相同，子域不同的跨域应用场景。
   实现原理：两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域。

   ```html
   <!-- 父窗口（domain.com/a.html） -->
   <iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
   <script>
     document.domain = "domain.com";
     var user = "admin";
   </script>

   <!-- 子窗口（child.domain.com/a.html） -->
   <script>
     document.domain = "domain.com";
     // 获取父窗口的变量
     console.log("get js data from parent ---> " + window.parent.user);
   </script>
   ```

2. 函数柯里化指的是什么？有什么意义和应用场景？
   函数柯里化就是将多参简化为单个参数并返回接受余下参数的新函数的一种技术，其最终支持的是方法的连续调用，每次返回新的函数，在最终符合条件或者使用完所有的传参时终止函数调用。

   函数柯里化的主要作用和特点是：参数复用、提前返回和延迟执行。

   主要的应用场景包括：

   - 编写可重用的小模块代码
   - 简单改造普通函数
   - 不定参数的累加
   - 部分参数应用

3. 目前主流浏览器的内核？

   - IE trident
   - chrome webkit/blink
   - firefox gecko
   - opera presto
   - safari webkit

4. JS 中的数据类型有哪些？

   - 简单数据类型：number、string、Boolean、null、undefined、symbol
   - 复杂数据类型：object、array、function

   注意：简单数据类型是没有属性和方法的，且简单数据类型的值不可改变，保存复制的是值本身，储存在栈内存；引用数据保存与复制的是一个地址，改变其中一个另一个也会随之改变。

5. typeof 返回值有哪些？
   number、string、Boolean、undefined、object、function。

   - typeof 字符串 返回 string
   - typeof null、typeof 对象、typeof 数组 都返回 object
   - 其他诸如 0、" "、null、false、NaN、undefined 和不成立的表达式，都返回 false。

6. 栈内存与堆内存？
   (1) 内存分配
   在 js 编译阶段，除了声明变量和函数，查找环境中的标识符这两项工作之外，还会进行内存分配。不同类型的数据会分配到不同的内存空间。

   - 栈内存：引擎执行代码时工作的内存空间，除了引擎，也用来保存基本值和引用类型值的地址。
   - 堆内存：用来保存一组无序且唯一的引用类型值，可以使用栈中的键名来取得。

   (2) 赋值和赋址
   引擎不能直接操作堆内存中的数据，这就造成了对同一个变量赋不同类型的值，会出现完全不同的效果：为一个变量赋基本值时，实际上是创建一个新值，然后把该值赋给新变量，可以说这是一种真正意义上的“赋值”；为一个变量赋引用值时，实际上是为新变量添加一个指针，指向堆内存中的一个对象，属于一种“赋址”操作。

   例如：

   ```js
   // 基本值
   var a = 1;
   var b = a;
   a = 2;
   console.log(a); // 2
   console.log(b); // 1

   // 引用值
   var c = [0, 1, 2];
   var d = c; // 变量 c 和 d 指向堆中的同一个数组
   c[0] = 5;
   console.log(c); // [5, 1, 2]
   console.log(d); // [5, 1, 2]
   ```

7. 深拷贝与浅拷贝？

   - 浅拷贝：可以简单理解为，是发生在栈中的拷贝行为，只能拷贝基本值和引用值的地址。
     实现方式： ① ES6 中定义了 Object.assign() 方法来实现浅拷贝。
     例子：

     ```js
     let a = {
       name: "Tom",
       obj: {
         age: 19,
       },
     };
     let b = Object.assign({}, a);
     console.log(b); // {name: 'Tom', obj: {age: 20}}

     a.name = "Amy";
     a.obj.age = 20;
     console.log(a); // {name: 'Amy', obj: {age: 20}}
     console.log(b); // {name: 'Tom', obj: {age: 20}}
     ```

     ② 数组中的 slice()方法也属于浅拷贝。
     例子：

     ```js
     var a = [0, [1]];
     var b = a.slice(0);
     a[0] = 8;
     a[1][0] = 9;
     console.log(a); // [8, [9]]
     console.log(b); // [0, [9]]
     ```

     ③ \*concat()方法也属于浅拷贝。
     ④ 自定义浅拷贝函数

     ```js
     // 自定义浅拷贝函数
     let obj = {
       name: "zs",
       age: 18,
       money: 1000,
     };
     function Copy(obj) {
       let newObj = {};
       for (let k in obj) {
         newObj[k] = obj[k];
       }
       return newObj;
     }
     console.log(Copy(obj));
     ```

   - 深拷贝：可以简单理解为，同时发生在栈中和堆中的拷贝行为，除了拷贝基本值和引用值的地址之外，地址指向的堆中的对象也会利用递归进行拷贝。
     实现方式：① 将需要深拷贝的对象序列化为一个 JSON 字符串，然后根据这个字符串解析出一个结构和值完全一样的新对象，可以间接实现深拷贝。
     例子：

     ```js
     let a = {
       name: "Tom",
       obj: {
         age: 19,
       },
     };
     var b = JSON.parse(JSON.stingify(a));
     console.log(b); // {name: 'Tom', obj: {age: 19}}

     a.name = "Amy";
     a.obj.age = 20;
     console.log(a); // {name: 'Amy', obj: {age: 20}}
     console.log(b); // {name: 'Tom', obj: {age: 19}}
     ```

     注：这种方法需要保证对象是安全的，例如属性值不能是 underfined、symbol、函数、日期和正则。

     ② jQuery 使用 $.extend() 方法实现深拷贝
     此并非原生 js 方法，其提供深拷贝的基本思路是：如果是基本值或除了对象和数组之外的引用值，直接赋值；如果是对象或数组就需要进行递归，直到递归到基本值或除了对象和数组之外的引用值为止。
     如：

     ```js
     // jquery 中的 $.extend() 代码片段
     if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray == jQuery.isArray(copy)))) {
       // 若 copy 的内容是数组或对象，则继续调用 extend() 函数
       if (copyIsArray) {
         copyIsArray = false；
         clone = src && jQuery.isArray(src) ? src: [];
       } else {
         clone = src && jQuery.isPlainObject(src) ? src: {};
       }
       target[name] = jQuery.extend(deep, clone, copy);
     } else if (copy != undefined) {
       target[name] = copy; // 若 copy 的内容不是数组或对象则直接赋值
     }
     ```

     ③ 自定义深拷贝函数

     如：

     ```js
     // 自定义深拷贝函数（参考 $.extend() 方法的实现思路）
     function extend(source) {
       var target = Array.isArray(source) ? []: {};
       for (var key in source) {
         var isObject = Object.prototype.tostring.call(source[key] === '[Object Object]');
         if (isObject || Array.isArray(source[key]) {
           // 如果是对象或数组，则继续调用 extend 函数
           target[key] = extend(source[key]);
         } else {
           // 递归到基本值或除对象和数组之外的引用值，直接赋值
           target[key] = source[key];
         }
       }
       return target;
     }

     // 测试代码
     var a = {
       a1: undefined,
       a2: null,
       a3: 123,
       a4: false,
       a5: "Tom",
       a6: Symbol.for('6'),
       obj: {
         s: "book",
         n: 10
       },
       arr: [1, 2, 3, [4]],
       fn: function() {
         console.log(999);
       },
       now: new Date()
     }

     var b = extend(a);
     a.a5 = 'Amy';
     console.log(a.a5); // "Amy"
     console.log(b.a5); // "Tom"
     a.obj.s = 'pen';
     console.log(a.obj.s); // "pen"
     console.log(b.obj.s); // "book"
     a.arr[3][0] = 9999;
     console.log(a.arr[3][0]); // 9999
     console.log(b.arr[3][0]); // 4
     ```

     ```js
     // 递归方式进行深拷贝
     let obj = {
       name: 'zs',
       age: 18,
       money: 1000,
       smoke: {
         brand: 'suyan',
         num: 20
       }
     }
     function Copy(obj) {
       let newObj = {};
       for (let k in obj) {
         newObj[k] = typeof obj[k] === 'object' ? Copy[obj[k]] : obj[k];
       }
       return newObj；
     }
     console.log(Copy(obj)); // 修改 obj 不会影响到 newObj
     ```

8. 如何检测一个对象是不是数组？
   (1) Array.isArray() 方法（ES5 新增）
   此方法接收一个参数，用于确定传递的值是否为一个数组。

   ```js
   let arr = [1, 2, 3];
   console.log(Array.isArray(arr)); // true
   ```

   (2) instanceof 运算符（此方法有一定缺陷）
   用来检测一个对象在其原型或原型链中是否存在一个构造函数的 prototype 属性，即 arr.\_\_proto\_\_ 属性指向了构造它的构造函数的原型对象 Array.prototype，而 arr.constructor 则指向了构造它的构造函数，arr 实例中没有 constructor 属性，只能在原型链上找，原型链上有 constructor，故 arr.constructor === Array。

   ```js
   let arr = [1, 2, 3];
   arr instanceof Array; // true
   ```

   (3) Object.prototype.tostring()方法
   借助 Object 原型上的方法来实现数组的检测。

   ```js
   let arr = [1, 2, 3, 4];
   console.log(arr.toString()); // "1, 2, 3, 4"
   console.log(Object.prototype.toString(arr)); // "[object object]"
   console.log(Object.prototype.toString.call(arr)); // "[object, Array]"
   ```

9. 自增自减运算符和逻辑运算符

   - ++ 运算符：写在后面叫做后缀自增（先赋值后增），写在前面则叫做前缀自增（先增后赋值）

     ```js
     let a = 10;
     let b = ++a + a++;
     console.log(a); // 12
     console.log(b); // 22
     // 分析： ++a 是 a 先加 1 再赋值给自己，此时 a = 11，再加上 11，所以 b = 11 + 11 = 22，而 a++，a 变成了12。（此时运算符优先级：++a > = > a++）

     let a = 5;
     let b = a++ + ++a + a++;
     console.loe(a); // 8
     console.loe(b); // 19

     let a = 10;
     let b = a-- + ++a;
     console.log(a); // 10
     console.log(b); // 20
     ```

   - -- 运算符：和自增运算符类似
   - 逻辑运算符
     - &&：假前后真，全真为真，有一个假即为假
     - ||：真前假后：全假为假，有一个真即为真
     - ！：取反，转换为布尔值

10. js 的原型和原型链？
    js 函数都有 prototype 属性，这个属性是以一个对象，我们称之为原型对象；每一个对象都有\_\_proto\_\_属性，该属性指向了原型对象，原型对象也属于对象，也有\_\_proto\_\_属性，这样一层一层即形成了链式结构，我们称之为原型链。

11. 闭包
    相互嵌套关系的两个函数，当内部函数引用外部函数的局部变量时就形成了闭包。闭包将会导致原有的作用域不释放，造成内存泄漏。

    - 闭包的优点：形成私有空间，避免全局污染；持久化内存，保存数据
    - 闭包的缺点：持久化内存导致的内存泄露。（解决办法是尽量避免函数的嵌套；执行完的变量赋值为 null，让垃圾回收机制回收释放内存）

    经典案例（点击 li 获取下标）：

    ```html
    <ul>
      <li>111</li>
      <li>222</li>
      <li>333</li>
      <li>444</li>
      <li>555</li>
    </ul>
    <script>
      var lis = document.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) {
        (function (j) {
          lis[j].onclick = function () {
            console.log(j);
          };
        })(i);
      }
    </script>
    ```

12. call()、apply()和 bind() 三者的区别与联系？
    区别与联系：

    - 三者都可以改变函数的 this 对象指向；
    - 三者第一个参数都是 this 要指向的对象，如果没有这个参数或参数为 null/undefined，都默认指向全局 window。
    - 三者都可以传参，call 可以有多个参数，而 apply 最多只有两个参数，call 和 apply 除第一参数标识 this 指向外，其他参数（call 传递的是参数列表，而 apply 传递的是数组或伪数组）均作为函数的实参传递给函数。call 和 apply 都是一次性传入参数，bind 可以分多次传入。
    - call 和 apply 是立即执行函数，而 bind 是创建一个函数副本，并返回绑定 this 指向的新函数，便于稍后调用。

13. 伪数组有哪些？

    - 函数参数列表 arguments
    - Dom 对象列表 和 childNodes 子节点列表
    - jQuery 对象，如 $("div")

14. 伪数组和真数组有什么区别？伪数组又如何转换为真数组？
    区别：

    - 伪数组其实是一个对象，真数组是 Array
    - 伪数组同样拥有 length 属性，但长度不可以改变，真数组长度可以改变
    - 伪数组不具备真数组的方法，比如 push、slice 等

    转换：

    - call 借调数组方法

      ```js
      let obj = { 0: "zs", 1: "ww", 2: "ls", length: 3 };
      console.log(obj); // {0: "zs", 1: "ww", 2: "ls", length: 3}
      console.log(Array.prototype.slice.call(obj)); // ["zs", "ww", "ls"]
      ```

    - ES6 新语法 Array.from 方法从一个类似数组或可迭代对象创建一个新的浅拷贝的数组实例

      ```js
      let obj = { 0: "zs", 1: "ww", 2: "ls", length: 3 };
      console.log(obj); // {0: "zs", 1: "ww", 2: "ls", length: 3}
      console.log(Array.from(obj)); // ["zs", "ww", "ls"]
      ```

    - ES6 扩展运算符

      ```html
      <div></div>
      <div></div>
      <div></div>
      <script>
        let arr = document.querySelectorAll("div");
        console.log(arr);
        let newArr = [...arr];
        console.log(newArr);
      </script>
      ```

    注：使用自定义伪数组时，由于缺少遍历器 Iterator，无法通过扩展运算符转换为真数组。

15. 数组的降维（扁平化）处理？
    对于一层嵌套数组：

    - 借调数组原型上的 concat 方法

      ```js
      let arr = [1, 2, 3, [4, 5]];
      console.log(Array.prototype.concat.apply([], arr)); // [1, 2, 3, 4, 5]
      ```

    - 使用数组的 concat 方法和扩展运算符

      ```js
      let arr = [1, 2, 3, [4, 5]];
      console.log([].concat(...arr)); // [1, 2, 3, 4, 5]
      ```

    对于多层嵌套数组：

    - 利用 Array.some 方法判断数组中是否还存在数组，若存在，再用展开运算符配合 concat 方法连接数组

      ```js
      let arr = [1, 2, 3, [4, [5, 6]]];
      while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
      }
      console.log(arr); // [1, 2, 3, 4, 5, 6]
      ```

    - 利用 ES6 中的 flat 方法（利用该方法中的 Infinity 属性，可以实现多层数组的降维处理）

      ```js
      let arr = [1, 2, 3, [4, [5, 6]]];
      console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
      ```

16. 数组去重的方法有哪些？

    - ES6 的 new Set() + Array.from 或展开运算符（set 方法里内部的值不允许重复）

      ```js
      let arr = [1, 2, 3, 3, 4, 5, 5, 5, 7];
      let set = new Set(arr);
      console.log(set); // Set {1, 2, 3, 4, 5, 7}
      console.log([...set]); // [1, 2, 3, 4, 5, 7]
      console.log(Array.from(set)); // [1, 2, 3, 4, 5, 7]
      ```

    - 数组双重 for 循环遍历 + splice()，或单循环遍历（for in、for of、forEach） + Object 或 includes()

      ```js
      let arr = [1, 2, 3, 3, 4, 5, 5, 5, 7];
      let newArr = [];
      arr.forEach((item) => {
        if (!newArr.includes(item)) {
          newArr.push(item);
        }
      });
      console.log(newArr); // [1, 2, 3, 4, 5, 7]
      ```

    - 利用 Array.sort() 排序，比较相邻元素是否相等，从而排除重复项

      ```js
      let arr = [1, 2, 3, 3, 4, 5, 5, 5,7];
      arr.sort((a, b) => a - b));
      let newArr = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i -1]) {
          newArr.push(arr[i]);
        }
      }
      console.log(newArr); // [1, 2, 3, 4, 5, 7]
      ```

    - 利用 Array.filter() + indexOf()

      ```js
      let arr = [1, 2, 3, 3, 4, 5, 5, 5, 7];
      let newArr = arr.filter((item, index) => {
        return arr.indexOf(item) === index;
      });
      console.log(newArr); // [1, 2, 3, 4, 5, 7]
      ```

17. var、const、let 有哪些不同之处？

    - var 声明的变量存在变量提升，let 和 const 的没有
    - var 可以重复声明同名变量，let 和 const 不可以，会报错
    - let 和 const 声明变量有块级作用域，var 没有
    - const 定义的变量是常量，不能被修改，如果是对象或者数组则可以修改或增加属性

18. this 指向问题？

    - 函数调用模式，this 指向 window
    - 构造函数调用模式，this 指向新创建的实例对象
    - 方法调用模式，this 指向调用方法的对象
    - 上下文调用模式，call 和 apply 方法中，this 指向方法内的第一个参数，bind 方法中，其创建新的函数副本中的 this 绑定 bind 方法中的新函数
    - 在事件处理函数中，this 指向的的触发事件的当前元素
    - 在定时器中，this 指向的是 window
    - 在箭头函数中没有 this 指向问题，它的 this 和外层作用域的 this 保持一致
    - 匿名函数中，this 总是指向 window

19. 面向对象和面向过程有什么区别？

    - 面向对象是一种编程思想，就是把程序看作一个对象，将属性和方法封装其中，以提高代码的灵活性、复用性和可扩展性。
      面向对象有三大特性：封装、继承、多态。封装指的是把属性和方法储存在对象中的能力；继承指的是由另一个类得来的属性和方法的能力；多态指的是编写能以多种方法运行的函数或方法的能力。
      面向对象开发的优点是：易维护、易扩展、降低工作量，缩短开发周期；缺点是：性能低。
    - 面对过程是一种以过程为中心的编程思想，就是把解决问题分为一个一个的步骤，先干什么后干什么，然后用函数把这些步骤一步步实现，使用的时候一个个依次进行调用即可。
      面向过程的优点是：性能比面对对象高，因为类调用时需要实例化，开销比较大，比较消耗资源；比如单片机、嵌入式开发、Linux/Unix 等一般采用面向过程开发，性能是最重要的因素，缺点是没有面向对象那样易维护、易扩展、易复用。

20.

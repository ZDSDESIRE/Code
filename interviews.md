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

5. 栈内存与堆内存？
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

6. 深拷贝与浅拷贝？

   - 浅拷贝：可以简单理解为，是发生在栈中的拷贝行为，只能拷贝基本值和引用值的地址。
     实现方式： ES6 中定义了 Object.assign() 方法来实现浅拷贝。
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

     数组中的 slice()方法也属于浅拷贝。
     例子：

     ```js
     var a = [0, [1]];
     var b = a.slice(0);
     a[0] = 8;
     a[1][0] = 9;
     console.log(a); // [8, [9]]
     console.log(b); // [0, [9]]
     ```

     \*concat()方法也属于浅拷贝。

   - 深拷贝：可以简单理解为，同时发生在栈中和堆中的拷贝行为，除了拷贝基本值和引用值的地址之外，地址指向的堆中的对象也会发生拷贝。
     实现方式：将需要深拷贝的对象序列化为一个 JSON 字符串，然后根据这个字符串解析出一个结构和值完全一样的新对象，可以间接实现深拷贝。
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
     
7.

### 常见的 HTML5 面试题

#### 1、HTML5 有哪些新特性？移除了哪些元素？

HTML5 的新特性如下：

- 拖放（Drag and drop） API
- 语义化更好的内容标签（header、nav、footer、aside、article、 section）
- 音频、视频（audio、video）API
- 画布（Canvas）API
- 地理位置（Geolocation）API
- 本地离线存储（localStorage），即长期存储数据，浏览器关闭后数据不丢失
- 会话存储（sessionStorage），即数据在浏览器关闭后自动删除
- 表单控件（含：calendar、date、time、email、url、search）
- 新技术（含：webwork、websocket、Geolocation）

移除的元素如下：

- 纯表现的元素，包括 basefont、big、center、font、s、strike、t、u
- 怼可用性产生负面影响的元素，包括 frame、frameset、Noframes

#### 2、如何区别 HTML5 新标签的浏览器兼容问题？

IE8、IE7、IE6 支持用 document.create Element 产生标签，可以利用这一特性让这些浏览器支持 HTMl5 新标签。浏览器支持新标签后，还需要添加标签默认的样式（最好的方式是直接使用成熟的框架，使用最多的是 html5shim 框架），可以用 IE hack 引入该框架

```html
<! --[if 1t IE 9]>
<script>
  src="http://html5shim.googlecode.com/svn/trunk/html5.js
</script>
<! [end if]-->
```

#### 3、如何区别 HTMl 和 HTML5？

用 DOCTYPE 声明新增的结构元素和功能元素来区别它们/

#### 4、什么是 THML5？

HTML5 是最新的 HTML 标准，它的主要目标是提供所有内容，而不需要任何 Flash、SilverLight 等额外的插件，这些内容来自动画、视频、富 GUI 等。
HTMl5 是万维网联盟（W3C）和网络超文本应用技术工作组（WHATWG）合作输出的。

#### 5、新的 HTML5 文档类型和字符集是什么？

HTML5 的文档类型是<!doctype html>。
HTML5 使用的字符集是<meta charset="UTF8">。

#### 6、HTML5 Canvas 元素有什么作用？

Canvas 元素用于在网页上绘制图形，该元素标签的强大之处在于可以直接在 HTML 上进行图形操作。

#### 7、HTML5 新增了哪些功能 API？

新增的功能 API 包括 Media API、Text Track API、Application Cache API、User Interaction、Data Transfer API、Command API、Constraint Validation API、History API。

#### 8、HTML5 的离线存储有哪些？

有本地离线存储 localStorage，可长期存储数据，即浏览器关闭后数据不丢失；会话离线存储 sessionStorage，数据在浏览器关闭后自动删除。

#### 9、HTML5 的 form 如何关闭自动补全功能？

将不想要提示的 form 元素下的 Input 元素的 autocomplete 属性设置为 off。

#### 10、如何在 HTML5 页面中嵌入音频？

HTML5 包含嵌入音频文件的标准方式，支持的格式包括 MP3、Wav 和 Ogg 等，嵌入方式如下：

```html
<audio controls>
  <source src="icketang.mp3" type="audio/mpeg" />
  Your browser does'nt support audio embedding feature.
</audio>
```

#### 11、如何在 HTML5 页面中嵌入视频？

和嵌入音频文件一样，HTML5 定义了嵌入视频的标准方式，支持的格式包括 MP4、WebM 和 Ogg 等，嵌入方式如下：

```html
< video width=”450” height=”340” contro1s>
<source src="icketang.mp4"  type="video/mp4">
Your browser does'nt support video embedding feature.
</video>
```

#### 12、HTML5 引入了哪些新的表单属性？

新增的表单属性包括 datelist、datetime、output、keygen、date、month、week、time、number、range、email、url。

#### 13、如何显示我们自己画的一个弹框？

可以用一个简单的方法，在页面上单击一个按钮，弹出一个弹框，而弹框也是自己写的一个 div，单击前先把弹框隐藏，onclick 事件发生之后就会显示出来。

#### 14、HTML5 应用缓存和常规的 HTML 浏览器缓存有什么差别？

HTML5 应用缓存最关键的就是支持离线应用，可获取少数或者全部网站内容，包括 HTML、CSS、图像和 JavaScript 脚本并存于本地。该特性提升了网站的性能，可通过如下方式实现：

```html
<!DOCTYPE html>
<html manifest="example.appcache">
  ......
</html>
```

与传统的浏览器缓存比较，该特性并不强制要求用户访问网站。

#### 15、为什么 HTML5 里面不需要 DTD（Document Type Definition，文档类型定义）？如何不放入<!doctype html>标签，HTML5 还会工作吗？

HTML5 没有使用 SGML 或者 XHTML，它是一个全新的类型，因此不需要参考 DTD。
对于 HTML5，仅须放置<！doctype html>标签，即文档类型代码，让浏览器识别 HTML5 文档。如果不放入该标签，HTML5 不会工作。浏览器将不能识别出它是 HTML 文档，同时 HTML5 的标签将不能正常工作。

#### 16、哪些浏览器支持 HTML5？

几乎所有的浏览器（如 Safari、Chrome、Firefox、Opera、IE）都支持 HTML5。

#### 17、本地存储和会话存（事务）储之间的区别是什么？

本地存储数据持续永久，但是会话存储在浏览器打开时有效，在浏览器关闭时会话重置存储数据。

#### 18、HTML5 中的应用缓存是什么？

HTML5 应用缓存的最终目的是帮助用户离线浏览页面，换句话说，如果网络连接不可用，打开的页面就来自浏览器缓存，离线应用缓存可以帮助用户达到这个目的。
应用缓存可以帮助用户指定哪些文件需要缓存，哪些不需要。

#### 19、如果把 HTML5 看成一个开放平台，它的构建模块有哪些？

如果把 HTML 看成一个开放平台，它的构建模块至少包括以下几个，如<nav><header><section><footer>。

<nav>标签用来将具有导航性质的链接划分在一起，使代码结构在语义化方面更加准确
<header>标签用来定义文档的页眉。
<section>标签用来描述文档的结构。
<footer>标签用来定义页脚。在典型情况下，该元素会包含文档作者的姓名、文档的创作日期和联系信息。

#### 20、HTML5 为什么只需要写<!doctype html>？

HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们的方式来进行）。而 HTM4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的类型。

#### 21、HTML5 应用程序缓存为应用带来什么优势？

3 个优势：

1. 离线浏览，让用户可在应用离线时（网络不可用）使用它们。
2. 速度，让已缓存资源加载的更快。
3. 减少服务器负载，让浏览器只下载服务器更新过的资源。

#### 22、与 HTML4 比较，HTML5 废弃了哪些元素？

废弃的元素包括 frame、frameset、noframe、applet、big、center 和 basefont。

#### 23、HTML5 标准提供了哪些新的 API？

HTML5 标准提供了很多新的 API，包括 Media API、Text Track API、Application Cache API、User Interaction API、Data Transfer API、Command API、Constraintion Validation API 和 History API。

#### 24、请你说一下 Web Worker 和 WebSocket 的作用

Web Worker 的作用如下：

1. 通过 worker=new worker(url)加载一个 JavaScript 文件，创建一个 Worker，同时返回一个 Worker 实例。
2. 用 worker.postMessage(date)向 Worker 发送数据。
3. 绑定 worker.onmessage 接受 Worker 发送过来的数据。
4. 可以使用 worker.terminate()终止一个 worker 的执行。

WebSocket 的作用如下：
它是 Web 应用程序的传输协议，提供了双向的、按序到达的数据流。它是 HTML5 新增的协议，WebSocket 的连接是持久的，它在客户端和服务器之间保持双工连接服务器的更新可以及时推送到客户端，而不是客户端以一定的时间间隔去轮询。

#### 25、如何实现浏览器内多个标签页之间的通信？

在标签页之间，调用 localstorge、cookies 等数据存储，可以实现标签页之间的通信。

#### 26、如何让 Websocket 兼容低版本浏览器？

使用 Adope Flash Socket、ActiveX HTMLFile(E)、multipart 编码发送 XHR 与长轮询发送 XHR 等，可以实现不支持 WebSocket API 的浏览器对 Web Socket 的兼容。

#### 27、HTML5 为浏览器提供了哪些数据存储方案？

在较高版本的浏览器中，提供了 sessionStorage 和 globalStorage。在 HTML5 规范中，用 localStorage 取代 globalStorage。
HTML5 中的 Web Storage 包括两种存储方式，分别是 sessionStorage 和 localStorage。
sessionStorage 用于在本地存储一个会话（session）中的数据，这些数据只有同一个会话中的页面才能访问，当会话结束后，数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。
localStorage 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
localStorage 和 sessionStorage 都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等。

#### 28、请描述一下 sessionStorage 和 localStorage 的区别

sessionStorage 用于在本地存储一个会话中的数据，这些数据只有同一个会话中的页面才能访问，当会话结束后，数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。
而 localStorage 用于持久化本地存储，除非主动删除数据，否则数据是永远不会过期的。

#### 29、localStorage 和 cookie 的区别是什么？

localStorage 的概念和 cookie 类似，区别是 localStorage 是为了更大容量的存储设计的。cookie 的大小是受限的，并且每次请求一个新页面时，cookie 都会被发送过去，这样无形中浪费了带宽。另外，cookie 还需要指定作用域，不可以跨域调用。
除此之外，localStorage 拥有 setItem、getItem、removeItem、clear 等方法，cookie 则需要前端开发者自己封装 setCookie 和 getCookie。但 cookie 也是不可或缺的，因为 cookie 的作用是与服务器进行交互，并且还是 HTP 规范的一部分，而 localStorage 仅因为是为了在本地“存储”数据而已，无法跨浏览器使用。

#### 30、请你谈谈 cookie 的特点

cookie 虽然为持久保存客户端数据提供了方便，分担了服务器存储的负担，但是也有以下的局限性：

1. 每个特定的域名下最多生成 20 个 cookie。
2. IE6 或更低版本最多有 20 个 cookie。
3. IE7 和之后的版本最多可以有 50 个 cookie。
4. Firefox 最多可以有 50 个 cookie。
5. Chrome 和 Safari 没有硬性限制。

IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie。
cookie 最大为 4096 字节，为了兼容性，一般不能超过 4095 字节。
IE 提供了一种存储方式，可以让用户数据持久化，叫做 userdata，从 IE5.0 就开始支持此功能。每块数据最多 128k，每个域名下最多 1MB。这个持久化数据放在缓存中，如果缓存没有被清理，就会一直存在。

优点如下：

1. 通过良好的编程，控制保存在 cookie 中的 session 对象的大小。
2. 通过加密和安全传输技术（SSL），降低 cookie 被破解的可能性。
3. 只在 Cookie 中存放不敏感数据，即使被盗也不会有重大损失。
4. 控制 cookie 的生命周期，使之不会永远有效。数据偷盗者很可能得到一个过期的 cookie。

缺点如下：

1. “cookie”的数量和长度有限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 的长度不能超过 4KB，否则会被截掉。
2. 安全性问题。如果 cookie 被别人拦截了，就可以得到所有的 session 信息。即使加密也于事无补，因为拦截者并不需要知道 cookie 的意义，他只要原样转发 cookie 就可以到达目的。
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器，如果把这个计数器保存在客户端，那么它起不到任何作用。

#### 31、cookie 和 session 的区别是什么？

区别如下:

1. cookie 数据存放在客户的浏览器上，session 数据存放在服务器上。
2. cookie 不是很安全，别人可以分析存放在本地的 cookie 并进行 cookie 欺骗。考虑道安全问题应当使用 session。
3. session 会在一定时间内保存在服务器上。当访问增多时，会占用较多服务器的资源。为了减轻服务器的负担，应当使用 cookie。
4. 单个 cookie 保存的数据不超过 4KB，很多浏览器都限制一个站点最多保存 20 个 cookie。

所以个人建议可以将登录信息等重要信息存放在 session 中，其他信息（如需保留）可以存放在 cookie 中。

#### 32、什么是 SVG？

SVG 即可缩放矢量图形（Scalable Vector Graphics）。它是基于文本的图形语言，使用文本、线条、点等来绘制图像，这使得它轻便、显示迅速/

#### 33、Canvas 和 SVG 的区别是什么？

两者的区别如下：

1. 一旦 Canvas 绘制完成将不能访问像素或操作它；任何使用 SVG 绘制的形状都能被记忆和操作，可以被浏览器再次显示。
2. Canvas 对绘制动画和游戏非常有利；SVG 对创建图形（如 CAD）非常有利。
3. 因为不需要记住以后事情，所以 Canvas 运行更快；因为为了之后的操作，SVG 需要记录坐标，所以运行比较缓慢。
4. 在 Canvas 中不能绘制对象绑定相关事件；在 SVG 中可以为绘制对象绑定相关事件。
5. Canvas 绘制出的是位图，因此与分辨率有关；SVG 绘制出的是矢量图，因此与分辨率无关。

#### 34、如何使用 Canvas 和 HTML5 的 SVG 画一个矩形？

使用 SVG 绘制矩形的代码如下：

```html
<svg xmlns=http://www.w3.org/2000/scg version="1.1">
<rect style="fill:rgb(255,100,0);" height="200" width="400"></rect>
</svg>
```

使用 Canvas 绘制矩形的代码如下：

```html
<canvas id="myManvas" width="500" height="500"></canvas>
```

```js
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.rect(100, 100, 300, 200);
ctx.fillstyle = "pink";
ctx.fill();
```

#### 35、本地存储的数据有生命周期吗？

本地存储的数据没有生命周期，它将一直存储数据，知直到用户从浏览器清除或者使用 JavaScript 代码移除。

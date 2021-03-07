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

#### 19、如皋把 HTML5 看成一个开放平台，它的构建模块有哪些？

如果把 HTML 看成一个开放平台，它的构建模块至少包括以下几个，如<nav><header><section><footer>。

<nav>标签用来将具有导航性质的链接划分在一起，使代码结构在语义化方面更加准确
<header>标签用来定义文档的页眉。
<section>标签用来描述文档的结构。
<footer>标签用来定义页脚。在典型情况下，该元素会包含文档作者的姓名、文档的创作日期和联系信息。

#### 20、HTML5 为什么只需要写<!doctype html>？

HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们的方式来进行）。而 HTM4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的类型。

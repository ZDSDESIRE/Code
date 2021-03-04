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

### 常见的 CSS 面试题

##### 1、CSS 有哪些基本选择器？它们的权重是如何表示的？

CSS 基本选择器有类选择器、属性选择器和 ID 选择器。

CSS 选择器的权重预示着 CSS 选择器样式渲染的先后顺序，元素样式渲染时，权重高的选择器样式会覆盖权重低的选择器样式。

通常将权重分为 4 个等级，可用 0.0.0.0 来表示这 4 个等级。

！important 关键字优先级最高。

注意：！importont 井非选择器，而是针对选择器内的单一样式设置的。当然，不同选择器内应用 ！important 的权重也是不一样的，例如，在 id 选择器内的！important 关键字权重要高于类选择器内的 ！important 关键字权重，即下面所说的选择器权重组合。

- 内联样式（非元素器）的优先级可看成 1.0.0.0。
- ID 选择器的优先级为 0.1.0.0。
- 类属性选择器、属性选择器、伪类的优先级为 0.0.1.0。
- 元素选择器、伪元素选择器的优先级为 0.0.0.1。
- 通配符选择器对特殊性没有任何贡献值。

当把选择器组合使用的时候，相应的层级权重也会递增，例如# id .class 的权重为 0.1.1.0。

##### 2、CSS 的引入方式有哪些？ink 和@ import 的区别是什么？

CSS 有 3 种引入方式。

- 行内式是指将样式写在元素的 style 属性内。
- 内嵌式是指将样式写在 style 元素内。
- 外链式是指通过 link 标签，引入 CSS 文件内的样式。

通过 link 标签引入样式与通过@ import 方法引入样式有如下区别：

- （1）加载资源的限制。
  link 是 XHTML 的标签，除了加载 CSS 文件外，还可以加载 RSS 等其他事务，如加载模板等。
  @ import 只能加载 CSS 文件。
- （2）加载方式。
  如果用 link 引用 CSS，在页面载入时同时加载，即同步加载。
  如果用@ import 引用 CSS，则需要等到网页完全载入后，再加载 CSS 文件，即异步加载。
- （3）兼容性。
  link 是 XHTML 的标签，没有兼容问题。
  @ import 是在 CSS2.1 中提出的，不支持低版本的浏览器。
- （4）改变样式
  link 的标签是 DOM 元素，支持使用 JavaScript 控制 DOM 和修改样式；@ import 是种方法，不支持控制 DOM 和修改样式。

##### 3、浮动元素引起的问题和解决方法是什么？

引起的问题有如下几个。

- （1）父元素的高度无法被撑开，影响与父元素同级的元素。
- （2）与元素同级的非浮动元素会紧随其后（类似遮盖现象）。
- （3）如果一个元素浮动，则该元素之前的元素也需要浮动；否则，会影响页面显示的结构（即通常所说的串行现象）。

解决方法如下：

- （1）为父元素设置固定高度。
- （2）为父元素设置 overflow:hidden 即可清除浮动，让父元素的高度被撑开。
- （3）用 clear:both 样式属性清除元素浮动。
  注意：如果只有左浮动或只有右浮动，可以单独设置 clear:left 或 clear:right，但是设置 clear:both 则都可以解决，所以此方法在工作中用得更多。
- （4）外墙法是指在父元素外面，添加“一道墙”，设置属性 clear:both
- （5）内墙法是指在父元素内部，浮动元素的最后面，添加“一道墙”，设置属性 clear:both
- （6）伪元素是指为了少创建元素，对父元素添加 afer 伪元素，设置属性 content：""；display ：block；clear:both。
  注意：这里所说的少创建元素，实际上并没有少创建，添加的伪元素也是元素，只不过没有写在 HTML 文档中而已。
- （7）使用通用类 clearfix, clearfix 的实现如下：
  ```css
  clearfix:after { content " "；
  display:block;
  clear:both;
  }
  ```
  注意：推荐以上这种方式，因为 clearfix 已经应用在各大 CSS 框架（如 Bootstrap 等）中，并成为行业的默认规范。

##### 4、position 的值分别是相对于哪个位置定位的？

relative 表示相对定位，相对于自己本身所在正常文档流中的位置进行定位。absolute 表示绝对定位，相对于最近一级（从直接父级元素往上数，直到根元素）定位，相对于 statIc 的父元素进行定位。
fixed 用于生成绝对定位，相对于浏览器窗口或 frame 进行定位。
statIc 是默认值，没有定位，元素出现在正常的文档流中。
sticky 是生成黏性定位的元素，容器的位置根据正常文档流计算得出。
注意：CSS3 的新增属性有点类似于 relative 与 fixed 的结合体。如果目标区域在屏幕中可见，表现为 relative；如果目标区域在屏幕中不可见，表现为 fixed。

##### 5、请说明 position:absolute 和 float 属性的异同？

共同点是对内联元素设置 float 和 absolute 属性，可以让元素脱离文档流，并且可以设置其宽高。
不同点是 float 仍可占据位置，不会覆盖在另一个 BFC 区域上，浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止， absolute 会覆盖文档流中的其他元素，即遮盖现象。

##### 6、CSS 选择器（符）有哪些？

（1）id 选择器（#myld）。
（2）类选择器（ .my ClassName）。
（3）标签选择器（div,p,h1）
（4）相邻选择器（h1+p）
（5）子选择器（ul>li）
（6）后代选择器（li a）
（7）通配符选择器（\*）
（8）属性选择器（ button[disabled="true"]）。
（9）伪类选择器（ a:hover、 li:nth- child）表示一种状态。
（10）伪元素选择器（li:before、“：after”、“：first- letter”、“：first-line”、“；selecton”）表示文档某个部分的表现。
注意：在 CSS3 规范中，为了区别伪元素和伪类，CSS3 建议伪类用单冒号“："，伪元素用双冒号"：："。

##### 7、CSS 的哪些样式可以继承？哪些不可以继承？

可继承的样式有 font- size font-family color, UL LI DL DD DT。
不可继承的样式有 border、 padding, margin, width、 height。
注意：为了方便辨识，与字体相关的样式通常可以继承，与尺寸相关的样式通常不能继承。

##### 8、CSS 优先级如何排序？

优先级如下:
！important>style（内联）>ld（权重 100）> class（权重 10）>标签（权重 1）。同类别的样式中，后面的会覆盖前面的。

##### 9、HTML 是什么？CSS 是什么？JavaScript 是什么？

（1）HTML（ Hyper Text Markup Language，超文本标记语言）是做网站时使用的些文本标记标签，比如 div、span 等
（2）CSS（ Cascading Style Sheet，层叠样式表）是做网站时为美化网站而为标签添加的样式，比如 background（背景）、 color（字体颜色） height（高度）、widh（宽度）等。
（3） JavaScript 是网站中实现前后台交互效果、网页动画效果的一种开发语言，比如鼠标单击（ click）事件、前后台数据请求（Ajax）等。

##### 10、为什么要初始化 CSS？

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没有初始化 CSS，往往会导致页面在不同浏览器之间出现差异。
当然，初始化样式有时会对 SEO 产生一定的影响，但鱼和熊掌不可兼得，所以在力求影响最小的情况下初始化 CSS。
最简单的初始化方法就是：\{ padding：0；margin：0；}

##### 11、如何居中 div？如何居中一个浮动元素？

确定容器的宽高，例如宽 400px、高 200px 的 div.设置层的外边距。
div
{
float:left；
width：400px；
height：200px；
margin：-100px 0 0-200px；
/_注意，由于左上外边距优先级高于右下外边距优先级，因此，还可以简化设置 margin：-150px-250px；_/
position:relative；left：50%；top：50%；
/_为方便看效果，添加一种背景色_/
background-color:pink
}

##### 12、构成 CSS 的基本语句是什么？

构成 CSS 的基本语句如下。
选择器{
属性名称 1：属性值 1；
属性名称 2：属性值 2；
}
例如
div{
margin-top：20px；
border：2px solid #red；
}

##### 13、display 有哪些值？说明它们的作用

display 的值有 block、none, inline、 inline- block、list-item、 table 和 inherit。其作用如下。
block 是指块类型。默认宽度为父元素宽度，可设置宽高，换行显示。 none 是指元素不会显示，已脱离文档流。
inline 是指行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline- block 是指默认宽度为内容宽度，可以设置宽高，同行显示。
list-item 是指像块类型元素一样显示，并添加样式列表标记。
注意：例如，用 div 模拟 li 元素\<ul>\<div style=" display:list-item：">有课前端网\</d>\</ul>。
table 是指此元素会作为块级表格显示。
inherit 是指从父元素继承 display 属性的值。

##### 14、简要描述块级元素和行内元素的区别

块级元素的前后都会自动换行。默认情况下，块级元素会独占一行。例如\<p>\<h1-h6>\<div>都是块级元素，当显示这些元素中间的文本时，都将从新行中开始显示，其后的内容也将在新行中显示。
行内元素可以和其他行内元素位于同一行，在浏览器中显示时不会换行。例如\<a>\<span>等，对于行内元素，不能设置其高度和宽度。
还有一种元素是行内块级元素，比如\<img>\<input>元素等。这些元素可以和其他行内元素位于同一行，同时可以设置其高度和宽度。

##### 15、如何用 DIV+CSS 实现 3 栏布局（左右固定 200pX，中间自适应）？

具体代码如下：

```html
html
<div class="container">
<div class="main">
<h2>有课前端网</h2>
</div>
<div class="left">左边内容</div>
< div class="right" >右边内容</div>
</dv>
```

CSS

```css
.container div {height：200px；}
.container{ padding：0 200px；}
.main,.left,.right{position:relative；float:left；}
.left.right{width：200px；}
.main{ width：100%；background:yellow；}
.left {background:blue：margin-left：-100%；left：-200px；}
.right {background:green；margin-left：-200px；left：200px；}
```

##### 16、解释浮动及其工作原理

浮动的元素可以向左或向右移动，直到它的外边缘碰到包含元素（父元素）或另一个浮动元素的边框为止。要想使元素浮动，必须为元素设置一个宽度（ width）。虽然浮动元素已不在文档流中，但是它浮动后所处的位置依然在浮动之前的水平方向上。
因为浮动元素不在文档流中，所以文档流中的块元素表现得就像浮动元素不存在一样，下面的元素会填补原来的位置。
有些元素会在浮动元素的下方，但是这些元素的内容并不一定会被浮动的元素遮盖。当定位内联元素时，要考虑浮动元素的边界，围绕浮动元素放置内联元素。也可以把浮动元素想象成被块元素忽略的元素，而内联元素会关注的元素。

##### 17、解释一下 CSS Sprite，以及如何在页面或网站中使用它？

CSS Sprite 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的“ background- image"“ background- repeat”“ background- position”的组合进行背景定位， background- position 可以用数字精确地定位出背景图片的位置。
注意：在高级浏览器中，可以基于图片的 bose64 编码存储，将图片与其他类型的文件打包。

##### 18、在书写高效 CSS 时有哪些问题需要考虑？

（1）样式，从右向左解析一个选择器
（2）类型选择器的速度，ID 选择器最快， Universal（通配符\*）最慢。对于常用的 4 种类型选择器，解析速度由快到慢依次是 ID、 class, tag 和 universal。
（3）不要用标签限制 ID 选择器（如：ul#main- navigation{}，ID 已经是唯一的，不需要 Tag 来限制，这样做会让选择器变慢）。
（4）后代选择器最糟糕（换句话说， html body ul li a{}这个选择器是很低效的）。
（5）想清楚你的需求，再去书写选择器。
（6）CSS3 选择器（如 nth- child）能够漂亮地定位我们想要的元素，又能保证 CSS 整洁易读。然而，这些神奇的选择器会浪费很多的浏览器资源。
（7）我们知道 ID 选择器的速度最快，但是如果都用 ID 选择器，会降低代码的可读性和可维护性等。在大型项目中，相对于使用 ID 选择器提升速度，代码的可读性和可维护性带来的收益更大。

##### 19、说出几种解决 IE6 Bug 的方法？

解决方案如下：
（1）双边距问题，是使用 fLoat 引起的。
解决方法是使用 display:inline。
（2）3 像素问题，是使用 float 引起的。
解决方法是使用 margin- right：-3px。
（3）超链接 hover 伪类样式，单击后失效。
解决方法是使用以下正确的书写顺序：L→V→H→A（link, visited, hover.， active）。
（4）z- index 问题。
解决方法是给父级添加 position：relative
（5）PNG 图片半透明问题。
解决方法是使用 JavaScript 代码库，或使用 IE 滤镜
注意：在使用 E 滤镜解决 PNG 图片透明度的时候，在 1E6 中，会对事件产生影响。

##### 20、页面重构怎样操作？

编写 CSS，让页面结构更合理化，提升用户体验，达到良好的页面效果并提升性能

##### 21、display:none 和 visibility:hidden 的区别是什么？

display:none 隐藏对应的元素，在文档流中不再给它分配空间，它各边的元素会合拢，即脱离文档流。
visibility:hidden 隐藏对应的元素，但是在文档流中仍保留原来的空间。

##### 22、内联元素可以实现浮动吗？

在 CSS 中，任何元素都可以浮动。不论浮动元素本身是何种元素，都会生成个块级框。因此，对于内联元素，如果设置为浮动，会产生和块级框相同的效果。

##### 23、简要描述 CSS 中 content 属性的作用。

content 属性与：before 及：after 伪元素配合使用，用来插入生成的内容，可以在元素之前或之后放置生成的内容。可以插入文本、图像、引号，并可以结合计数器，为页面元素插入编号。比如，查看如下代码。

```css
body{
counter-reset:chapter；
}
 h1:before{
 content："第" counter（ chapter）"章"
}
h1{
counter-increment:chapter：
}
<h1></h1>
<h1></h1>
<h1></h1>
```

使用 content 属性，并结合 :before 选择器和计数器 counter，可以在每个\<h1>元素前插入新的内容。

##### 24、如何定义高度很小的容器？

因为有一个默认的行高，所以在 IE6 下无法定义小高度的容器。

两种解决方案分别是 overflow:hidden 或 font-size：容器高度 px

##### 25、如何在图片下方设置几像素的空白间隙？

定义 img 为 display:block，或定义父容器为 font-size：0。

##### 26、如何解决 IE6 双倍 margin 的 Bug？

使用 display:inline

##### 27、如何让超出宽度的文字显示为省略号？

输入 overflow:hidden；width:xxx；white-space:nowrap；

text-overflow:ellipsis。

##### 28、如何使英文单词发生词内断行？

输入 word-wrap:break-word。

##### 29、如何实现 IE6 下的 position:fxed？

具体代码如下：

```css
html_{overflow:hidden；}
 body_{overflow:auto；height：100%：}
.fixed{position:fixed；
_position:absolute；
left:0；
top:0；
padding：10px；
background：#000；
}
```

##### 30、如何让 min- height 兼容 IE6？

具体代码如下。

```css
.min-height{
min-height：100px；
_height：100px；
background：red；
}
```

##### 31、已知高度的容器如何在页面中水平垂直居中？

具体代码如下。

```css
<style type=text/css">
# box
{
width：200px；
height：200px；
background:red；
position:absolute；
left：50%；
top:50%;
margin：-100px 0 0-100px；
/*或者 marion：-100px*/
}
</style>
<div id="box“></div>
```

##### 32、px 和 em 的区别是什么？

px 和 em 都是长度单位，两者的区别是：px 的值是固定的，指定为多少就是多少，计算比较容易；em 的值不是国定的，是相对于容器字体的大小，并且 em 会继承父级元素的字体大小。

浏览器的默认字体高都是 16px，所以未经调整的浏览器都符合 lem=16px，那么 12px=0.75em，10px=0.625em。

与 cm 对应的另一个长度单位是 rem，是指相对于根元素（通常是 HTML 元素）字体的大小。

##### 33、什么叫优雅降级和渐进增强？两者有什么区别？

优雅降级 graceful degradation 是指一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

渐进增强 progressive enhancement 是指针对低版本浏览器构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进并追加功能，以达到更好的用户体验。

两者的区别如下。

（1）优雅降级从复杂的现状开始，并试图减少用户体验的供给。

（2）渐进增强则从一个非常基础并且能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

（3）降级（功能衰减）意味着往回看，而渐进增强则意味着朝前看，同时保诬其根基处于安全地带。

##### 34、网页制作会用到哪些图片格式？

用于网页制作的主流图像格式有 JPG、PNG、GIF 等。

JPG：压缩率高，文件小，最常用。

PNG：支持无损压缩，色彩损失小，保真度高，文件稍大。

GIF：支持动画显示，但只支持 256 色显示，目前已经被 Fash 大量取代。

##### 35、CSS 的 content 属性有什么作用？有什么应用？

CSS 的 content 属性专门应用在 before/after 伪元素上，用于插入生成的内容最常见的应用是利用伪类清除浮动。

##### 36、对行内元素设置 margin-top 和 margin- bottom 是否起作用？

不起作用（需要注意行内元素的替换元素 img、 Input，它们是行内元素，但是可以设置它们的宽度和高度，并且 margin 属性也对它们起作用， margin-op 和 margin- botton 有着类似于 inline- block 的行为）

##### 37、div+css 的布局较 table 布局有什么优点？

（1）改版的时候更方便，只须改动 CSS 文件。

（2）页面加载速度更快、结构清晰、页面简洁。

（3）表现与结构分离。

（4）搜索引擎优化（SEO）更友好，排名更靠前。

##### 38、如果设置\<p>的 font-sze 为 10rem，那么当用户重置或拖曳浏览器窗口时，它的文本会不会受到影响？

不会

##### 39、谈谈你对 BFC 规范的理解

BFC（ Block Formatting Context）指块级格式化上下文，即一个创建了新的 BFC 的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个 BFC 中，两个毗邻的块级盒在垂直方向（和布局方向有关系）的 margin 会发生折叠。

BFC 决定元素如何对其内容进行布局，也决定与其他元素的关系和相互作用。

##### 40、谈谈你对 C 规范的理解

IFC（ Inline Formatting Context）指内联格式化上下文，IFC 的线框（ line box）高度由其包含行内元素中最高的实际高度计算而来（不受竖直方向的 padding/margin 的影响）。IFC 中的线框一般左右都贴紧整个 IFC，但是会被 foat 元素扰乱。同一个 IFC 下的多个线框高度不同。

IFC 中是不可能有块级元素的，当插入块级元素时（如在 p 中插入 div），会产生两个匿名块，两者与 div 分隔开，即产生两个 IFC，每个 IFC 对外表现为块级元素，与 div 垂直排列。

##### 41、谈谈你对 GFC 规范的理解

GFC（ GridLayout Formatting Context）指网格布局格式化上下文，即当把一个的 display 值设为 grid 的时候，此元素将会获得一个独立的渲染区域。可以通过在网格容器（ grid container）上定义网格定义行（ grid definition row）和网格定义列（grid definition column），在网格项目（ grid item）上定义网格行（ grid row）和网格列（grid column）来为每一个网格项目定义位置和空间。

##### 42、谈谈你对 FFC 规范的理解

FFC（ Flex Formatting Context）指自适应格式化上下文，即 display 值为 fex 或 lne-flex 的元素将会生成自适应容器。伸缩容器中的每一个子元素都是一个伸缩单元。伸缩单元可以是任意数量的。伸缩单元内和伸缩容器外的一切元素都不受影响。简单地说， Flexbox 定义了伸缩容器内伸缩单元的布局。

##### 43、访问超链接后 hover 样式就不出现的原因是什么？应该如何解决？

因为访问过的超链接样式覆盖了原有的 hover 和 active 伪类选择器样式，解决方法是将 CSS 属性的排列顺序改为 L→V→H→A（link, visited, hover, active）。

##### 44、什么是外边距重叠？重叠的结果是什么？

外边距重叠就是 margin- collapse 在 CSS 中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式称为折叠，因此而结合成的外边距称为折叠外边距。

折叠结果遵循下列计算规则。

（1）当两个相邻的外边距都是正数时，折叠的结果是它们两者中较大的值

（2）当两个相邻的外边距都是负数时，折叠的结果是两者中绝对值较大的值。

（3）当两个外边距一正一负时，折叠的结果是两者相加的和。

##### 45、rgba0 和 opacity 的透明效果有什么不同？

rgba()和 opacity 都能实现透明效果，但它们最大的不同是 opacity 作用于元素，并且可以设置元素内所有内容的透明度；而 rgba()只作用于元素的颜色或其背景色（设置 rgba 透明的元素的子元素不会继承透明效果）。

##### 46、CSS 中可以让文字在垂直和水平方向上重叠的两个属性是什么？

垂直方向的属性是 line-height.水平方向的属性是 letter-spacing。

##### 47、你知道哪些关于 letter-spacing 的妙用？

可以用于消除 inline-block 元素间的换行符空格间隙

##### 48、有什么方式可以对一个 DOM 设置它的 CSS？

有以下三种方式：

- 外链式，即通过 link 标签引入一个外部 CSS 文件中。
- 内嵌式，即将 CSS 代码写在 style 标签内。
- 行内式，即将 CSS 代码写在元素的 style 属性中。

##### 49、在 CSS 中可以通过哪些属性定义，使得一个 DOM 元素不显示在浏览器可视范围内？

最基本的方式如下：

设置 display 属性为 none，或者设置 visibility 属性为 hidden 技巧性的方式如下。
设置宽高为 0，透明度为 0，设置 z- index 位置为-1000。

##### 50、常用的块属性标签及其特征有哪些？

常用块标签有 div、hl、h6、ol、ul、li、d、 table、p、br、form。块标签的特征有独占一行，换行显示，可以设置宽、高，块可以套块和行。

##### 51、常用的行内属性标签及其特征有哪些？

行标签有 span、a、img、var、em, strong、 textarea、 select、 option、 input.行标签的特征有在行内显示，内容撑开宽、高，不可以设置宽、高（img, input、 textarea 等除外），行只能套用行标签。

##### 52、浏览器标准模式和怪异模式之间的区别是什么？

它们的区别是盒子模型的渲染模式不同。

可以使用 window. top document compatMode 判断当前模式为何种模式结果为 Back Compat，表示怪异模式结果为 CSSICompat，表示标准模式。

##### 53、如何避免文档流中的空白符合并现象？

空白符合并是标准文档流的特征之一，可以通过设置 white-spac 修改这一特征，属性值如下：

- pre 表示不会合并空白符，渲染换行符，不会自动换行，相当于 pre 元素。
- pre-wrap 表示不会合并空白符，渲染换行符，自动换行 pre-line 表示合并空白符，渲染换行符，自动换行。
- nowrap 表示合并空白符，不会渲染换行符，不会自动换行。
- normal 表示默认值，按照文档流特点渲染，合并空白符，不会渲染换行符，自动换行。

##### 54、常见的兼容性问题有哪些？

PNG24 位的图片在 IE6 浏览器上出现背景，解决方案是改成 PNG8，也可以引段脚本进行处理浏览器默认的 margin 和 padding 不同。解决方案是用一个全局的\*{ margin：0 padding：0；}来统一它们。

IE6 双边距 Bug 是指在块属性标签 float 后又有横行的 margin 时，在 IE6 中显示的 margin 比设置的大浮动 IE 产生的双倍距离（IE6 的双边距问题是指在 IE6 下，如果对元素设置了浮动，同时又设置了 margin-left 或 margin- right, margin 的值会加倍）

```css
#box {
  float: left；width：10px；margin：00 100px；;
}
```

这种情况下 IE 会产生 20px 的距离，解决方案是在 float 的标签样式控制中加入 display:inline，将其转换为行内属性（这个符号只会被 IE6 识别）。

用渐进识别的方式，从总体中逐渐排除局部。

首先，巧妙地使用“\9”这一标记，将 IE 浏览器从所有情况中分离出来。然后，再次使用“+”将 IE8 和 I7、IE6 分离开，这样 IE8 就能被独立识别。

CSS

```css
.bb{
background-color:#f1ee18；/所有识别*/
background- color：#00deff\9；/IE6、7、8识别”/
+ background- color：#a200ff；/*E6、7识别*/
background- color：#1e0bdl；/"IE6识别”/
}
```

怪异模式问题是指漏写 DTD 声明， Firefox 仍然会按照标准模式来解析网页，但在 IE 中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写 DTD 声明的好习惯。现在可以使用[hml5]

推荐的写法是'< doctype html>'上下 margin 重合的问题 IE 和 FF 中都存在，相邻两个 div 的 margIn-et 和 margin- right 不会重合，但是 margin-top 和 margin- bottom 会重合。

解决方法是养成良好的代码编写习惯，同时采用 margin-top 或者同时采用 margin- bottom。

##### 55、透明度具有继承性，如何取消透明度的继承？

使用 rgba 给元素的背景设置透明度的方式，来替代使用 opacity 设置元素透明度的方式，解决子元素继承父元素透明度的问题。

##### 56、CSS 中，自适应的单位都有哪些？

自适应的单位有以下几个

- 百分比：%
- 相对于视口宽度的单位：ww
- 相对于视口高度的单位：vh
- 相对于视口宽度或者高度（取决于哪个小）的单位：Vm
- 相对于父元素字体大小的单位：em
- 相对于根元素字体大小的单位：rem

##### 57、说说 rem 和 em 的区别

它们都是相对单位

- rem 表示相对于根元素的字体大小。
- em 表示相对于父元素的字体大小

##### 58、什么是 FOUC？如何避免 FOUC？

FOUC 即无样式内容闪烁（ Flash Of Unstyled Content），是在 IE 下通过 @import 方式导入 CSS 文件引起的，如：

```html
<style type=" text/css" media="all"@ Dimporturl('demo.css）；</style>
```

IE 会首先加载整个 HTML 文档的 DOM，然后再导入外部的 CSS 文件。因此，在页面 DOM 加载完成到 CSS 导入完成中间，有一段时间页面上的内容是没有样式的，这段时间的长短跟网速和电脑速度都有关系。

解决方法是在\<head>之间加入一个\<link>或\<script>标签

##### 59、说说 display:none 和 visibility:hidden 的区别

display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当它从来都不存在。

visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

### ES6 相关

#### 一、ES6 代码片段

1. 如何隐藏所有指定的元素？

```js
const hide = (...el) => [...el].forEach((e) => (e.style, (display = "none")));
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
elementContains(document.querSelector("body"), document.querySelector("body")); // false
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

15.

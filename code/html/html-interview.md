### 5大类常见的HTTP面试题

![HTTP面试题](https://upload-images.jianshu.io/upload_images/9278575-ed885c4554f3ccf1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 一、HTTP 基本概念

```text
HTTP 是什么？
```

HTTP 是超文本传输协议（HyperText Transfer Protocol）。

```text
能否详细地解释【超文本传输协议】？
```

HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

```text
HTTP 常见的状态码有哪些？
```

![五大类 HTTP 状态码](https://upload-images.jianshu.io/upload_images/9278575-54216c05de054267.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

*1xx*
该类状态码属于提示信息，是协议处理中的一种中间状态，实际用到的比较少。

*2xx*
该类状态码表示服务器成功地处理了客户端的请求。

【200 OK】是最常见的成功状态码，表示一切正常。如果是非 HEAD 请求，服务器返回的响应头都会有 body 数据。

【204 No Content】也是常见的成功状态码，与 200 OK 基本相同，但响应头没有 body 数据。

【206 Partial Content】是应用于 HTTP 分块下载或断电续传，表示响应返回的 body 数据并不是资源的全部，而是其中的一部分，也是服务器处理成功的状态。

*3xx*
该类状态码表示客户端请求的资源发生了变动，需要客户端使用新的 URL 重新发送请求获取资源（重定向）。

【301 Moved Permanently】表示永久重定向，说明请求的资源已经不存在了，需改用新的 URL 再次访问。

【302 Found】表示临时重定向，说明请求的资源还在，但暂时需要用另外一个 URL 来访问。

301 和 302 都会在响应头里使用字段 Location，指名后续要跳转的 URL，浏览器会自动重定向新的 URL。

【304 Not Modified】不具有跳转的含义，表示资源为修改，重定向已存在的缓冲文件，也称之为缓存重定向，用于缓存控制。

*4xx*
该类状态码表示客户端发送的报文有误，服务器无法处理，也就是错误码的含义。

【400 Bad Request】表示客户端请求的报文有错误，但只是个笼统的错误。

【403 Forbidden】表示服务器禁止访问资源，并不是客户端的请求出错。

【404 Not Found】表示请求的资源在服务器上不存在或未找到，所以无法提供给客户端。

*5xx*
该类状态码表示客户端请求报文正确，但是服务器处理时内部发生了错误，属于服务器端的错误码。

【500 Internal Server Error】与 400 类似，只是个笼统的通用错误码，服务器发生了什么错误，并不知道。

【501 Not Implemented】表示客户端请求的功能暂时还不支持。

【502 Bad Gateway】通常是服务器作为网关或代理时返回的错误码，表示服务器自身正常工作，但访问后端服务器时发生了错误。

【503 Service Unavailable】表示服务器当前处于繁忙状态，暂时无法响应服务器。

```text
HTTP 常见字段有哪些？
```

*Host*
客户端发送请求时，host 用来指定服务器的域名。有了 host 字段，就可将请求发送到同一台服务器上的不同网站。

```http
Host: www.example.com
```

*Content-Length 字段*
该字段用于在服务器返回数据时，表明本次回应的数据的长度。

```http
Content-Length: 1000
```

*Connection 字段*
该字段最常用于客户端要求服务器使用 TCP 持久连接，以便于其他请求复用。

```http
Connection: keep-alive
```

*Content-Type 字段*
该字段用于服务器响应时，告之客户端，本次数据的格式。

```http
Content-Type: text/html; charset=utf-8
```

客户端请求的时候，可以使用 Accept 字段声明自己可以接受哪些数据格式

```http
Accept: */*
```

*Content-Encoding 字段*
该字段说明数据的压缩方法。表明服务器返回的数据使用了什么压缩格式。

```http
Content-Encoding: gzip
```

客户端在请求时，可以用 Accept-Encoding 字段说明自己可以接受的压缩格式。

```http
Accept-Encoding: gzip, deflate
```

#### GET 与 POST

```text
说一下 GET 和 POST 的区别？
```

GET方法的含义是请求从服务器获取资源，这个资源可以是静态的文本、页面、图片视频等。

而 POST 方法则是相反的操作，它向 URL 指定的资源提交数据，数据就放在报文的 body 里面。

```text
GET 和 POST 方法都是安全和幂等的嘛？
```

安全和幂等的概念：
在 HTTP 协议中，所谓的安全是指请求方法不会破坏服务器上的资源；而所谓的幂等是指多次执行相同操作后，结果都是相同的。

GET 方法是只读操作，故是安全且幂等的。
POST 方法存在提交数据的操作，会修改服务器上的资源，所以并非安全的，而且多次提交数据会创建多个资源，所以也并非幂等的。

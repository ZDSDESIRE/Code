### JavaScript 知识点

#### 字符串

**一、8 个简单的 js 字符串方法**

1. Length
   length 属性返回字符串中包含空格字符串在内的字符总数。

   ```js
   const str = "Hello World";
   str.length;
   // returns "11"
   ```

2. Slice()
   slice() 方法提取字符串的一部分，并将提取的部分返回到新字符串中（索引从零开始）。

   ```js
   const str = "Hello World";
   str.slice(2, 5);
   // returns "llo"
   ```

3. Replace()
   replace() 方法将指定的值替换为字符串中的另一个值。

   ```js
   const str = "YouAreAwesome";
   str.replace("Awesome", "Beautiful");
   // returns "YouAreBeautiful"
   ```

4. ToUpperCase() 和 ToLowerCase()
   toUpperCase() 和 toLowerCase() 是用于将字符串转换为大写或小写的方法。

   ```js
   const name = "Shelby";
   name.toUpperCase();
   // returns "SHELBY"
   name.toLowerCase();
   // returns "shelby"
   ```

5. Concat()
   concat() 方法用于连接两个或多个字符串。

   ```js
   const str = "Tim";
   str.concat("IsAwesome");
   // returns "TimIsAwesome"
   ```

6. Trim()
   trim() 方法用于删除字符串两侧的空白。

   ```js
   const str = "    JavaScriptIsHard    ";
   str.trim();
   // returns "JavaScriptIsHard"
   ```

7. Charat()
   charat() 方法返回字符串中指定索引处的字符。

   ```js
   const best = "JavaScript";
   best.charAt(6);
   // returns "r"
   ```

8. Split()
   split() 方法将字符串转换为数组（方法内须传递一个字符，如不传递则按每个字符分割）。

   ```js
   const msg = "Eight,Methods,Are,Done";
   msg.split(",");
   // returns the array ["Eight", "Methods", "Are", "Done"]
   ```

**二、8 个简单的 js 数学方法**

1. ToString()
   tostring() 方法是将数字作为字符串返回（若提供参数 2、8、16，则返回二进制、八进制和十六进制的值）。

   ```js
   const num = 123;
   num.toString（）;
   // returns "123"
   （100 + 44）.toString（）;
   // returns "144"
   ```

2. ToExponential()
   toExponential() 方法返回一个字符串，其字符串使用指数表示法四舍五入并写入。该参数是可选的。整数形式，取值范围是 0 到 20，表示小数点后的位数。如果未提供任何内容，则将其设置为表示该值所需的任意位数。

   ```js
   const num = 3.414;
   num.toExponential（2）;
   // returns "3.414e + 0"
   ```

3. ToFixed()
   toFixed() 方法返回一个字符串，其中包含写入的数字和指定的小数位数。这里参数也是可选的。它代表小数点后的位数。默认情况下，它设置为 0。

   ```js
   const num = 3.414;
   num.toFixed（0）;
   // returns "3"
   num.toFixed（2）;
   // returns "3.41"
   ```

4. ToPrecision()
   toPrecision() 方法返回一个字符串，该字符串具有指定长度的数字。

   ```js
   const num = 3.414;
   num.toPrecision（2）;
   // returns "3.4"
   ```

5. ValueOf()
   valueOf() 方法返回数字作为数字。

   ```js
   const num = 123;
   num.valueOf（）;
   // returns "123"
   ```

6. Number()
   Number() 方法可用于将 JavaScript 变量转换为数字。

   ```js
   Number(true); // returns "1"
   Number(false); // returns "0"
   Number("10"); // returns "10"
   Number("10.43"); // returns "10.43"
   Number("2,54"); // returns "NaN"
   ```

7. ParseInt()
   parseInt() 方法解析一个字符串并返回一个整数。允许有空格。仅返回第一个数字。

   ```js
   parseInt("10"); // returns "10"
   parseInt("10.43"); // returns "10"
   parseInt("10 20 30"); // returns "10"
   parseInt("1000 cupcakes"); // returns "1000 & not delicious cupcakes"
   parseInt("dogs 1000"); // returns "NaN"
   ```

8. ParseFloat()
   parseFloat() 方法解析一个字符串并返回一个数字。允许有空格。仅返回第一个数字。

   ```js
   parseFloat("10"); // returns "10"
   parseFloat("10.43"); // returns "10.43"
   parseFloat("10 20 30"); // returns "10"
   parseFloat("1000 dogs"); // returns "1000"
   parseFloat("dogs 1000"); // returns "NaN"
   ```

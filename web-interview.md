### 常见的 Web 面试题

1. 请你分析一下，promise，generator，async 三者之间的关系？
   下面有个计时器任务，请用这三种方法依次解决它代码中出现回调地狱的问题。

   ```js
   let t = setTimeout(() => {
     console.log(1111);
     let t1 = setTimeout(() => {
       console.log(2222);
       let t2 = setTimeout(() => {
         console.log(3333);
       }, 3000);
     }, 2000);
   }, 1000);
   ```

   **promise**
   promise 是一个类函数。当它执行完毕后，会开启异步任务，这个异步任务还得看 promise 本身的状态。通俗来说，它的异步任务就是 then 中的回调函数。
   promise 诞生的目的不是为了开启异步任务，而是为了解决异步代码中的书写格式，尽量实现函数回调的扁平化，所以我们需要把异步代码写在 promise 中进行封装。

   ```js
   const fnasync = function (value) {
     return new Promise(function (resolve, reject) {
       setTimeout(() => {
         console.loge(value);
         resole();
       });
     });
   };
   fnasync(1111, 1000)
     .then(() => {
       return fnasync(2222, 2000);
     })
     .then(() => {
       return fnasync(3333, 3000);
     })
     .catch((err) => {
       console.log(err);
     });
   ```

   **async**
   async 可以算是异步解决的终结者。虽然 promise 效果出来了，但还是会给开发者们带来逻辑上的问题。相反，async 的书写格式简单明了。

   ```js
   let asyncfn = function (num, timecount) {
     return new Promise((resolve, reject) => {
       setTimeout(function () {
         console.log(num);
         resolve();
       }, timecount);
     });
   };
   let fn = async function () {
     await asyncfn(1111, 1000);
     await asyncfn(2222, 2000);
     await asyncfn(3333, 3000);
   };
   fn();
   ```

   **它们之间的联系**
   对于三者之间的联系，其实可以理解为它们是每个版本升级的产物。
   也就是说，generator 其实是 promise 的升级版，但它的逻辑和理解却要比 promise 复杂。而 async 是 generator 的升级版，外界都称它为 generator 的语法糖，意味着 async 就是一个小甜点，人人喜欢，因为它简单易懂还好用，顺理成章地成为了开发者们解决异步方案的不二之选！

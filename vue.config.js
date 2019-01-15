module.exports = {
  // 基本目录
  // vue-cli版本 3.3以上，替代原来的 baseUrl。
  publicPath: '/',

  // 当运行 vue-cli-service build时生成的生产环境构建文件的目录。
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts)的输出目录 (相对于 outputDir的)。
  assetsDir: '',

  // 指定生成的 index.html的输出路径 (相对于 outputDir)。也可以是绝对路径。
  indexPath: 'index.html',

  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash以便更好的控制缓存。
  filenameHashing: true,

  // 每个 page对应一个 JavaScript入口文件。
  pages: undefined,

  // 是否在开发环境下通过 eslint-loader在每次保存时 lint代码。
  lintOnSave: true,

  // 是否使用包含运行时编译器的 Vue构建版本。
  runtimeCompiler: false,

  // 默认情况下 babel-loader会忽略所有 node_modules中的文件。
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false以加速生产环境构建。
  productionSourceMap: true,

  // 设置生成的 HTML中 <link rel="stylesheet"> 和 <script>标签的 crossorigin属性。
  crossorigin: undefined,

  // 在生成的 HTML中的 <link rel="stylesheet">和 <script>标签上启用 Subresource Integrity (SRI)。
  integrity: false,

  // css选项。
  // 具体可参见 https://cli.vuejs.org/zh/guide/css.html。
  css: {
    // 默认情况下，只有 *.module.[ext]结尾的文件才会被视作 CSS Modules模块。
    // 设置为 true后你就可以去掉文件名中的 .module并将所有的 *.(css|scss|sass|less|styl(us)?)文件视为 CSS Modules模块。
    modules: false,

    // 是否将组件中的 CSS提取至一个独立的 CSS文件中 (而不是动态注入到 JavaScript中的 inline代码)。
    // 生产环境下是 true，开发环境下是 false。
    extract: false,

    // 是否为 CSS开启 source map。
    // 设置为 true之后可能会影响构建的性能。
    sourceMap: false,

    //向 CSS相关的 loader传递选项。
    loaderOptions: {},
  },

  // decServer选项。
  // devServer支持所有的 webpack-dev-server选项。
  // 具体可参见 https://webpack.docschina.org/configuration/dev-server/。
  devServer: {
    host: '0.0.0.0',
    port: 8024,
    hotOnly: true,
    https: true,

    // 打开默认浏览器。
    open: true,

    // 用于代理后端API服务器。
    proxy: null,

    // 用于配置自定义处理程序。
    before: app => {}
  },

  // 是否为 Babel或 TypeScript使用 thread-loader。
  // 默认系统 CPU内核多于一个时自动启用。
  parallel: require('os').cpus().length > 1,

   // 向pwa插件传递选项。
   // 可参见pwa插件: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa。
   pwa: {},

   // 传递任何第三方插件选项
   pluginOptions: {}
}

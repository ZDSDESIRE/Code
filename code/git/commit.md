## Git commit 提交规范

#### type：description

例如：

```text
<新功能|bug修复|文档改动|格式化|重构|测试代码>: (影响范围) <主题> # 解释为什么要做这些改动？issue #?
```

#### 一、type 类型

type 包含以下几种：

* add：新功能
* fix：bug修复
* update：更新
* del：移除文件
* docs：文档改变
* style：代码格式改变
* perf：性能优化
* test：添加测试代码
* revert：撤销上一次的commit
* refactor：某个已有功能重构
* build：构建工具或构建过程的变动，如：webpack升级、gulp替换为webpack等

##### 参考格式

```text
<type>：
```

#### 二、description 描述

##### 影响范围（可选）

用于说明此次提交影响到的范围，如数据层、控制层、视图层等。

##### 主题

用于本次提交的主题简短说明，可含主要模块的相关说明。

##### issue（可选）

所关联的issue。

## Git 命令参考

#### 1、git 重置用户名和密码

重置用户名和密码：

```git
$ git config --system --unset credential.helper
```

#### 2、git 仓库管理（本地和远程）

##### 初始化本地 git 存储库

```git
$ git init
```

##### 创建远程存储库的本地副本

```git
$ git clone ssh://git@github.com/[username]/[repository-name].git
```

##### git 查看本地仓库缓存区状态（即工作区）

```git
$ git status
```

```git
$ git status -s
$ git status --show-stash
```

```git
$ git checkout
```

```git
# 切换到对应记录，基于分支进行提交、标签
$ git checkout dev
$ git checkout origin/test
$ git checkout --track origin/feature-test
$ git checkout -b testbranch
$ git checkout -- file
$ git checkout .
$ git checkout -
```

##### git 查看版本演变历史

```git
$ git log
```

```git
# 输出概要日志
$ git log --online
# 上述命令等同于以下命令
$ git log --pretty=online --abbrev--commit

# 指定输出最近几个的提交日记
$ git log --online -5

# 提供类似 GUI 工具的 log 展示
$ git log --graph --date=relative --pretty=tformat: '%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%an %ad)%Creset'
```

##### git 查看远程仓库连接情况

```git
$ git remote -v
```

##### git 修改远程仓库地址

- 直接修改：

```git
$ git remote set-url origin <url>
```

- 先删后加：

```git
$ git remote rm origin
$ git remote add origin [url]
```

#### 3、git 分支管理（查看、删除、合并等）

##### git 查看所有的分支（本地和远程）

```git
$ git branch -a
```

##### git 查看本地分支

```git
$ git branch
```

##### git 查看远程分支

```git
$ git branch -r
```

##### git 查看已删除分支

```git
$ git remote show origin
```

##### git 新建分支

```git
$ git branch <branch name>
```

##### git 切换分支

```git
$ git checkout <branch name>
```

创建一个新分支并切换到该分支

```git
$ git checkout -b [branch name]
```

克隆一个远程分支并切换到该分支

```git
$ git checkout -b [branch name] origin/[branch name]
```

##### git 删除本地分支

```git
$ git branch -d <branch name>
```

##### git 删除远程分支

```git
$ git push origin -d <branch name>
# 或者
$ git push origin --delete <branch name>
```

或

```git
# 先删除本地远程分支，后推送至服务器
$ git branch -d -r <branch name>
$ git push origin:<branch name>
```

##### git 更新本地分支（远程已删除）

```git
$ git remote prune origin
```

##### git 合并分支

将一个分支合并到活动分支

```git
$ git merge <branch name>
```

```git
$ git merge --no-ff <branch name>
```

将一个分支合并到目标分支

```git
$ git merge [source branch] [target branch]
```

##### git 重命名本地分支

```git
$ git branch -m <old branch name> <new branch name>
```

#### 4、git 拉取（git fetch & pull）

##### git fetch

```git
# 拉取远程主机所有的更新到本地远程仓库
$ git fetch <远程主机名>
```

```git
# 取回特定分支的更新
$ git fetch <远程主机名> <分支名> // 注意之间有空格

如：
# 取回 origin 主机的 master 分支
$ git fetch origin master
```

取回的更新要在本地主机上以“远程主机名/分支名”的形式读取，如 origin/master。
取回更新后，会返回一个 FETCH_HEAD（指某个 branch 在远程主机上的最新状态），可以在本地查看拉取后的最新信息：

```git
$ git log -p FETCH_HEAD
```

后续可检查拉取的代码是否有冲突，详细步骤如下：

```git
# 在本地新建一个 temp 分支，并将远程 origin 仓库的 master 分支代码下载到本地 temp 分支；
$ git fetch origin master:temp

# 比较本地代码与刚刚从远程下载下来的代码的区别；
$ git diff temp

# 合并 temp 分支到本地的 master 分支;
$ git merge temp

# 如果不想保留 temp 分支，删除;
$ git branch -d temp
```

##### git pull

```git
# 从远程主机上拉取最新内容，并直接合并，可以理解为：git pull = git fetch + git merge，但这样容易产生冲突，需要手动解决。
$ git pull <远程主机名> <远程分支名>:<本地分支名>
```

如果需要有选择的合并 git fetch 是更好的选择。效果相同时 git pull 将更为快捷。

#### 5、git 文件管理

##### 添加文件至暂存区

将文件添加至暂存区

```git
$ git add [file-name.txt]
```

将所有新文件和更改过的文件添加到暂存区

```git
$ git add -A
```

##### 将更改存储在不合适的工作目录中

```git
$ git stash
```

##### 移除文件（或文件夹）

```git
$ git rm -r [file-name.txt]
```

#### 6、git 提交

```git
# git commit -m "[commit message]"
```

```git
$ git commit --amend --no-edit
$ git commit --no-verify -m "xxx"
$ git commit -t templateFile
$ git commit -F
```

##### 注：[Git commit 相关规范](commit.md)

#### 7、git 代码回滚

```git
$ git reset
```

```git
$ git reset --hard commit_sha1
$ git reset --soft commit_sha1
$ git reset --soft HEAD~1
$ git reset --mixed commit_sha1
$ git reset --merge commit_sha1
$ git reset --keep commit_sha1
```

##### 用于 master 的代码回滚

```git
$ git revert
```

```git
# 多人协作时，可平稳地回滚代码，并保留提交记录，尽量避免冲突。
$ git revert commit_sha1
```

#### 8、git 变基

```git
$ git rebase
```

```git
$ git rebase -i git-sha1|branch(HEAD)
$ git rebase --continue
$ git rebase --skip
$ git rebase --abort // 放弃当前
```

#### 9、git 本地仓库 push 到 github / gitlab 远程仓库

#### 补充部分

git 的一些选项说明：

```git
-d
--delete：删除

-D
--delete --force的快捷键

-f
--force：强制

-m
--move：移动或重命名

-M
--move --force的快捷键

-r
--remote：远程

-a
--all：所有
```

## Git 命令参考

#### 1、git 重置用户名和密码

重置用户名和密码：

```git
$ git config --system --unset credential.helper
```

#### 2、git 仓库管理（本地和远程）

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

##### git 查看远程仓库

```git
$ git remote -v
```

##### git 修改远程仓库地址

直接修改：

```git
$ git remote set-url origin <url>
```

先删后加：

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
$ git branch 分支名
```

##### git 切换分支

```git
$ git checkout 分支名
```

##### git 删除本地分支

```git
$ git branch -d 分支名
```

##### git 删除远程分支

```git
$ git push origin -d 分支名
# 或者
$ git push origin --delete 分支名
```

##### git 更新本地分支（远程已删除）

```git
$ git remote prune origin
```

##### git 合并分支

```git
$ git checkout master // 切换回主分支
$ git merge 分支名
```

#### 4、git 提交

```git
# git commit
```

```git
$ git commit --amend --no-edit
$ git commit --no-verify -m "xxx"
$ git commit -t templateFile
$ git commit -F
```

#### 注：[Git commit 相关规范](commit.md)

#### 5、git 代码回滚

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

#### 6、git 变基

```git
$ git rebase
```

```git
$ git rebase -i git-sha1|branch(HEAD)
$ git rebase --continue
$ git rebase --skip
$ git rebase --abort
```

#### 7、git 合并

```git
$ git merge
```

```git
$ git merge --no-ff branchName
```

#### 8、git 本地仓库 push 到 github / gitlab 远程仓库


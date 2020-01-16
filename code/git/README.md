## Git 命令参考

#### 1、git 重置用户名和密码

重置用户名和密码：

```git
$ git config --system --unset credential.helper
```
#### 2、git 仓库管理（本地和远程）

##### git 查看本地仓库缓存区状态

```git
$ git status
```

##### git 查看版本演变历史

```git
$ git log
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

##### 4、git 本地仓库 push 到 github / gitlab 远程仓库
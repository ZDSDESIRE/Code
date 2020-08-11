### Github 的问题汇总

#### 1、Github 上不去，提示加载失败 / Github 加载缓慢

**原因**
本机网络设置的 DNS 服务器将 Github 的相关域名解析到了已遭受污染的 IP 地址。

**解决方案**
可直接修改本地的 hosts 文件, 在 hosts 文件末尾加入下列 IP，保存即可生效：
注：本地 hosts 文件的路径或修改方式可参考文末的备注内容

```text
# GitHub Start
192.30.253.112 github.com
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
199.232.5.194 github.global.ssl.fastly.net
```

#### 2、Github 图片加载不出来

**原因**
依旧可能是本地网络 DNS 污染的原因，或 DNS 缓存未更新，导致本地解析错误。

**解决方案**
同样可直接修改本地的 hosts 文件，在 hosts 文件末尾加入下列 IP，保存即可：
注：本地 hosts 文件的路径或修改方式可参考文末的备注内容

```text
192.30.253.112 Build software better, together
192.30.253.119 gist.github.com
151.101.184.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.184.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.184.133 camo.githubusercontent.com
151.101.184.133 avatars0.githubusercontent.com
151.101.184.133 avatars1.githubusercontent.com
151.101.184.133 avatars2.githubusercontent.com
151.101.184.133 avatars3.githubusercontent.com
151.101.184.133 avatars4.githubusercontent.com
151.101.184.133 avatars5.githubusercontent.com
151.101.184.133 avatars6.githubusercontent.com
151.101.184.133 avatars7.githubusercontent.com
151.101.184.133 Build software better, together
```

**备注**

- Windows 下 hosts 文件的路径为：

  ```text
  C\Windows\System32\drivers\etc\hosts
  ```

- Linux 下 hosts 文件的路径：

  ```text
  /etc/hosts
  ```

- Mac 下

  - 打开终端（Terminal）输入：

    ```text
    sudo vim /etc/hosts
    ```

  - 按照提示输入系统密码打开 hosts 文件，输入 i 进入编辑模式，拷贝上述 IP 至 hosts 文件末尾，按下 esc 键退出编辑模式；
  - 按下组合键（shift + :）后输入 wq 并按下回车键（enter）即可保存修改并退出。
  - 输入以下命令查看 hosts 文件是否修改并保存成功。

    ```text
    cat /etc/hosts
    ```

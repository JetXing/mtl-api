# 参与贡献

## 问题反馈

如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/tinper-bee/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。

有紧急问题可以直接邮件给我（Email：guoyff@yonyou.com）


## 开发及构建

开发者可以一起参与为 [tinper-bee](https://github.com/tinper-bee) 贡献代码，同时也可以基于 tinper-bee 进行二次开发或封装插件。 开发者可以使用 [bee-tools](https://github.com/tinper-bee/bee-tools)进行组件的开发和维护


## 如何编写标准的 tinper-bee 组件


### 环境依赖

- 需要安装node 4.0版本及以上, npm版本最好3.0以上
- [sass环境依赖](https://github.com/tinper-bee/react-components-docs/blob/master/sass%E7%8E%AF%E5%A2%83%E4%BE%9D%E8%B5%96%E8%A7%A3%E5%86%B3.md)

### 一、下载tinper-bee开发工具

#### 1、全局安装开发工具

如果是用友内部员工，请使用用友内部npm镜像和下载工具ynpm-tool。

```
npm install -g ynpm-tool
ynpm install
```

也可以使用npm。

```
npm install -g bee-tools
```
使用版本号，来验证是否下载成功。
```
bee-tools --version
```
因为npm下载较慢，所以请使用cnpm或者切换为淘宝源来下载

- 使用cnpm

```
npm install -g cnpm
cnpm install -g bee-tools
```
- 切换淘宝源

```
npm --registry https://registry.npm.taobao.org install -g bee-tools
```



#### 2、生成组件脚手架

下面以创建button组件为例

- 快速创建：

```
bee-tools create bee-button
```

- 增加创建参数：

```
bee-tools create bee-button --author yonyou --port 8000 --tbVersion 0.1.0 --repoUrl https://github.com/tinper-bee/bee-button
```

API介绍

| 参数        | 说明         | 默认值  |
|:------------ |:-------------:| -----:|
| port      | 开发时服务监听端口 | 8000 |
| author      | 作者名字      |   空字符串 |
| tbVersion | 版本号     |    0.0.1 |
| pkgName | 包名      |    bee-组件名 |
| repoUrl | 仓库地址      |    https://github.com/tinper-bee/ + 包名|

默认发布的包名为bee-组件名



#### 3、开发指南

##### 目录结构

```
-demo
 -demolist
    -Demo1.js
 -ButtonDemo.scss
 -index-demo-base.js
 -atom-one-dark.css
 -index.js
-src
 -Button.js
 -Button.scss
 -index.js
-test
 -Button.test.js
-.gitignore
-.npmignore
-HISTORY.md
-index.html
-package.json
-README.md
```
##### 目录说明

- 在 src 目录中写源程序代码。
- 在 demo 目录下写使用用例。
demo示例中的引用写在index-demo-base.j文件中。
demo示例卸载demolist文件夹内，每一个示例创建一个Demo[数字].js文件。
- 在 test 目录下写 测试用例。
- build目录产出打包组件。
- 代码规范参考 [代码规范](https://github.com/tinper-bee/react-components-docs/blob/master/react%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83.md)。
- 根目录 中的 html 不可修改，通过 js 中的 jsx 渲染页面，通过 require css 引入 css。
- 开发中用到其他公共库，通过 `npm install --save` 以及 `npm install --save-dev` 来安装

##### 代码书写规范

[react编码规范](https://github.com/tinper-bee/react-components-docs/blob/master/react%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83.md)
[react组件测试流程和规范](https://github.com/tinper-bee/react-components-docs/blob/master/react%E7%BB%84%E4%BB%B6%E6%B5%8B%E8%AF%95%E6%B5%81%E7%A8%8B%E5%92%8C%E8%A7%84%E8%8C%83.md)

##### 开发调试

- 在项目根目录执行 `npm install` 安装必要模块
- 在项目根目录执行 `npm run dev` 查看demo，进行调试
- 在项目根目录执行 `npm run build` 产出build目录代码
- 在项目根目录执行 `npm run lint` 执行lint检查
- 在项目根目录执行 `npm run test` 执行测试用例
- 在项目根目录执行 `npm run coveralls` 执行测试覆盖率
- 在项目根目录执行 `npm run chrome` 在chrome执行测试用例
- 在项目根目录执行 `npm run browsers` 在本机多浏览器执行测试用例
- 在项目根目录执行 `npm run pub` 进行组件发布,master分支为正式发布版，release分支为开发分支

##### 推送远程仓库

组件开发完成，就要推送到github远程仓库了。

- 首先在[http://github.com/tinper-bee](http://github.com/tinper-bee)创建一个远程仓库，仓库名称就是你的组件名。这一步最好不要在远程仓库创建任何文件。
- 接着，关联本地仓库和远程仓库

如果你已经在本地初始化过仓库，并提交过。

```
//在你的组件的根目录
git remote add origin http://github.com/tinper-bee/[你的组件库名称].git
git push -u origin master

```

如果没有初始化过仓库

```
//在你的组件的根目录
git init
git add .
git commit -m "一些描述信息"
git remote add origin http://github.com/tinper-bee/[你的组件库名称].git
git push -u origin master
```

##### 浏览器支持版本

- ie9, ie9+, chrome, firefox 最新版




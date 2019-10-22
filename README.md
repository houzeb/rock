# rock

## 项目目录

```
|-- node_modules               		node安装的依赖	
|-- src               				资源文件夹
|	|-- api							接口统一配置
|	|	|-- module					各功能细分
|	|	|-- base.js					基础配置，封装axios	
|	|	|-- index.js				处理response
|	|	|-- rpath.js				接口地址
|	|-- assets						css，图片等资源都在这
|	|-- components                  组件相关
|	|-- mock                        接口mock
|	|-- router                      路由布局(配置路由跳转)
|	|-- store                       全局状态机
|	|-- utils                  		工具方法
|	|-- views                  		路由页面
|	|-- main.js                  	页面程序入口文件，加载各种公共组件
|-- vue.config.js               	相关配置
|-- package.json              		依赖相关
|-- README.md              	    	项目介绍
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn deploy`

run the command to deploy your files to your server


## 开发配置

### 配置文件
根目录configs是全局配置文件所在目录，例如配置本地代理或者mock服务器代理时，可以配置proxy.js

```
configs        // 配置文件目录
├── deploy.js // 部署服务器配置
├── index.js
└── proxy.js // 代理服务器配置

```
如果需要增加新的全局配置文件，可以仿照proxy.js建一个新文件，在index.js中统一导出，
* proxy.js配置代理服务器规则
  ```
  '/mock': { // 前缀
    target: 'http://rap2.taobao.org:38080/app/mock/248309', // 代理服务器地址（IP或者域名）
    changeOrigin: true,
    pathRewrite: { // 路径rewrite
      '/mock': '/'
    }
  }
  ```
  * deploy.js用来配置部署服务器的配置
  ```
  {
    host: '',                                  // 地址
    port: ,                                           // 端口
    username: '',                                    // 用户名
    password: '',                        // 密码
    buildPathServer: '' // 部署路径
  }
 
 ### webpack 配置
项目构建用了customize-cra，所以全局有个复写webpack配置的文件config-overrides.js，任何改动都需在这个文件中进行修改，[参考教程](https://github.com/arackaf/customize-cra/blob/master/api.md)

### 文件目录
```
src
├── api // 请求方法封装
│   └── resources
├── components //组件
│   └── LazySuspenseComponent
├── router // 路由
├── services // 服务
│   └── ajax
├── store // 数据仓库（react-redux）
│   ├── actions
│   └── reducers
├── utils // 工具
└── views // 业务页面
    ├── CheckResult
    ├── ContentCheck
    └── LoginPage

```

整个项目是基于react + react-router + react-redux 的react全家桶搭建
文件目录如上：
 1. components文件夹用来放置一些公共组件
   
 2. router是全局路由配置文件

 3. store 数据仓库，redux
   
 4. utils 全局工具文件
   
 5. views业务页面
   
 6. api是资源层，用来放置我们所有的接口配置，在我们配置接口方法时我们只需要关心resources文件夹中的配置，利用map数据结构去描述，在内部不用关心输出请求函数，因为已经做了方法的统一封装，例如在test.js中的例子中我们可以
 ```
 export const getTestDetail = {
  url: '/mock/list',
  method: 'get'
}
 ```
 通过上面的写法，我们就能生成一个请求函数，当然url和method是必填参数，如果有一些默认参数也可以在此对象中扩充，整个资源我们可以在index.js中统一导出，在resource文件夹中可以根据自己的业务模块区分api资源，在resource下面建立的js文件都会自动导入输出，并不需要在index.js再做任何操作
 在业务组件中我们可以统一这样引入
 ```
 import resources from '@/api';
 const { getTestDetail } = resources; // 或者直接使用resources.getTestDetail

 ```
 这样我们就完成了请求数据的调用

  7. services文件夹是服务的抽象文件夹，当然请求方法的封装也可以理解为一个服务，所以ajax的方法封装放在了services里面，当然以后涉及到全局的服务，例如权限服务等都建议放在services文件夹，建议保持按功能服务对项目进行分层

### some other things
在项目目录下我们有.env.development 和 .env.production文件，这是环境的配置文件，例如打包我们默认是打包到dist文件夹下，如果我们想要改变dist的名称我们可以在.env.production中更改BUILD_PATH的值，例如打包到pages, 我们就可以做如下更改

```
BUILD_PATH = 'pages'
```
 


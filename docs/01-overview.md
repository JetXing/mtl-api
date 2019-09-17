<a name="EsvaX" class="anchor"></a>
## 一、简介
MTL是一套多端开发解决方案。现如今市面上端的形态多种多样，Android、iOS、Web、钉钉小程序、微信小程序等各种端大行其道，当业务要求需要在不同的端都展现时，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 MTL，我们可以只书写一套代码，再通过 MTL-CLI 的编译工具，将源代码分别编译出可以在不同端（微信/钉钉小程序、H5、Android、iOS 等）运行的代码。



<a name="yhKAg" class="anchor"></a>
## 二、快速开始
<a name="2g38C" class="anchor"></a>
### 1. 引入方式

- 通过import在项目入口文件处引入 
```
import '文件路径/mtl.(min.)js'
```
- 通过script标签引入静态资源 
```
<script src="文件路径/mtl.(min.)js"></script>
```

<a name="cVORn" class="anchor"></a>
### 2. 开发环境配置
开发环境下，由于前端跨域问题，需要配置相应的代理

```
{
   enable: true,
   headers: {
     'Referer': 'http://172.23.79.2:8080'
   },
   //要代理访问的对方路由
   router: [
     '/oauth',登陆一级路径
     '/api' ,登陆一级路径
   ],
   url: 'http://10.11.115.50'
}
```

<a name="7Y41d" class="anchor"></a>
### 3. 调用方式
mtl.js文件会向全局注入 mtl 对象，所有mtl的api都注册在mtl对象下下面，ucg相关接口注册在 mtl.ncc对象下。<br />
调用ucg接口实现了自动登陆，所以需要在页面url的search部分传入参数<br />
例如:<br />
?appcode=ncc_test&code=123456<br />
其中:appcode 轻应用code;code 友空间code

- mtl.ncc.callAction 调用实例
```
let busiParam = {"pagecode":"400400800_list","appcode":"400400800"};
    busiParam = JSON.stringify(busiParam)
    mtl.ncc.callAction({
      params: {
        busiParamJson: busiParam,
      },
      url: '/api/ncc/tp/qmp',
      success: (data) => {
        console.log('success', data);
        alert(JSON.stringify(data))
      },
      fail: (err) => {
        console.log('fail', err)
      }
    })
```

| 参数 | 参数值 | 描述 |
| --- | --- | --- |
| appcode | String | 默认从url的search中取值，如果传入此参数，则使用入参值 |
| params | Object | 后台请求的body部分参数 |
| headerParams | Object | 后台请求的header部分参数 |
| query | Object | 后台请求的query部分参数 |
| url | String | 请求后台路径 |
| method | String | 请求方式，默认值为POST |
| timeout | Number | 请求超时时间，默认值为10000 |


- mtl.ncc.writeUCGConfig 调用实例

```javascript
mtl.ncc.writeUCGConfig({
	appcode: "123",
  config: {
  	"host" : "10.2.112.58",
    "port" : "8080",  
    "ishttps" : true,  //是否使用https
    "default_tp":"dynamic"  //默认的传输协议
  },
  success: function(res) {},
  fail: function(res) {}
})
```

- mtl.ncc.readUCGConfig 调用实例

```javascript
mtl.ncc.readUCGConfig({
	appcode: "123",
  success: function(res) {},
  fail: function(res) {}
})
```

<a name="Ti9jD" class="anchor"></a>
### 4.使用浏览器进行调试

由于浏览器无法实现例如相机、扫描二维码这类调用原生能力的接口，为方便调试，mtl 支持通过文件配置接口返回模拟数据。

若要使用该功能，请执行如下步骤：

1. 下载支持调试功能的 mtl.js([下载](http://mobile.yyuap.com/mtl/download/mtljs/mtl.debug.zip)) 覆盖工程中原有的 mtl.js。
2. 在 mtl.js 同级目录下新建一个 **mtl.debug.js** 文件(若已存在则不需要重新创建)，修改 **mtl.debug.js** 配置自己想要的模拟数据。

**mtl.debug.js** 内容如下：
```javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mtl.debug"], {

  "./src/platforms/h5/debug.js": (function (module, exports, __webpack_require__) {

    const SUCCESS = 200;
    const FAIL = 0;

    /* BEGIN */
    const methods = [
      {
        api: 'getNetworkType',
        result() {
          return {
            code: SUCCESS,
            message: '成功',
            data: {
              networkType: 'wifi'
            }
          }
        }
      },
      {
        api: 'getLocation',
        result() {
          const condition = false;
          if (condition) {
            return {
              code: SUCCESS,
              data: {
                latitude: 45,
                longitude: 45
              }
            }
          }
          // 支持自定义的 code
          return {
            code: FAIL,
            message: '获取定位失败'
          };
        }
      }
    ]
    /* END */

    !(module.exports = methods);
  })

}]);
```

<a name="ng01J" class="anchor"></a>
## 三、API接口统一说明
<a name="4Xx60"></a>
### 异步 API
大多数 API 都是异步 API。这类 API 接口通常都接受一个 `Object` 类型的参数，这个参数都支持按需指定以下字段来接收接口调用结果。

<a name="Zhm1y" class="anchor"></a>
### Object 参数说明
| **参数** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| success | function | 否 | 接口调用成功的回调函数 |
| fail | function | 否 | 接口调用失败的回调函数 |
| complete | function | 否 | 接口调用结束的回调函数（成功、失败都会执行） |
| 其他 | Any | - | 接口定义的其他参数 |

<a name="aul4a" class="anchor"></a>
### 回调函数的参数
`complete` 函数调用时会传入一个 `Object` 类型参数，包含下列参数：<br />`success` 函数直接传入 data 内容。<br />`fail` 函数仅传入 code 和 message。

| **属性** | **类型** | **说明** |
| :--- | --- | --- |
| code | number/string | 错误码，具体含义请参考对应 API 文档，成功时为 `200`，UCG 接口错误码格式为'GXXX' |
| message | string | 错误信息，如果调用成功返回 `${apiName}:ok` |
| data | Any | 接口成功时返回的数据 |

<a name="9zQ2S" class="anchor"></a>
### 代码示例
```javascript
mtl.apiFunc({
	A: '',
  B: {},
  success(res) {
    var foo = res.foo;
  },
  fail(err) {
    var code = err.code;
    var msg = err.message;
  },
  complete (res) {
  	if (res.code == 200) {
    	// 成功
      var data = res.data;
    }
    else {
    	// 失败
	    var msg = err.message;
    }
  }
})
```




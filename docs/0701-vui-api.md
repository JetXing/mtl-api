# VUI-小友智能

<a name="dowload" class="anchor"></a>
### demo下载
1. android [链接](http://mobile.yyuap.com/mtl/download/faceRecognition/Android.zip)
1. iOS [链接](http://mobile.yyuap.com/mtl/download/xiaoyou/iOS.zip)

<a name="initSpeech" class="anchor"></a>
### initSpeech
初始化

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| latitude | double | 否 | 纬度 |
| longitude | double | 否 | 经度 |
| tenantId | string | 是 | AI租户ID |
| appCode | string | 是 | AI  应用ID |
| userId | string | 是 | 用户ID |
| sessionId | string | 否 | 会话ID |
| aiUrl | string | 是 | ai接口url(域名) |
| aiToken | string | 是 | ai token |
| deviceId | string | 否 | 设备标识 |


**示例**
```javascript
mtl.initSpeech({
  latitude:"",//纬度(可选)
  longitude:"",//经度（可选）
  tenantId:"",//AI租户id
  appCode:"",//AI APPCODE
  userId:"",//用户ID
  sessionId:"",
  aiUrl:"",//ai接口url
  aiToken:"",//ai token
  deviceId:""//设备标识  (可选)
  success: function (res) {
  },
  fail: function (err) {
    var errMsg = err.errMsg;  // 错误信息
  }
});
```

<a name="openSpeechPage" class="anchor"></a>
### openSpeechPage
打开小友页面

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| nickname | string | 否 | 昵称 |
| avatar | string | 否 | 头像 |
| needhelp | bool | 否 | 是否需要帮助页 |


**示例**
```javascript
mtl.openSpeechPage({
	nickname:"",//昵称
	avatar:"",//头像
	needhelp:false,//是否需要帮助页
  success: function (res) {
  },
  fail: function (err) {
    var errMsg = err.errMsg;  // 错误信息
  }
});
```

<a name="startSpeechSyn" class="anchor"></a>
### startSpeechSyn
语音合成

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| text | string | 是 | 合成内容 |


**示例**
```javascript
mtl.startSpeechSyn({
  text:"哈哈哈啊哈",//合成内容
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="startBatchSpeechSyn" class="anchor"></a>
### startBatchSpeechSyn（安卓使用）
语音批量合成(Android项目字符串大于1034字节需要调用该接口合成语音)

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| text | string | 是 | 合成内容 |


**示例**
```javascript
mtl.startSpeechSyn({
  text:"哈哈哈啊哈",//合成内容
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="stopSpeechSyn" class="anchor"></a>
### stopSpeechSyn
停止语音合成

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**
-无-

**示例**
```javascript
mtl.stopSpeechSyn({
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="startSpeechRecog" class="anchor"></a>
### startSpeechRecog
语音识别

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| analyse | bool | 否 | 是否需要AI分析并返回结果 |


**返回数据**

| **字段** | 类型 | **说明** | **阶段说明** |
| :--- | :--- | :--- | :--- |
| action | string | 语音识别阶段： |  |
|  |  | readySpeech | 可以开始录音 |
|  |  | asrEnd | 录音结束，正在识别 |
|  |  | recognizeResult | 识别成功结果 |
|  |  | volume | 音量 |
| volume | float | 音量 |  |
| recognizeResult | string | 识别结果 |  |
| recognizeAIResult | object | AI返回数据 |  |


**示例**
```javascript
mtl.startSpeechRecog({
  analyse:false,//是否需要AI分析并返回结果
  success: function (res) {
    var action = res.action;
    action参数值:
    {
        readySpeech ： 可以开始录音
        asrEnd ： 录音结束，正在识别
        recognizeResult: 识别成功结果
        volume: 音量
    }
    var volume = res.volume； // 音量
    var recognizeResult = res.recognizeResult;//识别结果
    var recognizeAIResult = res.recognizeAIResult; //AI返回数据
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="stopSpeechRecog" class="anchor"></a>
### stopSpeechRecog
停止语音识别

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**
-无-

**示例**
```javascript
mtl.stopSpeechRecog({
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="releaseSpeech" class="anchor"></a>
### releaseSpeech
释放语音资源

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**
-无-

**示例**
```javascript
mtl.releaseSpeech({
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```

<a name="cancelAITask" class="anchor"></a>
### cancelAITask
取消AI流程

**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
| ✘ | ✘ | ✘ | ✔︎ | ✘ |


**参数**
-无-

**示例**
```javascript
mtl.cancelAITask({
  success: function (res) {
  },
  fail: function (err) {
  	var errMsg = err.errMsg;	// 错误信息
  }
});
```



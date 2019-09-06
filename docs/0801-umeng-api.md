# 友盟分享

**暂时只支持 微信、朋友圈、钉钉**


**支持平台**

| **微信** | **钉钉** | **友空间** | **原生** | **HTML5** |
| :--- | :--- | :--- | :--- | :--- |
|  ✘ |  ✘ | ✘ | ✔︎ | ✘ |



<a name="initShare" class="anchor"></a>
### init
初始化

**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| ios、android | object | 是 | 不同平台配置 |


**平台参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| UMAppID | string | 是 | 友盟APPID |
| channel | string | 否 | 友盟渠道标示，ios使用 默认‘App Store’ |
| list | array | 是 | 分享平台列表 |


**list列表参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| platform | int | 是 | 分享的平台 ID，见 [平台 ID 对照表](#附录) |
| config | object | 是 | 对应平台所需的配置 |


**config参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| appKey | string | 是 | 应用 ID (特定平台对应的值可能是 appID) |
| appSecret | string | 是 | 应用密钥 (特定平台对应的值可能是 appKey) |


**示例**
```javascript
mtl.UMShareAgent.init({
  ios: {
    UMAppId: 'xx',
    channel: 'xx',  // 可选，友盟渠道标识，默认为 'App Store'
    list: [
      {
        platform: 0,
        config: {
          appKey: 'xxx',    // 应用 ID (特定平台对应的值可能是 appID)
          appSecret: 'xxx', // 应用密钥 (特定平台对应的值可能是 appKey)
        }
      }
    ],
  },
  android: {
    UMAppId: 'xx',
    list: [
      {
        platform: 0,
        config: {
          appKey: 'xxx',
          appSecret: 'xxx',
        }
      }
    ],
  },
  complete: function (res) {
    if (res.code == 200) {
      // 成功
      var result = res.data
    }
  }
})
```

<a name="doShare" class="anchor"></a>
### doShare
分享

**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| platform | int | 是 | 分享的平台 ID，见 [平台 ID 对照表](#附录) |
| text | string | 是 | 文本内容 |
| img | data、string | 是 | 缩略图、分享图片 |
| url | string | 是 | 分享链接 |
| title | string | 是 | 文本标题 |


**示例**
```javascript
mtl.UMShareAgent.doShare({
  platform: 0,
  text: '分享内容',
  img: '图片地址',
  url: '链接',
  title: '标题',
  complete: function (res) {
    if (res.code == 200) {
      // 成功
      var result = res.data
    }
  }
})
```

<a name="openShare" class="anchor"></a>
### openShare
分享面板

**参数**

| **字段** | **类型** | **必填** | **说明** |
| :--- | :--- | :--- | :--- |
| list | array | 是 | 分享的平台数组，数组元素为平台 ID，见 [平台 ID 对照表](#附录) |
| text | string | 是 | 文本内容 |
| img | data、string | 是 | 缩略图、分享图片 |
| url | string | 是 | 分享链接 |
| title | string | 是 | 文本标题 |


**示例**
```javascript
mtl.UMShareAgent.openShare({
  list: [0, 1, 2],
  title: '标题',
  text: '分享内容',
  img: '图片地址',
  url: '链接',
  complete: function (res) {
    if (res.code == 200) {
      // 成功
      var result = res.data
    }
  }
})
```

<a name="appendix" class="anchor"></a>
### 附录
#### 平台 ID 对照表
| **id** | **平台** |
| --- | --- |
| 0 | QQ |
| 1 | SINA |
| 2 | 微信 |
| 3 | 朋友圈 |
| 4 | QQ空间 |
| 5 | 电子邮件 |
| 6 | 短信 |
| 7 | facebook |
| 8 | twitter |
| 9 | 微信收藏 |
| 10 | google+ |
| 11 | 人人 |
| 12 | 腾讯微博 |
| 13 | 豆瓣 |
| 14 | facebook messager |
| 15 | 易信 |
| 16 | 易信朋友圈 |
| 17 | INSTAGRAM |
| 18 | PINTEREST |
| 19 | 印象笔记 |
| 20 | POCKET |
| 21 | LINKEDIN |
| 22 | FOURSQUARE |
| 23 | 有道云笔记 |
| 24 | WHATSAPP |
| 25 | LINE |
| 26 | FLICKR |
| 27 | TUMBLR |
| 28 | 支付宝 |
| 29 | KAKAO |
| 30 | DROPBOX |
| 31 | VKONTAKTE |
| 32 | 钉钉 |
| 33 | 系统菜单 |


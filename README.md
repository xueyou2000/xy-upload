| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-upload.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-upload.svg?style=flat-square)

[![xy-upload](https://nodei.co/npm/xy-upload.png)](https://npmjs.org/package/xy-upload)

# xy-upload

上传组件

## 安装

```bash
# yarn
yarn add xy-upload
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Upload } from "xy-upload";
ReactDOM.render(
    <Upload action="/upload.do">
        <button>上传</button>
    </Upload>,
    container,
);
```

## API

| 属性            | 说明                                                    | 类型                                                               | 默认值  |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| disabled        | 是否禁用                                                | boolean                                                            | `false` |
| accept          | 上传文件类型                                            | string                                                             | -       |
| multiple        | 是否多选                                                | boolean                                                            | `false` |
| beforeUpload    | 上传前检查, 返回 false 或者 Promise.reject() 则拒绝上传 | BeforeUploadFunc, BeforeUploadPromise                              | -       |
| directory       | 是否支持上传目录内所有文件(不支持 IE)                   | boolean                                                            | `false` |
| customRequest   | 自定义上传                                              | (options: UploadOptions) => UploadReturn                           | -       |
| name            | 服务器接受文件名称                                      | string                                                             | `file`  |
| action          | 上传地址                                                | string, Function                                                   | -       |
| data            | 附加数据                                                | object, Function                                                   | -       |
| withCredentials | 是否启用 withCredentials                                | boolean                                                            | `false` |
| headers         | 附加请求头                                              | object                                                             | -       |
| onStart         | 开始上传                                                | (file: FileExtend) => void                                         | -       |
| onSuccess       | 成功事件                                                | (file: FileExtend, response: ResType, xhr: XMLHttpRequest) => void | -       |
| onError         | 失败事件                                                | (file: FileExtend, error: Error, response?: ResType) => void       | -       |
| onProgress      | 上传进度事件                                            | (file: FileExtend, percent: number, event: ProgressEvent) => void  | -       |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-upload is released under the MIT license.

import React from "react";
import Upload from "../src";
import { FileExtend } from "../src/interface";

export default function () {

    function beforeUpload(file: FileExtend) {
        console.log('即将上传文件', file);
    }

    function onStart(file: FileExtend) {
        console.log('开始上传', file);
    }

    function onSuccess(file: FileExtend) {
        console.log('上传成功', file);
    }

    function onError(file: FileExtend, error: Error) {
        console.log('上传失败', error);
    }

    function onProgress(file: FileExtend, percent: number) {
        console.log('上传进度', percent);
    }

    return (
        <div>
            <Upload action="/upload.do" data={{ a: 1, b: 2 }} headers={{ authorization: 'xxx' }} beforeUpload={beforeUpload} onStart={onStart} onSuccess={onSuccess} onError={onError} onProgress={onProgress}>
                <button>上传</button>
            </Upload>
        </div>
    );
}

// export default function () {
//     return (
//         <div>
//             <Upload directory={true} style={{ display: 'inline-block', width: 200, height: 200, background: '#eee' }}>
//                 <button>上传</button>
//             </Upload>
//         </div>
//     );
// }

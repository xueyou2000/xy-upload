import React from "react";
import { UploadButton } from "../src";
import { FileExtend } from "../src/interface";

export default function() {
    function beforeUpload(file: FileExtend) {
        console.log("即将上传文件", file);
        return Promise.resolve();
    }

    function onStart(file: FileExtend) {
        console.log("开始上传", file);
    }

    function onSuccess(file: FileExtend) {
        console.log("上传成功", file);
    }

    function onError(file: FileExtend, error: Error) {
        console.log("上传失败", error);
    }

    function onProgress(file: FileExtend, percent: number) {
        console.log("上传进度", percent);
    }

    return (
        <div>
            <UploadButton
                action="/boss/file/file/uploadFile"
                data={{ busiType: "COMPANY_ENTER_NET" }}
                // headers={{
                //     authorization:
                //         "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODcwMTAwMjU4NyIsIm93bmVyUm9sZSI6IkJPU1MiLCJ1c2Vybm8iOiJCT1NTLTEwMDAwMDAwMCIsImlmQmFzZSI6IlRSVUUiLCJpZCI6MSwiZXhwIjoxNTY3ODI4MDc0LCJpYXQiOjE1Njc3NDE2NzR9.orPs_RCziZVtjpufG3RUkboW51nf6MJuK6PqOam7sLvVig9JQGqOW19xWgNKDwnuvfQBPgWOrcCTn3VpJ9vPBw",
                // }}
                beforeUpload={beforeUpload}
                onStart={onStart}
                onSuccess={onSuccess}
                onError={onError}
                onProgress={onProgress}
            >
                <p>商户身份证正面</p>
            </UploadButton>
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

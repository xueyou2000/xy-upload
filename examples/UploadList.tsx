import React, { useState } from "react";
import { UploadFrame, UploadList, Upload } from "../src";
import { UploadResult, FileExtend } from "../src/interface";

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

    const result: UploadResult = { status: "success", percent: 30, thumbnail: "https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png" };

    return (
        <div>
            <UploadList action="/boss/file/file/uploadFile" data={{ busiType: "COMPANY_ENTER_NET" }} />
        </div>
    );
}

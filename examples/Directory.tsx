import React from "react";
import Upload from "../src";
import { FileExtend } from "../src/interface";

export default function () {

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
            <Upload action="/upload.do" data={{ a: 1, b: 2 }} headers={{ authorization: 'xxx' }} onStart={onStart} onSuccess={onSuccess} onError={onError} onProgress={onProgress} directory={true} style={{ display: 'inline-block', width: 200, height: 200, background: '#eee' }} accept="image/gif, image/jpeg, image/png">
                <button>拖拽目录上传所有</button>
            </Upload>
        </div>
    );
}

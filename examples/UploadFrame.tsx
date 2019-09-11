import React from "react";
import { UploadFrame } from "../src";
import { FileExtend, UploadResult } from "../src/interface";

export default function() {
    const result: UploadResult = { thumbnail: "https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png" };
    return (
        <div>
            <UploadFrame result={result} disabledUpload={true}></UploadFrame>
        </div>
    );
}

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { useControll } from "utils-hooks";
import { FileExtend, UploadButtonProps, UploadFrameProps, UploadResult } from "./interface";
import Upload from "./Upload";
import UploadFrame from "./UploadFrame";
import { isImageUrl } from "./utils";

const UploadButton = React.forwardRef((props: UploadButtonProps & UploadFrameProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls = "upload-button", className, style, title = "上传", custBtn, children, onChange, onStart, onSuccess, onError, onProgress, onRemove, onView, btnMode = false, ...rest } = props;

    let [result, setResult, isControll] = useControll<UploadResult>(props, "value", "defaultValue", { status: "ready" });
    if (!result) {
        result = { status: "ready" };
    }

    function change(state: UploadResult) {
        if (!isControll) {
            setResult(state);
        }
        if (onChange) {
            onChange(state);
        }
    }

    function onStartHandle(file: FileExtend) {
        if (!btnMode) {
            change({
                status: "uploading",
                file: file,
                thumbnail: URL.createObjectURL(file),
                percent: 0,
                isImg: isImageUrl(file.name),
            });
        }
        if (onStart) {
            onStart(file);
        }
    }

    function onSuccessHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        if (!btnMode) {
            change({ file, thumbnail: URL.createObjectURL(file), status: "success", percent: 100, response, isImg: isImageUrl(file.name) });
        }
        if (onSuccess) {
            onSuccess(file, response, xhr);
        }
    }

    function onErrorHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        if (!btnMode) {
            change({ file, thumbnail: URL.createObjectURL(file), status: "error", percent: 100, response, isImg: isImageUrl(file.name) });
        }
        if (onError) {
            onError(file, response, xhr);
        }
    }

    function onProgressHandle(file: FileExtend, percent: number, event: ProgressEvent) {
        if (!btnMode) {
            change({ file, thumbnail: URL.createObjectURL(file), status: "uploading", percent, isImg: isImageUrl(file.name) });
        }
        if (onProgress) {
            onProgress(file, percent, event);
        }
    }

    function onRemoveHandle(result: UploadResult) {
        if (!btnMode) {
            change({
                status: "ready",
            });
        }
        if (onRemove) {
            onRemove(result);
        }
    }

    return (
        <div className={classNames(prefixCls, className)} style={style} ref={ref}>
            {result.status === "ready" ? (
                <Upload className="upload-button-wrapper" {...rest} onStart={onStartHandle} onSuccess={onSuccessHandle} onError={onErrorHandle} onProgress={onProgressHandle}>
                    {custBtn || (
                        <div className={`${prefixCls}-inner`}>
                            <div>
                                <p className="upload-icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </p>
                                <p className="upload-title">{title}</p>
                            </div>
                        </div>
                    )}
                </Upload>
            ) : (
                <UploadFrame result={result} disabledUpload={props.disabled} icons={props.icons} onView={onView} onRemove={onRemoveHandle}></UploadFrame>
            )}
            <div>{children}</div>
        </div>
    );
});

export default React.memo(UploadButton);

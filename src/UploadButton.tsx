import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";
import { FileExtend, UploadButtonProps, UploadResult, UploadFrameProps } from "./interface";
import Upload from "./Upload";
import UploadFrame from "./UploadFrame";
import { isImageUrl } from "./utils";

function UploadButton(props: UploadButtonProps & UploadFrameProps) {
    const {
        prefixCls = "upload-button",
        className,
        style,
        title = "上传",
        children,
        beforeUpload,
        onStart,
        onSuccess,
        onError,
        onProgress,
        onRemove,
        onView,
        btnMode = false,
        ...rest
    } = props;
    const [result, setResult] = useState<UploadResult>({
        status: "ready",
    });

    function onStartHandle(file: FileExtend) {
        if (!btnMode) {
            setResult({
                status: "uploading",
                file: file,
                thumbnail: URL.createObjectURL(file),
                percent: 0,
            });
        }
        if (onStart) {
            onStart(file);
        }
    }

    function onSuccessHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        if (!btnMode) {
            setResult({ file, thumbnail: URL.createObjectURL(file), status: "success", percent: 100, response });
        }
        if (onSuccess) {
            onSuccess(file, response, xhr);
        }
    }

    function onErrorHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        if (!btnMode) {
            setResult({ file, thumbnail: URL.createObjectURL(file), status: "error", percent: 100, response });
        }
        if (onError) {
            onError(file, response, xhr);
        }
    }

    function onProgressHandle(file: FileExtend, percent: number, event: ProgressEvent) {
        if (!btnMode) {
            setResult({ file, thumbnail: URL.createObjectURL(file), status: "uploading", percent });
        }
        if (onProgress) {
            onProgress(file, percent, event);
        }
    }

    function onRemoveHandle(result: UploadResult) {
        if (!btnMode) {
            setResult({
                status: "ready",
            });
        }
        if (onRemove) {
            onRemove(result);
        }
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            {result.status === "ready" ? (
                <Upload
                    className="upload-button-wrapper"
                    {...rest}
                    onStart={onStartHandle}
                    onSuccess={onSuccessHandle}
                    onError={onErrorHandle}
                    onProgress={onProgressHandle}
                >
                    <div className={`${prefixCls}-inner`}>
                        <div>
                            <p className="upload-icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </p>
                            <p className="upload-title">{title}</p>
                        </div>
                    </div>
                </Upload>
            ) : (
                <UploadFrame
                    result={result}
                    isImg={result.file ? isImageUrl(result.file.name) : false}
                    icons={props.icons}
                    onView={onView}
                    onRemove={onRemoveHandle}
                ></UploadFrame>
            )}
            <div>{children}</div>
        </div>
    );
}

export default React.memo(UploadButton);

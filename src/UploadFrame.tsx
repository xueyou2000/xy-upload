import React, { useRef, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FileExtend, UploadStatus, UploadResult } from "./interface";

export type UploadActionClick = (result?: UploadResult) => void;

export interface UploadFrameProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 是否为图片
     */
    isImg?: boolean;
    /**
     * 上传结果
     */
    result?: UploadResult;
    /**
     * 自定义操作按钮
     */
    icons?: (result?: UploadResult, onView?: UploadActionClick, onRemove?: UploadActionClick) => React.ReactNode;
    /**
     * 内置查看按钮事件
     */
    onView?: UploadActionClick;
    /**
     * 内置删除按钮事件
     */
    onRemove?: UploadActionClick;
}

function UploadFrame(props: UploadFrameProps) {
    const { prefixCls = "upload-frame", className, style, isImg = false, result = {}, icons, onView, onRemove } = props;
    const { status = "success", percent = 0 } = result;

    function progress() {
        return (
            <div className="progress-position">
                <div className="progress-outer">
                    <div className="progress-inner">
                        <div className="progress-bg" style={{ width: `${percent}%` }} />
                    </div>
                </div>
            </div>
        );
    }

    function statusText() {
        switch (status) {
            case "error":
                return "上传失败";
            case "success":
                return "上传成功";
            case "uploading":
                return "上传中...";
            default:
                return "开始上传";
        }
    }

    return (
        <div className={classNames(prefixCls, className, `${prefixCls}-status-${status}`)} style={style}>
            <div className={`${prefixCls}_badge`}>{statusText()}</div>
            <div className={`${prefixCls}_wrapper`}>
                <div className={`${prefixCls}_info`}>
                    {isImg ? (
                        <img className={`${prefixCls}_thumbnail`} src={result.thumbnail} />
                    ) : (
                        <span className={`${prefixCls}_thumbnail file-thumbnail`}>
                            <FontAwesomeIcon icon={faFileUpload} />
                        </span>
                    )}
                </div>
                {status === "uploading" ? (
                    progress()
                ) : (
                    <div className={`${prefixCls}_actions`}>
                        {icons ? (
                            icons(result, onView, onRemove)
                        ) : (
                            <React.Fragment>
                                {status === "success" && (
                                    <span
                                        onClick={() => {
                                            if (onView) {
                                                onView(result);
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon title="预览文件" className={`${prefixCls}_action`} icon={faEye} />
                                    </span>
                                )}
                                <span
                                    onClick={() => {
                                        if (onRemove) {
                                            onRemove(result);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon title="删除文件" className={`${prefixCls}_action`} icon={faTrashAlt} />{" "}
                                </span>
                            </React.Fragment>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(UploadFrame);

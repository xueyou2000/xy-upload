import { faEye, faFileUpload, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { UploadFrameProps } from "./interface";
import { getLocal } from "./local";

function UploadFrame(props: UploadFrameProps) {
    const { prefixCls = "upload-frame", className, style, result = {}, icons, onView, onRemove, disabledUpload, list, index } = props;
    const { status = "success", percent = 0, desc, isImg = true } = result;

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
        const LocalStatus = getLocal().Upload.status;
        switch (status) {
            case "error":
                return LocalStatus.error;
            case "success":
                return LocalStatus.success;
            case "uploading":
                return LocalStatus.uploading;
            default:
                return LocalStatus.ready;
        }
    }

    return (
        <div className={classNames(prefixCls, className, `${prefixCls}-status-${status}`)} style={style}>
            {!disabledUpload && <div className={`${prefixCls}_badge`}>{statusText()}</div>}
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
                                                onView(result, index, list);
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon title={getLocal().Upload.preview} className={`${prefixCls}_action`} icon={faEye} />
                                    </span>
                                )}
                                {!disabledUpload && (
                                    <span
                                        onClick={() => {
                                            if (onRemove) {
                                                onRemove(result, index, list);
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon title={getLocal().Upload.delete} className={`${prefixCls}_action`} icon={faTrashAlt} />
                                    </span>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                )}
            </div>
            {desc && <div className={`${prefixCls}_text`}>{desc}</div>}
        </div>
    );
}

export default React.memo(UploadFrame);

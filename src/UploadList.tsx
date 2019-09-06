import React, { useRef, useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import { FileExtend, UploadButtonProps, UploadResult, UploadFrameProps, UploadProps } from "./interface";
import { useControll, useMount, useForceUpdate } from "utils-hooks";
import { UploadFrame } from ".";
import { isImageUrl } from "./utils";
import UploadButton from "./UploadButton";

export interface UploadListProps extends UploadProps, UploadFrameProps {
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
     * 是否禁用上传
     */
    disabledUpload?: boolean;
    /**
     * 最大上传数量
     */
    maxUpload?: number;
    /**
     * 上传值
     */
    value?: UploadResult[];
    /**
     * 默认上传值
     */
    defaultValue?: UploadResult[];
    /**
     * 上传值更改
     */
    onChange?: (list: UploadResult[]) => void;
}

function UploadList(props: UploadListProps) {
    const {
        prefixCls = "upload-list",
        className,
        style,
        disabledUpload = false,
        maxUpload = 10,
        value,
        defaultValue,
        onChange,
        icons,
        onView,
        onRemove,
        onStart,
        onSuccess,
        onError,
        onProgress,
        ...rest
    } = props;
    const [list, setList, isControll] = useControll<UploadResult[]>(props, "value", "defaultValue", []);
    const listRef = useRef([]);

    function changeList(d: UploadResult[]) {
        listRef.current = d;
        if (!isControll) {
            setList(d);
        }
        if (onChange) {
            onChange(d);
        }
    }

    function onStartHandle(file: FileExtend) {
        changeList([...list, { status: "uploading", file: file, thumbnail: URL.createObjectURL(file), percent: 0 }]);
        if (onStart) {
            onStart(file);
        }
    }

    function onSuccessHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        const index = list.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            list[index] = { file, thumbnail: URL.createObjectURL(file), status: "success", percent: 100, response };
            // list.splice(index, 1, { file, thumbnail: URL.createObjectURL(file), status: "success", percent: 100, response });
            changeList(list);
        }
        if (onSuccess) {
            onSuccess(file, response, xhr);
        }
    }

    function onErrorHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        const index = list.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            // list[index] = { file, thumbnail: URL.createObjectURL(file), status: "error", percent: 100, response };
            list.splice(index, 1, { file, thumbnail: URL.createObjectURL(file), status: "error", percent: 100, response });
            changeList(list);
        }
        if (onError) {
            onError(file, response, xhr);
        }
    }

    function onProgressHandle(file: FileExtend, percent: number, event: ProgressEvent) {
        const index = list.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            // listRef.current[index] = { file, thumbnail: URL.createObjectURL(file), status: "uploading", percent };
            list.splice(index, 1, { file, thumbnail: URL.createObjectURL(file), status: "uploading", percent });
            changeList(list);
        }
        if (onProgress) {
            onProgress(file, percent, event);
        }
    }

    function onRemoveHandle(result: UploadResult) {
        const i = list.findIndex((x) => x.file.uid === result.file.uid);
        if (i !== -1) {
            list.splice(i, 1);
            changeList(list);
        }
        if (onRemove) {
            onRemove(result);
        }
    }

    return (
        <div className={classNames(prefixCls, className, { empty: list.length === 0 })} style={style}>
            长度{list.length}
            {list.length > 0 ? list[0].percent : null}
            {list.map((x) => (
                <UploadFrame key={x.file.uid} result={x} isImg={isImageUrl(x.file.name)} icons={icons} onView={onView} onRemove={onRemoveHandle} />
            ))}
            {disabledUpload || list.length >= maxUpload ? null : (
                <UploadButton
                    key="upload-btn"
                    {...rest}
                    test={list}
                    btnMode={true}
                    onStart={onStartHandle}
                    onSuccess={onSuccessHandle}
                    onError={onErrorHandle}
                    onProgress={onProgressHandle}
                />
            )}
        </div>
    );
}
export default React.memo(UploadList);

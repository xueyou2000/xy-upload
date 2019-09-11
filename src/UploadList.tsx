import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { DefineDefaultValue, useForceUpdate } from "utils-hooks";
import { UploadFrame } from ".";
import { FileExtend, UploadListProps, UploadResult } from "./interface";
import UploadButton from "./UploadButton";
import { isImageUrl } from "./utils";

const UploadList = React.forwardRef((props: UploadListProps, ref: React.MutableRefObject<any>) => {
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
    const listRef = useRef<UploadResult[]>(DefineDefaultValue(props, "value", "defaultValue") || []);
    const list = listRef.current;
    // const [list, setList] = useState<UploadResult[]>(listRef.current);
    const update = useForceUpdate();
    function changeList(d: UploadResult[]) {
        listRef.current = d;
        // setList(d);
        update();
        if (onChange) {
            onChange(d);
        }
    }

    useEffect(() => {
        if (value) {
            listRef.current = value;
            // setList(value);
        }
    }, [value]);

    function onStartHandle(file: FileExtend) {
        const latestList = listRef.current;
        changeList([...latestList, { status: "uploading", file: file, thumbnail: URL.createObjectURL(file), percent: 0 }]);
        if (onStart) {
            onStart(file);
        }
    }

    function onSuccessHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        const latestList = listRef.current;
        const index = latestList.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            latestList.splice(index, 1, { file, thumbnail: URL.createObjectURL(file), status: "success", percent: 100, response });
            changeList(latestList);
        }
        if (onSuccess) {
            onSuccess(file, response, xhr);
        }
    }

    function onErrorHandle(file: FileExtend, response: any, xhr: XMLHttpRequest) {
        const latestList = listRef.current;
        const index = latestList.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            latestList[index] = { file, thumbnail: URL.createObjectURL(file), status: "error", percent: 100, response };
            changeList(latestList);
        }
        if (onError) {
            onError(file, response, xhr);
        }
    }

    function onProgressHandle(file: FileExtend, percent: number, event: ProgressEvent) {
        const latestList = listRef.current;
        const index = latestList.findIndex((x) => x.file.uid === file.uid);
        if (index !== -1) {
            latestList[index] = { file, thumbnail: URL.createObjectURL(file), status: "uploading", percent };
            changeList(latestList);
        }
        if (onProgress) {
            onProgress(file, percent, event);
        }
    }

    function onRemoveHandle(result: UploadResult) {
        const latestList = listRef.current;
        const i = latestList.findIndex((x) => x.file.uid === result.file.uid);
        if (i !== -1) {
            latestList.splice(i, 1);
            changeList(latestList);
        }
        if (onRemove) {
            onRemove(result);
        }
    }

    return (
        <div className={classNames(prefixCls, className, { empty: list.length === 0 })} style={style} ref={ref}>
            {list.map((x, i) => (
                <UploadFrame key={i} result={x} icons={icons} onView={onView} onRemove={onRemoveHandle} disabledUpload={disabledUpload} />
            ))}
            {disabledUpload || list.length >= maxUpload ? null : (
                <UploadButton
                    key="upload-btn"
                    {...rest}
                    btnMode={true}
                    onStart={onStartHandle}
                    onSuccess={onSuccessHandle}
                    onError={onErrorHandle}
                    onProgress={onProgressHandle}
                />
            )}
        </div>
    );
});
export default React.memo(UploadList);

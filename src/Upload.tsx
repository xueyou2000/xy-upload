import React, { useRef, useState } from "react";
import classNames from "classnames";
import { UploadProps, UploadReturn, FileExtend, UploadOptions } from "./interface";
import { attrAccept, createUid, getValue } from "./utils";
import traverseFileTree from "./TraverseFileTree";
import { useUnmount } from "utils-hooks";
import httpUpload from "./HttpUpload";
import compress from "./Compress";

const HideStyle: React.CSSProperties = { display: "none" };

function Upload(props: UploadProps) {
    const {
        prefixCls = "xy-upload",
        className,
        directory,
        style,
        accept,
        beforeUpload,
        customRequest,
        disabled,
        multiple = false,
        name = "file",
        withCredentials,
        headers,
        onStart,
        onSuccess,
        onError,
        onProgress,
        children,
        options,
    } = props;
    const ref = useRef(null);
    // 唯一得 uid，用于重置input.files, 让其触发后续同一文件得onChange事件
    const [uid, setUid] = useState(createUid());

    function uploadFiles(files: FileList | File[]) {
        if (disabled) {
            return;
        }
        const fileList: FileExtend[] = [].map.call(files, (file: File) => {
            (file as any).uid = createUid();
            return file;
        });
        fileList.forEach((file) => upload(file, fileList));
    }

    function upload(file: FileExtend, fileList: FileExtend[]) {
        if (!beforeUpload) {
            postFile(file);
        } else {
            const pass = beforeUpload(file, fileList);
            const passPromise = pass as Promise<any>;
            if (passPromise && passPromise.then) {
                passPromise
                    .then((processedFile: FileExtend) => {
                        const processedFileType = Object.prototype.toString.call(processedFile);
                        if (processedFileType === "[object File]" || processedFileType === "[object Blob]") {
                            return postFile(processedFile);
                        }
                        return postFile(file);
                    })
                    .catch((e) => {
                        console.log("beforeUpload faild", e);
                    });
            } else if (pass !== false) {
                postFile(file);
            }
        }
    }

    function postFile(file: FileExtend) {
        const data = getValue(props.data, [file]);
        const action = getValue(props.action, [file]);

        return compress(file, options).then((fileUploadRaw) => {
            console.log("fileUploadRaw", fileUploadRaw);
            return new Promise((resolve, reject) => {
                const request = customRequest || httpUpload;
                if (onStart) {
                    onStart(file);
                }
                request({
                    file: fileUploadRaw as any,
                    data,
                    action,
                    headers,
                    filename: name,
                    withCredentials,
                    onSuccess: (response, xhr) => {
                        if (onSuccess) {
                            onSuccess(file, response, xhr);
                        }
                        resolve(response);
                    },
                    onError: (error, response) => {
                        if (onError) {
                            onError(file, error, response);
                        }
                        reject(error);
                    },
                    onProgress: (percent, event) => {
                        if (onProgress) {
                            onProgress(file, percent, event);
                        }
                    },
                });
            });
        });
    }

    // function abort(file?: FileExtend) {
    //     const reqs = reqsRef.current;

    //     if (file) {
    //         // 中断单个上传
    //         if (file.uid && reqs.has(file.uid)) {
    //             const res = reqs.get(file.uid);
    //             if (res && res.abort) {
    //                 res.abort();
    //             }
    //         }
    //     } else {
    //         // 中断所有上传
    //         reqs.forEach((res, uid) => {
    //             if (res && res.abort) {
    //                 res.abort();
    //             }
    //         });
    //         reqs.clear();
    //     }
    // }

    function onClick() {
        const input = ref.current as HTMLInputElement;
        if (input) {
            input.click();
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        uploadFiles(e.target.files);
        setUid(createUid());
    }

    function onFileDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        if (e.type === "dragover") {
            return;
        }

        if (directory) {
            traverseFileTree(
                e.dataTransfer.items,
                (files) => uploadFiles(files),
                (_file) => attrAccept(_file, accept),
            );
        } else {
            const files = Array.prototype.slice.call(e.dataTransfer.files).filter((file: File) => attrAccept(file, accept));
            uploadFiles(files);
        }
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        // Enter
        if (e.keyCode === 13) {
            onClick();
        }
    }

    // useUnmount(abort);

    const events = disabled
        ? {}
        : {
              onClick,
              onKeyDown,
              onDrop: onFileDrop,
              onDragOver: onFileDrop,
              tabIndex: 0,
          };
    const directoryProps: any = directory
        ? {
              directory: "directory",
              webkitdirectory: "webkitdirectory",
          }
        : {};

    return (
        <span className={classNames(prefixCls, className)} style={style} {...events}>
            <input type="file" key={uid} ref={ref} style={HideStyle} accept={accept} name={name} onChange={onChange} multiple={multiple} {...directoryProps} />
            {children}
        </span>
    );
}

export default React.memo(Upload);

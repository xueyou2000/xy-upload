import { UploadOptions, UploadReturn } from "./interface";

const DefaultOptions: UploadOptions = {
    action: null,
    file: null,
    filename: "file",
    withCredentials: false,
    headers: {}
};

/**
 * 上传文件
 */
export default function upload<T>(options: UploadOptions<T>): UploadReturn {
    const opt = Object.assign({}, DefaultOptions, options);
    const xhr = new XMLHttpRequest();

    // 上传数据
    const formData = new FormData();
    if (opt.data) {
        Object.keys(opt.data).map((key) => {
            formData.append(key, opt.data[key]);
        });
    }
    formData.append(opt.filename, opt.file);

    // 事件
    xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
            return opt.onError(new UploadError(`connot upload ${opt.action}`, opt.action, xhr.status), tryGetResponse(xhr));
        }
        opt.onSuccess(tryGetResponse(xhr), xhr);
    };

    xhr.onerror = (e: ProgressEvent) => {
        opt.onError(new UploadError(`upload fail ${opt.action}`, opt.action, xhr.status), tryGetResponse(xhr));
    };

    if (opt.onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
            let percent = 0;
            if (e.total > 0) {
                percent = (e.loaded / e.total) * 100;
            }
            options.onProgress(percent, e);
        };
    }

    xhr.open("post", opt.action, true);
    if (opt.withCredentials && "withCredentials" in xhr) {
        xhr.withCredentials = true;
    }

    // 主动设置 headers['X-Requested-With'] = null, 用于跨域上传
    if (opt.headers["X-Requested-With"] !== null) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }

    for (const x in opt.headers) {
        if (opt.headers[x] !== null) {
            xhr.setRequestHeader(x, opt.headers[x]);
        }
    }

    xhr.send(formData);

    return {
        abort() {
            xhr.abort();
        }
    };
}

export class UploadError extends Error {
    /**
     * http状态码
     */
    public status: number;
    /**
     * 请求地址
     */
    public url: string;

    /**
     * 构造函数
     * @param msg
     * @param url
     * @param status
     */
    constructor(msg: string, url: string, status: number) {
        super(msg);
        this.url = url;
        this.status = status;
    }
}

function tryGetResponse(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

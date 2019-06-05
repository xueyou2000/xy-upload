
export interface UploadReturn {
    abort: Function;
}

export interface FileExtend extends File {
    uid: string;
}

export interface UploadOptions<ResType = any> {
    /**
     * 上传地址
     */
    action: string;
    /**
     * 上传的文件
     */
    file: File;
    /**
     * 上传的文件name
     * @description 默认 file
     */
    filename?: string;
    /**
     * 附加数据
     */
    data?: any;
    /**
     * 是否启用 withCredentials
     */
    withCredentials?: boolean;
    /**
     * 附加请求头
     */
    headers?: any;
    /**
     * 成功事件
     */
    onSuccess?: (response: ResType, xhr: XMLHttpRequest) => void;
    /**
     * 失败事件
     */
    onError?: (error: Error, response?: ResType) => void;
    /**
     * 上传进度事件
     */
    onProgress?: (percent: number, event: ProgressEvent) => void;
}

type BeforeUploadFunc = (file: FileExtend, fileList: FileExtend[]) => boolean | void;
type BeforeUploadPromise = (file: FileExtend, fileList: FileExtend[]) => Promise<any>;

export interface UploadProps<ResType = any> {
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
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 上传文件类型
     */
    accept?: string;
    /**
     * 是否多选
     */
    multiple?: boolean;
    /**
     * 上传前检查
     * @description 返回 false 或者 Promise.reject() 则拒绝上传
     */
    beforeUpload?: BeforeUploadFunc | BeforeUploadPromise;
    /**
     * 是否支持上传目录内所有文件
     * @description 不支持IE
     */
    directory?: boolean;
    /**
     * 自定义上传
     */
    customRequest?: (options: UploadOptions<any>) => UploadReturn;
    /**
     * 服务器接受文件名称
     */
    name?: string;
    /**
     * 上传地址
     */
    action?: string | Function;
    /**
     * 附加数据
     */
    data?: any | Function;
    /**
     * 是否启用 withCredentials
     */
    withCredentials?: boolean;
    /**
     * 附加请求头
     */
    headers?: any;
    /**
     * 开始上传
     */
    onStart?: (file: FileExtend) => void;
    /**
     * 成功事件
     */
    onSuccess?: (file: FileExtend, response: ResType, xhr: XMLHttpRequest) => void;
    /**
     * 失败事件
     */
    onError?: (file: FileExtend, error: Error, response?: ResType) => void;
    /**
     * 上传进度事件
     */
    onProgress?: (file: FileExtend, percent: number, event: ProgressEvent) => void;
}

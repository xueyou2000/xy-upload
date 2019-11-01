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

export type BeforeUploadFunc = (file: FileExtend, fileList: FileExtend[]) => boolean;
export type BeforeUploadPromise = (file: FileExtend, fileList: FileExtend[]) => boolean | Promise<any>;

export type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadResult {
    /**
     * 上传响应
     */
    response?: any;
    /**
     * 缩略图
     */
    thumbnail?: string;
    /**
     * 文件
     */
    file?: FileExtend;
    /**
     * 进度
     * 0~100
     */
    percent?: number;
    /**
     * 上传状态
     */
    status?: UploadStatus;
    /**
     * 说明
     */
    desc?: React.ReactNode;
    /**
     * 是否为图片
     */
    isImg?: boolean;
}

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
     * @description 返回 Promise.reject() 则拒绝上传
     */
    beforeUpload?: BeforeUploadPromise;
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

export interface UploadButtonProps<ResType = any> extends UploadProps<ResType> {
    /**
     * 上传标题
     */
    title?: React.ReactNode;
    /**
     * 自定义上传按钮
     */
    custBtn?: React.ReactNode;
    /**
     * 是否仅按钮模式
     * 不显示上传状态
     */
    btnMode?: boolean;
    value?: UploadResult;
    defaultValue?: UploadResult;
    onChange?: (result: UploadResult) => void;
}

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
    /**
     * 是否禁用上传
     */
    disabledUpload?: boolean;
}

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

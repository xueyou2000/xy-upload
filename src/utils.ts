function endsWith(str: string, suffix: string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * 判断 accept 是否匹配
 */
export function attrAccept(file: File, acceptedFiles: string) {
    if (file && acceptedFiles) {
        const acceptedFilesArray = Array.isArray(acceptedFiles)
            ? acceptedFiles
            : acceptedFiles.split(',');
        const fileName = file.name || '';
        const mimeType = file.type || '';
        const baseMimeType = mimeType.replace(/\/.*$/, '');

        return acceptedFilesArray.some(type => {
            const validType = type.trim();
            if (validType.charAt(0) === '.') {
                return endsWith(fileName.toLowerCase(), validType.toLowerCase());
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, '');
            }
            return mimeType === validType;
        });
    }
    return true;
};

export function getValue(data: any, args: any[]) {
    if (typeof data === 'function') {
        return data(...args);
    } else {
        return data;
    }
}

const now = +(new Date());
let index = 0;
export function createUid() {
    return `upload-${now}-${++index}`;
}
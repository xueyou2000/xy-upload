// @see https://github.com/react-component/upload/blob/master/src/traverseFileTree.js

function loopFiles(item: any, callback: Function) {
    const dirReader = item.createReader();
    let fileList = [];

    function sequence() {
        dirReader.readEntries((entries) => {
            const entryList = Array.prototype.slice.apply(entries);
            fileList = fileList.concat(entryList);

            // Check if all the file has been viewed
            const isFinished = !entryList.length;

            if (isFinished) {
                callback(fileList);
            } else {
                sequence();
            }
        });
    }

    sequence();
}

const traverseFileTree = (files: DataTransferItemList, callback: (files: File[]) => void, isAccepted: (file: File) => boolean) => {
    if (!files) {
        console.warn('不支持 webkitdirectory');
        return;
    }
    const _traverseFileTree = (item: any, path?: string) => {
        path = path || '';
        if (item.isFile) {
            item.file((file) => {
                if (isAccepted(file)) {
                    // https://github.com/ant-design/ant-design/issues/16426
                    if (item.fullPath && !file.webkitRelativePath) {
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: true,
                            },
                        });
                        file.webkitRelativePath = item.fullPath.replace(/^\//, '');
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: false,
                            },
                        });
                    }
                    callback([file]);
                }
            });
        } else if (item.isDirectory) {
            loopFiles(item, (entries) => {
                entries.forEach((entryItem) => {
                    _traverseFileTree(entryItem, `${path}${item.name}/`);
                });
            });
        }
    };
    for (const file of (files as any)) {
        _traverseFileTree(file.webkitGetAsEntry());
    }
};

export default traverseFileTree;
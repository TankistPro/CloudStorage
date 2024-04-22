export const parseSize = (size : number) : string => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    // @ts-ignore
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['б', 'кб', 'мб', 'гб', 'тб'][i];
}

export const getFileExtension = (fileName: string): string | null => {
    const isFile = fileName.lastIndexOf(".") > -1;

    if (isFile) {
        return fileName.slice(fileName.lastIndexOf(".") + 1, fileName.length)
    }
    return null
}

export const parseFileId = () => {}

export const parseSize = (size) => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['б', 'кб', 'мб', 'гб', 'тб'][i];
}

export const getFileExtension = (fileName) => {
    return fileName.slice(fileName.lastIndexOf(".") + 1, fileName.length)
}

export const parseFileId = () => {}

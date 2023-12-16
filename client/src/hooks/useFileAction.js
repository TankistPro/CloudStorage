export const useFileAction = () => {
    const renameFile = () => { console.log("Переименовать файл") };
    const removeFile = () => { console.log("Удалить файл") };
    const copyFileLink = () => { console.log("Копировать ссылку на файл") }

    return {
        renameFile,
        removeFile,
        copyFileLink
    }
}
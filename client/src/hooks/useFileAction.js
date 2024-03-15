import {useDispatch} from "react-redux";
import {useFileSystem} from "./useFileSystem";
import {removeFileAction, renameFileAction} from "@store/actions/fileSystem.action";

export const useFileAction = () => {
    const { parseFsPath, fetchFolders } = useFileSystem();
    const dispatch = useDispatch();

    const renameFile = async (oldFileName, newFileName) => {
        const filePath = parseFsPath().join('/') + "/";

        const oldFilePath = filePath + oldFileName;
        const newFilePath = filePath + newFileName;

        const response =  await dispatch(renameFileAction(oldFilePath, newFilePath))

        // FIXME: для оптимизации выгоднее получать только файл который меняли, а не всю директорию как сейчас
        if (response.status) {
            await fetchFolders();
        }
        return response.status;
    };
    const removeFile = async (fileName) => {
        const filePath = parseFsPath().join('/') + "/" + fileName;
        return await dispatch(removeFileAction(filePath, fileName));
    };
    const copyFileLink = () => { console.log("Копировать ссылку на файл") }

    return {
        renameFile,
        removeFile,
        copyFileLink
    }
}

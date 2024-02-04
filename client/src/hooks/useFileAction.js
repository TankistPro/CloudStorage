import {useDispatch} from "react-redux";
import {useFileSystem} from "./useFileSystem";
import {removeFileAction} from "@store/actions/fileSystem.action";

export const useFileAction = () => {
    const { parseFsPath } = useFileSystem();
    const dispatch = useDispatch();

    const renameFile = () => { console.log("Переименовать файл") };
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

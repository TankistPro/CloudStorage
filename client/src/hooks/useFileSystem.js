import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {createFolderAction, fetchCurrentFolder, uploadFilesAction} from "@store/actions/fileSystem.action";
import {useSearchParams} from "react-router-dom";

export const useFileSystem = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const openFolder =  React.useCallback(async (fileName) => {
        const param = searchParams.get('path');

        if (!param) {
            setSearchParams({path: `/${ fileName }`})
        } else {
            setSearchParams({path: param + `/${ fileName }` })
        }
    }, [searchParams])

    const fetchFolders = React.useCallback(async () => {
        if (baseWorkspacePath) {
            const param = searchParams.get('path') ;
            let newPath = baseWorkspacePath;

            if (param) {
                newPath = baseWorkspacePath + param;
            }

            await dispatch(fetchCurrentFolder(newPath));
        }
    }, [baseWorkspacePath, searchParams])

    const goToBackFolder = React.useCallback((folderName) => {
        let pathStack = parseFsPath();

        if (folderName === baseWorkspacePath) {
            setSearchParams({})
        } else {
            pathStack.splice(0, 1);
            const folderIndex = pathStack.findIndex(p => p === folderName);

            let newPath = pathStack.slice(0, folderIndex + 1).join('/');
            setSearchParams({ path: "/" + newPath })
        }
    }, [baseWorkspacePath])

    /**
     * Возвращает текущий путь в виде массива -> ['0asad0-1212-12121as', 'folder', 'test'],
     * что соответствует данному пути -> '0asad0-1212-12121as/folder/test'
    */
    const parseFsPath = React.useCallback(() => {
        const param = searchParams.get('path');

        if (!param) {
            return [baseWorkspacePath]
        }

        return [baseWorkspacePath, ...param.split('/').filter(s => s.length)]
    }, [baseWorkspacePath, searchParams])

    const uploadFiles = React.useCallback(async (filesArray) => {
        if (!filesArray.length) return;

        const currentPath = parseFsPath().join('/');
        const formData = new FormData();

        filesArray.forEach((file, index) => {
            formData.append(index, file);
        })

        formData.append('savePath', currentPath);
        const response = await dispatch(uploadFilesAction(formData));

        if (response) {
            await dispatch(fetchCurrentFolder(currentPath));
        }

        return response;
    }, [parseFsPath])

    /*
    * Открытие файла для просмотра в отдельной вкладке браузера
    * */
    const openFileInNewTab = (fileName) => {
        const filePath = parseFsPath().join('/') + "/" + fileName;
        const path = `http://localhost:5520/cdn/${filePath}`;

        window.open(path, '_blank');
    }

    const createFolder = React.useCallback(async (folderName) => {
        const folderPath = parseFsPath().join('/') + "/" + folderName;

        const payload = await dispatch(createFolderAction(folderPath));

        if (payload.status) {
            await fetchFolders()
        }

        return {
            status: payload.status,
            error: payload?.message,
            newFolderName: folderName
        }
    }, [parseFsPath])

    return {
        openFolder,
        fetchFolders,
        parseFsPath,
        goToBackFolder,
        uploadFiles,
        openFileInNewTab,
        createFolder
    }
}

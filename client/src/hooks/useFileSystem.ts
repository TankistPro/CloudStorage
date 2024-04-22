import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {createFolderAction, fetchCurrentFolder, uploadFilesAction} from "@store/actions/fileSystem.action.js";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@hooks/useCustomStore";
import {IUploadFilesFormData} from "../domain/entities.api";

export const useFileSystem = () => {
    const baseWorkspacePath = useAppSelector(state => state.user?.user.baseWorkspacePath);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const openFolder =  React.useCallback(async (fileName: string) => {
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

    const goToBackFolder = React.useCallback((folderName: string) => {
        let pathStack = parseFsPath();

        if (folderName === baseWorkspacePath) {
            setSearchParams({})
        } else {
            pathStack.splice(0, 1);
            const folderIndex = pathStack.findIndex(p => p === folderName);

            let newPath = pathStack.slice(0, folderIndex + 1).join('/');
            setSearchParams({ path: "/" + newPath })
        }
    }, [baseWorkspacePath, setSearchParams])

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

    const uploadFiles = React.useCallback(async (filesArray: IUploadFilesFormData[]) => {
        if (!filesArray.length) return;

        const currentPath = parseFsPath().join('/');
        const formData = new FormData();

        filesArray.forEach((file, index) => {
            // @ts-ignore
            formData.append(String(index), file);
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
    const openFileInNewTab = (fileName: string) => {
        const filePath = parseFsPath().join('/') + "/" + fileName;
        const path = `http://localhost:5520/cdn/${filePath}`;

        window.open(path, '_blank');
    }

    const createFolder = React.useCallback(async (folderName: string) => {
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

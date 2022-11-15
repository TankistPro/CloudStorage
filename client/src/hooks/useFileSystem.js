import {useDispatch, useSelector} from "react-redux";

import {fetchCurrentFolder} from "../store/actions/fileSystem.action";
import {useLocation, useSearchParams} from "react-router-dom";
import React from "react";

export const useFileSystem = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const openFolder =  async (fileName) => {
        const param = searchParams.get('path');

        if (!param) {
            setSearchParams({path: `/${ fileName }`})
        } else {
            setSearchParams({path: param + `/${ fileName }` })
        }
    }

    const fetchFolders = () => {
        if (location.pathname.startsWith('/home') && baseWorkspacePath) {
            const param = searchParams.get('path');
            let newPath = baseWorkspacePath;

            if (param) {
                newPath = baseWorkspacePath + param;
            }

            dispatch(fetchCurrentFolder(newPath))
        }
    }

    /**
     * Возвращает путь в виде массива -> ['0asad0-1212-12121as', 'folder', 'test'],
     * что соответствует данному пути -> '0asad0-1212-12121as/folder/test'
    */
    const parseFsPath = () => {
        const param = searchParams.get('path');

        if (!param) {
            return [baseWorkspacePath]
        }

        return [baseWorkspacePath, ...param.split('/').filter(s => s.length)]
    }

    return {
        openFolder,
        fetchFolders,
        parseFsPath
    }
}

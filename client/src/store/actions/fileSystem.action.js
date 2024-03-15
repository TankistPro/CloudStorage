import FileSystemService from '@services/fileSystem.service';
import {SET_CURRENT_FOLDER, SPLICE_DATA, TOGGLE_FS_LOADING} from "../slice/fileSystemSlice";

export const fetchCurrentFolder = (path) => {
    return async dispatch => {
        try {
            dispatch(TOGGLE_FS_LOADING(true));
            const { data } = await FileSystemService.fetchCurrentFolder(path);

            if (data.status) {
                dispatch(SET_CURRENT_FOLDER(data.payload))
            }
        } catch (e) {}
        dispatch(TOGGLE_FS_LOADING(false));
    }
}

export const uploadFilesAction = (filesFormData) => {
    return async dispatch => {
        try {
            const { data } = await FileSystemService.uploadFiles(filesFormData);

            if (data.status) {
                return true
            }
        } catch (e) {
            return false
        }
    }
}

export const removeFileAction = (filePath, fileName) => {
    return async dispatch => {
        try {
            const { data } = await FileSystemService.removeFile(filePath);

            if (data.status) {
                dispatch(SPLICE_DATA(fileName));
                return true
            }
        } catch (e) {
            return false
        }
    }
}

export const createFolderAction = (folderPath) => {
    return async dispatch => {
        try {
            const { data } = await FileSystemService.createFolder(folderPath);

            if (data.status) {
                return data
            }
        } catch (e) {
            return e.response.data
        }
    }
}

export const renameFileAction = (oldPath, newPath) => {
    return async dispatch => {
        try {
            const { data } = await FileSystemService.renameFile(oldPath, newPath);

            if (data.status) {
                return data
            }
        } catch (e) {
            return e.response.data
        }
    }
}


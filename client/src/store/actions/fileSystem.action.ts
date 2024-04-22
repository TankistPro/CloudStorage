import FileSystemService from '@services/fileSystem.service.js';
import {SET_CURRENT_FOLDER, SPLICE_DATA, TOGGLE_FS_LOADING} from "../slice/fileSystemSlice.js";
import {IUploadFilesFormData} from "../../domain/entities.api";

export const fetchCurrentFolder = (path: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(TOGGLE_FS_LOADING(true));
            const { data } = await FileSystemService.fetchCurrentFolder(path);

            if (data.status) {
                dispatch(SET_CURRENT_FOLDER(data.payload))
            }
        } catch (e: any) {}
        dispatch(TOGGLE_FS_LOADING(false));
    }
}

export const uploadFilesAction = (filesFormData: IUploadFilesFormData) => {
    return async (dispatch: any) => {
        try {
            const { data } = await FileSystemService.uploadFiles(filesFormData);

            if (data.status) {
                return true
            }
        } catch (e: any) {
            return false
        }
    }
}

export const removeFileAction = (filePath: string, fileName: string) => {
    return async (dispatch: any) => {
        try {
            const { data } = await FileSystemService.removeFile(filePath);

            if (data.status) {
                dispatch(SPLICE_DATA(fileName));
                return true
            }
        } catch (e: any) {
            return false
        }
    }
}

export const createFolderAction = (folderPath: string) => {
    return async (dispatch: any) => {
        try {
            const { data } = await FileSystemService.createFolder(folderPath);

            if (data.status) {
                return data
            }
        } catch (e: any) {
            return e.response.data
        }
    }
}

export const renameFileAction = (oldPath: string, newPath: string) => {
    return async (dispatch: any) => {
        try {
            const { data } = await FileSystemService.renameFile(oldPath, newPath);

            if (data.status) {
                return data
            }
        } catch (e: any) {
            return e.response.data
        }
    }
}


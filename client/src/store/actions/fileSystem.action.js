import FileSystemService from '../../services/fileSystem.service';
import {SET_CURRENT_FOLDER, SPLICE_DATA} from "../slice/fileSystemSlice";

export const fetchCurrentFolder = (path) => {
    return async dispatch => {
        try {
            const { data } = await FileSystemService.fetchCurrentFolder(path);

            if (data.status) {
                dispatch(SET_CURRENT_FOLDER(data.payload))
            }
        } catch (e) {

        }
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

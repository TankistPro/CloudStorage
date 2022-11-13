import FileSystemService from '../../services/fileSystem.service';
import {SET_CURRENT_FOLDER} from "../slice/fileSystemSlice";

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

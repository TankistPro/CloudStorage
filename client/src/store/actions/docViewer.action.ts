import {SET_DV_FILE_PATH, TOGGLE_DOCVIEWR, SET_FILE_EXTENSION} from '../slice/docViewerSlice.js';

export const openDocViewerAction = (filePath: string, fileExtension: string) => {
    return (dispatch: any) => {
        dispatch(SET_DV_FILE_PATH(filePath));
        dispatch(SET_FILE_EXTENSION(fileExtension));
        dispatch(TOGGLE_DOCVIEWR(true));
    }
}

export const closeDocViewerAction = () => {
    return (dispatch: any) => {
        dispatch(TOGGLE_DOCVIEWR(false));
        dispatch(SET_DV_FILE_PATH(null));
        dispatch(SET_FILE_EXTENSION(null));
    }
}

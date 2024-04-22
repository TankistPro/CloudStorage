import {useDispatch} from "react-redux";

import { useFileSystem } from "./useFileSystem.js";
import { getFileExtension } from "@helpers/file.helper.js";
import { closeDocViewerAction, openDocViewerAction } from "@store/actions/docViewer.action.js"

export const useDocViewer = () => {
    const dispatch = useDispatch();
    const { parseFsPath } = useFileSystem();

    const openDocViewer = (fileName) => {
        const filePath = parseFsPath().join('/') + "/" + fileName;
        const path = `http://localhost:5520/cdn/${filePath}`;
        const fileExtension = getFileExtension(fileName);

        dispatch( openDocViewerAction(path, fileExtension));
    }

    const closeDocViewer = () => {
        dispatch(closeDocViewerAction());
    }

    return {
        openDocViewer,
        closeDocViewer
    }
}

import {useDispatch, useSelector} from "react-redux";

import {fetchCurrentFolder} from "../store/actions/fileSystem.action";
import {ADD_TO_PATH_STACK} from "../store/slice/fileSystemSlice";

export const useFileSystem = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const pathStack = useSelector(state => state.fileSystem.pathStack);

    const dispatch = useDispatch();

    const openFolder = async (fileName) => {
        dispatch(ADD_TO_PATH_STACK(fileName));

        const newPath = pathStack.join('/') + `/${fileName }`;
        await dispatch(fetchCurrentFolder(newPath));
    }

    return {
        openFolder
    }
}

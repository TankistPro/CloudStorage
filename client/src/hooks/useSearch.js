import fileSystemService from "@services/fileSystem.service.js";
import {useFileSystem} from "@hooks/useFileSystem.js";
import {useSelector} from "react-redux";
import {getFileExtension} from "@helpers/file.helper.js";
import {useSearchParams} from "react-router-dom";

export const useSearch = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = async (searchQuery) => {
        if (!searchQuery) {
            return
        }

        const payload = await fileSystemService.search(searchQuery);

        if (payload.data.status) {
            return payload.data.payload
        }

        return null
    }

    const goToFileFromSearch = (filePath, fileName) =>{
        const isFile = (getFileExtension(fileName))

        if (isFile) {
            const path = `http://localhost:5520/cdn/${baseWorkspacePath + "/" + filePath}`;
            window.open(path, '_blank');
        } else {
            setSearchParams(`path=/${filePath}`);
        }
    }

    return {
        search,
        goToFileFromSearch
    }
}

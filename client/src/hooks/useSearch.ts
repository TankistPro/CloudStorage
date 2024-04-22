import {useSearchParams} from "react-router-dom";
import fileSystemService from "@services/fileSystem.service";
import {getFileExtension} from "@helpers/file.helper";
import {useAppSelector} from "@hooks/useCustomStore";

export const useSearch = () => {
    const baseWorkspacePath = useAppSelector(state => state.user.user.baseWorkspacePath);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = async (searchQuery: string): Promise<any> => {
        if (!searchQuery) {
            return
        }

        const payload = await fileSystemService.search(searchQuery);

        if (payload.data.status) {
            return payload.data.payload
        }

        return null
    }

    const goToFileFromSearch = (filePath: string, fileName: string) =>{
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

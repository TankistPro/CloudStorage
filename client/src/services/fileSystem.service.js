import {api} from "../api/api";

class FileSystemService {
    async fetchCurrentFolder(path) {
        return await api.get(`/fs?path=/${path}`);
    }
}

export default new FileSystemService();

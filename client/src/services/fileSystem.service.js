import {api} from "../api/api";

class FileSystemService {
    async fetchCurrentFolder(path) {
        return await api.get(`/fs?path=/${path}`);
    }

    async uploadFiles(files) {
        return;
    }
}

export default new FileSystemService();

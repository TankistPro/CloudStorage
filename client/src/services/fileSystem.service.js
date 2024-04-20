import {api} from "../api/api";

class FileSystemService {
    async fetchCurrentFolder(path) {
        return await api.get(`/fs?path=/${path}`);
    }

    async uploadFiles(filesFormData,) {
        return await api.post(`fs/upload-files`, filesFormData);
    }

    async removeFile(filePath){
        return await api.delete('/fs/remove-file', {
            data: {
                filePath
            }
        });
    }

    async createFolder(folderPath){
        return await api.post('/fs/create-folder', {
            folderPath
        });
    }

    async renameFile(oldFilePath, newFilePath){
        return await api.post('/fs/rename-file', {
            oldFilePath,
            newFilePath
        });
    }

    async search(searchQuery){
        return await  api.get(`/search?q=${searchQuery}`)
    }
}

export default new FileSystemService();

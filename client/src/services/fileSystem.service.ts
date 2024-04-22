import {api} from "@api/api.js";
import {IBaseAPIResponse, IUploadFilesFormData} from "../domain/entities.api";
import {AxiosResponse} from "axios";

class FileSystemService {
    async fetchCurrentFolder(path: string): Promise<AxiosResponse<IBaseAPIResponse>> {
        return await api.get(`/fs?path=/${path}`);
    }

    async uploadFiles(filesFormData: IUploadFilesFormData): Promise<AxiosResponse<IBaseAPIResponse>> {
        return await api.post(`fs/upload-files`, filesFormData);
    }

    async removeFile(filePath: string): Promise<AxiosResponse<IBaseAPIResponse>>{
        return await api.delete('/fs/remove-file', {
            data: {
                filePath
            }
        });
    }

    async createFolder(folderPath: string): Promise<AxiosResponse<IBaseAPIResponse>>{
        return await api.post('/fs/create-folder', {
            folderPath
        });
    }

    async renameFile(oldFilePath: string, newFilePath: string): Promise<AxiosResponse<IBaseAPIResponse>>{
        return await api.post('/fs/rename-file', {
            oldFilePath,
            newFilePath
        });
    }

    async search(searchQuery: string): Promise<AxiosResponse<IBaseAPIResponse>>{
        return await  api.get(`/search?q=${searchQuery}`)
    }
}

export default new FileSystemService();

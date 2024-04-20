import fs from 'fs';
import path from 'path';

import {uuid} from 'uuidv4';
import {MongoDbService} from "./mongoDb.service";
import {FileEntity} from "../../../domain/entities";

class FileSystemClassService {
    #baseDir = path.join(__dirname, '../../../../users');

    createUserBaseWorkspacePath(): string | null {
        const userFolder = uuid();
        const userPath = path.join(this.#baseDir, userFolder);

        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath);
        } else {
            return null
        }

        return userFolder;
    }

    async parseCurrentPath(currentPath: string) : Promise<FileEntity[]> {
        const parsePath = path.join(this.#baseDir, currentPath);

        if (!fs.existsSync(parsePath)) {
            throw new Error('Path does not exist')
        }

        try {
            const files = fs.readdirSync(parsePath, { withFileTypes: true });
            let response: FileEntity[] = [];

            files.forEach(file => {
                const p = path.join(parsePath, file.name)
                const stat = fs.statSync(p)

                response.push({
                    name: file.name,
                    type: file.isFile() ? 'File' : file.isDirectory() ? 'Folder' : 'None',
                    isFolder: file.isDirectory(),
                    extension: path.extname(file.name) || null,
                    stat
                })
            })

            // @ts-ignore
            return response.sort((a, b) => b.isFolder - a.isFolder)
        } catch (e) {
            throw new Error('Failed to get data from this path')
        }
    }

    async uploadFiles(filesArray: Express.Multer.File[], savePath: string, userID: number): Promise<boolean> {
        let preparedData = [];

        try {
            for (const file of filesArray) {
                let { originalname, buffer, size } = file;
                // @ts-ignore
                originalname = Buffer.from(originalname, 'latin1').toString('utf-8');

                fs.writeFileSync(this.#baseDir + "/" + savePath + "/" + originalname, buffer, "utf8");

                const filePath = savePath.indexOf("/") > -1 ? savePath.slice(savePath.indexOf("/") + 1, savePath.length) + "/" + originalname : originalname

                preparedData.push({
                    filePath: filePath,
                    fileName: originalname,
                    userId: userID
                })
            }
            await  MongoDbService.saveFilesRange(preparedData);

            return true;
        } catch (e: any) {
            throw new Error('Failed to write files');
        }
    }

    async removeFile(path: string, userID: number) : Promise<boolean> {
        const filePathToRemove = this.#baseDir + "/" + path
        const isExist = fs.existsSync(filePathToRemove);

        if (!isExist)
            throw new Error("File does not exist")

        try {
            // TODO: переписать на fs.rmSync - для удалени файлов и директорий
            fs.rmSync(filePathToRemove, {recursive: true});
            await MongoDbService.removeFile(path.slice(path.indexOf("/") + 1, path.length), userID)

            return true;
        } catch (e: any) {
            console.log(e.message)
            throw new Error('Failed to remove file')
        }

    }

    async createFolder(path: string, userID: number) : Promise<boolean>{
        const folderPath = this.#baseDir + "/" + path;
        const isExist = fs.existsSync(folderPath);

        if(isExist) {
            throw new Error("Folder is already exist")
        }

        try {
            fs.mkdirSync(folderPath);
            await MongoDbService.saveFilesRange([{
                filePath:  path.slice(path.indexOf("/") + 1, path.length),
                fileName: path.slice(path.lastIndexOf("/") + 1, path.length),
                userId: userID
            }])

            return true;
        } catch (e) {
            throw new Error('Failed to create folder')
        }
    }

    async renameFile(oldPath: string, newPath: string) : Promise<string>{
        const oldFilePath = this.#baseDir + "/" + oldPath;
        const isExist = fs.existsSync(oldFilePath);

        if(!isExist) {
            throw new Error("Folder is already exist")
        }
        const newFilePath = this.#baseDir + "/" + newPath;
        try {
            // FIXME: работает, только если папка не содержит подпапок
            fs.renameSync(oldFilePath, newFilePath);
            return newFilePath;
        } catch (e: any) {
            throw new Error(e)
        }
    }
}

export const FileSystemService = new FileSystemClassService();

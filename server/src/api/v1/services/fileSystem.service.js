const fs = require('fs');
const path = require('path')

const { uuid } = require('uuidv4');
const { MongoDbService } = require("./mongoDb.service");

class FileSystemService {
    #baseDir = path.join(__dirname, '../../../../users');

    createUserBaseWorkspacePath() {
        const userFolder = uuid();
        const userPath = path.join(this.#baseDir, userFolder);

        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath);
        } else {
            return null
        }

        return userFolder;
    }

    async parseCurrentPath(currentPath) {
        const parsePath = path.join(this.#baseDir, currentPath);

        if (!fs.existsSync(parsePath)) {
            throw new Error('Path does not exist')
        }

        try {
            const files = fs.readdirSync(parsePath, { withFileTypes: true });
            let response = [];

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

            return response.sort((a, b) => b.isFolder - a.isFolder)
        } catch (e) {
            throw new Error('Failed to get data from this path')
        }
    }

    async uploadFiles(filesArray, savePath, userID) {
        let preparedData = [];

        try {
            for (const file of filesArray) {
                let { originalname, buffer, size } = file;
                originalname = Buffer.from(originalname, 'latin1').toString('utf-8');

                await fs.writeFileSync(this.#baseDir + "/" + savePath + "/" + originalname, buffer, "utf8");

                const filePath = savePath.indexOf("/") > -1 ? savePath.slice(savePath.indexOf("/") + 1, savePath.length) + "/" + originalname : originalname

                preparedData.push({
                    filePath: filePath,
                    fileName: originalname,
                    userId: userID
                })
            }
            await  MongoDbService.saveFilesRange(preparedData);

            return true;
        } catch (e) {
            throw new Error('Failed to write files');
        }
    }

    async removeFile(path, userID) {
        const filePathToRemove = this.#baseDir + "/" + path
        const isExist = fs.existsSync(filePathToRemove);

        if (!isExist)
            throw new Error("File does not exist")

        try {
            // TODO: переписать на fs.rmSync - для удалени файлов и директорий
            await fs.rmSync(filePathToRemove, { recursive: true });
            await MongoDbService.removeFile(path.slice(path.indexOf("/") + 1, path.length), userID)

            return true;
        } catch (e) {
            console.log(e.message)
            throw new Error('Failed to remove file')
        }

    }

    async createFolder(path, userID){
        const folderPath = this.#baseDir + "/" + path;
        const isExist = fs.existsSync(folderPath);

        if(isExist) {
            throw new Error("Folder is already exist")
        }

        try {
            await fs.mkdirSync(folderPath);
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

    async renameFile(oldPath, newPath){
        const oldFilePath = this.#baseDir + "/" + oldPath;
        const isExist = fs.existsSync(oldFilePath);

        if(!isExist) {
            throw new Error("Folder is already exist")
        }
        const newFilePath = this.#baseDir + "/" + newPath;
        try {
            // FIXME: работает, только если папка не содержит подпапок
            await fs.renameSync(oldFilePath, newFilePath);
            return newFilePath;
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports.FileSystemService = new FileSystemService();

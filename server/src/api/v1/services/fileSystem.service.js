const fs = require('fs');
const path = require('path')

const { uuid } = require('uuidv4');

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

    readFile() {}

    createFolder() {}

    removeFolder() {}

    async uploadFiles(filesArray, savePath) {
        try {
            filesArray.forEach(async file => {
                let { originalname, buffer, size } = file;
                originalname = Buffer.from(originalname, 'latin1').toString('utf-8');

                await fs.writeFileSync(this.#baseDir + "/" + savePath + "/" + originalname, buffer, "utf8");
            })

            return true;
        } catch (e) {
            throw new Error('Failed to write files');
        }
    }

    removeFile() {}
}

module.exports.FileSystemService = new FileSystemService();

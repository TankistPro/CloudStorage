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
                    extension: path.extname(file.name) || null,
                    stat
                })
            })

            return response
        } catch (e) {
            throw new Error('Failed to get data from this path')
        }
    }

    readFile() {}

    createFolder() {}

    removeFolder() {}

    uploadFile() {}

    removeFile() {}
}

module.exports.FileSystemService = new FileSystemService();

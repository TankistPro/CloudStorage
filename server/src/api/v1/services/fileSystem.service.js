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

    parseCurrentPath(path) {}

    createFolder() {}

    removeFolder() {}

    uploadFile() {}

    removeFile() {}
}

module.exports.FileSystemService = new FileSystemService();

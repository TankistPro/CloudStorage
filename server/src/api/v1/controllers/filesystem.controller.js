const { FileSystemService } = require('../services/fileSystem.service');
const { validationResult } = require("express-validator");
const {error} = require("../utils/http.util");

class FilesystemController {
    async parseCurrentPath(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const { path } = req.query; // path => /9dbb6470-d41a-40be-94f9-8cfe107c8396/folderName

            const pathPayload = await FileSystemService.parseCurrentPath(path);

            return res.success(pathPayload, 200);
        } catch (e) {
            return res.error(e.message);
        }
    }

    async uploadFiles(req, res) {
        try {
            const filesArray = req.files;
            const { savePath } = req.body;

            if (!(filesArray && filesArray.length)) {
                return res.error('Ошибка! Файлы не переданы.');
            }

            const status = await FileSystemService.uploadFiles(filesArray, savePath);

            return res.success(status);
        } catch (e) {
            return res.error(e.message);
        }
    }

    async removeFile(req, res){
        try {
            console.log(req.body)
            const { filePath } = req.body;

            if (!filePath.length) {
                return res.error('Пустой путь до файла');
            }

            const status = await FileSystemService.removeFile(filePath);

            return res.success(status);
        } catch (e) {
            return res.error(e.message);
        }
    }

    async createFolder(req, res) {
        try {
            const { folderPath } = req.body;

            if (!folderPath.trim().length) {
                return res.error('Некорректный путь');
            }

            const status = await FileSystemService.createFolder(folderPath);
            return res.success(status);
        } catch (e) {
            return res.error(e.message);
        }
    }
}

module.exports.FilesystemController = new FilesystemController();

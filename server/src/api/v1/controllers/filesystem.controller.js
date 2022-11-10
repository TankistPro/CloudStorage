const { FileSystemService } = require('../services/fileSystem.service');
const {validationResult} = require("express-validator");

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
}

module.exports.FilesystemController = new FilesystemController();

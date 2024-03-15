const router = require('express').Router();

const { authProtectMiddleware } = require('../middleware/authProtect.middleware');

const { FilesystemController } = require('../controllers/filesystem.controller');

const { parseCurrentPathValidator }= require('../validators/fileSystem.validator');

router.get('/', parseCurrentPathValidator, authProtectMiddleware, FilesystemController.parseCurrentPath);
router.post('/upload-files', authProtectMiddleware, FilesystemController.uploadFiles);
router.post('/create-folder', authProtectMiddleware, FilesystemController.createFolder);
router.delete('/remove-file', authProtectMiddleware, FilesystemController.removeFile);

module.exports = router;

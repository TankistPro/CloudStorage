const router = require('express').Router();

const { authProtectMiddleware } = require('../middleware/authProtect.middleware');

const { FilesystemController } = require('../controllers/filesystem.controller');

const { parseCurrentPathValidator }= require('../validators/fileSystem.validator');

router.get('/', parseCurrentPathValidator, authProtectMiddleware, FilesystemController.parseCurrentPath);

module.exports = router;

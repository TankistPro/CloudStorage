const router = require('express').Router();

const { authProtectMiddleware } = require('../middleware/authProtect.middleware');

const { FilesystemController } = require('../controllers/filesystem.controller');

router.get('/', authProtectMiddleware, FilesystemController.parseCurrentPath);


module.exports = router;

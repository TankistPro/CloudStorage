const router = require('express').Router();

import {authProtectMiddleware} from '../middleware/authProtect.middleware';

import {FilesystemController} from '../controllers/filesystem.controller';

import {parseCurrentPathValidator} from '../validators/fileSystem.validator';

router.get('/', parseCurrentPathValidator, authProtectMiddleware, FilesystemController.parseCurrentPath);
router.post('/upload-files', authProtectMiddleware, FilesystemController.uploadFiles);
router.post('/create-folder', authProtectMiddleware, FilesystemController.createFolder);
router.post('/rename-file', authProtectMiddleware, FilesystemController.renameFile);
router.delete('/remove-file', authProtectMiddleware, FilesystemController.removeFile);

export default router;

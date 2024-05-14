const router = require('express').Router();

import {authProtectMiddleware} from '../middleware/authProtect.middleware';

import {UserController} from '../controllers/user.controller';

router.post('/me', authProtectMiddleware, UserController.getMe);
router.post('/set-avatar', authProtectMiddleware, UserController.saveAvatar);
export default router ;

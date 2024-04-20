const router = require('express').Router();

import {authProtectMiddleware} from '../middleware/authProtect.middleware';

import {UserController} from '../controllers/user.controller';

router.post('/me', authProtectMiddleware, UserController.getMe);

export default router ;

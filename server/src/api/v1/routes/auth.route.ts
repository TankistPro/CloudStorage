const router = require('express').Router();

import {AuthController} from '../controllers/auth.controller';

import {registrationValidator, authorizationValidator} from '../validators/auth.validator';

router.post('/login',
    authorizationValidator,
    AuthController.login);

router.post('/registration',
    registrationValidator,
    AuthController.registration);

export default router;

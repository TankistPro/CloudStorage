const router = require('express').Router();

const { AuthController } = require('../controllers/auth.controller');

const { registrationValidator, authorizationValidator } = require('../validators/auth.validator');

router.post('/login',
    authorizationValidator,
    AuthController.login);

router.post('/registration',
    registrationValidator,
    AuthController.registration);

module.exports = router;

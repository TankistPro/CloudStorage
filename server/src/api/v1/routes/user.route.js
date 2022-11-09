const router = require('express').Router();

const { authProtectMiddleware } = require('../middleware/authProtect.middleware');

const { UserController } = require('../controllers/user.controller');

router.post('/me', authProtectMiddleware,UserController.getMe);

module.exports = router;

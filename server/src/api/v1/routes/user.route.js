const router = require('express').Router();

const { UserController } = require('../controllers/user.controller');

router.post('/me', UserController.getMe);

module.exports = router;

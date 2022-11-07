const router = require('express').Router();

const AuthRoute = require('./auth.route');

router.use('/auth', AuthRoute);

module.exports = router;

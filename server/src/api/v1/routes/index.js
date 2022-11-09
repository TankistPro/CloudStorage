const router = require('express').Router();

const AuthRoute = require('./auth.route');
const UserRoute = require('./user.route');

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);

module.exports = router;

const router = require('express').Router();

const AuthRoute = require('./auth.route');
const UserRoute = require('./user.route');
const FileSystemRoute = require('./filesystem.route');
const SearchRoute = require('./search.route');


router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/fs', FileSystemRoute);
router.use(SearchRoute);

module.exports = router;

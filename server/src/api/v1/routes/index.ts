const router = require('express').Router();

import AuthRoute from './auth.route';
import UserRoute from './user.route';
import FileSystemRoute from './filesystem.route';
import SearchRoute from './search.route';


router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/fs', FileSystemRoute);
router.use(SearchRoute);

export default router;

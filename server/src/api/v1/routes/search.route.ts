const router = require('express').Router();

import {authProtectMiddleware} from "../middleware/authProtect.middleware";
import {SearchController} from "../controllers/search.controller";


router.get('/search', authProtectMiddleware, SearchController.search);

export default router;

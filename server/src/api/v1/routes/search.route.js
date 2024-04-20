const {authProtectMiddleware} = require("../middleware/authProtect.middleware");
const {SearchController} = require("../controllers/search.controller");

const router = require('express').Router();

router.get('/search', authProtectMiddleware, SearchController.search);

module.exports = router;

const {authProtectMiddleware} = require("../middleware/authProtect.middleware");
const {SearchController} = require("../controllers/search.controller");

const router = require('express').Router();

router.get('/search', SearchController.search);

module.exports = router;

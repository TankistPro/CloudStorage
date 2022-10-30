const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Api v1")
})

module.exports = router;

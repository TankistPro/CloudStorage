const express = require('express');
const router = require('./routes/index');

const app = express();
const PORT = 5520 || process.env.PORT;

module.exports.startServerV1 = () => {
    app.use('/api/v1', router);

    app.listen(PORT, () => {
        console.log(`[OK] Server is running on PORT ${ PORT }!`)
    })
}

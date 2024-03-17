const express = require('express');
const cors = require('cors');
const path = require('path')

const multer = require('multer');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const app = express();
const PORT = 5520 || process.env.PORT;

module.exports.startServerV1 = async () => {
    try{
        app.use(require('./middleware/response.middleware'));

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(multer().any());

        app.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }))

        // TODO: AUTH PROTECT!
        app.use('/cdn', express.static(path.join(__dirname, '../../../users')));

        app.use('/api/v1', router);

        app.listen(PORT, () => {
            console.log(`[OK] Server is running on PORT ${ PORT }!`)
        })
    } catch (e) {
        console.log('[ERROR] Unable to connect to the database', e)
    }
}

const express = require('express');
const cors = require('cors');

const multer = require('multer');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const sequelize = require('./db/connect');

const app = express();
const PORT = 5520 || process.env.PORT;

module.exports.startServerV1 = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        console.log('Connection has been established successfully.');

        app.use(require('./middleware/response.middleware'));

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(multer().any());

        app.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }))

        app.use('/api/v1', router);

        app.listen(PORT, () => {
            console.log(`[OK] Server is running on PORT ${ PORT }!`)
        })
    } catch (e) {
        console.log('[ERROR] Unable to connect to the database', e)
    }
}

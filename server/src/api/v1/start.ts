import express from 'express';
import cors from 'cors';
import path from 'path';

import multer from 'multer';
import bodyParser from 'body-parser';


import router from './routes/index';
import {connectToMongoDB} from "../../mongoDB/config";

const app = express();
const PORT = 5520 || process.env.PORT;

export const startServerV1 = async () => {
    try{
        app.use(require('./middleware/response.middleware'));

        await connectToMongoDB();

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(multer().any());

        app.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }))

        // TODO: AUTH PROTECT!
        app.use('/cdn', express.static(path.join(__dirname, '../../../users')));
        app.use('/user-avatars', express.static(path.join(__dirname, '../../../avatars')));

        app.use('/api/v1', router);

        app.listen(PORT, () => {
            console.log(`[OK] Server is running on PORT ${ PORT }!`)
        })
    } catch (e) {
        console.log('[ERROR] Unable to connect to the database', e)
    }
}

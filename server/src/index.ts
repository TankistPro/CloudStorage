require('dotenv').config()
import {startServerV1} from './api/v1/start';

startServerV1().then().catch();

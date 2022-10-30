require('dotenv').config()
const { startServerV1 } = require('./api/v1/start');

startServerV1().then().catch();

const mongoose = require('mongoose');

module.exports.connectToMongoDB = async () => {
    await mongoose.connect(process.env.MongoDB_URI,{
        dbName: process.env.MongoDB_Name,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('[OK] MongoDB started successfully!!'));
}

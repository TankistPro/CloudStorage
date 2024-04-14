const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const fileModel = new Schema({
    fileName: String,
    filePath: String,
    userId: Number
})

module.exports.fileModel = mongoose.model("files", fileModel);

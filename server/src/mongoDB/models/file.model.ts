import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const fileModelSchema = new Schema({
    fileName: String,
    filePath: String,
    userId: Number
})

export const fileModel = mongoose.model("files", fileModelSchema);

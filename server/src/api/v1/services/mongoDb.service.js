const {fileModel} = require("../../../mongoDB/models/file.model");


class MongoDbService {
    #fileModel = fileModel;
    async save() {


        await model.save()
    }
    async update(){}
    async removeFile(filePath, userId){
        const count = await fileModel.deleteOne({ userId, filePath });

        return count !== 0;
    }
    async getUserFiles(){}
    async saveFilesRange(data){
        data.map(file =>  ({
            fileName: file.fileName,
            filePath: file.filePath,
            userId: file.userId
        }))

        try {
            await fileModel.insertMany([...data])
        } catch (e) {
            new Error("Can not save file to MongoDB")
        }
    }
    async updateRange(){}
    async removeRange(){}
}

module.exports.MongoDbService = new MongoDbService();

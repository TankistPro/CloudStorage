const {fileModel} = require("../../../mongoDB/models/file.model");


class MongoDbService {
    #fileModel = fileModel;
    async save() {
        const model = new fileModel({
            fileName: "123123",
            filePath: "asdasdasdasd",
            userId: 1
        })

        await model.save()
    }
    async update(){}
    async remove(){}
    async getUserFiles(){}
    async saveRange(){}
    async updateRange(){}
    async removeRange(){}
}

module.exports.MongoDbService = new MongoDbService();

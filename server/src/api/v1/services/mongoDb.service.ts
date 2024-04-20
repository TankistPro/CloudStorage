import {fileModel} from "../../../mongoDB/models/file.model";
import {FileMongoEntity} from "../../../domain/entities";

class MongoDbClassService {
    #fileModel = fileModel;
    async save() {}
    async update(){}
    async removeFile(filePath: string, userId: number): Promise<boolean> {
        const count = await fileModel.deleteOne({ userId, filePath });
        return count.deletedCount !== 0;
    }
    async getUserFiles(userId: number): Promise<any[]>{
        return await fileModel.find({userId}).exec();
    }
    async saveFilesRange(data: FileMongoEntity[]) : Promise<void> {
        data.map(file  =>  ({
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

export const MongoDbService = new MongoDbClassService();

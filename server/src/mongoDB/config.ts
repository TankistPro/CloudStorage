import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    // @ts-ignore
    await mongoose.connect(process.env.MongoDB_URI,{
        dbName: process.env.MongoDB_Name,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('[OK] MongoDB started successfully!!'));
}

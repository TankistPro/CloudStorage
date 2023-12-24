const EasyYandexS3 = require('easy-yandex-s3').default;

class s3YandexService {
    #s3 = new EasyYandexS3({
        auth: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
          },
          Bucket: process.env.BUCKET_NAME,
          debug: false,
    })

    async uploadFiles(fileArray) { 
        let response = [];     

        for (let index = 0; index < fileArray.length; index++) {
            const status = await this.#s3.Upload({
                buffer: fileArray[index].buffer,
                name: fileArray[index].originalname
            }, '/files/')
            
            if (!status) {
                throw new Error('Ну удалось сохранить файл!');
                break;
            }

            response.push({
                location: status.Location,
                key: status.key
            })
        }

        return response;
    }
}

module.exports.s3YandexService = new s3YandexService();
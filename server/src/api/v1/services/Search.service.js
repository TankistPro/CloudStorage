const MiniSearch = require('minisearch');
const {MongoDbService} = require("./mongoDb.service");
class SearchService{
    async search(stringToSearch, userID) {
        const miniSearch = new MiniSearch({
            fields: ['fileName', 'filePath'],
            storeFields: ['fileName', 'filePath']
        })

        const userDocument = await MongoDbService.getUserFiles(userID);

        miniSearch.addAll(userDocument);

        return miniSearch.search(stringToSearch,  {
            prefix: true,
            fuzzy: 0.2
        });
    }
}

module.exports.SearchService = new SearchService()

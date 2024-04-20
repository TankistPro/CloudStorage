import MiniSearch, {SearchResult} from "minisearch";
import {MongoDbService} from "./mongoDb.service";
class SearchClassService{
    async search(stringToSearch: string, userID: number): Promise<SearchResult[]> {
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

export const SearchService = new SearchClassService()

import {SearchService} from "../services/Search.service";
import {BaseRequest, BaseResponse} from "../../../domain/serverExtend";

class SearchClassController {
    async search(req: BaseRequest, res: BaseResponse) {
        const { id } = req.payload;
        const query = req.query['q']

        const response = await SearchService.search(query as string, id);

        return res.success(response);
    }
}

export const SearchController = new SearchClassController()

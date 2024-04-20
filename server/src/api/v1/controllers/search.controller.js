const {SearchService} = require("../services/Search.service");

class SearchController {
    async search(req, res) {
        const { id } = req.payload;
        const query = req.query['q']

        const response = await SearchService.search(query, id);

        return res.success(response);
    }
}

module.exports.SearchController = new SearchController()

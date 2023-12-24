const HTTP_UTIL = require('../utils/http.util');

module.exports = (req, res, next) => {
    res.success = (payload, statusCode = 200) => {
        HTTP_UTIL.success(res, payload, statusCode);
    }

    res.error = (message, statusCode) => {
        HTTP_UTIL.error(res, message, statusCode)
    }

    return next()
}

const { query } = require('express-validator');

const parseCurrentPathValidator = [
    query('path').notEmpty().contains('/').withMessage('The path must contain / ').isLength({ min: 5 })
]

module.exports = {
    parseCurrentPathValidator
}

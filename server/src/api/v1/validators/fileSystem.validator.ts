import {query} from 'express-validator';

const parseCurrentPathValidator = [
    query('path').notEmpty().contains('/').withMessage('The path must contain / ').isLength({ min: 5 })
]

export {
    parseCurrentPathValidator
}

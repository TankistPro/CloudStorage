const { checkSchema } = require('express-validator');

const registrationValidator = checkSchema({
    password: {
        isLength: {
            errorMessage: 'Password should be at least 6 chars long',
            options: { min: 6 },
        }
    },
    email: {
        isEmail: {}
    },
    firstName: {
        notEmpty: {}
    },
    confirmPassword: {
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }

                return true;
            }
        }
    }
})

module.exports.registrationValidator = registrationValidator

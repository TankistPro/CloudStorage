const bcrypt = require('bcrypt');

class SecureService {
    #saltRounds = 10;

    generateHashPassword(password) {
        return bcrypt.hashSync(password, this.#saltRounds, (err, hash) => {
            if (!err) {
                return hash
            }
            return null
        })
    }

    compareHash(value, hash) {
        return bcrypt.compareSync(value, hash, (err, result) => {
            if (!err) {
                return result;
            }
        })
    }
}

module.exports.SecureService = new SecureService();

import bcrypt from 'bcrypt';

class SecureClassService {
    #saltRounds = 10;

    generateHashPassword(password: string) {
        // @ts-ignore
        return bcrypt.hashSync(password, this.#saltRounds, (err: any, hash: any) => {
            if (!err) {
                return hash
            }
            return null
        })
    }

    compareHash(value: string, hash: string) {
        // @ts-ignore
        return bcrypt.compareSync(value, hash, (err: any, result: any) => {
            if (!err) {
                return result;
            }
        })
    }
}

export const SecureService = new SecureClassService();

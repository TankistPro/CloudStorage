const { SecureService } = require('./secure.service');
const { FileSystemService } = require('./fileSystem.service');
const { TokenService } = require('./token.service');

const {prisma} = require("../../../../prisma/prismaClient");

class AuthService {
    async login(email, password) {
        const user = await  prisma.users.findFirst({ where: { email: email } });

        if (!user) {
            throw new Error("Wrong email or password");
        }

        const status = await SecureService.compareHash(password, user.password);

        if (!status) {
            throw new Error("Wrong email or password");
        }

        const tokenPayload = {
            id: user.id,
            email: user.email
        }

        const accessToken = TokenService.generateAccessToken(tokenPayload);
        const refreshToken = TokenService.generateRefreshToken(tokenPayload);

        if (!accessToken || !refreshToken) {
            throw new Error("Account login issues! Please try again later")
        }

        return {
            accessToken,
            refreshToken
        }
    }

    async registration(userPayload) {
        const candidate = await prisma.users.findFirst({ where: { email: userPayload.email }});
        if (candidate) {
            throw new Error("User already exist");
        }

        const hashPassword = SecureService.generateHashPassword(userPayload.password);
        const userBaseWorkspacePath = FileSystemService.createUserBaseWorkspacePath();

        if (!hashPassword || !userBaseWorkspacePath) {
            throw new Error("System error! Please try again later");
        }

        userPayload.password = hashPassword;
        userPayload.baseWorkspacePath = userBaseWorkspacePath;

        try {
            await prisma.users.create(userPayload);
        } catch (e) {
            throw new Error(e.message);
        }

        return true;
    }
}

module.exports.AuthService = new AuthService();

import {SecureService} from './secure.service';
import {FileSystemService} from './fileSystem.service';
import {TokenService} from './token.service';

// @ts-ignore
import {prisma} from "../../../../prisma/prismaClient";
import {TokenPayloadEntity, UserEntity} from "../../../domain/entities";

class AuthClassService {
    async login(email: string, password: string) {
        const user = await  prisma.users.findFirst({ where: { email: email } });

        if (!user) {
            throw new Error("Wrong email or password");
        }

        const status = SecureService.compareHash(password, user.password);

        if (!status) {
            throw new Error("Wrong email or password");
        }

        const tokenPayload: TokenPayloadEntity = {
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

    async registration(userPayload: UserEntity) {
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
            // @ts-ignore
            await prisma.users.create(userPayload);
        } catch (e: any) {
            throw new Error(e.message);
        }

        return true;
    }
}

export const AuthService = new AuthClassService();

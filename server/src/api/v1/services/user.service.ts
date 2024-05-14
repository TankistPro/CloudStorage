import {UserDTOEntity} from "../../../domain/entities";

import {prisma} from '../../../../prisma/prismaClient';
import {Prisma} from "@prisma/client";
import path from "path";
import fs from "fs";

class UserClassService {
    #baseAvatarDir = path.join(__dirname, '../../../../avatars');

    /**
     * Получение информации о пользователе по ID (без пароля)
     */
    async getUserPayloadById(id: number): Promise<Prisma.Prisma__UsersClient<UserDTOEntity>> {
        return prisma.users.findUnique({
            where: {id},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarHash: true,
                baseWorkspacePath: true
            }
        }) as Prisma.Prisma__UsersClient<UserDTOEntity>;
    }

    async saveAvatar(avatar: Express.Multer.File, userId: number): Promise<string> {
        try {
            const { buffer, originalname  } = avatar;
            const dateNow = Date.now();
            const avatarHash = `/${originalname}_${userId}_${dateNow}.png`;

            fs.writeFileSync(this.#baseAvatarDir + avatarHash, buffer, "utf8");

            const updatedUser = await prisma.users.update({
                where: {id: userId},
                data: {
                    avatarHash: avatarHash
                }
            })

            return updatedUser.avatarHash as string;
        } catch (e) {
            throw new Error('Failed to save avatar');
        }
    }
}

export const UserService  = new UserClassService();

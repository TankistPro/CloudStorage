import {UserDTOEntity} from "../../../domain/entities";

import {prisma} from '../../../../prisma/prismaClient';
import {Prisma} from "@prisma/client";

class UserClassService {
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
}

export const UserService  = new UserClassService();

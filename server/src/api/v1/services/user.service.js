const { prisma } = require('../../../../prisma/prismaClient');

class UserService {
    /**
     * Получение информации о пользователе по ID (без пароля)
     */
    async getUserPayloadById(id) {
        return await prisma.users.findUnique({
            where: {id},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarHash: true,
                baseWorkspacePath: true
            }
        });
    }
}

module.exports.UserService  = new UserService();

import React from 'react';
import UserService from "@services/user.service";

export const useUser = () => {

    const saveAvatar = React.useCallback(async (avatarData: Blob) => {
        const response = await UserService.saveAvatar(avatarData);
        return response.status;
    }, [])

    return {
        saveAvatar
    }
}

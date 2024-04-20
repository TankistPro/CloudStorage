export interface UserEntity {
    id: number;
    firstName: string,
    lastName?: string,
    email: string
    password: string,
    avatarHash?: string,
    baseWorkspacePath?: string
}

export interface UserDTOEntity {
    id: number,
    firstName: string,
    lastName?: string,
    email: string,
    avatarHash?: string,
    baseWorkspacePath?: string
}

export interface FileMongoEntity {
    fileName: string,
    filePath: string,
    userId: number
}

export interface FileEntity {
    name: string,
    type: 'File' | 'Folder' | 'None',
    isFolder: boolean,
    extension?: string | null,
    stat: {}
}

export interface TokenPayloadEntity {
    id: number,
    email: string
}

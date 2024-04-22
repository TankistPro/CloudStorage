export interface IBaseAPIResponse {
    status: boolean,
    payload: {
        [key: string]: string
    }
}
export interface ILoginPayload {
    email: string,
    password: string
}

export interface IUploadFilesFormData {

}

export interface IUserData {
    id: number,
    firstName: string,
    lastName?: string,
    email: string,
    avatarHash?: string,
    baseWorkspacePath: string
}

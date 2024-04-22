
export interface BaseFile {
    name: string,
    type: 'File' | 'Folder' | 'None',
    isFolder: boolean,
    extension: string | null,
    stat: {
        atime: Date,
        atimeMs: number,
        birthtime: Date,
        birthtimeMs: number,
        blksize: number,
        blocks: number,
        ctime: Date,
        ctimeMs: number,
        dev: number,
        gid: number,
        ino: number,
        mode: number,
        mtime: Date,
        mtimeMs: number,
        rdev: number,
        size: number,
        uid: number,
        isDirectory(): boolean,
        isFile(): boolean,
        isSymbolicLink(): boolean
    }
}

export interface BaseUploadFile {
    name: string,
    size: number
}

export interface IBaseSearchItem {
    id: string,
    fileName: string,
    filePath: string,
    userId: number
}

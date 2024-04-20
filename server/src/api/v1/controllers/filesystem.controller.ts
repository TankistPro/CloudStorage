import {FileSystemService} from '../services/fileSystem.service';
import {validationResult} from "express-validator";
import {BaseRequest, BaseResponse} from "../../../domain/serverExtend";

class FileSystemClassController {
    async parseCurrentPath(req: BaseRequest, res: BaseResponse) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const { path }  = req.query; // path => /9dbb6470-d41a-40be-94f9-8cfe107c8396/folderName

            const pathPayload = await FileSystemService.parseCurrentPath(path as string);

            return res.success(pathPayload, 200);
        } catch (e: any) {
            return res.error(e.message);
        }
    }

    async uploadFiles(req: BaseRequest, res: BaseResponse) {
        try {
            const filesArray = req.files;
            const { savePath } = req.body;

            const { id } = req.payload;

            if (!(filesArray && filesArray.length)) {
                return res.error('Ошибка! Файлы не переданы.');
            }

            const status = await FileSystemService.uploadFiles(filesArray as Express.Multer.File[], savePath, id);

            return res.success(status);
        } catch (e: any) {
            return res.error(e.message);
        }
    }

    async removeFile(req: BaseRequest, res: BaseResponse){
        try {
            const { filePath } = req.body;
            const { id } = req.payload;

            if (!filePath.length) {
                return res.error('Пустой путь до файла');
            }

            const status = await FileSystemService.removeFile(filePath, id);

            return res.success(status);
        } catch (e: any) {
            return res.error(e.message);
        }
    }

    async createFolder(req: BaseRequest, res: BaseResponse) {
        try {
            const { folderPath } = req.body;
            const { id } = req.payload;

            if (!folderPath.trim().length) {
                return res.error('Некорректный путь');
            }

            const status = await FileSystemService.createFolder(folderPath, id);
            return res.success(status);
        } catch (e: any) {
            return res.error(e.message);
        }
    }

    async renameFile(req: BaseRequest, res: BaseResponse) {
        try {
            const { oldFilePath, newFilePath } = req.body;

            if (!oldFilePath?.trim().length || !newFilePath?.trim().length) {
                return res.error('Некорректный путь');
            }

            const status = await FileSystemService.renameFile(oldFilePath, newFilePath);
            return res.success(status);
        } catch (e: any) {
            return res.error(e.message);
        }
    }
}

export const FilesystemController = new FileSystemClassController();

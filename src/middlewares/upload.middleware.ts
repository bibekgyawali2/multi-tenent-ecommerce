// src/middlewares/upload.middleware.ts
import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import HttpException from '../utils/HttpException';

const ALLOWED_FILE_TYPES: Record<string, string[]> = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        console.log(":::::::::::::::::DEBUGGING::::::::::::::::::")
        const uploadDir = `public/uploads/`;
        console.log('Saving file to:', uploadDir);
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }

});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const fileType = req.params.fileType || 'image';

    if (!ALLOWED_FILE_TYPES[fileType]?.includes(file.mimetype)) {
        cb(HttpException.badRequest(`Invalid file type.}`));
        return;
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }

});

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number) => upload.array(fieldName, maxCount);
export const uploadFields = (fields: { name: string, maxCount: number }[]) => upload.fields(fields);

export default upload;
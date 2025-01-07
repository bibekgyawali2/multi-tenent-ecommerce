declare namespace Express {
  interface Request {
    user: any;
    file?: any;
    storeId?: string;
    files?: {
      [fieldname: string]: Express.Multer.File[];
    } | Express.Multer.File[];
  }
}

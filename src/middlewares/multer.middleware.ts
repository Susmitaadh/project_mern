import multer from "multer";
import fs from "fs";
import { Request } from "express";

const uploader = () => {
  //* create upload folder if not exists
  const folder = "uploads/";
  const fileSize = 5 * 1024 * 1024; // 5MB max file size
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  //* multer disk storage
  const storage = multer.diskStorage({
    destination: (_: Request, __: Express.Multer.File, callback) => {
      callback(null, folder);
    },
    filename: (_: Request, file: Express.Multer.File, callback) => {
      const fileName = Date.now() + "-" + file.originalname;
      callback(null, fileName);
    },
  });

  //* multer upload instance
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: fileSize,
    },
  });

  return upload;
};

export default uploader;

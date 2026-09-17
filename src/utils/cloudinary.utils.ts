import cloudinary from "../config/cloudinary.config";
import AppError from "./appError.utils";
import fs from "fs";

//* upload file to cloudinary
export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  dir = "/",
) => {
  try {
    const uploadFolder = "/mern_project" + dir;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: uploadFolder,
      },
    );

    //* delete file from uploads
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path: secure_url,
      public_id,
    };
  } catch (error: any) {
    console.log(error);
    throw new AppError("Something went wrong", 500, "INTERNAL_SERVER_ERROR", [
      { message: error.message },
    ]);
  }
};

//* delete file cloudinary

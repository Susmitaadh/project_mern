import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import Property from "../models/property.model";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils";
import { sendResponse } from "../utils/sendResponse.utils";

const folder = "/properties";

//* get all

//* get by id

//* create
export const create = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user; //host
  const {
    name,
    description,
    price,
    price_type,
    address,
    rooms,
    property_type,
  } = req.body;
  const { cover_image, images } = req.files as {
    cover_image: Express.Multer.File[];
    images: Express.Multer.File[];
  };

  if (!cover_image[0]) {
    throw new AppError("Cover image is required", 400);
  }

  if (!images || images.length < 2) {
    throw new AppError("At least 2 images is required", 400);
  }

  const property = new Property({
    name,
    description,
    price,
    price_type,
    address,
    rooms,
    property_type,
    host: _id,
  });

  const { path, public_id } = await uploadFileToCloudinary(
    cover_image[0],
    folder,
  );

  property.cover_image = {
    path,
    public_id,
  };

  // Promise.all(promise[])
  // Promise.allSettled(promise[])

  //* multiple images uploads
  const promises = images.map((file) => uploadFileToCloudinary(file, folder));
  const results = await Promise.allSettled(promises);
  const files = results
  .filter((file) => file.status === 'fulfilled')
  .map((file) => {
    return file.value;
  });

  property.images = files;

  //* save property
  await property.save();

  sendResponse(res, {
    message: "Property created",
    statusCode: 201,
    data: property,
  });
});
//* update

//* remove

//* get by host id

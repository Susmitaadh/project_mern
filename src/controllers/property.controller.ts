import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import Property from "../models/property.model";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../types/enum.types";

const folder = "/properties";

//* get all
export const getAll = catchAsync(async (req, res) => {
  const properties = await Property.find();

  sendResponse(res, {
    message: "All properties fetched",
    data: properties,
    statusCode: 200,
  });
});

//* get by id
export const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await Property.find({ _id: id });

  if (!property) throw new AppError("property not found", 200);

  sendResponse(res, {
    message: "Properties fetched",
    data: property,
    statusCode: 200,
  });
});

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
    .filter((file) => file.status === "fulfilled")
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
// deleted_image: [public_id, public_id]
export const update = catchAsync(async (req, res) => {
  //* params
  //* body
  //* req.user
});

//* remove
export const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const property = await Property.findById(id).populate("host");

  if (!property) throw new AppError("property not found", 200);

  //* only admin and owner can delete
  if (
    user.role !== Role.ADMIN &&
    property.host.toString() !== user._id.toString()
  ) {
    throw new AppError("Only admin or owner can delete this resource", 400);
  }

  await deleteFileFromCloudinary(property.cover_image.public_id);
  await Promise.allSettled(
    property.images.map((file) => deleteFileFromCloudinary(file.public_id)),
  );

  await property.deleteOne();

  sendResponse(res, {
    message: "Properties deleted",
    data: property,
    statusCode: 200,
  });
});

//* get by host id
export const getByHost = catchAsync(async (req, res) => {
  const user = req.user._id;
  const property = await Property.find({ host: user });

  sendResponse(res, {
    message: "Properties fetched",
    data: property,
    statusCode: 200,
  });
});

import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Amenity from "../models/amenity.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";
import { Role } from "../types/enum.types";

const folder = "/amenities";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const amenity = await Amenity.find({}).populate("user");

  sendResponse(res, {
    message: "Displaying all amenity",
    statusCode: 200,
    data: amenity,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const amenity = await Amenity.findById(id).populate("user");

  if (!amenity) {
    throw new AppError("Amenity not found", 404);
  }

  sendResponse(res, {
    message: "Amenity found successfully",
    statusCode: 200,
    data: amenity,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description, user } = req.body;
  const file = req.file;

  if (!file) throw new AppError("Logo is required", 400, "VALIDATION_ERROR");

  const amenity = new Amenity({ name, description, user });

  //* upload to cloudinary
  const { path, public_id } = await uploadFileToCloudinary(file, folder);
  amenity.logo = {
    path,
    public_id,
  };

  //* save amenity
  await amenity.save();

  sendResponse(res, {
    message: "Amenity created successfully",
    statusCode: 201,
    data: amenity,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const user = req.user;
  const file = req.file;

  const amenity = await Amenity.findOne({ _id: id });

  if (!amenity) throw new AppError("Amenity not found", 404, "NOT_FOUND");

  //* only admin and owner can update
  if (user.role !== Role.ADMIN && amenity.user._id !== user._id) {
    throw new AppError("Only admin or owner can update this resource", 400);
  }

  if (name) amenity.name = name;
  if (!description) amenity.description = description;

  if (file) {
    //* upload new file to cloudinary
    const { path, public_id } = await uploadFileToCloudinary(file, folder);

    //* delete old logo from cloudinary
    await deleteFileFromCloudinary(amenity.logo.public_id);

    amenity.logo = {
      public_id,
      path,
    };
  }

  //* save amenity
  await amenity.save();

  sendResponse(res, {
    message: "Amenity updated successfully",
    statusCode: 200,
    data: amenity,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const amenity = await Amenity.findOne({ _id: id }).populate("user");

  if (!amenity) throw new AppError("Amenity not found", 404, "NOT_FOUND");

  //* only admin and owner can delete
  if (user.role !== Role.ADMIN && amenity.user._id !== user._id) {
    throw new AppError("Only admin or owner can delete this resource", 400);
  } 

  //* delete logo from cloudinary
  await deleteFileFromCloudinary(amenity.logo.public_id);

  //* delete amenity
  await amenity.deleteOne();

  sendResponse(res, {
    message: "Amenity deleted successfully",
    statusCode: 200,
    data: null,
  });
});



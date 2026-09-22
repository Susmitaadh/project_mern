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
//? 100
// perPage: 10, page:1 data: 10 skip: 0 remain: 90
// perPage: 10, page:2 data: 10 skip: 10 remain: 80
// perPage: 10, page:3 data: 10 skip: 20 remain: 80
//* get all
export const getAll = catchAsync(async (req, res) => {
  const filter: any = {};

  const { query, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
  const perPage = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * perPage;

  if (query) {
    filter.$or = [
      {
        name: {
          $regex: query,
          $options: "i", // abc -> ABC
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  //* price range
  if (minPrice || maxPrice) {
    const floor = Number(minPrice);
    const ceil = Number(maxPrice);

    if (floor) {
      filter.price = {
        $gte: floor,
      };
    }

    if (ceil) {
      filter.price = {
        $lte: ceil,
      };
    }

    if (floor && ceil) {
      filter.price = {
        $gte: floor,
        $lte: ceil,
      };
    }
  }

  const properties = await Property.find(filter).limit(perPage).skip(skip);

  const total = await Property.countDocuments(filter);
  const totalPages = Math.ceil(total / perPage);
  const pagination = {
    page: currentPage,
    limit: perPage,
    totalPages: totalPages,
    total: total,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
  };

  sendResponse(res, {
    message: "All properties fetched",
    data: { properties, pagination },
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

//! Sep 9

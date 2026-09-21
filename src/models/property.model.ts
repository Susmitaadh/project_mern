import mongoose from "mongoose";
import { PropertyType, PropertyPriceType } from "../types/enum.types";
import { IImage } from "../types/global.types";
import imageSchema from "./image.model";

interface TProperty {
  host: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  price_type: PropertyPriceType;
  address: {
    country: string;
    city: string;
    street_name: string;
    zipcode: string;
  };
  rooms: number;
  property_type: PropertyType;
  cover_image: IImage;
  images: IImage[];
}

const propertySchema = new mongoose.Schema<TProperty>({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  name: {
    type: String,
    trim: true,
    minLength: 5,
    maxlength: 50,
  },

  description: {
    type: String,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  price_type: {
    type: String,
    enum: Object.values(PropertyPriceType),
    default: PropertyPriceType.PER_DAY,
  },

  address: {
    type: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street_name: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    required: true,
  },

  rooms: {
    type: Number,
    required: true,
    min: 1,
  },

  property_type: {
    type: String,
    required: true,
    enum: Object.values(PropertyType),
  },

  cover_image: {
    type: imageSchema,
    required: [true, "Cover image is required"],
  },

  images: {
    type: [imageSchema],
    required: [true, "Images is required"],
  },
});

const Property = mongoose.model<TProperty>("Property", propertySchema);
export default Property;

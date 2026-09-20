import mongoose, { Document } from "mongoose";
import { Role } from "../types/enum.types";
import imageSchema from "./image.model";
import { IImage } from "../types/global.types";

//* interface
export interface IUserDocument extends Document {
  full_name: string;
  email: string;
  password: string;
  profile_image?: IImage;
  phone?: string;
  role: Role;
}

//* user schema
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [3, "Full name must be at least 2 characters long"],
      trim: true,
    },

    email: {
      type: String,
      unique: [true, "User already exists with provided email"],
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(Role), // ['USER','ADMIN']
      default: Role.USER,
    },

    profile_image: {
      type: imageSchema,
      default: null,
    },

    phone: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true },
);

//* user model
const User = mongoose.model<IUserDocument>("user", userSchema);
export default User;

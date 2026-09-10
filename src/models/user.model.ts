import mongoose, { Document } from "mongoose";

//* enum
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

//* interface
interface IUserDocument extends Document {
  full_name: string;
  email: string;
  password: string;
  profile_image?: string;
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
    },
    role: {
      type: String,
      enum: Object.values(Role), // ['USER','ADMIN']
      default: Role.USER,
    },
    profile_image: {
      type: String,
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

import mongoose from "mongoose";

interface IAmenityDocument extends Document {
  name: string;
  description: string;
  logo: string;
  user: mongoose.Types.ObjectId;
}

const amenitySchema = new mongoose.Schema<IAmenityDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      unique: [true, "Amenity already exists"],
      minLength: [3, "At least 3 characters are required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      minLength: [10, "At least 10 characters are required"],
    },

    logo: {
      type: String,
      required: [true, "Logo is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "user",
    },
  },
  { timestamps: true },
);

const Amenity = mongoose.model("amenity", amenitySchema);
export default Amenity;

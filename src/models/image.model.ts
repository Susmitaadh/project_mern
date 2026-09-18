import mongoose, { Document } from "mongoose";

interface IImageDocument extends Document {
  path: string;
  public_id: string;
}

const imageSchema = new mongoose.Schema<IImageDocument>(
  {
    path: {
      type: String,
      required: [true, "Image path is required"],
    },
    public_id: {
      type: String,
      required: [true, "Image public id is required"],
    },
  },
  { _id: false },
);

export default imageSchema;

import mongoose from "mongoose";

interface TReview {
  booking_id: string;
  user_id: string;
  property_id: string;
  comment: string;
  rating: number;
}

const reviewSchema = new mongoose.Schema<TReview>({
  user_id: {
    type: String,
    trim: true,
  },

  booking_id: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
  },

  comment: {
    type: String,
    trim: true,
  },

  property_id: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model<TReview>("review", reviewSchema);
export default Review;

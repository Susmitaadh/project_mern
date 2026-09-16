// user;host, name, tyope:enum, rooms, price, description, price_type: [per_hour, per_day], address:{},

// animity model name icon desc, user_id

// booking: user, property, totalprice, payment_status, checkedin, checkedout

//review: user, property_id, booking, rating, comment:

import mongoose from "mongoose";
import { PropertyType, PropertyPriceType } from "../types/enum.types";
import { number } from "zod";

interface TProperty {
  host: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price_type: PropertyPriceType;
  address: {
    country: string;
    city: string;
    street_name: string;
    zipcode: string;
  };
  rooms: number;
  property_type: PropertyType;
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
  price: { type: Number, required: true, min: 0 },
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
    type: number,
  },
  property_type: {
    type: String,
    required: true,
    enum: Object.values(PropertyType),
  },
});

const Property = mongoose.model<TProperty>("Property", propertySchema);
export default Property;

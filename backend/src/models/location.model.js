import mongoose from "mongoose";


const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: [true, "Please location name is required"],
    },
    category: {
      type: String,
      required: [true, "Please category is required"],
    },
    description: {
      type: String,
    },
    coordinates: {
      type: [Number],
      required: [true, "Please coordinates are required"],
    },
    userId: {
      type: String,
      required: [true, "Please user ID is required"],
    },
    username: {
      type: String,
      required: [true, "Please username is required"],
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
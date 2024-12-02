import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: () => "Please enter a valid price",
      },
    },
    description: { type: String, required: [true, "Description is required"] },
    dateposted: { type: Date, default: Date.now, required: true },
    images: {
      type: [String],  // Array of strings for ImageKit image URLs
      required: [true, "At least one image URL is required"], // Optional: can be made required based on your needs
      validate: {
        validator: function (value) {
          return value.length > 0; // Ensure there is at least one image URL
        },
        message: () => "Please provide at least one image URL",
      },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to User
  },
  { collection: "Listings" }
);

const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing
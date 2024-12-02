import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      default: [],
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: [],
    },
  ],
});

// Use `mongoose.models` to prevent recompiling the model
const User = mongoose.models.Users || mongoose.model("Users", UserSchema, "Users");

export default User;

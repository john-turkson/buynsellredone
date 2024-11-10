import mongoose from "mongoose";
import User from "../../models/User";
import { hashPassword } from '@/utils/password-hashing';
import { config } from 'dotenv';

config(); 

const DEFAULT_PROFILE_PICTURE = 'https://res.cloudinary.com/ddznwdhef/image/upload/v1731142760/default_profile_hsnicz.jpg';

export const handler = async (event) => {
    
  // CORS Preflight Handler
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
      },
    };
  }

  try {
    // Get Form Data
    const { username, password, email, phone, profilePicture } = JSON.parse(event.body);

    // Ensure Data is valid
    if (!username || !password || !email || !phone) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ message: "All fields are required" }),
      };
    }

    // Initiate MongoDB Connection with Mongoose
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'Main' });

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ message: "User already exists" }),
      };
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Create New User
    const newUser = new User({ username, password: hashedPassword, email, phone });
    
    if (profilePicture && profilePicture !== "") {
      newUser.profilePicture = profilePicture
    } else {
      newUser.profilePicture = DEFAULT_PROFILE_PICTURE;
    }

    await newUser.save();

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: "User created successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};

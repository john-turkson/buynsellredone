// netlify/functions/mongodb-connect.js

require('dotenv').config();


import { connect } from "mongoose";
const { MONGODB_URI } = process.env;


// Define and export the handler function
export async function handler() {
  try {
    // Initiate MongoDB Connection using mongoose
    await connect(MONGODB_URI, { dbName: 'Main', });
    console.log("Connected to MongoDB!");

    // Return a successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to MongoDB!' })
    };
  } catch (error) {
    // Return an error response if connection fails
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to connect to MongoDB', error: error.message })
    };
  }
}

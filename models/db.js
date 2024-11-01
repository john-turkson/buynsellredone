// models/db.js
import { connect } from "mongoose";

async function connectToDB() {
  // Initiate MongoDB Connection
  try {
    await connect(process.env.MONGODB_URI, { dbName: 'Main', useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB: ', error);
  }
}

export default connectToDB;

import "dotenv/config";
import env from "../util/validateEnv.js";
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Could not connect to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;

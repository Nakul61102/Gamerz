import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected!!")

    } catch (error) {
        console.log("Error in DB connection", error)
        process.exit(1)
    }

}

export default connectDB
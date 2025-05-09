import mongoose from "mongoose"

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successfully")
    } catch (error) {
        console.error("Database connection problem", error.message)
    }
};

export default connectDb;
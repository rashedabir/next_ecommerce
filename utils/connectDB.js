import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected.");
    return;
  }
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) throw err;
      console.log("CONNECTED TO MONGODB...");
    }
  );
};

export default connectDB;

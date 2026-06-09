import mongoose from "mongoose";

export const connectDB = async () => {
  {
    await mongoose.connect('mongodb://ar2529345_db_user:21345@ac-dqkjdnc-shard-00-00.xposvuz.mongodb.net:27017,ac-dqkjdnc-shard-00-01.xposvuz.mongodb.net:27017,ac-dqkjdnc-shard-00-02.xposvuz.mongodb.net:27017/?ssl=true&replicaSet=atlas-dmvl8u-shard-0&authSource=admin&appName=Cluster0food_delivery');
    console.log("✓ Database connected successfully");
  } 
};

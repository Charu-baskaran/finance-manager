// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected...');
//   } catch (error) {
//     console.error('MongoDB Connection Error:', error);
//     process.exit(1);
//   }
// };

// export default connectDB; 

import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    //mongo server url
    const url = "mongodb://127.0.0.1:27017/finmanager";

    const {connection} = await mongoose.connect(url);

    console.log(`MongoDB Connection successful to ${connection.host}`);

}
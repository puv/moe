import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions;

export default mongoose.connect(process.env.DB_URI!, options);

export { }

// module.exports = mongoose.connect(process.env.DB_URI!, options);
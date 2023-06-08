import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI as string;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDBUri);
  //em caso de uso do docker subistituir por await mongoose.connect(`mongodb://127.0.0.1:27017/EventLocation`);
}

export default mongoose;

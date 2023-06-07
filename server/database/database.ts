import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI as string;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDBUri);
  // await mongoose.connect(`mongodb://127.0.0.1:27017/EventLocation`);

  console.log("Database Connected");
}

export default mongoose;

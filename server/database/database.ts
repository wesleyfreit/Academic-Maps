import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI as string;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDBUri);
}

export default mongoose;

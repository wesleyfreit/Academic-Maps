import mongoose from "mongoose";

const db_host = process.env.DB_HOST;
const db_name = process.env.DB_NAME as string;

async function main() {
  await mongoose.connect(`mongodb://${db_host}/${db_name}`);

  console.log("Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default  main ;

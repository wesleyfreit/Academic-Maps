import mongoose from "mongoose";
import connection from "../../database/dabase";

connection.main().catch((err) => console.log(err));

const eventSchema = new mongoose.Schema({
  titulo: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  descricao: String,
});

const Event = mongoose.model("Event", eventSchema);

export default { Event };

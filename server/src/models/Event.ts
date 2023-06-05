import mongoose from "mongoose";
import connection from "../../database/database";

connection().catch((err) => console.log(err));

const eventSchema = new mongoose.Schema({
  title: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  description: String,
  point: {
    type: { type: String },
    coordinates: { type: Array },
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

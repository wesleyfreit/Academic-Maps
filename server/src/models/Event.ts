import mongoose from "../../database/database";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    description: String,
    point: {
      type: { type: String },
      coordinates: { type: Array },
    },
  },
  { collection: "events" }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;

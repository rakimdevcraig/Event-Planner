const mongoose = require("mongoose");

//Subschemas/Subdocuments
const generalInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    client: { type: String, required: true },
    location: { type: String, required: true },
    guests: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { _id: false },
);

const staffSchema = new mongoose.Schema(
  {
    name: { type: String },
    start: { type: String },
    end: { type: String },
  },
  { _id: false },
);

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: String },
    qty: { type: Number },
  },
  { _id: false },
);

const barItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    startQty: { type: Number },
    endQty: { type: Number, default: 0 },
  },
  { _id: false },
);

const foodSchema = new mongoose.Schema(
  {
    firstCourse: String,
    secondCourse: String,
    dessert: String,
    allergies: String,
    misc: String,
  },
  { _id: false },
);

/* ---------- Main Schema ---------- */

const eventSchema = new mongoose.Schema(
  {
    generalInfo: {
      type: generalInfoSchema,
      required: true,
    },
    staff: [staffSchema],
    equipment: [equipmentSchema],
    bar: [barItemSchema],
    food: foodSchema,
    feedback: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

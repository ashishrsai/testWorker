const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerSchema = new Schema({
  workerName: {
    type: String,
    required: false,
    trim: true,
  },
  workerCoordinator: {
    type: mongoose.Schema.ObjectId,
    ref: "coordinator",
  },
  workerPhoneNumber: {
    type: Number,
    required: true,
  },

  workerCity: {
    type: String,
    required: false,
  },
  workerState: {
    type: String,
    required: false,
  },
  workerSkills: [
    {
      type: String,
    },
  ],
  statePreference: [
    {
    type: String,
    },
  ],
  cityPreference: [
    {
        type: String,
        },
  ],

  minimumWorkDuration: {
    type: String,
    required: false,
  },
  minimumWage: {
    type: Number,
    required: false,
  },
  relocationCost: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Worker = mongoose.model("worker", workerSchema);

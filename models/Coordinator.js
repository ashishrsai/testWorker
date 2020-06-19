const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinatorSchema = new Schema({
  coordinatorName: {
    type: String,
    required: true,
    trim: true,
  },
  coordinatorPhoneNumber: {
    type: Number,
    required: true,
  },
  coordinatorState: {
    type: String,
    required: true,
  },
  coordinatorCity:{
    type: String,
    required: true,
  },
  
  coordinatorWorkerAssignments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "worker",
      },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Coordinator = mongoose.model("coordinator", coordinatorSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  supply: {
    type: Number,
    required: true,
  },
  demand: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = Stats = mongoose.model("stats", statsSchema);

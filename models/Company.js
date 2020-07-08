const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  contactPersonName: {
    type: String,
    required: true,
  },
  companyPhoneNumber: {
    type: String,
    required: true,
  },
  contactPersonDesignation: {
    type: String,
    required: false,
  },
  gstNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  moreLocation: [
    {
      state: String,
      city: String,
    },
  ],
  labour: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "labourRequirement",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Company = mongoose.model("company", companySchema);
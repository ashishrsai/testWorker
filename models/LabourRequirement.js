const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const LabourRequirementSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    companyPhoneNumber: {
      type: String,
      required: true,
    },
    stateName:{
        type: String,
        required: true
      },
      cityName:{
        type: String
      },
      relocationCost: {
        type: Boolean,
       
      },
      minimumDurationOfWork: {
        type: String,
        
      },
      maximumWagePerHour: {
        type: String,
       
      },
      labourRequired: {
        type: Number,
       
      },
      skillsNeeded: [
          {
        type: String,
       
      },],
      company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
      },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = LabourRequirement = mongoose.model("labourRequirement", LabourRequirementSchema);
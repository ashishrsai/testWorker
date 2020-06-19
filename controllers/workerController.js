const Worker = require("../models/Worker");
const Company = require("../models/Company");
const mongoose = require("mongoose");
const LabourRequirement = require("../models/LabourRequirement");
// Method to onBoard a worker
exports.addWorker = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  const {
    workerName,
    workerCity,
    workerState,
    workerSkills,
    statePreference,
    cityPreference,
    minimumWorkDuration,
    minimumWage,
    relocationCost,
  } = req.body;
  const worker = new Worker({
    workerName,
    workerPhoneNumber,
    workerCity,
    workerState,
    workerSkills,
    statePreference,
    cityPreference,
    minimumWorkDuration,
    minimumWage,
    relocationCost,
  });
  worker.save();
  return res.json({ message: "Worker registered" });
};
// Labour Dash Board
// 1. Company Selection Logic

exports.companySelection = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  // Implimenting step 1
  let worker = await Worker.find({
    workerPhoneNumber: Number(workerPhoneNumber),
  });
  statePreference = worker[0].statePreference;
  skills = worker[0].workerSkills;
  //console.log(skills);
  //Now I need to find companies who are looking for people in State and with skills

  let requirementWithStateAndSkillsPreference = await LabourRequirement.find({
    stateName: statePreference,
    skillsNeeded: { $in: skills },
  });
  //Now I need to get the company details companyName, city, contact person name, phoneNumber
  //console.log(requirementWithStateAndSkillsPreference);
  let companiesThatMatchStateAndSkills = [];
  for (i = 0; i < requirementWithStateAndSkillsPreference.length; i++) {
    let companyList = [];
    let company = await Company.findById(
      requirementWithStateAndSkillsPreference[i].company
    );
    console.log("companydata", company);
    let companyName = company.companyName;
    companyList.push(companyName);
    let companyPhoneNumber = company.companyPhoneNumber;
    companyList.push(companyPhoneNumber);
    let contactPersonName = company.contactPersonName;
    companyList.push(contactPersonName);
    let city = requirementWithStateAndSkillsPreference[i].cityName;
    companyList.push(city);
    // We might have to fix douplicates if there are two requirements by the same company
    companiesThatMatchStateAndSkills.push(companyList);
  }
  // console.log(typeof(companiesThatMatchStateAndSkills));

  return res.json(companiesThatMatchStateAndSkills);
};

exports.activeLabourStats = async (req, res) => {
  const totalLabour = await Worker.countDocuments();
  // console.log(number);
  //Now I need to find distinct values for state field
  let distinctValuesOfStates = await Worker.distinct("workerState");
  // console.log(distinctValuesOfStates);
  const frequencyOfStates = [];
  for (i = 0; i < distinctValuesOfStates.length; i++) {
    const countQuery = await Worker.countDocuments({
      workerState: distinctValuesOfStates[i],
    });
    frequencyOfStates.push(countQuery);
  }
  // Now we just need to sort this by highest value and
  // console.log(frequencyOfStates)
  let total = frequencyOfStates.reduce((a, b) => a + b, 0);
  // Caclulating the percentage value
  for (var i = 0, length = frequencyOfStates.length; i < length; i++) {
    frequencyOfStates[i] = (frequencyOfStates[i] / total) * 100;
  }
  //console.log(frequencyOfStates);

  const combinedValue = [distinctValuesOfStates, frequencyOfStates];
  combinedValue.sort(sortFunction);

  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? -1 : 1;
    }
  }
  // Now I only want to send top 4 values of this 2D array
  var slicedCombinedValue = combinedValue.map(function (subarray) {
    return subarray.slice(0, 4);
  });

  var topStates = slicedCombinedValue[0];
  var percentageShare = slicedCombinedValue[1];

  // Now I need to calculate the percentage
  //console.log(slicedCombinedValue);
  return res.json({ totalLabour, topStates, percentageShare });
};

exports.activeJobsStats = async (req, res) => {
  const totalJobs = await LabourRequirement.countDocuments();
  //console.log(totalJobs);
  //Now I need to find distinct values for state field
  let distinctValuesOfStates = await LabourRequirement.distinct("stateName");
  //console.log(distinctValuesOfStates);

  const frequencyOfStates = [];
  for (i = 0; i < distinctValuesOfStates.length; i++) {
    const countQuery = await LabourRequirement.countDocuments({
      stateName: distinctValuesOfStates[i],
    });
    frequencyOfStates.push(countQuery);
  }
  // Now we just need to sort this by highest value and
  // console.log(frequencyOfStates)
  let total = frequencyOfStates.reduce((a, b) => a + b, 0);
  // Caclulating the percentage value
  for (var i = 0, length = frequencyOfStates.length; i < length; i++) {
    frequencyOfStates[i] = (frequencyOfStates[i] / total) * 100;
  }
  //console.log(frequencyOfStates);

  const combinedValue = [distinctValuesOfStates, frequencyOfStates];
  combinedValue.sort(sortFunction);

  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? -1 : 1;
    }
  }
  // Now I only want to send top 4 values of this 2D array
  var slicedCombinedValue = combinedValue.map(function (subarray) {
    return subarray.slice(0, 4);
  });

  var topStates = slicedCombinedValue[0];
  var percentageShare = slicedCombinedValue[1];
  // Now I need to calculate the percentage
  //console.log(slicedCombinedValue);
  return res.json({ totalJobs, topStates, percentageShare });
};

exports.lookingForText = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  let worker = await Worker.find({
    workerPhoneNumber: Number(workerPhoneNumber),
  });
  //console.log(worker);

  location = worker[0].statePreference;
  days = worker[0].minimumWorkDuration;

  let result = worker.map((item) => {
    return {
      location: item.statePreference,
      days: item.minimumWorkDuration,
    };
  });
  return res.json({ result });
};

exports.getName = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  let worker = await Worker.find({
    workerPhoneNumber: Number(workerPhoneNumber),
  });
  // I am assuming that the list will only return one company that matches the given number
  let name = worker.length > 0 ? worker[0].workerName : "";
  return res.json({ name });
};

exports.jobsAvailableStats = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  let worker = await Worker.find({
    workerPhoneNumber: Number(workerPhoneNumber),
  });
  // I am assuming that the list will only return one company that matches the given number
  let statePreference = worker[0].statePreference;
  console.log(statePreference);
  // based on length of this we want to go through labourRequirement page and get a count value
  let requirementWithStateAndSkillsPreference = await LabourRequirement.find({
    stateName: statePreference,
  });
  console.log(requirementWithStateAndSkillsPreference.length);
  location = [];
  for (i = 0; i < requirementWithStateAndSkillsPreference.length; i++) {
    location.push(requirementWithStateAndSkillsPreference[i].cityName);
  }
  var jobs = {};
  location.forEach(function (x) {
    jobs[x] = (jobs[x] || 0) + 1;
  });

  return res.json({ jobs });
};

exports.deleteWorker = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  Worker.deleteOne({ workerPhoneNumber: Number(workerPhoneNumber) }, function (
    err
  ) {
    if (err) return handleError(err);
  });

  User.deleteOne({ _id: req.user.id }, function (err) {
    if (err) return handleError(err);
  });
  res.json({ message: "Worker Deleted" });
};

// getEdittableWorkerDetails
exports.getEdittableWorkerDetails = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  let worker = await Worker.find({
    workerPhoneNumber: Number(workerPhoneNumber),
  });
  // I am assuming that the list will only return one company that matches the given number
  let workerName = worker[0].workerName;

  return res.json({ workerName, workerPhoneNumber });
};

//update phone number and contact
exports.updatePhoneAndConactNumber = async (req, res) => {
  const { phoneNumber: workerPhoneNumber } = await User.findById(req.user.id);
  const filter = { workerPhoneNumber: Number(workerPhoneNumber) };
  const update = {
    workerPhoneNumber: req.body.workerPhoneNumber,
    workerName: req.body.workerName,
  };
  let doc = await Worker.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (req.body.workerPhoneNumber) {
    const filter = { _id: req.user.id };
    const update = { phoneNumber: req.body.workerPhoneNumber };
    let docForUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
  return res.json({ message: "Updated Properly" });
};

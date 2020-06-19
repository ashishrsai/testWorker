const Company = require("../models/Company");
const User = require("../models/User");
const LabourRequirement = require("../models/LabourRequirement");
const worker = require("../models/Worker");
const mongoose = require("mongoose");

exports.getAllCompanies = async (req, res) => {
  const listOfCompanies = await Company.find();
  return res.json(listOfCompanies);
};

exports.addCompany = async (req, res) => {
  const { companyName, contactPersonName, state, city } = req.body;
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  const company = new Company({
    companyName,
    contactPersonName,
    companyPhoneNumber,
    state,
    city,
  });
  company.save();
  return res.json({ message: "Company Added" });
};

//Controller to add a new labour requirement - Company - Labour Requirement Page

exports.addLabourRequirement = async (req, res) => {
  const {
    stateName,
    cityName,
    relocationCost,
    minimumDurationOfWork,
    maximumWagePerHour,
    labourRequired,
    skillsNeeded,
  } = req.body;
  const _id = new mongoose.Types.ObjectId();
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  const labour = new LabourRequirement({
    _id,
    companyPhoneNumber,
    stateName,
    cityName,
    relocationCost,
    minimumDurationOfWork,
    maximumWagePerHour,
    labourRequired,
    skillsNeeded,
  });
  labour.save();
  // We also need to add this requirement to the company profile
  const filter = { companyPhoneNumber };
  let update = { $push: { labour: _id } };
  let doc = await Company.findOneAndUpdate(filter, update, {
    new: true,
  });
  let filterLabour = { _id };
  let updateLabour = { $push: { company: doc._id } };
  let docNew = await LabourRequirement.findOneAndUpdate(
    filterLabour,
    updateLabour,
    {
      new: true,
    }
  );
  return res.json({ message: "Labour Requirement Registered" });
};

// Company Dashboard
// 1. /company/getName

exports.getName = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let company = await Company.find({
    companyPhoneNumber: companyPhoneNumber,
  });
  // I am assuming that the list will only return one company that matches the given number
  let companyName = company.length > 0 ? company[0].companyName : "";
  return res.json({ companyName });
};

// 2. /company/lookingForText

exports.lookingForText = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let company = await Company.find({
    companyPhoneNumber: companyPhoneNumber,
  }).populate("labour");
  console.log("this-->company", company);
  let labour = company[0].labour;
  let result = labour.map((item) => {
    return {
      cityName: item.cityName,
      minimumDurationOfWork: item.minimumDurationOfWork,
    };
  });
  return res.json({ result });
};

// 3. /company/activeLabourStats
// I need to impliment labour logic for this. (Done)
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

  var percentageShare = slicedCombinedValue[1];
  var topStates = slicedCombinedValue[0];
  

  // Now I need to calculate the percentage
  //console.log(slicedCombinedValue);
  return res.json({ totalLabour, topStates, percentageShare });
};

// 4. /company/labourSelection
// First - fetch company requirement
// Second - find labour with similar preferences (current filteration is only till state and skills)
// return -  "labourName":"Chanu Ram", "city":"Mumbai", "skills":"fishermen", "phoneNumber":"9876543210"

exports.labourSelection = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  console.log("companyPhoneNumber", companyPhoneNumber);
  // Implimenting step 1
  let company = await Company.find({
    companyPhoneNumber: Number(companyPhoneNumber),
  }).populate("labour");
  let workersThatMatchStateAndSkills = [];
  let labour = company[0].labour;
  let companyCityLocation = [];
  for (i = 0; i < labour.length; i++) {
    //console.log(labour[i]);
    //location.push(labour[i].stateName);
    let workersWithStatePreference = await Worker.find({
      statePreference: labour[i].stateName,
    });
    //console.log("Printing Worker ",workersWithStatePreference);
    // let us check if the worker meets the skills requirement
    function isEmpty(obj) {
      return !obj || Object.keys(obj).length === 0;
    }
    //console.log(isEmpty(workersWithStatePreference));
    for (j = 0; j < workersWithStatePreference.length; j++) {
      if (!isEmpty(workersWithStatePreference)) {
        console.log(typeof workersWithStatePreference[j].workerSkills);
        if (
          labour[i].skillsNeeded.filter((value) =>
            workersWithStatePreference[j].workerSkills.includes(value)
          )
        ) {
          console.log("Yes there is a match");
          workersThatMatchStateAndSkills.push(workersWithStatePreference[j]);
          companyCityLocation.push(labour[i].cityName);
        } else {
          console.log("No there is not a match");
        }
      }
    }
  }
  //console.log("Workers that match both state and skills filter",workersThatMatchStateAndSkills);
  // return -  "labourName":"Chanu Ram", "city":"Mumbai", "skills":"fishermen", "phoneNumber":"9876543210"
  //console.log("0th location worker",workersThatMatchStateAndSkills.length,companyCityLocation.length);
  // Logic to create the expected output
  let output = [];
  for (i = 0; i < workersThatMatchStateAndSkills.length; i++) {
    let worker = [];
    let labourName = workersThatMatchStateAndSkills[i].workerName;
    worker.push(labourName);
    let city = companyCityLocation[i];
    worker.push(city);
    let skills = workersThatMatchStateAndSkills[i].workerSkills;
    worker.push(skills);
    let phoneNumber = workersThatMatchStateAndSkills[i].workerPhoneNumber;
    worker.push(phoneNumber);
    output.push(worker);
  }

  return res.json({ output });
};

// Company Details Page

// 1. /company/currentRequest

exports.currentRequest = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let company = await Company.find({
    companyPhoneNumber: Number(companyPhoneNumber),
  }).populate("labour");
  let labour = company[0].labour;
  let totalRequests = company[0].labour.length;
  let result = [];
  for (i = 0; i < labour.length; i++) {
    result.push({
      workers: labour[i].labourRequired,
      numOfDays: labour[i].minimumDurationOfWork,
    });
  }
  return res.json({ result, totalRequests });
};

// 2. Delete Company
exports.deleteCompany = async (req, res) => {

  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let companyID = await Company.find({
    companyPhoneNumber: Number(companyPhoneNumber),
  });

  //We first need to delete all the labourRequest byy this company
  let requirementByThisCompany = await LabourRequirement.find({
    company: { $in: companyID[0]._id}
  });
 

  for(i=0;i<requirementByThisCompany.length;i++){
    LabourRequirement.deleteOne({ _id: requirementByThisCompany[i]._id }, function (err) {
        if (err) return handleError(err);
       });
  }
  Company.deleteOne(
    { companyPhoneNumber: Number(companyPhoneNumber) },
    function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    }
  );

  User.deleteOne({ _id: req.user.id }, function (err) {
    if (err) return handleError(err);
  });

  res.json({ message: "Company Deleted" });
};
// 3. /company/getEditableCompanyDetails
exports.getEditableCompanyDetails = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let company = await Company.find({
    companyPhoneNumber: Number(companyPhoneNumber),
  });
  //console.log(company);
  let contactPersonName = company[0].contactPersonName;

  return res.json({ contactPersonName, companyPhoneNumber });
};

// 4. /company/getLocation
exports.getLocation = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  let company = await Company.find({
    companyPhoneNumber: companyPhoneNumber,
  });
  let location = [];
  // Add state and city to location
  let stateCityCombined = company[0].state + "-" + company[0].city;
  location.push(stateCityCombined);
  //console.log(stateCityCombined);
  // Lets check if the company has additional locations
  //console.log("Printing City",company[0].moreLocation[1].city);
  if (company[0].moreLocation.length > 0) {
    console.log("More location");
    for (i = 0; i < company[0].moreLocation.length; i++) {
      let moreStateCityCombined =
        company[0].moreLocation[i].state +
        "-" +
        company[0].moreLocation[i].city;
      location.push(moreStateCityCombined);
    }
  }
  return res.json({ location });
};

// 5. /company/addANewLocation
exports.addANewLocation = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  const state = req.body.state;
  const city = req.body.city;
  let company = await Company.find({
    companyPhoneNumber: companyPhoneNumber,
  });

  Company.findOneAndUpdate(
    { _id: company[0]._id },
    { $push: { moreLocation: { city: city, state: state } } },
    { new: true },
    (err, result) => {
      // Rest of the action goes here
    }
  );

  return res.json({ message: "New Location Added" });
};

exports.findLabour = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  console.log(companyPhoneNumber);
  let comapny = await Company.find({
    companyPhoneNumber: Number(companyPhoneNumber),
  }).populate("labour");
  console.log(comapny);
  return res.json(comapny);
};

//update phone number and contact
exports.updatePhoneAndConactPerson = async (req, res) => {
  const { phoneNumber: companyPhoneNumber } = await User.findById(req.user.id);
  const filter = { companyPhoneNumber: companyPhoneNumber };
  const update = {
    companyPhoneNumber: req.body.companyPhoneNumber,
    contactPersonName: req.body.contactPersonName,
  };
  let doc = await Company.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (req.body.companyPhoneNumber) {
    const filter = { _id: req.user.id };
    const update = { phoneNumber: req.body.companyPhoneNumber };
    let docForUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  return res.json({ message: "Updated Properly" });
};

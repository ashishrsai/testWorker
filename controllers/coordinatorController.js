const Coordinator = require("../models/Coordinator");
const mongoose = require("mongoose");

// Method to signUp a Coordintaor
exports.signUpCoordinator = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  const { personName, city, state } = req.body;
  const coordinator = new Coordinator({
    coordinatorName: personName,
    coordinatorPhoneNumber: coordinatorPhoneNumber,
    coordinatorCity: city,
    coordinatorState: state,
  });
  coordinator.save();
  return res.json({ message: "Coordinator registered" });
};

// Method to addLabour by a coordinator
exports.addLabour = async (req, res) => {
  console.log("req.body", req.body);
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  console.log("Coordinator Phone Number", coordinatorPhoneNumber);
  const {
    labourerName,
    labourerPhoneNumber,
    preference,
    labourerState,
    skills,
    minimumWage,
    minimumWorkDuration,
    relocationCost,
  } = req.body;
  const worker = new Worker({
    workerName: labourerName,
    workerPhoneNumber: labourerPhoneNumber,
    workerState: labourerState,
    workerSkills: skills,
    statePreference: preference,
    minimumWorkDuration: minimumWorkDuration,
    minimumWage: minimumWage,
    relocationCost: relocationCost,
  });
  worker.save();
  Coordinator.findOneAndUpdate(
    { coordinatorPhoneNumber: coordinatorPhoneNumber },
    { $push: { coordinatorWorkerAssignments: worker } },
    { new: true },
    (err, result) => {
      // Rest of the action goes here
    }
  );

  return res.json({ message: "Worker registered...." });
};

// Labour Dash Board
// 1. Company Selection Logic

exports.companySelection = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  // Implimenting step 1
  let coordinator = await Coordinator.find({
    coordinatorPhoneNumber: Number(coordinatorPhoneNumber),
  });
  // need to find worker
  workerIDs = coordinator[0].coordinatorWorkerAssignments;
  //console.log("This is workerID",workerIDs);
  let companiesThatMatchStateAndSkills = [];

  //console.log("this is last worker",workerIDs.length);

  for (i = 0; i < workerIDs.length; i++) {
    //console.log("==============Value of i=============",i);
    let worker = await Worker.findById(workerIDs[i]);
    //console.log("this is worker",worker);
    statePreference = worker.statePreference;

    skills = worker.workerSkills;
    console.log(worker);
    //console.log(skills);
    //Now I need to find companies who are looking for people in State and with skills

    let requirementWithStateAndSkillsPreference = await LabourRequirement.find({
      stateName: statePreference,
      skillsNeeded: { $in: skills },
    });

    //console.log("this is lab req",requirementWithStateAndSkillsPreference);
    //Now I need to get the company details companyName, city, contact person name, phoneNumber

    for (j = 0; j < requirementWithStateAndSkillsPreference.length; j++) {
      let companyList = [];
      let company = await Company.findById(
        requirementWithStateAndSkillsPreference[j].company
      );
      let companyName = company.companyName;
      companyList.push(companyName);
      let companyPhoneNumber = company.companyPhoneNumber;
      companyList.push(companyPhoneNumber);
      let contactPersonName = company.contactPersonName;
      companyList.push(contactPersonName);
      let city = requirementWithStateAndSkillsPreference[j].cityName;
      companyList.push(city);
      // We might have to fix douplicates if there are two requirements by the same company
      companiesThatMatchStateAndSkills.push(companyList);
    }
  }

  // console.log(typeof(companiesThatMatchStateAndSkills));

  return res.json(companiesThatMatchStateAndSkills);
};

exports.lookingForText = async (req, res) => {
  // You have to handle it on front end and show something like Looking for 5 days jobs in GJ RJ MH for 4 people
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  let coordinator = await Coordinator.find({
    coordinatorPhoneNumber: Number(coordinatorPhoneNumber),
  }).populate("coordinatorWorkerAssignments");
  //console.log(coordinator);
  let labour = coordinator[0].coordinatorWorkerAssignments;
  console.log("coordinator", coordinator);
  //console.log("Logging labour",labour);
  const result = labour.map((item) => ({
    location: item.statePreference,
    days: item.minimumWorkDuration,
  }));

  return res.json({ result });
};

exports.getName = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  let coordinator = await Coordinator.find({
    coordinatorPhoneNumber: Number(coordinatorPhoneNumber),
  });
  // I am assuming that the list will only return one company that matches the given number
  // console.log(coordinator);
  let name = coordinator.length > 0 ? coordinator[0].coordinatorName : "";
  return res.json({ name });
};

exports.jobsAvailableStats = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  let coordinator = await Coordinator.find({
    coordinatorPhoneNumber: Number(coordinatorPhoneNumber),
  }).populate("coordinatorWorkerAssignments");
  location = [];

  for (i = 0; i < coordinator[0].coordinatorWorkerAssignments.length; i++) {
    let labour = coordinator[0].coordinatorWorkerAssignments[i];
    let statePreference = labour.statePreference;
    let requirementWithStateAndSkillsPreference = await LabourRequirement.find({
      stateName: statePreference,
    });
    for (j = 0; j < requirementWithStateAndSkillsPreference.length; j++) {
      location.push(requirementWithStateAndSkillsPreference[j].cityName);
    }
  }
 
  var jobs = {};
  location.forEach(function (x) {
    jobs[x] = (jobs[x] || 0) + 1;
  });

  return res.json({ jobs });
};

exports.deleteCoordinator = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  Coordinator.deleteOne(
    { coordinatorPhoneNumber: Number(coordinatorPhoneNumber) },
    function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    }
  );

  User.deleteOne({ _id: req.user.id }, function (err) {
    if (err) return handleError(err);
  });

  res.json({ message: "Coordinator Deleted" });
};

// getEdittableWorkerDetails
exports.getEdittableWorkerDetails = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  let coordinator = await Coordinator.find({
    coordinatorPhoneNumber: Number(coordinatorPhoneNumber),
  }).populate("coordinatorWorkerAssignments");
  //console.log(coordinator);
  /*
    We need to use this in future to get a full list of all labours under a cordinator
    labourName = [];
    for(i=0;i<coordinator[0].coordinatorWorkerAssignments.length;i++){
        let labour = coordinator[0].coordinatorWorkerAssignments[i];
        labourName.push(labour.workerName);
    }
    */
  let coordinatorName = coordinator[0].coordinatorName;

  return res.json({ coordinatorName, coordinatorPhoneNumber });
};

//update phone number and contact name
exports.updatePhoneAndConactNumber = async (req, res) => {
  const { phoneNumber: coordinatorPhoneNumber } = await User.findById(
    req.user.id
  );
  const filter = { coordinatorPhoneNumber: Number(coordinatorPhoneNumber) };
  const update = {
    coordinatorPhoneNumber: coordinatorPhoneNumber,
    coordinatorName: req.body.coordinatorName,
  };
  let doc = await Coordinator.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (req.body.coordinatorPhoneNumber) {
    const filter = { _id: req.user.id };
    const update = { phoneNumber: req.body.coordinatorPhoneNumber };
    let docForUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  return res.json({ message: "Updated Properly" });
};

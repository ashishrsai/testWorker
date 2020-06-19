const Company = require('../models/Company');
const LabourRequirement = require('../models/LabourRequirement');
const worker = require('../models/Worker');
const mongoose = require("mongoose");
const stats = require('../models/stats');
var schedule = require('node-schedule');
var moment = require ('moment')


var j = schedule.scheduleJob('0 0 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

// 1. getAvgWage
exports.getAvgWage = async (req,res)=>{
    let allWages = await LabourRequirement.find({}).select('maximumWagePerHour -_id'); 
    // now calculating the avg of this array
    var sum = 0;
    allWages.forEach(calculateSum);
    function calculateSum(item) {
        sum += Number(item.maximumWagePerHour);
      }
    let avgWage = sum/allWages.length;
    return res.json({avgWage});
}

// 2. getAvgWorkTime
exports.getAvgWorkTime = async (req,res)=>{
    let allWorkTime = await LabourRequirement.find({}).select('minimumDurationOfWork -_id'); 
    // now calculating the avg of this array
    var sum = 0;
    allWorkTime.forEach(calculateSum);
    function calculateSum(item) {
        sum += Number(item.minimumDurationOfWork);
      }
    let avgWorkTime = sum/allWorkTime.length;
    return res.json({avgWorkTime});
}

// 3. update Supply 

var updateSupply = schedule.scheduleJob('44 11 * * *', async () => {
  const supply = await Worker.countDocuments();
  const demand = await LabourRequirement.countDocuments();
  const statsObj = new stats({supply,demand});
  statsObj.save();
});

// 4. Get Supply for last 30 days 
exports.getLabourSupply = async (req,res)=>{
  var dateTimeTofilter = moment().subtract(4, 'week');
  var filter = {
      "date": {
          $gte: new Date(dateTimeTofilter._d)
      }
  };
results = await stats.find(filter);
//we will extract supply now 
supply = []
days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]

for(i=0;i<results.length;i++){
  supply.push(results[i].supply);
}

length = supply.length;
zeroArray = 28-length;
supply = supply.concat(Array(zeroArray).fill(0));
supply = supply.reverse();
return res.json({supply,days});
}

// 4. Get Supply for last 30 days 
exports.getLabourDemand = async (req,res)=>{
  var dateTimeTofilter = moment().subtract(4, 'week');
  var filter = {
      "date": {
          $gte: new Date(dateTimeTofilter._d)
      }
  };
results = await stats.find(filter);
//we will extract supply now 
demand = []
days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]

for(i=0;i<results.length;i++){
  demand.push(results[i].demand);
}

length = demand.length;
zeroArray = 28-length;
demand = demand.concat(Array(zeroArray).fill(0));
demand = demand.reverse();
return res.json({demand,days});
}


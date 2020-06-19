const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");
// middlewares
const {
  userValidationRules,
  loginValidationRules,
  companyValidationRules,
  validate,
} = require("../middleware/validator");
const auth = require("../middleware/auth");
// controller imports
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const companyController = require("../controllers/companyController");
const workerController = require("../controllers/workerController");
const statsController = require("../controllers/statsController");
const coordinatorController = require("../controllers/coordinatorController");
//userController

// Register a user
router.post(
  "/register",
  userValidationRules(),
  validate,
  catchErrors(userController.registerUsers)
);

//login a user
router.post(
  "/login",
  loginValidationRules(),
  validate,
  catchErrors(authController.loginUsers)
);

//get current logged in user
router.get(
  "/current",
  catchErrors(auth),
  catchErrors(authController.currentUser)
);

// companyController
router.get(
  "/company",
  catchErrors(auth),
  catchErrors(companyController.getAllCompanies)
);
router.post(
  "/addCompany",
  catchErrors(auth),
  catchErrors(companyController.addCompany)
);
//Add labour requirement
router.post(
  "/company/labourRequirement",
  catchErrors(auth),
  catchErrors(companyController.addLabourRequirement)
);
router.get(
  "/company/getName",
  catchErrors(auth),
  catchErrors(companyController.getName)
);
router.get(
  "/company/lookingForText",
  catchErrors(auth),
  catchErrors(companyController.lookingForText)
);
router.get(
  "/company/activeLabourStats",
  catchErrors(auth),
  catchErrors(companyController.activeLabourStats)
);
router.get(
  "/company/labourSelection",
  catchErrors(auth),
  catchErrors(companyController.labourSelection)
);
router.get(
  "/company/currentRequest",
  catchErrors(auth),
  catchErrors(companyController.currentRequest)
);
router.delete(
  "/company/deleteCompany",
  catchErrors(auth),
  catchErrors(companyController.deleteCompany)
);
router.get(
  "/company/getEditableCompanyDetails",
  catchErrors(auth),
  catchErrors(companyController.getEditableCompanyDetails)
);
router.get(
  "/company/getLocation",
  catchErrors(auth),
  catchErrors(companyController.getLocation)
);
router.post(
  "/company/addANewLocation/",
  catchErrors(auth),
  catchErrors(companyController.addANewLocation)
);
router.post(
  "/company/updatePhoneAndContactPerson",
  catchErrors(auth),
  catchErrors(companyController.updatePhoneAndConactPerson)
);
//Stats API Endpoints
//Not adding auth here because we can show this to unauthenticated users
router.get("/stats/getAvgWage", statsController.getAvgWage);
router.get("/stats/getAvgWorkTime", statsController.getAvgWorkTime);
router.get("/stats/getLabourSupply", statsController.getLabourSupply);
router.get("/stats/getLabourDemand", statsController.getLabourDemand);
//Worker API Endpoints
// 1. Worker OnBoard
router.post(
  "/worker/onBoard",
  catchErrors(auth),
  catchErrors(workerController.addWorker)
);
// Labour and coordinator Dashboard
/*
[
    [
        "Apple",
        "1800000982",
        "Steve Jobs",
        "Nasik"
    ],
    [
        "Apple",
        "1800000982",
        "Steve Jobs",
        "Nasik"
    ]
]
*/
router.get(
  "/labour/companySelection",
  catchErrors(auth),
  catchErrors(workerController.companySelection)
);
//same return structure
/*
//Input 
Get req

//Output

[
    [
        "Test Company 3",
        "123",
        "PC",
        "Mumbai"
    ]
]

*/
router.get(
  "/coordinator/companySelection",
  catchErrors(auth),
  catchErrors(coordinatorController.companySelection)
);

router.get(
  "/labour/activeJobsStats",
  catchErrors(auth),
  catchErrors(workerController.activeJobsStats)
);

/*
{
    "location": [
        "MH",
        "JK",
        "RJ",
        "GJ"
    ],
    "days": "10"
}
*/
router.get(
  "/labour/lookingForText",
  catchErrors(auth),
  catchErrors(workerController.lookingForText)
);
//same return structure
/*
Output:
{
    "location": [
        [
            "RJ",
            "MH"
        ]
    ],
    "days": [
        "222"
    ]
}
*/
router.get(
  "/coordinator/lookingForText",
  catchErrors(auth),
  catchErrors(coordinatorController.lookingForText)
);

//method for coordinator sign up

/*
//INPUT
{
	"personName":"Ashish Coordinator",
	"city":"Mumbai",
	"state":"Rajasthan"
}

//Output
{
    "message": "Coordinator registered"
}
*/
router.post(
  "/coordinator/signUp",
  catchErrors(auth),
  catchErrors(coordinatorController.signUpCoordinator)
);

/*
{
    "name": "Bhiya Bhihari"
}
*/
router.get(
  "/labour/getName",
  catchErrors(auth),
  catchErrors(workerController.getName)
);
//same return structure
/*
//OUTPUT:
{
    "name": "Ashish Coordinator"
}
*/
router.get(
  "/coordinator/getName",
  catchErrors(auth),
  catchErrors(coordinatorController.getName)
);

/*
{
    "name": "Bhiya Bhihari"
}
*/
router.get(
  "/labour/jobsAvailableStats",
  catchErrors(auth),
  catchErrors(workerController.jobsAvailableStats)
);
//same return structure
/*
OUTPUT:
{
    "jobs": {
        "Mumbai": 1,
        "Nasik": 2
    }
}
*/
router.get(
  "/coordinator/jobsAvailableStats",
  catchErrors(auth),
  catchErrors(coordinatorController.jobsAvailableStats)
);

/*
//INPUT
{
	"labourerName":"Labour New ",
	"labourerPhoneNumber":"212",
	"preferance":["Rajasthan","Maharashtra"],
	"labourerState":"BH",
	"skills":["Test","Labour"],
	"minimumWage":"46",
	"minimumWorkDuration":"222",
	"relocationCost":"true"
}

//Output
{
    "message": "Worker registered"
}
*/
router.post(
  "/coordinator/addLabour",
  catchErrors(auth),
  catchErrors(coordinatorController.addLabour)
);

/*
{
    "name": "Bhiya Bhihari"
}
*/
router.delete(
  "/labour/deleteAccount",
  catchErrors(auth),
  catchErrors(workerController.deleteWorker)
);
//same return structure
/*
//OUTPUT:
{
    "message": "Coordinator Deleted"
}
*/
router.delete(
  "/coordinator/deleteAccount",
  catchErrors(auth),
  catchErrors(coordinatorController.deleteCoordinator)
);

/*
{
    "labourname": "Bhiya Bhihari"
}
*/
router.get(
  "/labour/workerDetails",
  catchErrors(auth),
  catchErrors(workerController.getEdittableWorkerDetails)
);
//same return structure
/*
OUTPUT: 
{
    "coordinatorName": "Ashish Coordinator",
    "coordinatorPhoneNumber": "21"
} 
*/
router.get(
  "/coordinator/workerDetails",
  catchErrors(auth),
  catchErrors(coordinatorController.getEdittableWorkerDetails)
);

router.post(
  "/labour/updateDetails",
  catchErrors(auth),
  catchErrors(workerController.updatePhoneAndConactNumber)
);
//same return structure
/*
//INPUT:
{
	"coordinatorPhoneNumber":"21",
	"coordinatorName":"Ashish Updated Name"
}
OUT:
{
    "message": "Updated Properly"
}

*/
router.post(
  "/coordinator/updateDetails",
  catchErrors(auth),
  catchErrors(coordinatorController.updatePhoneAndConactNumber)
);

module.exports = router;

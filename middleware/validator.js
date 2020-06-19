const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    //username is not empty
    check("phoneNumber", "Phone Number is required").not().isEmpty(),
    //password length is 6 characters min
    check(
      "password",
      "Please enter passwords with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const loginValidationRules = () => {
  return [
    //username is in proper format
    check("phoneNumber", "Phone Number is required").not().isEmpty(),
    //password length is 6 characters min
    check(
      "password",
      "Please enter passwords with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const companyValidationRules = () => {
  return [
    check("companyName", "Company Name is Required").not().isEmpty(),
    check("contactPersonName", "Contact Person's Name is Required")
      .not()
      .isEmpty(),
    check("companyPhoneNumber", "Contact Phone Name is Required")
      .not()
      .isEmpty(),
    check("state", "State is Required").not().isEmpty(),
    check("city", "City is Required").not().isEmpty(),
    check("sectorName", "Sector Name is Required").not().isEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  loginValidationRules,
  companyValidationRules,
  validate,
};

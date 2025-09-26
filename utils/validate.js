//require the express validator package for the validation
const { body, validationResult } = require("express-validator")
const validator = {}
const createError = require("http-errors")

//set the rules for validation
validator.validationRules = () => {
  return [
    // firstname
    body("firstname")
      .trim()
      .notEmpty()
      .withMessage("Please provide a first name.")
      .isLength({ min: 1 })
      .withMessage("first name must be at least 1 character long")
      .custom((value) => {
        const invalid = ["any", "n/a", "null", "undefined"]
        if (invalid.includes(value.toLowerCase())) {
          throw new Error("Invalid first name")
        }
        return true
      })
      .escape(),

    // lastname
    body("lastname")
      .trim()
      .notEmpty()
      .withMessage("Please provide a last name.")
      .isLength({ min: 1 })
      .withMessage("Last name must be at least 1 character long")
      .custom((value) => {
        const invalid = ["any", "n/a", "null", "undefined"]
        if (invalid.includes(value.toLowerCase())) {
          throw new Error("Invalid last name")
        }
        return true
      })
      .escape(),

    // email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("A valid email is required.")
      .normalizeEmail(),

    // favouriteColor
    body("favouriteColor")
      .trim()
      .notEmpty()
      .withMessage("Please provide a favourite color")
      .custom((value) => {
        const invalid = ["any", "n/a", "null", "undefined"]
        if (invalid.includes(value.toLowerCase())) {
          throw new Error("Invalid favourite color")
        }
        return true
      })
      .escape(),

    // birthday
    body("birthday")
      .trim()
      .notEmpty()
      .withMessage("Birthday is required")
      .isDate({ format: "MM/DD/YYYY", strictMode: true })
      .withMessage("Birthday must be in the format MM/DD/YYYY"),
  ]
}

//validation results and contact submission
validator.validationRegistration = async function (req, res, next) {
  try {
    const { firstname, lastname, email, favouriteColor, birthday } = req.body

    if (!firstname && !lastname && !email && !favouriteColor && !birthday) {
      throw createError(400, "No data provided")
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(), // send array of error objects
      })
    }
    // If no errors, continue to controller
    next()
  } catch (err) {
    next(err)
  }
}

//export and test
module.exports = validator

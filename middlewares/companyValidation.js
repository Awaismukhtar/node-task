const { body, validationResult } = require("express-validator");

const validateCompany = [
  body("name").notEmpty().withMessage("Company name is required."),
  body("address").optional().isString().withMessage("Address must be a string."),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCompany,
  handleValidationErrors,
};

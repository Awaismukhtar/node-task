const express = require("express");
const router = express.Router();
const { validateCompany, handleValidationErrors } = require("../middlewares/companyValidation");
const companyController = require("../controllers/companyController");

router.post("/companies", validateCompany, handleValidationErrors, companyController.createCompany);

module.exports = router;

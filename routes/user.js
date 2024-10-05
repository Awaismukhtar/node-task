const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser, handleValidationErrors, validateUpdateUser } = require("../middlewares/userValidation");
const upload = require("../middlewares/upload");

router.post("/users", upload.single("profileImage"), validateUser, handleValidationErrors, userController.createUser);
router.get("/companies/:companyId/users", userController.getUsersByCompany);
router.put("/users/:userId", upload.single("profileImage"), validateUpdateUser, handleValidationErrors, userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;

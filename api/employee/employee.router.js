const {
  createEmployeeInfo,
  getEmployeeInfo,
  getEmployeeInfoById,
  updateEmployeeInfo,
  deleteEmployeeInfo
} = require("./employee.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addEmployeeValidation } = require("../../validation/employee_validation/employee.validation");
const multer = require('multer');
const path = require('path');
// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/profile_photo',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

// multer 
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  }
});

router.get("/all", getEmployeeInfo);
router.post("/create",checkToken, upload.single('profile_photo'), addEmployeeValidation, createEmployeeInfo);
router.get("/employee/:id", checkToken, getEmployeeInfoById);
router.patch("/update", checkToken, updateEmployeeInfo);
router.delete("/delete/:id", checkToken, deleteEmployeeInfo);

module.exports = router;

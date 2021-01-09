const {
  createEmployeeCategoryInfo,
  getEmployeeCategoryInfo,
  getEmployeeCategoryInfoById,
  updateEmployeeCategoryInfo,
  deleteEmployeeCategoryInfo
} = require("./employee.category.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addEmployeeCategoryValidation } = require("../../validation/employeeCategory/employee.category.validation");

router.get("/all", getEmployeeCategoryInfo);
router.post("/create",checkToken, addEmployeeCategoryValidation, createEmployeeCategoryInfo);
router.get("/employeeCategory/:id", checkToken, getEmployeeCategoryInfoById);
router.patch("/update", checkToken, updateEmployeeCategoryInfo);
router.delete("/delete/:id", checkToken, deleteEmployeeCategoryInfo);

module.exports = router;

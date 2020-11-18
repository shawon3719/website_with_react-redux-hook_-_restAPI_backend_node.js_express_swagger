require("dotenv").config();
const {
  createEmployeeCategoryInfo,
  getEmployeeCategoryInfo,
  getEmployeeCategoryInfoById,
  updateEmployeeCategoryInfo,
  deleteEmployeeCategoryInfo
} = require("./employee.category.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create Employee Category
  createEmployeeCategoryInfo: (req, res) => {
    const body = req.body;
    createEmployeeCategoryInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Employee Category created successfully",
      });
    });
  },

  //Get employeeCategory info by Id
  getEmployeeCategoryInfoById: (req, res) => {
    const id = req.params.id;
    getEmployeeCategoryInfoById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //Get all employeeCategory info
  getEmployeeCategoryInfo: (req, res) => {
    getEmployeeCategoryInfo((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  //update employeeCategory info
  updateEmployeeCategoryInfo: (req, res) => {
    const body = req.body;
    updateEmployeeCategoryInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return false;
      }
      // if (!results) {
      //   return res.json({
      //     success: 0,
      //     message: "Failed to update user",
      //   });
      // }
      return res.json({
        success: 1,
        message: "Employee Category updated successfully",
      });
    });
  },
  //Delete EmployeeCategory info by Id
  deleteEmployeeCategoryInfo: (req, res) => {
    const id = req.params.id;
    deleteEmployeeCategoryInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Employee Category has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "Employee Category has been deleted successfully",
      });
    });
  },
};

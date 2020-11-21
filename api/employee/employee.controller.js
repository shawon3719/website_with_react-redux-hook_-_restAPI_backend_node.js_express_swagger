require("dotenv").config();
const {
  createEmployeeInfo,
  getEmployeeInfo,
  getEmployeeInfoById,
  updateEmployeeInfo,
  deleteEmployeeInfo
} = require("./employee.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create Employee
  createEmployeeInfo: (req, res) => {
    const body = req.body;
    body.profile_photo = `uploads/profile_photo/${req.file.filename}`;
    createEmployeeInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Employee created successfully",
        profile_photo: `${process.env.REACT_APP_APP_URL}/uploads/profile_photo/${req.file.filename}`
      });
    });
  },

  //Get employee info by Id
  getEmployeeInfoById: (req, res) => {
    const id = req.params.id;
    getEmployeeInfoById(id, (err, results) => {
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

  //Get all employee info
  getEmployeeInfo: (req, res) => {
    getEmployeeInfo((err, results) => {
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
  //update employee info
  updateEmployeeInfo: (req, res) => {
    const body = req.body;
    updateEmployeeInfo(body, (err, results) => {
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
        message: "Employee updated successfully",
      });
    });
  },
  //Delete Employee info by Id
  deleteEmployeeInfo: (req, res) => {
    const id = req.params.id;
    deleteEmployeeInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Employee has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "Employee has been deleted successfully",
      });
    });
  },
};

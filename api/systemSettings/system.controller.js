require("dotenv").config();
const {
  createSystemInfo,
  getSystemInfo,
  getSystemInfoById,
  updateSystemInfo,
  deleteSystemInfo
} = require("./system.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create User
  createSystemInfo: (req, res) => {
    const body = req.body;
    // body.system_logo = `uploads/system_logo/${req.file.filename}`;
    createSystemInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "System created successfully",
        // logo_url: `${process.env.REACT_APP_APP_URL}/uploads/system_logo/${req.file.filename}`
      });
    });
  },

  //Get system info by Id
  getSystemInfoById: (req, res) => {
    const id = req.params.id;
    getSystemInfoById(id, (err, results) => {
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

  //Get all system info
  getSystemInfo: (req, res) => {
    getSystemInfo((err, results) => {
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
  //update system info
  updateSystemInfo: (req, res) => {
    const body = req.body;
    updateSystemInfo(body, (err, results) => {
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
        message: "System updated successfully",
      });
    });
  },
  //Delete System info by Id
  deleteSystemInfo: (req, res) => {
    const id = req.params.id;
    deleteSystemInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "System has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "System has been deleted successfully",
      });
    });
  },
};

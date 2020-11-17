require("dotenv").config();
const {
  createCalendarInfo,
  getCalendarInfo,
  getCalendarInfoById,
  updateCalendarInfo,
  deleteCalendarInfo
} = require("./calendar.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create User
  createCalendarInfo: (req, res) => {
    const body = req.body;
    body.calendar_file = `uploads/calendar_file/${req.file.filename}`;
    createCalendarInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Calendar created successfully",
        logo_url: `${process.env.REACT_APP_APP_URL}/uploads/calendar_file/${req.file.filename}`
      });
    });
  },

  //Get calendar info by Id
  getCalendarInfoById: (req, res) => {
    const id = req.params.id;
    getCalendarInfoById(id, (err, results) => {
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

  //Get all calendar info
  getCalendarInfo: (req, res) => {
    getCalendarInfo((err, results) => {
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
  //update calendar info
  updateCalendarInfo: (req, res) => {
    const body = req.body;
    updateCalendarInfo(body, (err, results) => {
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
        message: "Calendar updated successfully",
      });
    });
  },
  //Delete Calendar info by Id
  deleteCalendarInfo: (req, res) => {
    const id = req.params.id;
    deleteCalendarInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Calendar has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "Calendar has been deleted successfully",
      });
    });
  },
};

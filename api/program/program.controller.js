require("dotenv").config();
const {
  createProgramInfo,
  getProgramInfo,
  getProgramInfoById,
  updateProgramInfo,
  deleteProgramInfo
} = require("./Program.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create Program
  createProgramInfo: (req, res) => {
    const body = req.body;
    body.banner_image = `uploads/banner_image/${req.file.filename}`;
    createProgramInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Program created successfully",
        banner_image: `${process.env.REACT_APP_APP_URL}/uploads/banner_image/${req.file.filename}`
      });
    });
  },

  //Get program info by Id
  getProgramInfoById: (req, res) => {
    const id = req.params.id;
    getProgramInfoById(id, (err, results) => {
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

  //Get all program info
  getProgramInfo: (req, res) => {
    getProgramInfo((err, results) => {
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
  //update program info
  updateProgramInfo: (req, res) => {
    const body = req.body;
    if(req.file){
      body.banner_image = `uploads/banner_image/${req.file.filename}`
    };
    updateProgramInfo(body, (err, results) => {
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
        message: "Program updated successfully",
      });
    });
  },
  //Delete Program info by Id
  deleteProgramInfo: (req, res) => {
    const id = req.params.id;
    deleteProgramInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Program has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "Program has been deleted successfully",
      });
    });
  },
};

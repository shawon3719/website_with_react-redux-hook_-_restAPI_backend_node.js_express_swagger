const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //Create User
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    body.profile = `public/uploads/profile/${req.file.filename}`;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User created successfully",
        profile_url: `http://localhost:3003/uploads/images/${req.file.filename}`
      });
    });
  },

  //Get User info by Id
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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

  //Get all User info
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  //update user info
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
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
        message: "User updated successfully",
      });
    });
  },
  //Delete User info by Id
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User has been deleted",
        });
      }
      return res.json({
        success: 1,
        message: "User has been deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jstoken = sign({ result: results }, process.env.SECURITY_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login Successfuly",
          token: jstoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
};

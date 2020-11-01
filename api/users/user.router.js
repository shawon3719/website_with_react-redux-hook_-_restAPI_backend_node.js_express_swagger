const {
  createUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addUserValidation } = require("../../validation/users/user.validation");
const multer = require('multer');
const path = require('path');
// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/profile',
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

router.get("/all", checkToken, getUsers);
router.post("/create",checkToken, upload.single('profile'), addUserValidation, createUser);
router.get("/user/:id", checkToken, getUserByUserId);
router.patch("/update", checkToken, updateUser);
router.delete("/delete/:id", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;

const {
  createSystemInfo,
  getSystemInfo,
  getSystemInfoById,
  updateSystemInfo,
  deleteSystemInfo
} = require("./system.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addSystemValidation } = require("../../validation/system_validation/system.validation");
const multer = require('multer');
const path = require('path');
// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/system_logo',
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

router.get("/all", getSystemInfo);
router.post("/create",checkToken, upload.single('system_logo'), addSystemValidation, createSystemInfo);
router.get("/system/:id", checkToken, getSystemInfoById);
router.patch("/update", checkToken, updateSystemInfo);
router.delete("/delete/:id", checkToken, deleteSystemInfo);

module.exports = router;

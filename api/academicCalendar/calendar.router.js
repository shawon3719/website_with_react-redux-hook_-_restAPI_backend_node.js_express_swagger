const {
  createCalendarInfo,
  getCalendarInfo,
  getCalendarInfoById,
  updateCalendarInfo,
  deleteCalendarInfo
} = require("./calendar.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addCalendarValidation } = require("../../validation/calendar/calendar.validation");
const multer = require('multer');
const path = require('path');
// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/calendar_file',
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

router.get("/all", getCalendarInfo);
router.post("/create",checkToken, upload.single('calendar_file'), addCalendarValidation, createCalendarInfo);
router.get("/calendar/:id", checkToken, getCalendarInfoById);
router.patch("/update", checkToken, updateCalendarInfo);
router.delete("/delete/:id", checkToken, deleteCalendarInfo);

module.exports = router;

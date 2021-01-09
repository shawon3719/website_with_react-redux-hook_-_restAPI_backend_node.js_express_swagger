const {
  createProgramInfo,
  getProgramInfo,
  getProgramInfoById,
  updateProgramInfo,
  deleteProgramInfo
} = require("./program.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { addProgramValidation } = require("../../validation/program_validation/program.validation");
const multer = require('multer');
const path = require('path');
// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/banner_image',
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

router.get("/all", getProgramInfo);
router.post("/create",checkToken, upload.single('banner_image'), addProgramValidation, createProgramInfo);
router.get("/program/:id", checkToken, getProgramInfoById);
router.patch("/update", checkToken, upload.single('banner_image'), updateProgramInfo);
router.delete("/delete/:id", checkToken, deleteProgramInfo);

module.exports = router;

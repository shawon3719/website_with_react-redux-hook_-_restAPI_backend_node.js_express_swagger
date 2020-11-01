const {
    createSlider,
    getSliders,
    getSliderBySliderId,
    updateSlider,
    deleteSlider,
  } = require("./slider.controller");
  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation");
  const { addSliderValidation } = require("../../validation/sliders/slider.validation");
  const multer = require('multer');
  const path = require('path');

  // set slider image storage engine
  const storage = multer.diskStorage({
    destination: './public/uploads/sliders',
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
  
  router.get("/all", checkToken, getSliders);
  router.post("/create",checkToken, upload.single('image'), addSliderValidation, createSlider);
  router.get("/slider/:id", checkToken, getSliderBySliderId);
  router.patch("/update", checkToken, upload.single('image'), updateSlider);
  router.delete("/delete/:id", checkToken, deleteSlider);
  module.exports = router;
  
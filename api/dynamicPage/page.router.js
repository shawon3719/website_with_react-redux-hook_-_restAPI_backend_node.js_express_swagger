const {
    createPage,
    getPages,
    getPageByPageId,
    updatePage,
    deletePage,
  } = require("./page.controller");
  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation");
  const { addPageValidation } = require("../../validation/pages/page.validation");
  const multer = require('multer');
  const path = require('path');

  // set slider image storage engine
  const storage = multer.diskStorage({
    destination: './public/uploads/pages',
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
  
  router.get("/all", getPages);
  router.post("/create",checkToken, upload.single('image'), addPageValidation, createPage);
  router.get("/page/:id", getPageByPageId);
  router.patch("/update", checkToken, upload.single('image'), updatePage);
  router.delete("/delete/:id", checkToken, deletePage);
  module.exports = router;
  
const {
    createGallery,
    getGalleries,
    getGalleryByGalleryId,
    updateGallery,
    deleteGallery,
  } = require("./gallery.controller");
  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation");
  const { addGalleryValidation } = require("../../validation/galleries/gallery.validation");
  const multer = require('multer');
  const path = require('path');

  // set gallery image storage engine
  const storage = multer.diskStorage({
    destination: './public/uploads/galleries',
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
  
  router.get("/all", getGalleries);
  router.post("/create",checkToken, upload.single('image'), addGalleryValidation, createGallery);
  router.get("/gallery/:id", checkToken, getGalleryByGalleryId);
  router.patch("/update", checkToken, upload.single('image'), updateGallery);
  router.delete("/delete/:id", checkToken, deleteGallery);
  module.exports = router;
  
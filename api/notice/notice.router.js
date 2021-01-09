const {
    createNotice,
    getNotices,
    getNoticeByNoticeId,
    updateNotice,
    deleteNotice,
  } = require("./notice.controller");
  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation");
  const { addNoticeValidation } = require("../../validation/notices/notice.validation");
  const multer = require('multer');
  const path = require('path');

  // set slider image storage engine
  const storage = multer.diskStorage({
    destination: './public/uploads/notices',
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
  
  router.get("/all", getNotices);
  router.post("/create",checkToken, upload.single('image'), addNoticeValidation, createNotice);
  router.get("/notice/:id", getNoticeByNoticeId);
  router.patch("/update", checkToken, upload.single('image'), updateNotice);
  router.delete("/delete/:id", checkToken, deleteNotice);
  module.exports = router;
  
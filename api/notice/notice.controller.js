require("dotenv").config();
const {
    create,
    getNoticeByNoticeId,
    getNotices,
    updateNotice,
    deleteNotice
  } = require("./notice.service");
const { isEmptyObject } = require("jquery");

  module.exports = {
    //Create Notice
    createNotice: (req, res) => {
      const body = req.body;
        body.image = `uploads/notices/${req.file.filename}`;
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
          message: "Notice created successfully",
          notice_image_url: `${process.env.REACT_APP_APP_URL}/uploads/notices/${req.file.filename}`
        });
      });
    },
  
    //Get Notices info by Id
    getNoticeByNoticeId: (req, res) => {
      const id = req.params.id;
      getNoticeByNoticeId(id, (err, results) => {
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
  
    //Get all Notice info
    getNotices: (req, res) => {
      getNotices((err, results) => {
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
    //update Notice info
    updateNotice: (req, res) => {
      const body = req.body;
      if(req.file){
        body.image =  `uploads/notices/${req.file.filename}`
      };
      updateNotice(body, (err, results) => {
        if (err) {
          console.log(err);
          return false;
        }
        // if (!results) {
        //   return res.json({
        //     success: 0,
        //     message: "Failed to update slider",
        //   });
        // }
        return res.json({
          success: 1,
          message: "Notice updated successfully",
        });
      });
    },
    //Delete Slider info by Id
    deleteNotice: (req, res) => {
        const id = req.params.id;
        deleteNotice(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Notice has been deleted",
          });
        }
        return res.json({
          success: 1,
          message: "Notice has been deleted successfully",
        });
      });
    }
  };
  
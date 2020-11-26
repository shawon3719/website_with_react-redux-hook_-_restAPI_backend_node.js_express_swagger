require("dotenv").config();
const {
    create,
    getGalleryByGalleryId,
    getGalleries,
    updateGallery,
    deleteGallery
  } = require("./gallery.service");

  module.exports = {
    //Create Gallery
    createGallery: (req, res) => {
      const body = req.body;
      body.image = `uploads/galleries/${req.file.filename}`;
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
          message: "Gallery created successfully",
          gallery_url: `${process.env.REACT_APP_APP_URL}/uploads/galleries/${req.file.filename}`
        });
      });
    },
  
    //Get Gallery info by Id
    getGalleryByGalleryId: (req, res) => {
      const id = req.params.id;
      getGalleryByGalleryId(id, (err, results) => {
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
  
    //Get all Gallery info
    getGalleries: (req, res) => {
        getGalleries((err, results) => {
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
    //update gallery info
    updateGallery: (req, res) => {
      const body = req.body;
      if(req.file){
        body.image = `uploads/galleries/${req.file.filename}`
      };
      updateGallery(body, (err, results) => {
        if (err) {
          console.log(err);
          return false;
        }
        // if (!results) {
        //   return res.json({
        //     success: 0,
        //     message: "Failed to update gallery",
        //   });
        // }
        return res.json({
          success: 1,
          message: "Gallery updated successfully",
        });
      });
    },
    //Delete Gallery info by Id
    deleteGallery: (req, res) => {
        const id = req.params.id;
      deleteGallery(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Gallery has been deleted",
          });
        }
        return res.json({
          success: 1,
          message: "Gallery has been deleted successfully",
        });
      });
    }
  };
  
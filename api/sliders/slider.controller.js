require("dotenv").config();
const {
    create,
    getSliderBySliderId,
    getSliders,
    updateSlider,
    deleteSlider
  } = require("./slider.service");

  module.exports = {
    //Create Slider
    createSlider: (req, res) => {
      const body = req.body;
      body.image = `uploads/sliders/${req.file.filename}`;
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
          message: "Slider created successfully",
          slider_url: `${process.env.REACT_APP_APP_URL}/uploads/sliders/${req.file.filename}`
        });
      });
    },
  
    //Get Slider info by Id
    getSliderBySliderId: (req, res) => {
      const id = req.params.id;
      getSliderBySliderId(id, (err, results) => {
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
  
    //Get all Slider info
    getSliders: (req, res) => {
        getSliders((err, results) => {
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
    //update slider info
    updateSlider: (req, res) => {
      const body = req.body;
      if(req.file){
        body.image = `uploads/sliders/${req.file.filename}`
      };
      updateSlider(body, (err, results) => {
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
          message: "Slider updated successfully",
        });
      });
    },
    //Delete Slider info by Id
    deleteSlider: (req, res) => {
        const id = req.params.id;
      deleteSlider(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Slider has been deleted",
          });
        }
        return res.json({
          success: 1,
          message: "Slider has been deleted successfully",
        });
      });
    }
  };
  
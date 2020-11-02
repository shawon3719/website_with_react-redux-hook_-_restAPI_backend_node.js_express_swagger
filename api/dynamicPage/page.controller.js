const {
    create,
    getPageByPageId,
    getPages,
    updatePage,
    deletePage
  } = require("./page.service");

  module.exports = {
    //Create Page
    createPage: (req, res) => {
      const body = req.body;
      body.image = `uploads/pages/${req.file.filename}`;
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
          message: "Page created successfully",
          page_image_url: `http://192.168.0.41:3003/uploads/pages/${req.file.filename}`
        });
      });
    },
  
    //Get Pages info by Id
    getPageByPageId: (req, res) => {
      const id = req.params.id;
      getPageByPageId(id, (err, results) => {
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
  
    //Get all Page info
    getPages: (req, res) => {
      getPages((err, results) => {
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
    //update Page info
    updatePage: (req, res) => {
      const body = req.body;
      body.image = `uploads/pages/${req.file.filename}`;
      updatePage(body, (err, results) => {
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
          message: "Page updated successfully",
        });
      });
    },
    //Delete Slider info by Id
    deletePage: (req, res) => {
        const id = req.params.id;
        deletePage(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Page has been deleted",
          });
        }
        return res.json({
          success: 1,
          message: "Page has been deleted successfully",
        });
      });
    }
  };
  
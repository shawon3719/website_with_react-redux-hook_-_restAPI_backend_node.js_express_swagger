const { gallery } = require("./gallery.schema");

module.exports = {
    addGalleryValidation: async (req, res, next) => {
    const value = await gallery.validate(req.body);
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
const { slider } = require("./slider.schema");

module.exports = {
    addSliderValidation: async (req, res, next) => {
    const value = await slider.validate(req.body);
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
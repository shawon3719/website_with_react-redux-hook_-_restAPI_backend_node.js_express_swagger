const { page } = require("./page.schema");

module.exports = {
    addPageValidation: async (req, res, next) => {
    const value = await page.validate(req.body);
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
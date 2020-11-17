const { calendar } = require("./calendar.schema");

module.exports = {
    addCalendarValidation: async (req, res, next) => {
    const value = await calendar.validate(req.body);
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
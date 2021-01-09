const { notice } = require("./notice.schema");

module.exports = {
    addNoticeValidation: async (req, res, next) => {
    const value = await notice.validate(req.body);
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
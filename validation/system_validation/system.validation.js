const { system } = require("./system.schema");

module.exports = {
    addSystemValidation: async (req, res, next) => {
    const value = await system.validate(req.body);
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
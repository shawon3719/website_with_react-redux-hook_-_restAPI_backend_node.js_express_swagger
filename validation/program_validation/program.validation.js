const { program } = require("./program.schema");

module.exports = {
  addProgramValidation: async (req, res, next) => {
    const value = await program.validate(req.body);
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
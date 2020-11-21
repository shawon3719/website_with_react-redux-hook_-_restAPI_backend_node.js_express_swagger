const { employee } = require("./employee.schema");

module.exports = {
  addEmployeeValidation: async (req, res, next) => {
    const value = await employee.validate(req.body);
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
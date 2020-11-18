const { employeeCategory } = require("./employee.category.schema");

module.exports = {
  addEmployeeCategoryValidation: async (req, res, next) => {
    const value = await employeeCategory.validate(req.body);
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
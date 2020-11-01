const joi = require("joi");

const schema = {
  user: joi.object({
    firstName: joi.string().max(100).required(),
    lastName: joi.string().max(100).required(),
    gender: joi.string().valid("male", "female", "others").required(),
    email: joi.string().email().required(),
    age: joi.number().integer().max(100).required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    number: joi
      .number()
      .integer()
      .min(00000000001)
      .message("Invalid Mobile Number")
      .max(99999999999)
      .required(),
  }),
};

module.exports = schema;

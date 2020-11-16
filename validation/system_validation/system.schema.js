const joi = require("joi");

const schema = {
  system: joi.object({
    systemName: joi.string().max(200).required(),
    title: joi.string().max(200).required(),
    address: joi.string().required(),
    system_url: joi.string().max(200).required(),
    email: joi.string().email().required(),
    phone_no: joi
    .number()
    .integer()
    .min(00000000001)
    .message("Invalid Phone Number")
    .max(99999999999)
    .required(),
    mobile: joi
    .number()
    .integer()
    .min(00000000001)
    .message("Invalid Mobile Number")
    .max(99999999999)
    .required(),
    created_by: joi.string(),
    updated_by: joi.string(),
    priority: joi.number().integer().required(),
    active_status: joi.number().integer().required(),
  }),
};

module.exports = schema;

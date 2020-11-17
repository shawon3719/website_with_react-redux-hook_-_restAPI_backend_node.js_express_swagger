const joi = require("joi");

const schema = {
  calendar: joi.object({
    title: joi.string().max(200).required(),
    created_by: joi.string(),
    updated_by: joi.string(),
    priority: joi.number().integer().required(),
    active_status: joi.number().integer().required(),
  }),
};

module.exports = schema;

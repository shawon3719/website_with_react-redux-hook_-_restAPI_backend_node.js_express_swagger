const joi = require("joi");

const schema = {
  notice: joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().max(10000000).required(),
    created_by: joi.string(),
    updated_by: joi.string(),
    priority: joi.number().integer().required(),
    active_status: joi.number().integer().required(),
    // image: joi.required(),
  }),
};

module.exports = schema;

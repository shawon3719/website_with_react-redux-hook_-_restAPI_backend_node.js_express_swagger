const joi = require("joi");

const schema = {
  slider: joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().max(1000).required(),
    created_by: joi.string().required(),
    priority: joi.number().integer().required(),
    updated_by: joi.string(),
    active_status: joi.number().integer().required(),
  }),
};

module.exports = schema;

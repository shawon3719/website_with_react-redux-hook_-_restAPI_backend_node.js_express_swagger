const joi = require("joi");

const schema = {
  slider: joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().max(1000).required(),
    created_by: joi.string().required(),
    priority: joi.number().integer().required(),
    // image: joi.required(),
  }),
};

module.exports = schema;

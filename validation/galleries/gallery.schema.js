const joi = require("joi");

const schema = {
  gallery: joi.object({
    title: joi.string().max(100).required(),
    created_by: joi.string().required(),
    active_status: joi.string().required(),
    priority: joi.number().integer().required(),
    // image: joi.required(),
  }),
};

module.exports = schema;

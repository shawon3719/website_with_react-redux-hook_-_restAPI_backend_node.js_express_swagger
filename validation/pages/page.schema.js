const joi = require("joi");

const schema = {
  page: joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().max(1000).required(),
    created_by: joi.string().valid("admin", "super_admin"),
    updated_by: joi.string().valid("admin", "super_admin"),
    priority: joi.number().integer().required(),
    active_status: joi.number().integer().required(),
    // image: joi.required(),
  }),
};

module.exports = schema;

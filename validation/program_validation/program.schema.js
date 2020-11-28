const joi = require("joi");

const schema = {
  program: joi.object({
    menu_name        : joi.string().max(200).required(),
    program_title    : joi.string().max(200).required(),
    duration         : joi.number().max(999).required(),
    total_credits    : joi.number().max(999).required(),
    total_hours      : joi.number().max(999).required(),
    pre_requisite    : joi.string().max(200).required(),
    program_language : joi.number().max(999).required(),
    qty_of_stdnt     : joi.number().max(999).required(),
    assesments       : joi.number().max(999).required(),
    created_by       : joi.string(),
    updated_by       : joi.string(),
    priority         : joi.number().integer().required(),
    active_status    : joi.number().integer().required(),
  }),
};

module.exports = schema;

const joi = require("joi");

const schema = {
  employee: joi.object({
    employee_id         : joi.string().max(200).required(),
    full_name           : joi.string().max(200).required(),
    father_name         : joi.string().max(200).required(),
    mother_name         : joi.string().max(200).required(),
    nid                 : joi.string().max(200).required(),
    gender              : joi.string().max(50).required(),
    date_of_birth       : joi.string().max(50).required(),
    email               : joi.string().email().required(),
    designation         : joi.string().required(),
    // profile_photo       : joi.string().required(),
    present_address     : joi.string().required(),
    permanent_address   : joi.string().required(),
    joining_date        : joi.string().max(200).required(),
    employee_category   : joi.string().max(200).required(), 
    email               : joi.string().email().required(),
    phone               : joi.number().integer().min(00000000001).message("Invalid Mobile Number").max(99999999999).required(),
    created_by          : joi.string(),
    updated_by          : joi.string(),
    priority            : joi.number().integer().required(),
    active_status       : joi.number().integer().required(),
  }),
};

module.exports = schema;

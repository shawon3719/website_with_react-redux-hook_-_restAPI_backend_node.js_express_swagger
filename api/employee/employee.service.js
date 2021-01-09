const pool = require("../../config/database");

module.exports = {
  createEmployeeInfo: (data, callBack) => {
    pool.query(
      `insert into employee_settings(employee_id, full_name, father_name, mother_name, designation, profile_photo, nid, gender, date_of_birth, phone, email, present_address, permanent_address, joining_date, employee_category, priority, active_status, created_by)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

      [
        data.employee_id,
        data.full_name,
        data.father_name,
        data.mother_name,
        data.designation,
        data.profile_photo,
        data.nid,
        data.gender,
        data.date_of_birth,
        data.phone,
        data.email,
        data.present_address,
        data.permanent_address,
        data.joining_date,
        data.employee_category,
        data.priority,
        data.active_status,
        data.created_by,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get all EmployeeInfo
  getEmployeeInfo: (callBack) => {
    pool.query(
      `select id, employee_id, full_name, father_name, mother_name, designation, profile_photo, nid, gender, date_of_birth, phone, email, present_address, permanent_address, joining_date, employee_category, priority, active_status from employee_settings`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get EmployeeInfo By ID
  getEmployeeInfoById: (id, callBack) => {
    pool.query(
      `select id, employee_id, full_name, father_name, mother_name, designation, profile_photo, nid, gender, date_of_birth, phone, email, present_address, permanent_address, joining_date, employee_category, priority, active_status from employee_settings where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update EmployeeInfo By ID
  updateEmployeeInfo: (data, callBack) => {
    pool.query(
      `update employee_settings set employee_id=?, full_name=?, father_name=?, mother_name=?, designation=?, profile_photo=?, nid=?, gender=?, date_of_birth=?, phone=?, email=?, present_address=?, permanent_address=?, joining_date=?, employee_category=?, priority=?, active_status=?, updated_by=? where id=?`,
      [
        data.employee_id,
        data.full_name,
        data.father_name,
        data.mother_name,
        data.designation,
        data.profile_photo,
        data.nid,
        data.gender,
        data.date_of_birth,
        data.phone,
        data.email,
        data.present_address,
        data.permanent_address,
        data.joining_date,
        data.employee_category,
        data.priority,
        data.active_status,
        data.updated_by,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Delete EmployeeInfo By ID
  deleteEmployeeInfo: (id, callBack) => {
    pool.query(
      `delete from employee_settings where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};

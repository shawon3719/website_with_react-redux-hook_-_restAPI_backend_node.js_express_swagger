const pool = require("../../config/database");

module.exports = {
  createEmployeeCategoryInfo: (data, callBack) => {
    pool.query(
      `insert into employee_category(category_name, priority, active_status, created_by)
            values(?,?,?,?)`,
      [
        data.category_name,
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
  //Get all EmployeeCategoryInfo
  getEmployeeCategoryInfo: (callBack) => {
    pool.query(
      `select id, category_name, priority, active_status, created_by from employee_category`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get EmployeeCategoryInfo By ID
  getEmployeeCategoryInfoById: (id, callBack) => {
    pool.query(
      `select id, category_name, priority, active_status, created_by from employee_category where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update EmployeeCategoryInfo By ID
  updateEmployeeCategoryInfo: (data, callBack) => {
    pool.query(
      `update employee_category set category_name=?, priority=?, active_status=?, updated_by=? where id=?`,
      [
        data.category_name,
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
  //Delete EmployeeCategoryInfo By ID
  deleteEmployeeCategoryInfo: (id, callBack) => {
    pool.query(
      `delete from employee_category where id = ?`,
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

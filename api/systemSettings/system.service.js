const pool = require("../../config/database");

module.exports = {
  createSystemInfo: (data, callBack) => {
    pool.query(
      `insert into system_settings(systemName, title, email, system_url, system_logo, phone_no, mobile, address)
            values(?,?,?,?,?,?,?,?)`,

      [
        data.systemName,
        data.title,
        data.email,
        data.system_url,
        data.system_logo,
        data.phone_no,
        data.mobile,
        data.address,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get all SystemInfo
  getSystemInfo: (callBack) => {
    pool.query(
      `select id, systemName, title, email, system_url, system_logo, phone_no, mobile, address from system_settings`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get SystemInfo By ID
  getSystemInfoById: (id, callBack) => {
    pool.query(
      `select id, systemName, title, email, system_url, system_logo, phone_no, mobile, address from system_settings where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update SystemInfo By ID
  updateSystemInfo: (data, callBack) => {
    pool.query(
      `update system_settings set systemName=?, title=?, email=?, system_url=?, system_logo=?, phone_no=?, mobile=?, address=? where id=?`,
      [
        data.systemName,
        data.title,
        data.email,
        data.system_url,
        data.system_logo,
        data.phone_no,
        data.mobile,
        data.address,
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
  //Delete SystemInfo By ID
  deleteSystemInfo: (id, callBack) => {
    pool.query(
      `delete from system_settings where id = ?`,
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

const pool = require("../../config/database");

module.exports = {
    //Create Notice
  create: (data, callBack) => {
    pool.query(
      `insert into notice(title, description, image, active_status, priority, created_by)
            values(?,?,?,?,?,?)`,

      [
        data.title,
        data.description,
        data.image,
        data.active_status,
        data.priority,
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
  //Get all Notice
  getNotices: (callBack) => {
    pool.query(
      `select id, title, description, image, active_status, priority, created_by, created_at from notice`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get Notice By ID
  getNoticeByNoticeId: (id, callBack) => {
    pool.query(
      `select id, title, description, image, active_status, priority, created_by, created_at from notice where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update Notice By ID
  updateNotice: (data, callBack) => {
    pool.query(
      `update notice set title=?, description=?, image=?, active_status=?, priority=?, updated_by=? where id=?`,
      [
        data.title,
        data.description,
        data.image,
        data.active_status,
        data.priority,
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
  //Delete Notice By ID
  deleteNotice: (id, callBack) => {
    pool.query(
      `delete from notice where id = ?`,
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

const pool = require("../../config/database");

module.exports = {
    //Create Page
  create: (data, callBack) => {
    pool.query(
      `insert into page(title, description, image, active_status, priority, created_by)
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
  //Get all Page
  getPages: (callBack) => {
    pool.query(
      `select id, title, description, image, active_status, priority, created_by, created_at from page`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get Page By ID
  getPageByPageId: (id, callBack) => {
    pool.query(
      `select id, title, description, image, active_status, priority, created_by, created_at from page where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update Page By ID
  updatePage: (data, callBack) => {
    pool.query(
      `update page set title=?, description=?, image=?, active_status=?, priority=?, updated_by=? where id=?`,
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
  //Delete Page By ID
  deletePage: (id, callBack) => {
    pool.query(
      `delete from page where id = ?`,
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

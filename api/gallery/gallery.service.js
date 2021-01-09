const pool = require("../../config/database");

module.exports = {
    //Create Galleries
  create: (data, callBack) => {
    pool.query(
      `insert into gallery(title, image, priority, active_status, created_by)
            values(?,?,?,?,?)`,

      [
        data.title,
        data.image,
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
  //Get all Users
  getGalleries: (callBack) => {
    pool.query(
      `select id, title, image, priority, active_status, created_by from gallery`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get Galleries By ID
  getGalleryByGalleryId: (id, callBack) => {
    pool.query(
      `select id, title, image, priority, active_status, created_by from gallery where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update Gallery By ID
  updateGallery: (data, callBack) => {
    pool.query(
      `update gallery set title=?, image=?, priority=?, active_status=?, updated_by=? where id=?`,
      [
        data.title,
        data.image,
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
  //Delete Gallery By ID
  deleteGallery: (id, callBack) => {
    pool.query(
      `delete from gallery where id = ?`,
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

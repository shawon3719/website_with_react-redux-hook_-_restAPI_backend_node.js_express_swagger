const pool = require("../../config/database");

module.exports = {
    //Create Sliders
  create: (data, callBack) => {
    pool.query(
      `insert into slider(title, description, image, priority,created_by)
            values(?,?,?,?,?)`,

      [
        data.title,
        data.description,
        data.image,
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
  //Get all Users
  getSliders: (callBack) => {
    pool.query(
      `select id, title, description, image, priority, created_by, created_at from slider`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get Sliders By ID
  getSliderBySliderId: (id, callBack) => {
    pool.query(
      `select id, title, description, image, priority, created_by, created_at from slider where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update Slider By ID
  updateSlider: (data, callBack) => {
    pool.query(
      `update slider set title=?, description=?, image=?, priority=? where id=?`,
      [
        data.title,
        data.description,
        data.image,
        data.priority,
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
  //Delete Slider By ID
  deleteSlider: (id, callBack) => {
    pool.query(
      `delete from slider where id = ?`,
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

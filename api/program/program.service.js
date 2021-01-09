const pool = require("../../config/database");

module.exports = {
  createProgramInfo: (data, callBack) => {
    pool.query(
      `insert into academic_program(menu_name, program_title, banner_image, duration, total_credits, total_hours, pre_requisite, program_language, qty_of_stdnt, assesments , priority, active_status, created_by)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.menu_name,
        data.program_title,
        data.banner_image,
        data.duration,
        data.total_credits,
        data.total_hours,
        data.pre_requisite,
        data.program_language,
        data.qty_of_stdnt,
        data.assesments,
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
  //Get all ProgramInfo
  getProgramInfo: (callBack) => {
    pool.query(
      `select id, menu_name, program_title, banner_image, duration, total_credits, total_hours, pre_requisite, program_language, qty_of_stdnt, assesments , priority, active_status, created_by, updated_by from academic_program`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get ProgramInfo By ID
  getProgramInfoById: (id, callBack) => {
    pool.query(
      `select id, menu_name, program_title, banner_image, duration, total_credits, total_hours, pre_requisite, program_language, qty_of_stdnt, assesments , priority, active_status, created_by from academic_program where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update ProgramInfo By ID
  updateProgramInfo: (data, callBack) => {
    pool.query(
      `update academic_program set menu_name=?, program_title=?, banner_image=?, duration=?, total_credits=?, total_hours=?, pre_requisite=?, program_language=?, qty_of_stdnt=?, assesments=?, priority=?, active_status=?, updated_by=? where id=?`,
      [
        data.menu_name,
        data.program_title,
        data.banner_image,
        data.duration,
        data.total_credits,
        data.total_hours,
        data.pre_requisite,
        data.program_language,
        data.qty_of_stdnt,
        data.assesments,
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
  //Delete ProgramInfo By ID
  deleteProgramInfo: (id, callBack) => {
    pool.query(
      `delete from academic_program where id = ?`,
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

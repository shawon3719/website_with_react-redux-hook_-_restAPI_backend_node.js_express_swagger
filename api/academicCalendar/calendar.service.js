const pool = require("../../config/database");

module.exports = {
  createCalendarInfo: (data, callBack) => {
    pool.query(
      `insert into academic_calendar(title, calendar_file, priority, active_status, created_by)
            values(?,?,?,?,?)`,

      [
        data.title,
        data.calendar_file,
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
  //Get all CalendarInfo
  getCalendarInfo: (callBack) => {
    pool.query(
      `select id, title, calendar_file, priority, active_status, created_by from academic_calendar`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get CalendarInfo By ID
  getCalendarInfoById: (id, callBack) => {
    pool.query(
      `select title, calendar_file, priority, active_status, created_by from academic_calendar where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update CalendarInfo By ID
  updateCalendarInfo: (data, callBack) => {
    pool.query(
      `update academic_calendar title=?, academic_calendar=?, priority=?, active_status=?, updated_by=? where id=?`,
      [
        data.title,
        data.academic_calendar,
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
  //Delete CalendarInfo By ID
  deleteCalendarInfo: (id, callBack) => {
    pool.query(
      `delete from academic_calendar where id = ?`,
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

const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, profile, age, email, password, number)
            values(?,?,?,?,?,?,?,?)`,

      [
        data.firstName,
        data.lastName,
        data.gender,
        data.profile,
        data.age,
        data.email,
        data.password,
        data.number,
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
  getUsers: (callBack) => {
    pool.query(
      `select id, firstName, lastName, gender, profile, age, email, number from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get User By ID
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id, firstName, lastName, gender, age, email, number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update User By ID
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, age=?, email=?, number=?, password=? where id=?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.age,
        data.email,
        data.password,
        data.number,
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
  //Delete User By ID
  deleteUser: (id, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Get Login Info
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};

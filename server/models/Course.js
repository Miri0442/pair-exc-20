const db = require('../config/db');

const CourseModel = {
  createTable(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Courses (
        course_id INT PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        teacher_ids TEXT,
        student_ids TEXT
      )
    `;
    db.query(sql, callback);
  },

  insertSampleData(callback) {
    const checkSql = "SELECT COUNT(*) AS count FROM Courses";
    db.query(checkSql, function (err, results) {
      if (err) return callback(err);

      if (results[0].count > 0) {
        console.log("Courses table already has data. Skipping sample data insertion.");
        return callback(null);
      }

      const insertSql = `
        INSERT INTO Courses (course_id, course_name, teacher_ids, student_ids) VALUES
        (1, 'Math', '1,2', '101,102,103'),
        (2, 'History', '2', '104,105'),
        (3, 'English', '1,3', '106,107'),
        (4, 'Science', '3', '108,109'),
        (5, 'Art', '1', '110')
      `;
      db.query(insertSql, callback);
    });
  }
};

module.exports = CourseModel;

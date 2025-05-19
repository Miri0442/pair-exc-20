const db = require('../config/db');

const StudentModel = {
  createTable(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Students (
        student_id INT PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        course_ids TEXT
      )
    `;
    db.query(sql, callback);
  },

  insertSampleData(callback) {
    const checkSql = "SELECT COUNT(*) AS count FROM Courses";
    db.query(checkSql, function(err, results) {
      if (err) return callback(err);
  
      if (results[0].count > 0) {
        console.log("Courses table already has data. Skipping sample data insertion.");
        return callback(null); 
      }
  
      const insertSql = `
      INSERT INTO Students (student_id, student_name, course_ids) VALUES
      (101, 'Tom', '1'),
      (102, 'Jerry', '1'),
      (103, 'Anna', '1'),
      (104, 'Liam', '2'),
      (105, 'Noah', '2'),
      (106, 'Emma', '3'),
      (107, 'Ryan', '3'),
      (108, 'Ella', '4'),
      (109, 'Jake', '4'),
      (110, 'Maya', '5')
    `;
      db.query(insertSql, callback);
    });
  }

};

module.exports = StudentModel;

const db = require('../config/db');

const TeacherModel = {
  createTable(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Teachers (
        teacher_id INT PRIMARY KEY,
        teacher_name VARCHAR(100) NOT NULL,
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
      INSERT INTO Teachers (teacher_id, teacher_name, course_ids) VALUES
      (1, 'Alice', '1,3,5'),
      (2, 'Bob', '1,2'),
      (3, 'Charlie', '3,4')
    `;
      db.query(insertSql, callback);
    });
  }
};

module.exports = TeacherModel;

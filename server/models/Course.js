// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Course = sequelize.define("Course", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false }
// }, {
//   tableName: "Course",
//   freezeTableName: true
// });

// module.exports = Course;
const db = require('../config/db');

const Course = {
  async createTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS Course (
        course_id INT PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        teacher_ids TEXT,
        student_ids TEXT
      )
    `);
  },

  async insertSampleData() {
    await db.query(`INSERT INTO Courses (course_id, course_name, teacher_ids, student_ids) VALUES
      (1, 'Math', '1,2', '101,102,103'),
      (2, 'History', '2', '104,105'),
      (3, 'English', '1,3', '106,107'),
      (4, 'Science', '3', '108,109'),
      (5, 'Art', '1', '110')
    `);
  }
};

module.exports = Course;
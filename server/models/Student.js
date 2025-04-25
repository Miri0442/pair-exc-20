// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Student = sequelize.define("Student", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false }
// }, {
//   tableName: "Student",
//   freezeTableName: true
// });

// module.exports = Student;
const db = require('../config/db');

const Student = {
  async createTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS Student (
        student_id INT PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        course_ids TEXT
      )
    `);
  },

  async insertSampleData() {
    await db.query(`INSERT INTO Students (student_id, student_name, course_ids) VALUES
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
    `);
  }
};

module.exports = Student;
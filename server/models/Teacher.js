// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Teacher = sequelize.define("Teacher", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false }
// }, {
//   tableName: "Teacher",
//   freezeTableName: true
// });

// module.exports = Teacher;
const db = require('../config/db');

const Teacher = {
  async createTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS Teacher (
        teacher_id INT PRIMARY KEY,
        teacher_name VARCHAR(100) NOT NULL,
        course_ids TEXT
      )
    `);
  },

  async insertSampleData() {
    await db.query(`INSERT INTO Teachers (teacher_id, teacher_name, course_ids) VALUES
      (1, 'Alice', '1,3,5'),
      (2, 'Bob', '1,2'),
      (3, 'Charlie', '3,4')
    `);
  }
};

module.exports = Teacher;
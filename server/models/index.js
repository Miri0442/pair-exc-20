const db = require('../config/db');

const Student = require("./Student");
const Teacher = require("./Teacher");
const Course = require("./Course");

// קשרים בין סטודנט לקורס (many-to-many)
Student.belongsToMany(Course, {
  through: "StudentCourses",
  foreignKey: "student_id"
});
Course.belongsToMany(Student, {
  through: "StudentCourses",
  foreignKey: "course_id"
});

// קשרים בין מורה לקורס (many-to-many)
Teacher.belongsToMany(Course, {
  through: "TeacherCourses",
  foreignKey: "teacher_id"
});
Course.belongsToMany(Teacher, {
  through: "TeacherCourses",
  foreignKey: "course_id"
});

module.exports = {
  sequelize,
  Student,
  Teacher,
  Course
};
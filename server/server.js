const db = require('./config/db');
const CourseModel = require('./models/Course');
const TeacherModel = require('./models/Teacher');
const StudentModel = require('./models/Student');
const express = require('express');
const app = express();
const PORT = 5000;

db.connect(function (err) {
  setupDatabase();
});

function setupDatabase() {
  CourseModel.createTable(function (err) {
    if (err) throw err;
    console.log("Courses table created.");
    StudentModel.createTable(function (err) {
      if (err) throw err;
      console.log("Students table created.");
      TeacherModel.createTable(function (err) {
        if (err) throw err;
        console.log("Teachers table created.");
        insertSampleData();
      });
    });
  });
}

function insertSampleData() {
  TeacherModel.insertSampleData(function (err) {
    if (err) throw err;
    console.log("Teachers sample data inserted.");
    StudentModel.insertSampleData(function (err) {
      if (err) throw err;
      console.log("Students sample data inserted.");
      CourseModel.insertSampleData(function (err) {
        if (err) throw err;
        console.log("Courses sample data inserted.");
        fetchCourses();
      });
    });
  });
}

function fetchCourses() {
  const sql = "SELECT * FROM Courses";
  db.query(sql, function (err, courses) {
    if (err) throw err;
    if (courses.length === 0) {
      console.log("No courses found.");
      return;
    }

    courses.forEach(course => {
      getCourseDetails(course);
    });
  });
}

function getCourseDetails(course) {
  const teacherIds = course.teacher_ids.split(',');
  const studentIds = course.student_ids.split(',');

  db.query(`SELECT teacher_name FROM Teachers WHERE teacher_id IN (${teacherIds.join(',')})`, function (err, teachers) {
    if (err) throw err;

    db.query(`SELECT student_name FROM Students WHERE student_id IN (${studentIds.join(',')})`, function (err, students) {
      if (err) throw err;

      printCourseDetails(course, teachers, students);
    });
  });
}

function printCourseDetails(course, teachers, students) {
  console.log(`\n Course: ${course.course_name}`);
  console.log(` Teachers: ${teachers.map(t => t.teacher_name).join(', ')}`);
  console.log(` Students: ${students.map(s => s.student_name).join(', ')}`);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
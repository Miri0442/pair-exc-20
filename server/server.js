const connectToDatabase = require('./config/db');
const Courses = require('./models/Course');
const Teachers = require('./models/Teacher');
const Students = require('./models/Student');
const express = require('express');
const app = express();
const PORT = 5000;

let db;

(async () => {
  try {
    db = await connectToDatabase();
    await setupDatabase();
    await fetchCourses();
  } catch (err) {
    console.error("Error initializing application:", err);
  }
})();

async function setupDatabase() {
  await Courses.createTable(db);
  console.log("Courses table created.");

  await Students.createTable(db);
  console.log("Students table created.");

  await Teachers.createTable(db);
  console.log("Teachers table created.");

  await insertSampleData();
}

async function insertSampleData() {
  await Teachers.insertSampleData(db);
  console.log("Teachers sample data inserted.");

  await Students.insertSampleData(db);
  console.log("Students sample data inserted.");

  await Courses.insertSampleData(db);
  console.log("Courses sample data inserted.");
}

async function fetchCourses() {
  const [courses] = await db.execute("SELECT * FROM Courses");
  if (courses.length === 0) {
    console.log("No courses found.");
    return;
  }

  for (const course of courses) {
    await getCourseDetails(course);
  }
}

async function getCourseDetails(course) {
  const teacherIds = course.teacher_ids.split(',').map(id => parseInt(id)).join(',');
  const studentIds = course.student_ids.split(',').map(id => parseInt(id)).join(',');

  const [teachers] = await db.execute(
    `SELECT teacher_name FROM Teachers WHERE teacher_id IN (${teacherIds})`
  );

  const [students] = await db.execute(
    `SELECT student_name FROM Students WHERE student_id IN (${studentIds})`
  );

  printCourseDetails(course, teachers, students);
}

function printCourseDetails(course, teachers, students) {
  console.log(`\nCourse: ${course.course_name}`);
  console.log(`Teachers: ${teachers.map(t => t.teacher_name).join(', ')}`);
  console.log(`Students: ${students.map(s => s.student_name).join(', ')}`);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
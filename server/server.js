const express = require('express');
const app = express();

const Course = require('./models/Course');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const db = require('./config/db');

app.use(express.json());
async function init() {
  await Course.createTable();
  await Student.createTable();
  await Teacher.createTable();

  await Teacher.insertSampleData();
  await Student.insertSampleData();
  await Course.insertSampleData();

  // שליפת קורסים + שמות מורים ותלמידים
  const [courses] = await db.query("SELECT * FROM Course");
  for (const course of courses) {
    const teacherIds = course.teacher_ids ? course.teacher_ids.split(',') : [];
    const studentIds = course.student_ids ? course.student_ids.split(',') : [];

    const [teachers] = teacherIds.length
      ? await db.query(`SELECT * FROM Teacher WHERE teacher_id IN (${teacherIds.join(',')})`)
      : [ [] ];
    const [students] = studentIds.length
      ? await db.query(`SELECT * FROM student WHERE student_id IN (${studentIds.join(',')})`)
      : [ [] ];

    console.log(`\n=============================`);
    console.log(`📚 קורס: ${course.course_name}`);
    console.log(`👩‍🏫 מורים:`);
    teachers.forEach(t => console.log(` - ${t.teacher_name}`));
    console.log(`👨‍🎓 תלמידים:`);
    students.forEach(s => console.log(` - ${s.student_name}`));
  }
}

// קוד להפעיל את השרת על פורט 3000
app.listen(5000, () => {
    console.log('השרת פועל על פורט 5000');
    init().catch(console.error);
  });
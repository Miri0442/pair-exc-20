const { sequelize, Student, Teacher, Course } = require("../models");

async function seed() {
  await sequelize.sync({ force: true });

  const students = await Student.bulkCreate([
    { name: "Alice" }, { name: "Bob" }, { name: "Charlie" },
    { name: "Dana" }, { name: "Eli" }, { name: "Fay" },
    { name: "George" }, { name: "Hannah" }, { name: "Isaac" }, { name: "Julia" }
  ]);

  const teachers = await Teacher.bulkCreate([
    { name: "Mr. Smith" },
    { name: "Ms. Johnson" },
    { name: "Dr. Lee" }
  ]);

  const courses = await Course.bulkCreate([
    { name: "Math" },
    { name: "Science" },
    { name: "History" },
    { name: "English" },
    { name: "Art" }
  ]);

  // שיוך קורסים לתלמידים
  await students[0].addCourses([courses[0], courses[1]]);
  await students[1].addCourse(courses[2]);
  await students[2].addCourses([courses[0], courses[3]]);
  await students[3].addCourse(courses[4]);
  await students[4].addCourse(courses[1]);

  // שיוך קורסים למורים
  await teachers[0].addCourses([courses[0], courses[1]]);
  await teachers[1].addCourses([courses[2], courses[3]]);
  await teachers[2].addCourse(courses[4]);

  console.log("✅ Seeding completed.");
  process.exit();
}

seed();

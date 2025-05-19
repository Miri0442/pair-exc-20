const Courses = {
  async createTable(db) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Courses (
        course_id INT PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        teacher_ids TEXT,
        student_ids TEXT
      )
    `;
    await db.execute(sql);
  },

  async insertSampleData(db) {
    const checkSql = "SELECT COUNT(*) AS count FROM Courses";
    const [results] = await db.execute(checkSql);

    if (results[0].count > 0) {
      console.log("Courses table already has data. Skipping sample data insertion.");
      return;
    }

    const insertSql = `
      INSERT INTO Courses (course_id, course_name, teacher_ids, student_ids) VALUES
      (1, 'Math', '1,2', '101,102,103'),
      (2, 'History', '2', '104,105'),
      (3, 'English', '1,3', '106,107'),
      (4, 'Science', '3', '108,109'),
      (5, 'Art', '1', '110')
    `;
    await db.execute(insertSql);
  }
};

module.exports = Courses;

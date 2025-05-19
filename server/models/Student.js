const Students = {
  async createTable(db) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Students (
        student_id INT PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        course_ids TEXT
      )
    `;
    await db.execute(sql);
  },

  async insertSampleData(db) {
    const checkSql = "SELECT COUNT(*) AS count FROM Students";
    const [results] = await db.execute(checkSql);

    if (results[0].count > 0) {
      console.log("Students table already has data. Skipping sample data insertion.");
      return;
    }

    const insertSql = `
      INSERT INTO Students (student_id, student_name, course_ids) VALUES
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
    `;
    await db.execute(insertSql);
  }
};

module.exports = Students;
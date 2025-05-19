const Teachers = {
  async createTable(db) {
    const sql = `
      CREATE TABLE IF NOT EXISTS Teachers (
        teacher_id INT PRIMARY KEY,
        teacher_name VARCHAR(100) NOT NULL,
        course_ids TEXT
      )
    `;
    await db.execute(sql);
  },

  async insertSampleData(db) {
    const checkSql = "SELECT COUNT(*) AS count FROM Teachers";
    const [results] = await db.execute(checkSql);

    if (results[0].count > 0) {
      console.log("Teachers table already has data. Skipping sample data insertion.");
      return;
    }

    const insertSql = `
      INSERT INTO Teachers (teacher_id, teacher_name, course_ids) VALUES
      (1, 'Alice', '1,3,5'),
      (2, 'Bob', '1,2'),
      (3, 'Charlie', '3,4')
    `;
    await db.execute(insertSql);
  }
};

module.exports = Teachers;
const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'ayala12!',
      database: 'socialdatahub'
    });
    console.log('Connected to MySQL with Promise');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
}

module.exports = connectToDatabase;

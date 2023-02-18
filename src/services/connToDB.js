const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB: ' + process.env.DB_NAME + ', test connection ID: ' + conn.threadId);
});

module.exports = {
  conn,
};
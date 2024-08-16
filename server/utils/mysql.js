const mysql = require("mysql");
// const fs = require("fs");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_HOST_USER,
  password: process.env.MYSQL_HOST_PASSWORD,
  port: process.env.MYSQL_HOST_PORT,
  database: process.env.MYSQL_HOST_DATABASE,
  // ssl: {
  //   ca: fs.readFileSync("./ca.pem"), // CA证书
  //   key: fs.readFileSync("./client-key.pem"), // 客户端私钥
  //   cert: fs.readFileSync("./client-cert.pem"), // 客户端证书
  // },
});

let query = function (sql, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(Object.assign(new Error(err.sqlMessage), { code: 400 }));
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(Object.assign(new Error(err.sqlMessage), { code: 400 }));
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = { query };

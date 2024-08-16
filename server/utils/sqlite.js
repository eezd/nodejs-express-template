const sqlite3 = require("sqlite3").verbose();

var path = require("path");

const dbPath = path.join(__dirname, "../../my_sqlite.db");

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);

    db.on("error", (err) => {
      // reject(err);
      reject(Object.assign(new Error(err.message), { code: 400 }));
    });

    db.all(sql, params, (err, rows) => {
      if (err) {
        // reject(err);
        reject(Object.assign(new Error(err.message), { code: 400 }));
      } else {
        resolve(rows);
      }

      db.close();
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);

    db.on("error", (err) => {
      // reject(err);
      reject(Object.assign(new Error(err.message), { code: 400 }));
    });

    db.get(sql, params, (err, rows) => {
      if (err) {
        // reject(err);
        reject(Object.assign(new Error(err.message), { code: 400 }));
      } else {
        resolve(rows);
      }

      db.close();
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);

    db.on("error", (err) => {
      // reject(err);
      reject(Object.assign(new Error(err.message), { code: 400 }));
    });

    db.run(sql, params, function (err, rows) {
      if (err) {
        // reject(err);
        reject(Object.assign(new Error(err.message), { code: 400 }));
      } else {
        // 插入成功
        resolve({ lastID: this.lastID, changes: this.changes });
      }

      db.close();
    });
  });
}

module.exports = {
  get,
  all,
  run,
};

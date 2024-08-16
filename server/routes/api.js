const multer = require("multer");
var router = express.Router();
var express = require("express");

const mysql = require("../utils/mysql");
const sqlite = require("../utils/sqlite");

router.get("/", async (req, res, next) => {
  res.render("api", { title: "Api" });
});

// http://localhost:3000/api/user?id=1
router.get("/user", async (req, res, next) => {
  const id = req.query.id;
  let rows = await sqlite.all(`SELECT id, name FROM user WHERE id = ?`, [id]);

  res.json({ data: rows });
});

router.get("/mysql_test", async (req, res, next) => {
  let query_data = await mysql
    .query("SELECT * FROM tbd WHERE id = ? and price = ? ", [5, 1349])
    .then((res) => {
      return res;
    });
  res.json(query_data);
});

router.get("/sqlite_test", async (req, res, next) => {
  try {
    let query_data = await db.all("SELECT * FROM user").then((res) => {
      return res;
    });
    res.json(query_data);
  } catch (error) {
    next(error);
  }
});

router.get("/download", function (req, res, next) {
  res.download("./server/public/my_pdf.pdf", "my_pdf.pdf", function (err) {
    if (err) {
      console.log(err);
    } else {
    }
  });
});

const upload = multer({
  storage: multer.diskStorage({
    // 文件存储位置
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    // 文件保存名称
    filename: function (req, file, cb) {
      const { fieldname, originalname, mimetype } = file;
      // 文件名称
      const file_name =
        fieldname + "_" + Math.random().toString(16).substring(2, 8);

      // 后缀
      const after = originalname.split(".")[1]
        ? "." + originalname.split(".")[1]
        : "";
      cb(null, file_name + after);
    },
  }),
  // 限制接受上传的文件
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Only JPG files are allowed!"), false); // 拒绝上传的文件
    }
  },
  // 限制文件大小
  limits: {
    fileSize: 1024 * 1024 * 1024,
    files: 3,
  },
});

router.get("/upload", function (req, res, next) {
  res.send(
    `<!DOCTYPE html>
      <html>
      <body>
        <form action="upload" method="post" enctype="multipart/form-data">
          <h1>选择上传的文件</h1>  
          <input type="file" name="fieldname">
          <input type="submit" value="上传">
        </form>
      </body>
      </html>`
  );
});

router.post("/upload", upload.single("fieldname"), function (req, res, next) {
  res.send(req.file);
});

module.exports = router;

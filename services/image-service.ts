import multer from "multer";

class service {
  static upload() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/static/img/");
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    const upload = multer({ storage });

    return upload;
  }
}

export default service;

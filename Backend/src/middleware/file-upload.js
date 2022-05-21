const multer = require("multer");
const { v1: uuidv1 } = require("uuid");

// appropriate file extension
const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
// an obj with a bunch of pre-configured middlewares
const fileUpload = multer({
  // provide storage and limited image size in bytes
  limits: 500000,
  storage: multer.diskStorage({
    // control the destination where the file is stored
    destination: (req, file, cb) => {
      cb(null, "src/uploads/images");
    },
    // control the file name being used
    filename: (req, file, cb) => {
      //get the extension
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    // !! double-bang => convert null/ undefined to false
    const isValid = !!MINE_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error(`Invalid mime type`);
    cb(error, isValid);
  },
});

module.exports = fileUpload;

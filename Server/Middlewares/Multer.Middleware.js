const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).fields([
  {
    name: 'video',
    maxCount: 1
  },
  {
    name: 'subtitle',
    maxCount: 1
  },
]);

module.exports = upload;
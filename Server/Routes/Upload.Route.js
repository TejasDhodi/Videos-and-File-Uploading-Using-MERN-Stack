const express = require('express');
const router = express.Router();
const { uploadController, uploadData, deleteVideo } = require('../Controller/Upload.Controller');
const upload = require('../Middlewares/Multer.Middleware');

router.route("/").get(uploadData);
router.route("/video").post(upload, uploadController);
router.route("/video/:id").delete(deleteVideo);

module.exports = router;

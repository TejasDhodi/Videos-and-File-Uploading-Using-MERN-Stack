const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const uploadModel = new Schema({
    video: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
});

const UploadedVideo = model('UploadedVideo', uploadModel);
module.exports = UploadedVideo;
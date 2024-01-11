const asyncHandler = require('../Utils/AsyncHandler')
const uploadModel = require('../Model/Upload.Model');
const apiError = require('../Utils/ApiError');
const uploadOnCloudinary = require('../Utils/Cloudinary')

// Controller to Upload Data on Cloudinary and Database
const uploadController = asyncHandler(async (req, res) => {
    const video = req.files?.video[0]?.path;
    const subTitle = req.files?.subtitle[0]?.path;
    const { Title } = req.body;

    if (!video || !subTitle || !Title) {
        throw new apiError(400, 'Required Field')
    }

    const videoUrl = await uploadOnCloudinary(video);
    const subtitleUrl = await uploadOnCloudinary(subTitle);

    const uploadVideo = await uploadModel.create({
        video: videoUrl.url,
        subtitle: subtitleUrl.url,
        Title
    });

    res.status(201).json({
        message: "video Uploaded Successfully in database"
    })

    console.log('uploadVideo : ', uploadVideo);
    return uploadVideo;
})

// Controller to get Data From Cloudinary and Database
const uploadData = asyncHandler(async (req, res) => {
    const showData = await uploadModel.find();
    
    res.status(201).json({
        data: showData
    })
})

// Controller to Delete DataCloudinary and Database
const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new apiError(400, "Id Not Found");
    }

    const deleteSingleVideo = await uploadModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ "Deleted Video": deleteSingleVideo });
})

module.exports = { uploadController, uploadData, deleteVideo };
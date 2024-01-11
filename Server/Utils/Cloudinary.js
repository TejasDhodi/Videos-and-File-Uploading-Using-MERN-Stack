const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try {
        // To Check Wheather the local path is available or not
        if (!localPath) {
            console.log('Local Path is Missing');
            return null;
        }

        // To Upload The File On Cloudinary
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto',
            raw_convert: "google_speech"
        })


        console.log('Video Uploaded Successfully', response.url);
        return response
    } catch (error) {
        console.log('Error while uploading file to Cloudinary', error.message);
        // To Remove the file
        fs.unlinkSync(localPath);
        return null;
    }
}

module.exports = uploadOnCloudinary;




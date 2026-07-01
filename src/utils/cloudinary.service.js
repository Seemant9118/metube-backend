import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

(async function () {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
})();

const uploadToCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is required for upload.');
        }
        // upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto', // this will automatically detect the file type (image, video, etc.)
            folder: 'metube', // optional: specify a folder in your Cloudinary account
        });

        // file uploaded successfully, return the response
        console.log('File uploaded to Cloudinary:', response.url);

        return response;
    } catch (error) {
        fs.unlinkSync(filePath); // remove the file from local storage if upload fails
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

export { uploadToCloudinary };
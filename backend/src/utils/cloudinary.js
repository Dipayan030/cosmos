import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image", // Automatically detects images, videos, PDFs etc.
      folder: "cosmos" // Optional: organizes files inside a folder
    });

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Delete local file even if the cloud upload failed to prevent clogging disk
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload failed:", error.message);
    return null;
  }
};

// Delete old asset from Cloudinary using public_id
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId){
      console.error("No publicId provided for deletion");
      return null;
    } 
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    });
    if (response.result === 'ok') {
      console.log("Asset deleted successfully from Cloudinary");
      return response;
    } else {
      console.log("Cloudinary deletion failed:", response.result);
      return null;
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return null
  }
};
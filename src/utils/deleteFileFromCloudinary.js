import cloudinary from 'cloudinary';

export const deleteFileFromCloudinary = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};

import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs/promises";

export const uploadToCloudinary = async (
  filePath,
  publicId,
  folder = "ai-blog"
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });

    await fs.unlink(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    try {
      await fs.unlink(filePath);
    } catch { }

    throw error;
  }
};

// export const deleteFromCloudinary = async (public_id) => {
//   return await cloudinary.uploader.destroy(public_id);
// };
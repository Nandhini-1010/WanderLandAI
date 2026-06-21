const cloudinary =
  require("../config/cloudinary");

const uploadImage = async (
  req,
  res
) => {
  try {

 console.log("Request received");
    console.log(req.file);

    const result =
      await cloudinary.uploader.upload(
        req.file.path
      );

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
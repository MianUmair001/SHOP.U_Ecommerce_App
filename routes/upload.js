const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
//Upload image on Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload Image
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No Files are Uploaded" });
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTMP(file.tempFilePath);
      return res.status(400).res.json("Size to Large");
    }
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      removeTMP(file.tempFilePath);
      return res.status(400).json({ msg: "File Format is incorrect" });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Test" },
      async (err, result) => {
        if (err) throw err;
        removeTMP(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Delete Image 
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) res.status(400).json({ msg: "No Images Selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
const removeTMP = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;

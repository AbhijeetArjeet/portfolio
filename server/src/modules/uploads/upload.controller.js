const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prisma = require('../../config/prisma');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, PNG, WEBP, and GIF images are permitted.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB maximum
  }
});

exports.uploadMiddleware = upload.single('file');

exports.handleUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please choose an image file to upload.' });
    }

    const publicUrl = `/uploads/${req.file.filename}`;

    const record = await prisma.upload.create({
      data: {
        userId: req.user.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: publicUrl
      }
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      url: publicUrl,
      upload: record
    });
  } catch (err) {
    next(err);
  }
};

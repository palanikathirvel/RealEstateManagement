const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();

// Ensure upload directory exists (use /tmp for Vercel compatibility)
const uploadDir = process.env.UPLOAD_PATH || path.join('/tmp', 'uploads');
try {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
} catch (error) {
    console.warn('Failed to create upload directory:', error.message);
    // Continue without failing - Vercel will handle file uploads differently
}

// Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

router.post('/', upload.single('file'), handleUpload);

module.exports = router;

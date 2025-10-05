const multer = require('multer');
const path = require('path');

/**
 * Cấu hình multer cho upload ảnh thời tiết
 */
const storage = multer.memoryStorage(); // Lưu trong memory để xử lý trực tiếp

const fileFilter = (req, file, cb) => {
    // Chỉ chấp nhận các file ảnh
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP)'), false);
    }
};

const limits = {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1 // Chỉ cho phép 1 file
};

/**
 * Middleware upload ảnh thời tiết
 */
const uploadWeatherImage = multer({
    storage,
    fileFilter,
    limits
}).single('image'); // Field name là 'image'

/**
 * Wrapper để handle multer errors
 */
const handleImageUpload = (req, res, next) => {
    uploadWeatherImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    error: 'File quá lớn',
                    message: 'Kích thước file tối đa là 10MB'
                });
            } else if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({
                    error: 'Quá nhiều file',
                    message: 'Chỉ được upload 1 file'
                });
            } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    error: 'Field không hợp lệ',
                    message: 'Sử dụng field name "image" để upload'
                });
            }
            
            return res.status(400).json({
                error: 'Lỗi upload',
                message: err.message
            });
        } else if (err) {
            return res.status(400).json({
                error: 'File không hợp lệ',
                message: err.message
            });
        }
        
        next();
    });
};

/**
 * Middleware validate image sau khi upload
 */
const validateImage = (req, res, next) => {
    if (!req.file) {
        // Nếu không có file, có thể là optional tùy vào endpoint
        return next();
    }

    const { buffer, mimetype, originalname, size } = req.file;

    // Kiểm tra thêm các điều kiện
    if (size === 0) {
        return res.status(400).json({
            error: 'File rỗng',
            message: 'File ảnh không có nội dung'
        });
    }

    // Log thông tin file
    console.log(`📸 Upload thành công: ${originalname}`);
    console.log(`📊 Thông tin: ${mimetype}, ${(size / 1024).toFixed(1)}KB`);

    next();
};

/**
 * Middleware xử lý lỗi upload
 */
const handleUploadError = (err, req, res, next) => {
    if (err) {
        console.error('❌ Upload error:', err);
        
        return res.status(500).json({
            error: 'Lỗi xử lý file',
            message: 'Không thể xử lý file upload'
        });
    }
    
    next();
};

module.exports = {
    uploadWeatherImage,
    handleImageUpload,
    validateImage,
    handleUploadError,
    
    // Các cấu hình để sử dụng riêng lẻ
    storage,
    fileFilter,
    limits
};
const express = require('express');
const chatController = require('../controllers/chatController');
const weatherController = require('../controllers/weatherController');
const imageWeatherController = require('../controllers/imageWeatherController');
const { handleImageUpload, validateImage } = require('../middleware/upload');

const router = express.Router();

// === CHAT ROUTES ===
/**
 * POST /api/chat
 * Endpoint chính cho chatbot AI
 */
router.post('/chat', chatController.handleChat.bind(chatController));

// === WEATHER ROUTES ===
/**
 * GET /api/weather
 * Lấy thông tin thời tiết hiện tại của một thành phố
 * Query params: city (required)
 */
router.get('/weather', weatherController.getWeatherJSON.bind(weatherController));

/**
 * GET /api/weather/forecast
 * Lấy dự báo thời tiết nhiều ngày
 * Query params: city (required), days (optional, default: 5)
 */
router.get('/weather/forecast', weatherController.getForecast.bind(weatherController));

/**
 * GET /api/weather/cities
 * Lấy danh sách các thành phố được hỗ trợ
 */
router.get('/weather/cities', weatherController.getSupportedCities.bind(weatherController));

// === IMAGE WEATHER ROUTES ===
/**
 * POST /api/weather/analyze-image
 * Phân tích ảnh thời tiết với Gemini Vision
 * Body: multipart/form-data với field 'image' và optional 'prompt', 'location'
 */
router.post('/weather/analyze-image', 
    handleImageUpload, 
    validateImage, 
    imageWeatherController.analyzeWeatherImage.bind(imageWeatherController)
);

/**
 * POST /api/chat/image
 * Chat với ảnh thời tiết
 * Body: multipart/form-data với field 'image' và optional 'message', 'location'
 */
router.post('/chat/image', 
    handleImageUpload, 
    validateImage, 
    chatController.handleChatWithImage.bind(chatController)
);

/**
 * POST /api/weather/forecast-from-description
 * Tạo dự báo từ mô tả ảnh
 * Body: { description, location? }
 */
router.post('/weather/forecast-from-description', 
    imageWeatherController.generateForecastFromDescription.bind(imageWeatherController)
);

/**
 * GET /api/weather/image-types
 * Lấy danh sách các loại ảnh được hỗ trợ
 */
router.get('/weather/image-types', 
    imageWeatherController.getSupportedImageTypes.bind(imageWeatherController)
);

// === HEALTH CHECK ===
/**
 * GET /api/health
 * Kiểm tra trạng thái server
 */
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// === ERROR HANDLING ===
/**
 * Middleware xử lý route không tồn tại
 */
router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route không tồn tại',
        path: req.originalUrl,
        method: req.method
    });
});

module.exports = router;
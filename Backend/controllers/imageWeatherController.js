const geminiService = require('../services/geminiService');
const fs = require('fs').promises;
const path = require('path');

class ImageWeatherController {
    /**
     * Phân tích ảnh thời tiết
     */
    async analyzeWeatherImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'Không tìm thấy file ảnh',
                    message: 'Vui lòng upload một file ảnh'
                });
            }

            const { buffer, mimetype, originalname } = req.file;
            const userPrompt = req.body.prompt || '';
            const location = req.body.location || '';

            // Kiểm tra định dạng file
            if (!mimetype.startsWith('image/')) {
                return res.status(400).json({
                    error: 'File không hợp lệ',
                    message: 'Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP)'
                });
            }

            // Kiểm tra kích thước file (max 10MB)
            if (buffer.length > 10 * 1024 * 1024) {
                return res.status(400).json({
                    error: 'File quá lớn',
                    message: 'Kích thước file tối đa là 10MB'
                });
            }

            console.log(`📸 Nhận ảnh: ${originalname} (${mimetype}, ${(buffer.length / 1024).toFixed(1)}KB)`);

            // Phân tích ảnh với Gemini Vision
            const analysis = await geminiService.analyzeWeatherImage(
                buffer, 
                mimetype, 
                userPrompt
            );

            // Lưu metadata để tracking (optional)
            const metadata = {
                filename: originalname,
                mimetype,
                size: buffer.length,
                location,
                userPrompt,
                timestamp: new Date().toISOString(),
                analysis: analysis.substring(0, 200) + '...' // Lưu một phần kết quả
            };

            res.json({
                success: true,
                analysis,
                metadata: {
                    filename: originalname,
                    size: `${(buffer.length / 1024).toFixed(1)}KB`,
                    location,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('❌ Lỗi phân tích ảnh thời tiết:', error);
            
            let errorMessage = 'Không thể phân tích ảnh thời tiết';
            let statusCode = 500;

            if (error.message.includes('safety filter')) {
                errorMessage = 'Ảnh bị chặn bởi bộ lọc an toàn. Vui lòng thử ảnh khác.';
                statusCode = 400;
            } else if (error.message.includes('quota exceeded')) {
                errorMessage = 'Đã vượt quá giới hạn API. Vui lòng thử lại sau.';
                statusCode = 429;
            } else if (error.message.includes('không khả dụng')) {
                errorMessage = 'Dịch vụ AI tạm thời không khả dụng';
                statusCode = 503;
            }

            res.status(statusCode).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * Chat với ảnh thời tiết
     */
    async chatWithWeatherImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'Không tìm thấy file ảnh',
                    message: 'Vui lòng upload một file ảnh'
                });
            }

            const { buffer, mimetype, originalname } = req.file;
            const message = req.body.message || 'Phân tích thời tiết trong ảnh này';
            const location = req.body.location || '';

            console.log(`💬📸 Chat với ảnh: ${originalname}`);
            console.log(`💭 Tin nhắn: ${message}`);

            // Phân tích ảnh với câu hỏi cụ thể
            const response = await geminiService.analyzeWeatherImage(
                buffer, 
                mimetype, 
                message
            );

            res.json({
                success: true,
                reply: response,
                imageInfo: {
                    filename: originalname,
                    size: `${(buffer.length / 1024).toFixed(1)}KB`,
                    location,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('❌ Lỗi chat với ảnh:', error);
            
            res.status(500).json({
                error: 'Không thể xử lý chat với ảnh',
                reply: '😅 Xin lỗi, tôi không thể phân tích ảnh này. Có thể thử với ảnh khác không?',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * Lấy danh sách các loại ảnh thời tiết được hỗ trợ
     */
    getSupportedImageTypes(req, res) {
        const supportedTypes = [
            {
                type: 'image/jpeg',
                extensions: ['.jpg', '.jpeg'],
                description: 'JPEG images'
            },
            {
                type: 'image/png',
                extensions: ['.png'],
                description: 'PNG images'
            },
            {
                type: 'image/gif',
                extensions: ['.gif'],
                description: 'GIF images'
            },
            {
                type: 'image/webp',
                extensions: ['.webp'],
                description: 'WebP images'
            }
        ];

        const tips = [
            '📸 Chụp ảnh bầu trời rõ nét để có kết quả tốt nhất',
            '🌤️ Ảnh có thể chứa mây, nắng, mưa, hoặc các hiện tượng thời tiết khác',
            '🏙️ Ảnh có thể là cảnh quan, đường phố, hoặc từ cửa sổ',
            '📱 Kích thước file tối đa: 10MB',
            '🤖 AI sẽ phân tích và dự đoán thời tiết dựa trên ảnh'
        ];

        res.json({
            supportedTypes,
            maxFileSize: '10MB',
            tips,
            examples: [
                'Ảnh bầu trời có mây',
                'Ảnh trời mưa',
                'Ảnh hoàng hôn',
                'Ảnh sương mù',
                'Ảnh cầu vồng',
                'Ảnh tuyết rơi'
            ]
        });
    }

    /**
     * Tạo dự báo từ mô tả ảnh
     */
    async generateForecastFromDescription(req, res) {
        try {
            const { description, location } = req.body;

            if (!description) {
                return res.status(400).json({
                    error: 'Thiếu mô tả ảnh',
                    message: 'Vui lòng cung cấp mô tả về ảnh thời tiết'
                });
            }

            console.log(`🔮 Tạo dự báo từ mô tả: ${description}`);

            const forecast = await geminiService.generateWeatherForecast(description, location);

            res.json({
                success: true,
                forecast,
                input: {
                    description,
                    location,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('❌ Lỗi tạo dự báo:', error);
            
            res.status(500).json({
                error: 'Không thể tạo dự báo thời tiết',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

module.exports = new ImageWeatherController();
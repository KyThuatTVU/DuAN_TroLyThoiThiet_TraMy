const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = null;
        this.isAvailable = false;
        this.init();
    }

    /**
     * Khởi tạo service
     */
    async init() {
        try {
            if (!process.env.GEMINI_API_KEY) {
                console.warn('GEMINI_API_KEY không được cấu hình');
                return;
            }

            this.model = this.genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash",
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            });
            
            this.isAvailable = true;
            console.log('✅ Gemini AI service initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI service:', error.message);
            this.isAvailable = false;
        }
    }

    /**
     * Kiểm tra service có sẵn không
     */
    checkAvailability() {
        return this.isAvailable && this.model;
    }

    /**
     * Gửi prompt tới Gemini AI
     */
    async askGemini(prompt, options = {}) {
        if (!this.checkAvailability()) {
            throw new Error('Gemini AI service không khả dụng');
        }

        try {
            console.log('🤖 Đang gọi Gemini AI...');
            
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            console.log('✅ Gemini AI đã trả lời thành công');
            return text;
            
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            
            // Xử lý các loại lỗi cụ thể
            if (error.message.includes('API key not valid')) {
                throw new Error('API key Gemini không hợp lệ');
            } else if (error.message.includes('quota exceeded')) {
                throw new Error('Đã vượt quá giới hạn quota API');
            } else if (error.message.includes('blocked')) {
                throw new Error('Nội dung bị chặn bởi safety filter');
            } else {
                throw new Error(`Lỗi Gemini API: ${error.message}`);
            }
        }
    }

    /**
     * Chat với context (cho các cuộc hội thoại dài)
     */
    async chatWithContext(messages) {
        if (!this.checkAvailability()) {
            throw new Error('Gemini AI service không khả dụng');
        }

        try {
            // Chuyển đổi messages thành format của Gemini
            const contents = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            const chat = this.model.startChat({
                history: contents.slice(0, -1), // Tất cả trừ message cuối
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                }
            });

            const lastMessage = contents[contents.length - 1];
            const result = await chat.sendMessage(lastMessage.parts[0].text);
            const response = await result.response;
            
            return response.text();
            
        } catch (error) {
            console.error('❌ Gemini Chat Error:', error.message);
            throw new Error(`Lỗi Gemini Chat: ${error.message}`);
        }
    }

    /**
     * Phân tích ảnh thời tiết với Gemini Vision
     */
    async analyzeWeatherImage(imageBuffer, mimeType, userPrompt = '') {
        if (!this.checkAvailability()) {
            throw new Error('Gemini AI service không khả dụng');
        }

        try {
            console.log('🖼️ Đang phân tích ảnh thời tiết với Gemini Vision...');
            
            // Tạo prompt chuyên biệt cho phân tích thời tiết với personality Trà My
            const weatherPrompt = `Tôi là Trà My, một cô gái trẻ năng động và thích thú với thời tiết! Tôi có khả năng phân tích ảnh thời tiết và đưa ra dự đoán chính xác. Hãy để tôi xem ảnh này và cho bạn biết thời tiết như thế nào nhé!

            YÊU CẦU PHÂN TÍCH CỦA TRÀ MY:
            🌤️ Tình trạng thời tiết hiện tại (nắng, mây, mưa, bão, etc.)
            🌡️ Ước tính nhiệt độ dựa trên các dấu hiệu
            💧 Độ ẩm và khả năng có mưa
            💨 Hướng gió và cường độ gió
            ☁️ Loại mây và ý nghĩa của chúng
            🔮 Dự báo thời tiết trong vài giờ tới
            👕 Lời khuyên về trang phục từ Trà My
            
            PHONG CÁCH CỦA TRÀ MY:
            - Năng động, thân thiện như một cô gái trẻ
            - Sử dụng emoji dễ thương
            - Nói chuyện tự nhiên, không quá trang trọng
            - Quan tâm đến người dùng như một người bạn
            - Thỉnh thoảng dùng "mình" thay vì "tôi"
            
            ${userPrompt ? `Câu hỏi thêm từ người dùng: "${userPrompt}"` : ''}
            
            Hãy phân tích ảnh và trả lời:`;

            // Tạo parts với ảnh và text
            const imagePart = {
                inlineData: {
                    data: imageBuffer.toString('base64'),
                    mimeType: mimeType
                }
            };

            const textPart = {
                text: weatherPrompt
            };

            const result = await this.model.generateContent([textPart, imagePart]);
            const response = await result.response;
            const text = response.text();
            
            console.log('✅ Phân tích ảnh thời tiết thành công!');
            return text;
            
        } catch (error) {
            console.error('❌ Gemini Vision Error:', error.message);
            
            if (error.message.includes('blocked')) {
                throw new Error('Ảnh bị chặn bởi safety filter. Vui lòng thử ảnh khác.');
            } else if (error.message.includes('quota exceeded')) {
                throw new Error('Đã vượt quá giới hạn quota API');
            } else {
                throw new Error(`Lỗi phân tích ảnh: ${error.message}`);
            }
        }
    }

    /**
     * Tạo dự báo thời tiết từ mô tả ảnh
     */
    async generateWeatherForecast(imageDescription, location = '') {
        if (!this.checkAvailability()) {
            throw new Error('Gemini AI service không khả dụng');
        }

        try {
            const prompt = `Chào bạn! Mình là Trà My 😊 Dựa trên mô tả ảnh thời tiết mà bạn vừa gửi, để mình tạo dự báo chi tiết cho bạn nhé!

            MÔ TẢ ẢNH: "${imageDescription}"
            ${location ? `VỊ TRÍ: ${location}` : ''}
            
            Trà My sẽ phân tích và đưa ra:
            - 🌤️ Tình trạng thời tiết hiện tại
            - 🔮 Dự báo 2-3 giờ tới
            - 👕 Lời khuyện về trang phục từ Trà My
            - ⚠️ Cảnh báo nếu có thời tiết nguy hiểm
            
            Mình sẽ trả lời bằng tiếng Việt thân thiện, dùng emoji dễ thương và format đẹp mắt nhé! 💫`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            
            return response.text();
            
        } catch (error) {
            console.error('❌ Weather forecast generation error:', error.message);
            throw new Error(`Lỗi tạo dự báo: ${error.message}`);
        }
    }

    /**
     * Tạo prompt thông minh cho weather bot
     */
    createWeatherBotPrompt(userMessage, weatherData = null) {
        return `Xin chào! Mình là Trà My 😊 - một cô gái trẻ năng động và đam mê thời tiết tại Việt Nam! Mình có thể trò chuyện về nhiều chủ đề khác nhau, nhưng sở trường của mình là phân tích thời tiết. Mình sẽ trả lời bằng tiếng Việt một cách tự nhiên và thân thiện như một người bạn!

        NHIỆM VỤ CỦA TRÀ MY:
        ${weatherData && !weatherData.error ? 
          '🌤️ Phân tích dữ liệu thời tiết và đưa ra lời khuyên hữu ích\n👗 Gợi ý về trang phục, hoạt động phù hợp\n⚠️ Cảnh báo về điều kiện thời tiết đặc biệt như một người bạn quan tâm' :
          '💬 Trò chuyện tự nhiên về các chủ đề khác\n😊 Trả lời câu hỏi chào hỏi, giới thiệu bản thân\n🌈 Gợi ý cách hỏi về thời tiết nếu bạn muốn\n🤝 Giúp đỡ các câu hỏi đơn giản khác'
        }

        PHONG CÁCH CỦA TRÀ MY:
        - 🌟 Năng động, vui vẻ như một cô gái trẻ
        - 😄 Sử dụng emoji dễ thương và phù hợp
        - 💖 Nói chuyện thân thiện, không quá trang trọng
        - 🎯 Quan tâm đến người dùng như một người bạn
        - 💫 Thỉnh thoảng dùng "mình" thay vì "tôi"
        - 🌸 Câu trả lời ngắn gọn nhưng đầy cảm xúc
        
        ${weatherData && !weatherData.error ? 
          `📊 DỮ LIỆU THỜI TIẾT HIỆN TẠI:\n${JSON.stringify(weatherData, null, 2)}` : 
          "🌈 KHÔNG CÓ DỮ LIỆU THỜI TIẾT - Mình sẵn sàng trò chuyện tự nhiên với bạn!"
        }
        
        Bạn nói: "${userMessage}"
        Trà My trả lời:`;
    }

    /**
     * Lấy thông tin status của service
     */
    getStatus() {
        return {
            available: this.isAvailable,
            hasApiKey: !!process.env.GEMINI_API_KEY,
            model: this.model ? 'gemini-2.0-flash' : null,
            timestamp: new Date().toISOString()
        };
    }
}

// Export singleton instance
module.exports = new GeminiService();
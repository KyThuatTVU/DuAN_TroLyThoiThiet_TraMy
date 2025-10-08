const { getWeatherLogic } = require('../soap/weatherService');
const geminiService = require('../services/geminiService');
const googleSearchService = require('../services/googleSearchService');

class ChatController {
    /**
     * Xử lý chat với AI
     */
    async handleChat(req, res) {
        const userMessage = req.body.message;
        
        if (!userMessage) {
            return res.status(400).json({ 
                reply: "Xin lỗi, mình không nhận được tin nhắn của bạn." 
            });
        }

        try {
            // Tìm thành phố trong tin nhắn
            const foundCity = this.findCityInMessage(userMessage);
            
            // Lấy dữ liệu thời tiết nếu có thành phố
            let weatherData = null;
            if (foundCity) {
                try {
                    weatherData = await getWeatherLogic(foundCity);
                } catch (weatherError) {
                    weatherData = { error: `Không thể lấy dữ liệu cho ${foundCity}.` };
                }
            }

            // Tìm kiếm Google nếu câu hỏi phức tạp hoặc cần thông tin mới nhất
            let searchResults = null;
            if (this.needsGoogleSearch(userMessage)) {
                try {
                    console.log('🔍 Đang tìm kiếm thông tin bổ sung từ Google...');
                    searchResults = await this.performGoogleSearch(userMessage, foundCity);
                } catch (searchError) {
                    console.error('❌ Lỗi tìm kiếm Google:', searchError.message);
                }
            }

            // Tạo prompt cho AI với thông tin từ Google (nếu có)
            const prompt = this.createAIPrompt(userMessage, weatherData, searchResults);
            
            // Gọi AI hoặc sử dụng fallback
            const aiReply = await this.getAIResponse(prompt, userMessage, foundCity, weatherData);
            
            res.json({ reply: aiReply });

        } catch (err) {
            console.error('Lỗi API Chatbot:', err);
            res.status(500).json({ 
                reply: "Xin lỗi, mình đang gặp sự cố. Vui lòng thử lại sau." 
            });
        }
    }

    /**
     * Xử lý chat với ảnh thời tiết
     */
    async handleChatWithImage(req, res) {
        try {
            const userMessage = req.body.message || 'Phân tích thời tiết trong ảnh này';
            const location = req.body.location || '';

            if (!req.file) {
                return res.status(400).json({
                    reply: "Xin lỗi, mình không thấy ảnh nào. Vui lòng gửi kèm ảnh để mình phân tích thời tiết! 📸"
                });
            }

            const { buffer, mimetype, originalname } = req.file;

            console.log(`💬📸 Chat với ảnh thời tiết: ${originalname}`);
            console.log(`💭 Tin nhắn: ${userMessage}`);

            // Kiểm tra có phải câu hỏi về thời tiết địa phương không
            const foundCity = this.findCityInMessage(userMessage);
            let weatherContext = '';
            
            if (foundCity) {
                try {
                    const weatherData = await getWeatherLogic(foundCity);
                    weatherContext = `\n\nThông tin thời tiết hiện tại tại ${foundCity}:\n${JSON.stringify(weatherData, null, 2)}`;
                } catch (error) {
                    weatherContext = `\n\nKhông thể lấy dữ liệu thời tiết cho ${foundCity}.`;
                }
            }

            // Tạo prompt kết hợp ảnh và text
            const combinedPrompt = `${userMessage}${weatherContext}${location ? `\nVị trí: ${location}` : ''}`;

            // Phân tích ảnh với Gemini Vision
            const aiReply = await geminiService.analyzeWeatherImage(
                buffer, 
                mimetype, 
                combinedPrompt
            );

            res.json({ 
                reply: aiReply,
                imageInfo: {
                    filename: originalname,
                    size: `${(buffer.length / 1024).toFixed(1)}KB`,
                    location,
                    hasWeatherData: !!foundCity
                }
            });

        } catch (error) {
            console.error('❌ Lỗi chat với ảnh:', error);
            
            let errorReply = '😅 Xin lỗi, mình không thể phân tích ảnh này lúc này. ';
            
            if (error.message.includes('safety filter')) {
                errorReply += 'Ảnh có thể chứa nội dung không phù hợp. Hãy thử với ảnh thời tiết khác nhé! 🌤️';
            } else if (error.message.includes('quota exceeded')) {
                errorReply += 'Mình đã sử dụng hết quota API hôm nay. Vui lòng thử lại sau! ⏰';
            } else {
                errorReply += 'Có thể thử lại với ảnh rõ nét hơn về thời tiết không? 📸';
            }

            res.json({ 
                reply: errorReply,
                error: true
            });
        }
    }

    /**
     * Tìm tên thành phố trong tin nhắn
     */
    findCityInMessage(message) {
        const cities = ['hà nội', 'hồ chí minh', 'sài gòn', 'đà nẵng', 'cần thơ', 'hải phòng', 'nha trang'];
        
        for (const city of cities) {
            if (message.toLowerCase().includes(city)) {
                return (city === 'sài gòn') ? 'hồ chí minh' : city;
            }
        }
        return null;
    }

    /**
     * Tạo prompt cho AI
     */
    createAIPrompt(userMessage, weatherData, searchResults = null) {
        let prompt = `Bạn là Trà My, một cô gái trẻ thân thiện và thông minh tại Việt Nam, đam mê về thời tiết. Bạn có thể trò chuyện về nhiều chủ đề khác nhau, đặc biệt giỏi về thời tiết. Trả lời bằng tiếng Việt một cách tự nhiên và thân thiện, sử dụng "mình" thay vì "tôi".

        KHI ĐƯỢC CUNG CẤP DỮ LIỆU THỜI TIẾT:
        - Phân tích dữ liệu thời tiết và đưa ra lời khuyên hữu ích
        - Gợi ý về trang phục, hoạt động phù hợp
        - Cảnh báo về điều kiện thời tiết đặc biệt

        KHI KHÔNG CÓ DỮ LIỆU THỜI TIẾT:
        - Trò chuyện tự nhiên về các chủ đề khác
        - Trả lời câu hỏi chào hỏi, giới thiệu bản thân
        - Gợi ý cách hỏi về thời tiết nếu người dùng muốn
        - Giúp đỡ các câu hỏi đơn giản khác

        KHI CÓ THÔNG TIN TÌM KIẾM TỪ GOOGLE:
        - Sử dụng thông tin tìm kiếm để trả lời chính xác và cập nhật
        - Tham khảo các nguồn tin đáng tin cậy từ kết quả tìm kiếm
        - Kết hợp thông tin từ nhiều nguồn để đưa ra câu trả lời toàn diện`;

        // Thêm thông tin tìm kiếm nếu có
        if (searchResults && searchResults.length > 0) {
            prompt += `\n\nTHÔNG TIN TÌM KIẾM GOOGLE:`;
            searchResults.forEach((result, index) => {
                prompt += `\n${index + 1}. ${result.title}`;
                prompt += `\n   Nguồn: ${result.source}`;
                prompt += `\n   Nội dung: ${result.snippet}`;
                prompt += `\n   Link: ${result.link}\n`;
            });
        }

        prompt += `
        
        PHONG CÁCH:
        - Thân thiện, vui vẻ, nhiệt tình
        - Sử dụng emoji phù hợp
        - Câu trả lời ngắn gọn nhưng đầy đủ ý nghĩa
        
        ${weatherData && !weatherData.error ? 
          `DỮ LIỆU THỜI TIẾT HIỆN TẠI:\n${JSON.stringify(weatherData, null, 2)}` : 
          "KHÔNG CÓ DỮ LIỆU THỜI TIẾT - Hãy trò chuyện tự nhiên!"}
        
        Người dùng nói: "${userMessage}"
        Hãy trả lời:`;
        
        return prompt;
    }

    /**
     * Lấy phản hồi từ AI hoặc sử dụng fallback
     */
    async getAIResponse(prompt, userMessage, foundCity, weatherData) {
        try {
            // Use Gemini AI service for intelligent responses
            const aiResponse = await geminiService.askGemini(prompt);
            return aiResponse;
        } catch (geminiError) {
            console.error('Lỗi Gemini AI:', geminiError.message);
            console.log('Sử dụng fallback response');
            return this.generateFallbackResponse(userMessage, foundCity, weatherData);
        }
    }

    /**
     * Tạo phản hồi dự phòng khi AI không hoạt động
     */
    generateFallbackResponse(userMessage, foundCity, weatherData) {
        const lowerMsg = userMessage.toLowerCase();
        
        // Xử lý các câu chào hỏi cơ bản
        const greetings = ['xin chào', 'chào', 'hello', 'hi', 'hey'];
        const isGreeting = greetings.some(greeting => lowerMsg.includes(greeting));
        
        if (isGreeting && !foundCity) {
            return "Chào bạn! 👋 Mình là Trà My - một cô gái trẻ đam mê thời tiết! 😊💖\n\n" +
                   "Mình có thể giúp bạn:\n" +
                   "🌤️ Kiểm tra thời tiết các thành phố\n" +
                   "👗 Tư vấn trang phục xinh đẹp phù hợp\n" +
                   "📸 Phân tích ảnh thời tiết bằng AI\n" +
                   "💬 Trò chuyện thân thiện về nhiều chủ đề khác\n\n" +
                   "Hãy thử hỏi: 'Thời tiết Hà Nội hôm nay?' hoặc gửi ảnh thời tiết, hoặc chỉ cần chat với mình! 😄✨";
        }
        
        // Xử lý câu hỏi về thơ, truyện, sáng tạo
        if (lowerMsg.includes('thơ') || lowerMsg.includes('làm thơ')) {
            return "🌸 Mình rất thích thơ! Đây là một bài thơ nhỏ về thời tiết:\n\n" +
                   "Mây trời bay lững lờ,\n" +
                   "Nắng vàng trải khắp nơi,\n" +
                   "Gió nhẹ thổi thoảng tới,\n" +
                   "Trời đẹp lòng rộn vui! 🌤️\n\n" +
                   "Bạn muốn biết thời tiết ở đâu để mình làm thơ riêng không? 😊";
        }
        
        if (lowerMsg.includes('kể chuyện') || lowerMsg.includes('truyện')) {
            return "📖 Mình có một câu chuyện nhỏ này:\n\n" +
                   "Ngày xửa ngày xưa, có một đám mây nhỏ rất thích du lịch. Nó bay từ Bắc vào Nam, " +
                   "mang theo những cơn mưa nhẹ đến cho mọi người. Mọi người đều yêu quý đám mây nhỏ này! ☁️💧\n\n" +
                   "Bạn có muốn biết thời tiết ở đâu không? 😊";
        }
        
        if (lowerMsg.includes('hát') || lowerMsg.includes('bài hát')) {
            return "🎵 Mình không hát được nhưng có thể gợi ý:\n" +
                   "♪ Nắng chiều vàng rực rỡ ♪\n" +
                   "♪ Gió nhẹ thổi qua đây ♪\n" +
                   "♪ Trời đẹp lòng phơi phới ♪\n" +
                   "♪ Cùng nhau đi chơi thôi! ♪ 🌞\n\n" +
                   "Bạn muốn kiểm tra thời tiết ở đâu không? 😊";
        }
        
        if (weatherData && !weatherData.error) {
            return this.formatWeatherResponse(weatherData, foundCity);
        }
        
        if (weatherData?.error) {
            return `😅 ${weatherData.error} Hãy thử lại với tên thành phố khác nhé!\n\n` +
                   "Các thành phố mình có thể tra cứu: Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng, Nha Trang...";
        }
        
        // Chat tự nhiên khi không có dữ liệu thời tiết
        const casualResponses = [
            "Chào bạn! 😊 Mình là Trà My đây, mình ở đây để giúp bạn. Bạn muốn biết thời tiết ở đâu không? 💖",
            "Hi bạn! 👋 Mình có thể trò chuyện với bạn hoặc cho bạn biết thời tiết. Bạn cần gì? ✨",
            "Xin chào! 🌟 Hôm nay bạn có kế hoạch gì không? Mình có thể giúp kiểm tra thời tiết! 😊",
            "Hey! 😄 Mình là Trà My - trợ lý AI của bạn. Muốn chat hay hỏi về thời tiết đều được nhé! 💕"
        ];
        
        const randomIndex = Math.floor(Math.random() * casualResponses.length);
        let reply = casualResponses[randomIndex];
        
        reply += "\n\n💡 Ví dụ bạn có thể hỏi:\n";
        reply += "• 'Thời tiết Hà Nội hôm nay?'\n";
        reply += "• 'Trời ở Sài Gòn ra sao?'\n";
        reply += "• 'Làm thơ cho mình' 🌸\n";
        reply += "• 📸 Gửi ảnh thời tiết cho mình phân tích\n"; 
        reply += "• Hoặc chỉ cần chat với mình! 💬✨";
        
        return reply;
    }

    /**
     * Format phản hồi thời tiết
     */
    formatWeatherResponse(weatherData, foundCity) {
        const temp = weatherData.main?.temp ? Math.round(weatherData.main.temp) : 'N/A';
        const desc = weatherData.weather?.[0]?.description || 'Không rõ';
        const city = weatherData.name || foundCity;
        const humidity = weatherData.main?.humidity || 'N/A';
        const windSpeed = weatherData.wind?.speed || 'N/A';
        
        let reply = `🌤️ **Thời tiết tại ${city}:**\n`;
        reply += `🌡️ Nhiệt độ: ${temp}°C\n`;
        reply += `☁️ Tình trạng: ${desc}\n`;
        if (humidity !== 'N/A') reply += `💧 Độ ẩm: ${humidity}%\n`;
        if (windSpeed !== 'N/A') reply += `💨 Gió: ${windSpeed} m/s\n\n`;
        
        // Lời khuyên thông minh
        reply += "💡 **Lời khuyên:** ";
        if (temp !== 'N/A') {
            if (temp > 32) {
                reply += "Trời rất nóng! Mặc quần áo mỏng, đội nón, thoa kem chống nắng và uống nhiều nước.";
            } else if (temp > 28) {
                reply += "Trời khá nóng, nên mặc quần áo thoáng mát và mang theo nước uống.";
            } else if (temp > 22) {
                reply += "Thời tiết dễ chịu! Rất thích hợp cho các hoạt động ngoài trời.";
            } else if (temp > 15) {
                reply += "Hơi mát, nên mặc áo dài tay hoặc áo khoác nhẹ.";
            } else {
                reply += "Trời lạnh, hãy mặc ấm và có thể cần áo khoác dày!";
            }
        }
        
        if (desc.toLowerCase().includes('rain') || desc.toLowerCase().includes('drizzle')) {
            reply += " Có mưa, nhớ mang theo ô!";
        }
        
        return reply;
    }

    /**
     * Kiểm tra xem câu hỏi có cần tìm kiếm Google không
     * @param {string} message - Tin nhắn từ user
     * @returns {boolean} - True nếu cần tìm kiếm
     */
    needsGoogleSearch(message) {
        const searchTriggers = [
            // Từ khóa về thông tin mới nhất
            'tin tức', 'mới nhất', 'hiện nay', 'hôm nay', 'gần đây',
            'cập nhật', 'thông tin', 'tìm kiếm', 'tra cứu',
            // Từ khóa về bão lụt
            'bão', 'siêu bão', 'áp thấp', 'lũ lụt', 'ngập lụt',
            'thiên tai', 'cảnh báo', 'dự báo bão',
            // Từ khóa cần thông tin chi tiết
            'vị trí', 'đường đi', 'ảnh hưởng', 'thiệt hại',
            // Từ khóa địa điểm cụ thể
            'miền trung', 'miền bắc', 'miền nam', 'khu vực'
        ];

        const lowerMessage = message.toLowerCase();
        return searchTriggers.some(trigger => lowerMessage.includes(trigger));
    }

    /**
     * Thực hiện tìm kiếm Google
     * @param {string} message - Tin nhắn từ user
     * @param {string} location - Địa điểm (nếu có)
     * @returns {Promise<Array>} - Kết quả tìm kiếm
     */
    async performGoogleSearch(message, location = null) {
        try {
            // Kiểm tra nếu câu hỏi liên quan đến thời tiết
            if (googleSearchService.isWeatherRelated(message)) {
                // Trích xuất địa điểm từ tin nhắn nếu chưa có
                const searchLocation = location || googleSearchService.extractLocation(message);
                
                if (searchLocation) {
                    // Tìm kiếm thông tin thời tiết cho địa điểm cụ thể
                    return await googleSearchService.searchWeatherInfo(searchLocation, this.extractWeatherTopic(message));
                } else {
                    // Tìm kiếm tin tức thời tiết chung
                    return await googleSearchService.searchLatestWeatherNews();
                }
            } else {
                // Tìm kiếm chung
                return await googleSearchService.searchGoogle(message, 3);
            }
        } catch (error) {
            console.error('❌ Lỗi perform Google search:', error.message);
            return [];
        }
    }

    /**
     * Trích xuất chủ đề thời tiết từ tin nhắn
     * @param {string} message - Tin nhắn
     * @returns {string} - Chủ đề thời tiết
     */
    extractWeatherTopic(message) {
        const topics = {
            'bão': ['bão', 'siêu bão', 'storm', 'typhoon'],
            'mưa': ['mưa', 'rain', 'downpour', 'shower'],
            'nắng nóng': ['nắng nóng', 'heat wave', 'nóng bức'],
            'lạnh': ['lạnh', 'cold', 'rét', 'băng giá'],
            'lũ lụt': ['lũ', 'ngập', 'flood', 'lụt'],
            'hạn hán': ['hạn hán', 'drought', 'khô hạn']
        };

        const lowerMessage = message.toLowerCase();
        
        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                return topic;
            }
        }
        
        return '';
    }
}

module.exports = new ChatController();
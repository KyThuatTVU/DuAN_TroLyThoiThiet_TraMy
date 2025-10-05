// File: ser// --- TÍCH HỢỢP GEMINI AI ---
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// -------------------------.js (Phiên bản cuối cùng, đã thống nhất)

require('dotenv').config();
const express = require('express');
const soap = require('soap');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// SỬA LỖI: Import cả hai thành phần từ CÙNG MỘT file
const { weatherServiceDefinition, getWeatherLogic } = require('./soap/weatherService');

// --- TÍCH HỢỢP GEMINI AI ---
const axios = require('axios');
// -------------------------

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Phục vụ các file tĩnh (như index.html) từ thư mục gốc của backend
// Điều này cho phép bạn đặt index.html cùng cấp với server.js
app.use(express.static(path.join(__dirname, '..', 'Frontend'))); 

// Read WSDL file
const wsdlPath = path.join(__dirname, 'soap', 'weatherWsdl.xml');
const wsdlXML = fs.readFileSync(wsdlPath, 'utf8');


// --- ENDPOINT CHO CHATBOT AI ---
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ reply: "Xin lỗi, tôi không nhận được tin nhắn của bạn." });
    }

    try {
        const cities = ['hà nội', 'hồ chí minh', 'sài gòn', 'đà nẵng', 'cần thơ', 'hải phòng', 'nha trang'];
        let foundCity = null;
        for (const city of cities) {
            if (userMessage.toLowerCase().includes(city)) {
                foundCity = (city === 'sài gòn') ? 'hồ chí minh' : city;
                break;
            }
        }

        let weatherDataForAI = null;
        if (foundCity) {
            try {
                // SỬA LỖI: Gọi hàm logic đã được thống nhất
                weatherDataForAI = await getWeatherLogic(foundCity);
            } catch (weatherError) {
                weatherDataForAI = { error: `Không thể lấy dữ liệu cho ${foundCity}.` };
            }
        }

        const prompt = `Bạn là WeatherBot AI, một trợ lý thân thiện và thông minh tại Việt Nam. Bạn có thể trò chuyện về nhiều chủ đề khác nhau, đặc biệt giỏi về thời tiết. Trả lời bằng tiếng Việt một cách tự nhiên và thân thiện.

        KHI ĐƯỢC CUNG CẤP DỮ LIỆU THỜI TIẾT:
        - Phân tích dữ liệu thời tiết và đưa ra lời khuyên hữu ích
        - Gợi ý về trang phục, hoạt động phù hợp
        - Cảnh báo về điều kiện thời tiết đặc biệt

        KHI KHÔNG CÓ DỮ LIỆU THỜI TIẾT:
        - Trò chuyện tự nhiên về các chủ đề khác
        - Trả lời câu hỏi chào hỏi, giới thiệu bản thân
        - Gợi ý cách hỏi về thời tiết nếu người dùng muốn
        - Giúp đỡ các câu hỏi đơn giản khác

        PHONG CÁCH:
        - Thân thiện, vui vẻ, nhiệt tình
        - Sử dụng emoji phù hợp
        - Câu trả lời ngắn gọn nhưng đầy đủ ý nghĩa
        
        ${weatherDataForAI && !weatherDataForAI.error ? 
          `DỮ LIỆU THỜI TIẾT HIỆN TẠI:\n${JSON.stringify(weatherDataForAI, null, 2)}` : 
          "KHÔNG CÓ DỮ LIỆU THỜI TIẾT - Hãy trò chuyện tự nhiên!"}
        
        Người dùng nói: "${userMessage}"
        Hãy trả lời:`;

        // Sử dụng Google Generative AI SDK
        console.log('Đang gọi Gemini AI...');
        console.log('API Key status:', process.env.GEMINI_API_KEY ? 'Có' : 'Không có');
        
        let aiReply;
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            aiReply = response.text();
            console.log('Gemini AI đã trả lời thành công!');
        } catch (geminiError) {
            console.error('Lỗi Gemini API:', geminiError.message);
            
            // Fallback response thông minh
            console.log('Sử dụng fallback response');
            
            // Xử lý các câu chào hỏi cơ bản
            const greetings = ['xin chào', 'chào', 'hello', 'hi', 'hey'];
            const isGreeting = greetings.some(greeting => 
                userMessage.toLowerCase().includes(greeting)
            );
            
            if (isGreeting && !foundCity) {
                aiReply = "Xin chào! 👋 Tôi là WeatherBot AI - trợ lý thời tiết thân thiện của bạn! 😊\n\n";
                aiReply += "Tôi có thể giúp bạn:\n";
                aiReply += "🌤️ Kiểm tra thời tiết các thành phố\n";
                aiReply += "👕 Tư vấn trang phục phù hợp\n";
                aiReply += "💬 Trò chuyện về nhiều chủ đề khác\n\n";
                aiReply += "Hãy thử hỏi: 'Thời tiết Hà Nội hôm nay?' hoặc chỉ cần chat với tôi! 😄";
            } else if (weatherDataForAI && !weatherDataForAI.error) {
                const temp = weatherDataForAI.main?.temp ? Math.round(weatherDataForAI.main.temp) : 'N/A';
                const desc = weatherDataForAI.weather?.[0]?.description || 'Không rõ';
                const city = weatherDataForAI.name || foundCity;
                const humidity = weatherDataForAI.main?.humidity || 'N/A';
                const windSpeed = weatherDataForAI.wind?.speed || 'N/A';
                
                aiReply += `🌤️ **Thời tiết tại ${city}:**\n`;
                aiReply += `🌡️ Nhiệt độ: ${temp}°C\n`;
                aiReply += `☁️ Tình trạng: ${desc}\n`;
                if (humidity !== 'N/A') aiReply += `💧 Độ ẩm: ${humidity}%\n`;
                if (windSpeed !== 'N/A') aiReply += `💨 Gió: ${windSpeed} m/s\n\n`;
                
                // Lời khuyên thông minh
                aiReply += "💡 **Lời khuyên:** ";
                if (temp !== 'N/A') {
                    if (temp > 32) {
                        aiReply += "Trời rất nóng! Mặc quần áo mỏng, đội nón, thoa kem chống nắng và uống nhiều nước.";
                    } else if (temp > 28) {
                        aiReply += "Trời khá nóng, nên mặc quần áo thoáng mát và mang theo nước uống.";
                    } else if (temp > 22) {
                        aiReply += "Thời tiết dễ chịu! Rất thích hợp cho các hoạt động ngoài trời.";
                    } else if (temp > 15) {
                        aiReply += "Hơi mát, nên mặc áo dài tay hoặc áo khoác nhẹ.";
                    } else {
                        aiReply += "Trời lạnh, hãy mặc ấm và có thể cần áo khoác dày!";
                    }
                }
                
                if (desc.toLowerCase().includes('rain') || desc.toLowerCase().includes('drizzle')) {
                    aiReply += " Có mưa, nhớ mang theo ô!";
                }
            } else if (weatherDataForAI?.error) {
                aiReply = `😅 ${weatherDataForAI.error} Hãy thử lại với tên thành phố khác nhé!\n\n`;
                aiReply += "Các thành phố tôi có thể tra cứu: Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng, Nha Trang...";
            } else {
                // Chat tự nhiên khi không có dữ liệu thời tiết
                const casualResponses = [
                    "Chào bạn! 😊 Tôi ở đây để giúp bạn. Bạn muốn biết thời tiết ở đâu không?",
                    "Hi! 👋 Tôi có thể trò chuyện với bạn hoặc cho bạn biết thời tiết. Bạn cần gì?",
                    "Xin chào! 🌟 Hôm nay bạn có kế hoạch gì không? Tôi có thể giúp kiểm tra thời tiết!",
                    "Hey! 😄 Tôi là trợ lý AI của bạn. Muốn chat hay hỏi về thời tiết đều được nhé!"
                ];
                
                // Chọn response ngẫu nhiên
                const randomIndex = Math.floor(Math.random() * casualResponses.length);
                aiReply = casualResponses[randomIndex];
                
                // Thêm gợi ý
                aiReply += "\n\n💡 Ví dụ bạn có thể hỏi:\n";
                aiReply += "• 'Thời tiết Hà Nội hôm nay?'\n";
                aiReply += "• 'Trời ở Sài Gòn ra sao?'\n"; 
                aiReply += "• Hoặc chỉ cần chat với tôi! 💬";
            }
        }

        res.json({ reply: aiReply });

    } catch (err) {
        console.error('Lỗi API Chatbot:', err);
        res.status(500).json({ reply: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau." });
    }
});

// Khởi tạo Express server và gắn SOAP service
app.listen(PORT, () => {
    soap.listen(app, '/weather', weatherServiceDefinition, wsdlXML, () => {
        console.log('SOAP service initialized.');
    });
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`SOAP WSDL available at http://localhost:${PORT}/weather?wsdl`);
});
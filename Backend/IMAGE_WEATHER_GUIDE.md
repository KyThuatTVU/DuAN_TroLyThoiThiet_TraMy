# 📸 Chức năng Dự đoán Thời tiết bằng Ảnh

## 🎯 Tổng quan
WeatherBot AI giờ đã có khả năng phân tích ảnh thời tiết và đưa ra dự đoán thông minh bằng Gemini Vision AI!

## ✨ Tính năng mới

### 🖼️ **Phân tích ảnh thời tiết**
- Upload ảnh bầu trời, mây, mưa, hoặc bất kỳ cảnh thời tiết nào
- AI sẽ phân tích và dự đoán tình trạng thời tiết
- Đưa ra lời khuyên về trang phục và hoạt động

### 💬 **Chat với ảnh**
- Kết hợp tin nhắn văn bản với ảnh
- Đặt câu hỏi cụ thể về ảnh thời tiết
- AI trả lời dựa trên cả nội dung ảnh và câu hỏi

### 🌤️ **Các loại ảnh được hỗ trợ**
- ☁️ Ảnh bầu trời có mây
- 🌧️ Ảnh trời mưa, sấm chớp
- 🌅 Ảnh hoàng hôn, bình minh
- 🌫️ Ảnh sương mù, mờ ảo
- 🌈 Ảnh cầu vồng
- ❄️ Ảnh tuyết rơi (hiếm ở VN)
- 🏙️ Ảnh cảnh quan, đường phố với điều kiện thời tiết

## 🎮 Cách sử dụng

### **1. Qua Frontend (Giao diện Web)**
1. Mở `http://localhost:3000`
2. Trong chat box, click nút camera 📸
3. Chọn ảnh thời tiết (JPG, PNG, GIF, WebP)
4. Gõ câu hỏi (tùy chọn) hoặc để trống
5. Click "Gửi" để AI phân tích

### **2. Qua API Endpoints**

#### **POST /api/chat/image** - Chat với ảnh
```bash
curl -X POST http://localhost:3000/api/chat/image \
  -F "image=@weather_photo.jpg" \
  -F "message=Thời tiết hôm nay thế nào?" \
  -F "location=Hà Nội"
```

#### **POST /api/weather/analyze-image** - Phân tích ảnh chi tiết
```bash
curl -X POST http://localhost:3000/api/weather/analyze-image \
  -F "image=@sky_photo.jpg" \
  -F "prompt=Dự báo thời tiết 2 giờ tới" \
  -F "location=TP.HCM"
```

#### **GET /api/weather/image-types** - Xem các loại ảnh hỗ trợ
```bash
curl http://localhost:3000/api/weather/image-types
```

## 📋 Thông số kỹ thuật

### **File hỗ trợ:**
- **Định dạng**: JPG, JPEG, PNG, GIF, WebP
- **Kích thước tối đa**: 10MB
- **Số lượng**: 1 file mỗi request

### **AI Model:**
- **Engine**: Google Gemini 2.0 Flash Vision
- **Ngôn ngữ**: Tiếng Việt
- **Khả năng**: Phân tích ảnh, dự đoán thời tiết, tư vấn

## 🎨 Ví dụ sử dụng

### **Ví dụ 1: Ảnh mây đen**
- **Upload**: Ảnh bầu trời đầy mây đen
- **Câu hỏi**: "Có mưa không?"
- **AI trả lời**: "🌧️ Những đám mây đen này báo hiệu mưa sắp đến! Độ ẩm cao, gió mạnh. Hãy mang theo ô và mặc áo mưa nhé!"

### **Ví dụ 2: Ảnh hoàng hôn**
- **Upload**: Ảnh hoàng hôn đẹp
- **Câu hỏi**: "Mai có nắng không?"
- **AI trả lời**: "🌅 Hoàng hôn rất đẹp cho thấy khí quyển trong lành! Ngày mai có khả năng trời nắng đẹp. Nhiệt độ khoảng 28-32°C."

### **Ví dụ 3: Ảnh sương mù**
- **Upload**: Ảnh sương mù buổi sáng
- **Câu hỏi**: "Khi nào hết sương?"
- **AI trả lời**: "🌫️ Sương mù dày đặc này thường tan vào 8-9h sáng khi mặt trời lên cao. Hãy lái xe cẩn thận và bật đèn nhé!"

## 🔧 Troubleshooting

### **Lỗi thường gặp:**

1. **"File quá lớn"**
   - Giảm kích thước ảnh xuống dưới 10MB
   - Sử dụng công cụ nén ảnh online

2. **"Ảnh bị chặn bởi safety filter"**
   - Thử với ảnh thời tiết khác
   - Tránh ảnh có nội dung nhạy cảm

3. **"API key không hợp lệ"**
   - Kiểm tra GEMINI_API_KEY trong .env
   - Đảm bảo API key còn hạn sử dụng

4. **"Server error 500"**
   - Kiểm tra server có đang chạy không
   - Xem logs để debug chi tiết

### **Tips để có kết quả tốt:**
- 📸 Chụp ảnh rõ nét, không mờ
- 🌤️ Tập trung vào bầu trời và hiện tượng thời tiết
- 💬 Đặt câu hỏi cụ thể
- 📍 Cung cấp vị trí để có dự báo chính xác hơn

## 🚀 Performance

- **Thời gian xử lý**: 2-5 giây tùy kích thước ảnh
- **Độ chính xác**: Cao với ảnh rõ nét
- **Hỗ trợ đa ngôn ngữ**: Chủ yếu tiếng Việt và tiếng Anh

## 🛠️ Development

### **Cấu trúc code:**
```
Backend/
├── controllers/
│   ├── imageWeatherController.js  # Xử lý ảnh thời tiết
│   └── chatController.js          # Chat với ảnh
├── middleware/
│   └── upload.js                  # Multer upload config
├── services/
│   └── geminiService.js           # Gemini Vision API
└── routes/
    └── index.js                   # Image API routes
```

### **Dependencies mới:**
- `multer`: File upload handling
- `@google/generative-ai`: Gemini Vision support

**Hãy thử ngay tính năng mới này và khám phá sức mạnh của AI trong dự báo thời tiết! 🌟**
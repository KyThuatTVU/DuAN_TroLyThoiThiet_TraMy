# Weather SOAP Project - Backend Structure

## 📁 Cấu trúc dự án đã được tách thành phần

```
Backend/
├── 📁 controllers/          # Các controller xử lý logic
│   ├── chatController.js    # Xử lý chat với AI
│   └── weatherController.js # Xử lý API thời tiết
├── 📁 middleware/           # Middleware cho Express
│   └── index.js            # CORS, logging, error handling
├── 📁 routes/              # Định nghĩa routes
│   └── index.js            # Tất cả API routes
├── 📁 services/            # Các service
│   └── geminiService.js    # Service cho Gemini AI
├── 📁 soap/                # SOAP service
│   ├── weatherService.js   # Logic SOAP thời tiết
│   └── weatherWsdl.xml     # WSDL definition
├── server.js               # Entry point (đã refactor)
├── server_old.js           # Backup file cũ
├── config.js               # Cấu hình
├── .env                    # Environment variables
└── package.json            # Dependencies
```

## 🚀 Các API Endpoints

### 💬 Chat API
- **POST** `/api/chat` - Chat với AI bot
- **POST** `/chat` - Legacy endpoint (tương thích ngược)

### 🌤️ Weather API
- **GET** `/api/weather?city=<tên_thành_phố>` - Thời tiết hiện tại
- **GET** `/api/weather/forecast?city=<tên_thành_phố>&days=<số_ngày>` - Dự báo thời tiết
- **GET** `/api/weather/cities` - Danh sách thành phố hỗ trợ
- **GET** `/getWeatherJSON?city=<tên_thành_phố>` - Legacy endpoint

### 🔧 System API
- **GET** `/api/health` - Kiểm tra trạng thái server

### 🧼 SOAP Service
- **WSDL**: `http://localhost:3000/weather?wsdl`
- **Endpoint**: `http://localhost:3000/weather`

## 🛠️ Cách sử dụng

### 1. Khởi động server
```bash
cd Backend
npm start
```

### 2. Test API với curl

#### Chat API:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Xin chào!"}'
```

#### Weather API:
```bash
curl "http://localhost:3000/api/weather?city=Hà Nội"
```

#### Health Check:
```bash
curl http://localhost:3000/api/health
```

## 🔧 Cấu hình Environment Variables

Tạo file `.env` với nội dung:
```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
NODE_ENV=development
PORT=3000
```

## 📊 Lợi ích của việc tách thành phần

### ✅ **Controllers**
- Tách logic xử lý khỏi routing
- Dễ test và maintain
- Có thể tái sử dụng

### ✅ **Services**
- Centralized business logic
- Dễ dàng mock trong testing
- Singleton pattern cho efficiency

### ✅ **Middleware**
- Tách biệt concerns (logging, CORS, error handling)
- Dễ cấu hình và customize
- Reusable across routes

### ✅ **Routes**
- Clean routing structure
- API versioning ready
- Clear endpoint documentation

### ✅ **Error Handling**
- Centralized error processing
- Consistent error responses
- Better debugging

## 🔍 Debugging

### Kiểm tra logs:
```bash
# Server logs hiển thị:
# - Request logging
# - API calls status  
# - Error details
# - Service initialization
```

### Health check endpoint:
```bash
curl http://localhost:3000/api/health
```

## 🚀 Mở rộng trong tương lai

1. **Database Layer**: Thêm thư mục `models/` và `database/`
2. **Authentication**: Thêm `auth/` middleware
3. **Validation**: Thêm `validators/` cho input validation
4. **Testing**: Thêm `tests/` với unit tests
5. **Documentation**: Thêm Swagger/OpenAPI
6. **Docker**: Containerization cho deployment

## 📝 Notes

- Server cũ được backup thành `server_old.js`
- Tất cả endpoint cũ vẫn hoạt động (backward compatibility)
- Fallback responses khi AI service không khả dụng
- CORS được cấu hình cho development
- Error handling được cải thiện
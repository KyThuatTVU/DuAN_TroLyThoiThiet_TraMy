# PHÂN TÍCH DỰ ÁN - TRỢ LÝ THỜI TIẾT TRÀ MY AI

**Ngày phân tích:** 11/10/2025  
**Dự án:** Hệ thống trợ lý thời tiết thông minh với SOAP & REST API  
**Repository:** DuAN_TroLyThoiThiet_TraMy

---

## 📋 MỤC LỤC

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Kiến trúc hệ thống](#2-kiến-trúc-hệ-thống)
3. [Phân tích dữ liệu thời tiết](#3-phân-tích-dữ-liệu-thời-tiết)
4. [Phân tích dữ liệu bản đồ](#4-phân-tích-dữ-liệu-bản-đồ)
5. [Phân tích chức năng chat AI](#5-phân-tích-chức-năng-chat-ai)
6. [Cấu trúc thư mục](#6-cấu-trúc-thư-mục)
7. [API Endpoints](#7-api-endpoints)
8. [Công nghệ sử dụng](#8-công-nghệ-sử-dụng)

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Mô tả
Dự án **Trợ lý thời tiết Trà My AI** là một ứng dụng web tích hợp nhiều công nghệ để cung cấp thông tin thời tiết thông minh, hỗ trợ:
- Tra cứu thời tiết theo thành phố
- Hiển thị bản đồ vị trí
- Chatbot AI với khả năng phân tích ảnh thời tiết
- Tích hợp SOAP và REST API

### 1.2 Tính năng chính
✅ Tra cứu thời tiết hiện tại và dự báo  
✅ Hiển thị bản đồ tương tác (OpenStreetMap, Google Maps)  
✅ Chat với AI (Google Gemini 2.0)  
✅ Phân tích ảnh thời tiết bằng AI Vision  
✅ Giao diện đẹp, responsive  
✅ Drag & drop upload ảnh  

---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Sơ đồ kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (HTML/JS)                    │
│              Frontend/index.html                         │
│  - Giao diện người dùng                                 │
│  - Xử lý tương tác                                      │
│  - Gọi API Backend                                      │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js/Express)               │
│                   Backend/server.js                      │
│  - REST API Server                                      │
│  - SOAP Service                                         │
│  - Routing & Middleware                                 │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Weather    │   │     Map      │   │  Chat AI     │
│   Service    │   │   Service    │   │   Service    │
│   (SOAP)     │   │   (SOAP)     │   │   (REST)     │
└──────────────┘   └──────────────┘   └──────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│OpenWeatherMap│   │OpenWeatherMap│   │ Google       │
│ Weather API  │   │ Geocoding API│   │ Gemini AI    │
└──────────────┘   └──────────────┘   └──────────────┘
```

### 2.2 Kiến trúc Backend

```
Backend/
├── server.js                    # Main server file
├── config.js                    # Configuration
├── routes/
│   └── index.js                # API routing
├── controllers/
│   ├── weatherController.js    # Weather logic
│   ├── chatController.js       # Chat logic
│   └── imageWeatherController.js
├── services/
│   ├── geminiService.js        # AI service
│   ├── mapService.js           # Map service
│   └── googleSearchService.js  # Search service
├── soap/
│   ├── weatherService.js       # SOAP service
│   └── weatherWsdl.xml         # WSDL definition
└── middleware/
    ├── index.js                # Middleware setup
    └── upload.js               # Image upload handler
```

---

## 3. PHÂN TÍCH DỮ LIỆU THỜI TIẾT

### 3.1 Nguồn lấy dữ liệu thời tiết

#### 📍 File nguồn
**File:** `Backend/soap/weatherService.js`  
**Function:** `getWeatherLogic(cityName)`

#### 🌐 API sử dụng
- **Provider:** OpenWeatherMap API
- **API Key:** Cấu hình trong biến `OPENWEATHER_API_KEY` (file `.env`)

#### 📡 Endpoints gọi
1. **Current Weather API**
   ```
   GET https://api.openweathermap.org/data/2.5/weather
   Parameters: 
   - q: tên thành phố
   - appid: API key
   - units: metric (Celsius)
   - lang: vi (Tiếng Việt)
   ```

2. **Forecast API** (dự báo 5 ngày)
   ```
   GET https://api.openweathermap.org/data/2.5/forecast
   Parameters:
   - lat, lon: tọa độ từ Current Weather API
   - appid: API key
   - units: metric
   - lang: vi
   ```

#### 📊 Dữ liệu thu thập được

| Trường dữ liệu | Mô tả | Đơn vị |
|----------------|-------|--------|
| `temperature` | Nhiệt độ hiện tại | °C |
| `humidity` | Độ ẩm | % |
| `description` | Mô tả thời tiết | Text (Tiếng Việt) |
| `windSpeed` | Tốc độ gió | km/h |
| `feelsLike` | Cảm giác như | °C |
| `visibility` | Tầm nhìn | km |
| `uvIndex` | Chỉ số UV | 0-10 |
| `cityName` | Tên thành phố | Text |
| `icon` | Mã icon thời tiết | Code |
| `tempMax` | Nhiệt độ cao nhất | °C |
| `tempMin` | Nhiệt độ thấp nhất | °C |

### 3.2 Cách trả về kết quả thời tiết

#### ✅ Phương thức 1: SOAP Service

**📍 Location:** `Backend/soap/weatherService.js`  
**Function:** `weatherServiceDefinition.WeatherService.WeatherPort.getWeather()`

**Endpoint:** `POST http://localhost:3000/weather`  
**Protocol:** SOAP 1.1  
**Content-Type:** `text/xml`

**SOAP Request Example:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:weat="http://example.com/weather">
   <soapenv:Header/>
   <soapenv:Body>
      <weat:getWeatherRequest>
         <city>Hanoi</city>
      </weat:getWeatherRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

**SOAP Response Example:**
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <getWeatherResponse xmlns="http://example.com/weather">
         <cityName>Hanoi</cityName>
         <temperature>28.5</temperature>
         <humidity>75</humidity>
         <description>Nhiều mây</description>
         <windSpeed>15</windSpeed>
         <feelsLike>30.2</feelsLike>
         <visibility>10</visibility>
         <uvIndex>0</uvIndex>
         <icon>04d</icon>
         <error></error>
      </getWeatherResponse>
   </soap:Body>
</soap:Envelope>
```

**Frontend gọi SOAP:**
- **File:** `Frontend/index.html`
- **Function:** `fetchWeatherViaSOAP(city)`
- **Line:** ~1160-1200

#### ✅ Phương thức 2: REST API (JSON)

**📍 Controller:** `Backend/controllers/weatherController.js`  
**Class:** `WeatherController`

**REST Endpoints:**

1. **Thời tiết hiện tại**
   ```
   GET /api/weather?city={cityName}
   
   Response:
   {
     "city": "Hanoi",
     "temp": "28.5",
     "humidity": 75,
     "description": "Nhiều mây",
     "windSpeed": 15,
     "feelsLike": "30.2",
     "visibility": 10,
     "uvIndex": 0,
     "timestamp": "2025-10-11T10:30:00.000Z"
   }
   ```

2. **Dự báo nhiều ngày**
   ```
   GET /api/weather/forecast?city={cityName}&days=5
   
   Response:
   {
     "city": "Hanoi",
     "current": { ... },
     "forecast": [
       {
         "date": "12/10/2025",
         "temp": { "min": 24, "max": 32 },
         "description": "Trời quang",
         "humidity": 70,
         "windSpeed": 12
       },
       ...
     ],
     "timestamp": "2025-10-11T10:30:00.000Z"
   }
   ```

### 3.3 Hiển thị thời tiết trên Frontend

**📍 File:** `Frontend/index.html`  
**Function:** `displayWeather(data)` (Line ~1240)

**Các thành phần hiển thị:**
- Icon thời tiết động (từ OpenWeatherMap)
- Nhiệt độ lớn (font size 4rem)
- Cảm giác như
- Mô tả thời tiết
- Grid 4 cards: Độ ẩm, Gió, Tầm nhìn, UV Index

---

## 4. PHÂN TÍCH DỮ LIỆU BẢN ĐỒ

### 4.1 Nguồn lấy dữ liệu bản đồ

#### 📍 File nguồn
**File:** `Backend/services/mapService.js`  
**Function:** `getLocationLogic(cityName)`

#### 🌐 API sử dụng
**Provider:** OpenWeatherMap Geocoding API  
**Endpoint:** 
```
GET https://api.openweathermap.org/geo/1.0/direct
Parameters:
- q: cityName
- limit: 1
- appid: API_KEY
```

#### 📊 Dữ liệu thu thập được

| Trường dữ liệu | Mô tả | Kiểu dữ liệu |
|----------------|-------|--------------|
| `cityName` | Tên thành phố chính thức | String |
| `country` | Mã quốc gia (VN, US, JP...) | String |
| `state` | Bang/Tỉnh/Vùng | String |
| `latitude` | Vĩ độ | Float (6 chữ số thập phân) |
| `longitude` | Kinh độ | Float (6 chữ số thập phân) |
| `mapUrl` | URL OpenStreetMap interactive | String |
| `streetMapUrl` | URL Google Maps street view | String |
| `satelliteMapUrl` | URL Google Maps satellite | String |
| `timezone` | Tên múi giờ | String |
| `timezoneOffset` | Offset múi giờ | Integer |

#### 🔧 Xử lý bổ sung

**Function `generateMapUrls(lat, lon, cityName)`:**
- Tạo URL cho OpenStreetMap: `https://www.openstreetmap.org/?mlat=...`
- Tạo URL cho Google Maps Street: `https://www.google.com/maps/search/...`
- Tạo URL cho Google Maps Satellite: `https://www.google.com/maps/@.../data=!3m1!1e3`

**Function `getTimezoneInfo(lat, lon)`:**
- Tính toán timezone offset dựa trên kinh độ
- Map tên timezone phổ biến (Asia/Ho_Chi_Minh, UTC, ...)

### 4.2 Cách trả về kết quả bản đồ

#### ✅ Phương thức 1: SOAP Service

**📍 Location:** `Backend/soap/weatherService.js`  
**Function:** `weatherServiceDefinition.WeatherService.WeatherPort.getLocation()`

**Endpoint:** `POST http://localhost:3000/weather`  
**SOAPAction:** `getLocation`

**SOAP Request Example:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:weat="http://example.com/weather">
   <soapenv:Header/>
   <soapenv:Body>
      <weat:getLocationRequest>
         <city>Ho Chi Minh</city>
      </weat:getLocationRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

**SOAP Response Example:**
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <getLocationResponse xmlns="http://example.com/weather">
         <cityName>Ho Chi Minh City</cityName>
         <country>VN</country>
         <state></state>
         <latitude>10.823099</latitude>
         <longitude>106.629662</longitude>
         <mapUrl>https://www.openstreetmap.org/...</mapUrl>
         <streetMapUrl>https://www.google.com/maps/...</streetMapUrl>
         <satelliteMapUrl>https://www.google.com/maps/...</satelliteMapUrl>
         <timezone>Asia/Ho_Chi_Minh</timezone>
         <timezoneOffset>7</timezoneOffset>
         <error></error>
      </getLocationResponse>
   </soap:Body>
</soap:Envelope>
```

**Frontend gọi SOAP:**
- **File:** `Frontend/index.html`
- **Function:** `fetchLocationViaSOAP(city)` (Line ~1320)

### 4.3 Hiển thị bản đồ trên Frontend

**📍 File:** `Frontend/index.html`  
**Functions:** 
- `displayMap(city)` - Lấy dữ liệu và hiển thị map (Line ~1390)
- `renderMap(locationData)` - Render iframe bản đồ (Line ~1450)
- `switchMapType(type)` - Chuyển đổi giữa OpenStreetMap và Google Maps Satellite

**Các loại bản đồ:**
1. **OpenStreetMap** (Mặc định)
   - Embed iframe từ openstreetmap.org
   - Hiển thị marker tại tọa độ thành phố

2. **Google Maps Satellite**
   - Embed iframe Google Maps với layer satellite
   - Toggle bằng button "🛰️ Satellite"

**Thông tin hiển thị:**
- 4 cards info: Thành phố, Quốc gia, Vùng/Bang, Tọa độ
- 3 external links: Google Maps, OpenStreetMap, Google Earth

---

## 5. PHÂN TÍCH CHỨC NĂNG CHAT AI

### 5.1 Kiến trúc Chat System

```
┌─────────────────────────────────────────────────────────┐
│                    USER INPUT                            │
│  - Text message                                         │
│  - Image upload (optional)                              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (index.html)                       │
│  - sendMessage()                                        │
│  - generateAIResponse() / sendMessageWithImage()        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│         BACKEND CHAT CONTROLLER                          │
│  controllers/chatController.js                          │
│  - handleChat() - text chat                             │
│  - handleChatWithImage() - image chat                   │
└─────────────────────────────────────────────────────────┘
         │                                        │
         ▼                                        ▼
┌──────────────────┐                   ┌──────────────────┐
│ Weather Service  │                   │  Gemini Service  │
│ (if city found)  │                   │  - askGemini()   │
└──────────────────┘                   │  - analyzeImage()│
         │                              └──────────────────┘
         └────────────┬─────────────────────────┘
                      ▼
              ┌──────────────┐
              │  AI Response │
              └──────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   Frontend   │
              │  (Display)   │
              └──────────────┘
```

### 5.2 Nguồn xử lý Chat

#### 📍 Main Controller
**File:** `Backend/controllers/chatController.js`  
**Class:** `ChatController`

**Methods:**

1. **`handleChat(req, res)`** - Chat text thông thường
   - Input: `{ message: string }`
   - Output: `{ reply: string }`
   - Line: ~9-58

2. **`handleChatWithImage(req, res)`** - Chat với ảnh
   - Input: FormData(`image`, `message?`, `location?`)
   - Output: `{ reply: string }`
   - Line: ~64-108

3. **`findCityInMessage(message)`** - Tìm tên thành phố trong tin nhắn
   - Sử dụng danh sách các thành phố Việt Nam
   - Line: ~110-150

4. **`needsGoogleSearch(message)`** - Kiểm tra cần tìm kiếm Google không
   - Keywords: "tin tức", "mới nhất", "hôm nay", "tìm kiếm"
   - Line: ~152-180

5. **`createAIPrompt()`** - Tạo prompt cho AI
   - Kết hợp: user message + weather data + search results
   - Line: ~200-250

### 5.3 AI Service (Gemini)

#### 📍 Service File
**File:** `Backend/services/geminiService.js`  
**Class:** `GeminiService`

#### 🤖 AI Model
- **Provider:** Google Generative AI
- **Model:** `gemini-2.0-flash`
- **API Key:** `GEMINI_API_KEY` (trong `.env`)

#### ⚙️ Configuration
```javascript
generationConfig: {
    temperature: 0.7,      // Độ sáng tạo
    topK: 40,             // Top K sampling
    topP: 0.95,           // Top P sampling
    maxOutputTokens: 1024 // Max tokens per response
}
```

#### 🔧 Methods

1. **`init()`** - Khởi tạo service
   - Kiểm tra API key
   - Khởi tạo model
   - Line: ~14-35

2. **`askGemini(prompt, options)`** - Chat text
   - Input: prompt string
   - Output: AI response text
   - Line: ~47-78

3. **`analyzeWeatherImage(buffer, mimetype, prompt)`** - Phân tích ảnh
   - Input: image buffer, MIME type, prompt
   - Output: AI analysis text
   - Supports: JPG, PNG, GIF, WebP
   - Line: ~100-150

4. **`chatWithContext(messages)`** - Chat với lịch sử
   - Input: array of messages `[{role, content}]`
   - Output: AI response
   - Line: ~85-110

### 5.4 Cách trả về kết quả Chat

#### ✅ REST API Endpoints

**1. Chat thông thường**
```
POST /api/chat
POST /chat (legacy route)

Request Body:
{
  "message": "Thời tiết Hà Nội hôm nay thế nào?"
}

Response:
{
  "reply": "Hà Nội hôm nay trời nhiều mây, nhiệt độ khoảng 28°C..."
}
```

**Frontend gọi:**
- File: `Frontend/index.html`
- Function: `generateAIResponse(message)` (Line ~1550)

**2. Chat với ảnh**
```
POST /api/chat/image

Request: FormData
- image: File (image file)
- message: String (optional)
- location: String (optional)

Response:
{
  "reply": "Từ ảnh bạn gửi, tôi thấy trời đang có mây đen..."
}
```

**Frontend gọi:**
- File: `Frontend/index.html`
- Function: `sendMessageWithImage(message, imageFile)` (Line ~1710)

### 5.5 Luồng xử lý Chat chi tiết

#### 🔄 Flow 1: Chat text thông thường

1. **User input** → Frontend `sendMessage()`
2. **Frontend** → POST `/api/chat` với `{message}`
3. **ChatController.handleChat()** nhận request
4. **Phân tích message:**
   - `findCityInMessage()` → tìm tên thành phố
   - Nếu có city → `getWeatherLogic(city)` → lấy dữ liệu thời tiết
5. **Kiểm tra cần Google Search:**
   - `needsGoogleSearch()` → check keywords
   - Nếu cần → `googleSearchService.search()` → lấy kết quả tìm kiếm
6. **Tạo AI prompt:**
   - `createAIPrompt(message, weatherData, searchResults)`
   - Kết hợp tất cả context
7. **Gọi Gemini AI:**
   - `geminiService.askGemini(prompt)`
   - Nhận AI response
8. **Return response** → Frontend
9. **Frontend hiển thị** trong chatbox

#### 🔄 Flow 2: Chat với ảnh thời tiết

1. **User upload image** + optional message
2. **Frontend** → POST `/api/chat/image` (FormData)
3. **Middleware `upload.js`:**
   - `handleImageUpload` → parse multipart form
   - `validateImage` → kiểm tra file type, size
4. **ChatController.handleChatWithImage()** nhận request
5. **Kiểm tra city trong message:**
   - Nếu có → `getWeatherLogic()` → lấy thời tiết local
6. **Tạo combined prompt:**
   - Message + weather context + location
7. **Gọi Gemini Vision:**
   - `geminiService.analyzeWeatherImage(buffer, mimetype, prompt)`
   - AI phân tích cả ảnh và text
8. **Return response** → Frontend
9. **Frontend hiển thị:**
   - Ảnh preview (với lightbox)
   - AI analysis text

### 5.6 Tính năng đặc biệt của Chat

#### 📸 Image Upload Features
- **Drag & Drop:** Kéo thả ảnh vào trang web
- **File picker:** Click button để chọn file
- **Preview:** Xem trước ảnh trước khi gửi
- **Lightbox:** Click ảnh để phóng to
- **Supported formats:** JPG, PNG, GIF, WebP
- **Max size:** 10MB

#### 🔍 Google Search Integration
**File:** `Backend/services/googleSearchService.js`

**Kích hoạt khi:**
- Message chứa: "tin tức", "mới nhất", "hôm nay", "tìm kiếm"
- Câu hỏi phức tạp cần thông tin real-time

**Provider:** Google Custom Search API (optional)

#### 💡 Smart Context Awareness
- **Weather context:** Tự động inject dữ liệu thời tiết khi detect city
- **Location context:** Sử dụng location từ image upload
- **Conversation memory:** Có thể mở rộng với `chatWithContext()`

---

## 6. CẤU TRÚC THƯ MỤC

```
DuAnSOAP/
│
├── Backend/                          # Backend Node.js
│   ├── server.js                    # Main server entry point
│   ├── config.js                    # Configuration settings
│   ├── main.js                      # Alternative entry point
│   ├── package.json                 # Node.js dependencies
│   ├── README.md                    # Backend documentation
│   │
│   ├── controllers/                 # Request handlers
│   │   ├── chatController.js       # Chat logic (359 lines)
│   │   ├── weatherController.js    # Weather logic (133 lines)
│   │   └── imageWeatherController.js # Image weather analysis
│   │
│   ├── services/                    # Business logic services
│   │   ├── geminiService.js        # Google Gemini AI (257 lines)
│   │   ├── mapService.js           # Map/location service (103 lines)
│   │   └── googleSearchService.js  # Google Search integration
│   │
│   ├── soap/                        # SOAP service
│   │   ├── weatherService.js       # SOAP operations (200 lines)
│   │   └── weatherWsdl.xml         # WSDL definition
│   │
│   ├── middleware/                  # Express middleware
│   │   ├── index.js                # Middleware setup
│   │   └── upload.js               # Multer image upload
│   │
│   ├── routes/                      # API routes
│   │   └── index.js                # Route definitions (104 lines)
│   │
│   └── images/                      # Static images
│       ├── chatbot-icon.svg
│       ├── logo.svg
│       └── ...
│
├── Frontend/                         # Frontend HTML/CSS/JS
│   ├── index.html                   # Main page (1925 lines)
│   ├── poster.html                  # Poster page
│   ├── README-Components.md         # Component documentation
│   │
│   ├── css/                         # Stylesheets
│   │   └── map.css
│   │
│   ├── js/                          # JavaScript modules
│   │   └── map-service.js
│   │
│   └── img/                         # Images
│       ├── chatbot-icon.svg
│       ├── logo.svg
│       └── ...
│
├── docker-compose.yml                # Docker Compose config
├── Dockerfile                        # Docker image definition
└── README.md                         # Project documentation
```

### 6.1 File quan trọng

| File | Dòng code | Chức năng chính |
|------|-----------|-----------------|
| `Backend/server.js` | 102 | Server setup, SOAP init, routing |
| `Backend/controllers/chatController.js` | 405 | Chat logic, AI integration |
| `Backend/services/geminiService.js` | 257 | Gemini AI wrapper |
| `Backend/soap/weatherService.js` | 200 | SOAP operations, weather logic |
| `Backend/services/mapService.js` | 103 | Map/location service |
| `Frontend/index.html` | 1925 | Full frontend UI + logic |

---

## 7. API ENDPOINTS

### 7.1 REST API Endpoints

#### 🔹 Weather APIs

```
GET /api/weather?city={cityName}
Description: Lấy thời tiết hiện tại của thành phố
Response: JSON với temperature, humidity, description, etc.
Controller: weatherController.getWeatherJSON()
```

```
GET /api/weather/forecast?city={cityName}&days={number}
Description: Lấy dự báo thời tiết nhiều ngày (1-7 ngày)
Response: JSON với current + forecast array
Controller: weatherController.getForecast()
```

```
GET /api/weather/cities
Description: Lấy danh sách thành phố được hỗ trợ
Response: JSON array of cities
Controller: weatherController.getSupportedCities()
```

#### 🔹 Chat APIs

```
POST /api/chat
POST /chat (legacy)
Description: Chat với AI bot
Request Body: { "message": "string" }
Response: { "reply": "string" }
Controller: chatController.handleChat()
```

```
POST /api/chat/image
Description: Chat với ảnh thời tiết
Request: FormData with 'image', 'message', 'location'
Response: { "reply": "string" }
Controller: chatController.handleChatWithImage()
Middleware: handleImageUpload, validateImage
```

#### 🔹 Image Weather APIs

```
POST /api/weather/analyze-image
Description: Phân tích ảnh thời tiết với Gemini Vision
Request: FormData with 'image', 'prompt', 'location'
Response: JSON với phân tích chi tiết
Controller: imageWeatherController.analyzeWeatherImage()
```

```
POST /api/weather/forecast-from-description
Description: Tạo dự báo từ mô tả ảnh
Request Body: { "description": "string", "location": "string" }
Response: JSON với forecast data
Controller: imageWeatherController.generateForecastFromDescription()
```

```
GET /api/weather/image-types
Description: Lấy danh sách loại ảnh được hỗ trợ
Response: JSON array of supported image types
Controller: imageWeatherController.getSupportedImageTypes()
```

#### 🔹 Health Check

```
GET /api/health
Description: Kiểm tra trạng thái server
Response: {
  "status": "OK",
  "timestamp": "ISO date",
  "uptime": seconds,
  "environment": "development|production",
  "version": "1.0.0"
}
```

### 7.2 SOAP Service

#### 🔹 WSDL

```
GET http://localhost:3000/weather?wsdl
Description: Lấy WSDL definition
Response: XML WSDL document
```

#### 🔹 SOAP Operations

**Operation 1: getWeather**
```
POST http://localhost:3000/weather
Operation: getWeather
Request: 
  <getWeatherRequest>
    <city>string</city>
  </getWeatherRequest>
  
Response:
  <getWeatherResponse>
    <cityName>string</cityName>
    <temperature>float</temperature>
    <humidity>int</humidity>
    <description>string</description>
    <windSpeed>int</windSpeed>
    <feelsLike>float</feelsLike>
    <visibility>int</visibility>
    <uvIndex>int</uvIndex>
    <icon>string</icon>
    <error>string</error>
  </getWeatherResponse>
```

**Operation 2: getLocation**
```
POST http://localhost:3000/weather
Operation: getLocation
Request:
  <getLocationRequest>
    <city>string</city>
  </getLocationRequest>
  
Response:
  <getLocationResponse>
    <cityName>string</cityName>
    <country>string</country>
    <state>string</state>
    <latitude>float</latitude>
    <longitude>float</longitude>
    <mapUrl>string</mapUrl>
    <streetMapUrl>string</streetMapUrl>
    <satelliteMapUrl>string</satelliteMapUrl>
    <timezone>string</timezone>
    <timezoneOffset>int</timezoneOffset>
    <error>string</error>
  </getLocationResponse>
```

---

## 8. CÔNG NGHỆ SỬ DỤNG

### 8.1 Backend Technologies

| Công nghệ | Version | Mục đích sử dụng |
|-----------|---------|------------------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | 4.x | Web framework |
| **soap** | Latest | SOAP service implementation |
| **axios** | Latest | HTTP client cho API calls |
| **@google/generative-ai** | Latest | Google Gemini AI SDK |
| **multer** | Latest | File upload handling |
| **dotenv** | Latest | Environment variables |
| **cors** | Latest | Cross-origin resource sharing |

### 8.2 Frontend Technologies

| Công nghệ | Mục đích |
|-----------|----------|
| **HTML5** | Markup language |
| **CSS3** | Styling (gradient, animation, flexbox, grid) |
| **Vanilla JavaScript** | Client-side logic |
| **Fetch API** | AJAX requests |
| **DOMParser** | XML parsing (SOAP responses) |
| **FormData API** | File upload |
| **Drag & Drop API** | Image upload UX |

### 8.3 External APIs

| API | Provider | Purpose |
|-----|----------|---------|
| **Weather API** | OpenWeatherMap | Current weather, forecast |
| **Geocoding API** | OpenWeatherMap | City coordinates |
| **Gemini AI** | Google | Text generation, image analysis |
| **Custom Search API** | Google (optional) | Web search results |
| **OpenStreetMap** | OSM | Map iframe |
| **Google Maps** | Google | Map iframe, satellite view |

### 8.4 Protocols & Standards

- **SOAP 1.1** - Web service protocol
- **WSDL** - Web Service Description Language
- **REST** - RESTful API architecture
- **JSON** - Data interchange format
- **XML** - SOAP message format
- **HTTP/HTTPS** - Communication protocol

### 8.5 Development Tools

- **Docker** - Containerization
- **Git** - Version control
- **npm** - Package manager
- **dotenv** - Configuration management

---

## 9. SƠ ĐỒ LUỒNG DỮ LIỆU CHI TIẾT

### 9.1 Luồng lấy thời tiết (SOAP)

```
┌──────────────┐
│   User Input │ "Hanoi"
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: getWeather()          │
│  File: index.html, line ~1200    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: fetchWeatherViaSOAP() │
│  Create SOAP XML request         │
│  <getWeatherRequest>             │
│    <city>Hanoi</city>            │
│  </getWeatherRequest>            │
└──────┬───────────────────────────┘
       │
       │ POST http://localhost:3000/weather
       │ Content-Type: text/xml
       │
       ▼
┌──────────────────────────────────┐
│  Backend: server.js              │
│  SOAP service listening          │
│  soap.listen(app, '/weather')    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  SOAP Service: weatherService.js │
│  getWeather() operation          │
│  Parse request, extract city     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  getWeatherLogic(city)           │
│  Line ~8-82                      │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Call OpenWeatherMap API         │
│  1. Current Weather API          │
│     GET /weather?q=Hanoi         │
│  2. Forecast API                 │
│     GET /forecast?lat=...&lon=...│
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Parse & format response         │
│  Return weather object:          │
│  {                               │
│    temperature: "28.5",          │
│    humidity: 75,                 │
│    description: "Nhiều mây",     │
│    ...                           │
│  }                               │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  SOAP Service: wrap in XML       │
│  <getWeatherResponse>            │
│    <temperature>28.5</temp...>   │
│    ...                           │
│  </getWeatherResponse>           │
└──────┬───────────────────────────┘
       │
       │ HTTP Response
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: parse XML response    │
│  DOMParser, querySelector        │
│  Extract values                  │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: displayWeather(data)  │
│  Update DOM with weather info    │
│  Show icon, temp, humidity, etc. │
└──────────────────────────────────┘
```

### 9.2 Luồng chat với AI

```
┌──────────────┐
│  User types  │ "Thời tiết Hà Nội thế nào?"
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: sendMessage()         │
│  File: index.html, line ~1500    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  addMessage(message, 'user')     │
│  Display user message in chat    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  showTyping()                    │
│  Show "..." loading animation    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  generateAIResponse(message)     │
│  Line ~1550                      │
└──────┬───────────────────────────┘
       │
       │ POST http://localhost:3000/chat
       │ Content-Type: application/json
       │ Body: {"message": "..."}
       │
       ▼
┌──────────────────────────────────┐
│  Backend: routes/index.js        │
│  Route: POST /api/chat           │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  chatController.handleChat()     │
│  File: chatController.js, line ~9│
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  findCityInMessage(message)      │
│  Detect city name in text        │
│  Found: "Hà Nội"                 │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  getWeatherLogic("Hà Nội")       │
│  Fetch weather data              │
│  weatherData = {...}             │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  needsGoogleSearch(message)      │
│  Check if needs web search       │
│  Result: false (simple question) │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  createAIPrompt()                │
│  Combine: message + weatherData  │
│  Create rich context for AI      │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  geminiService.askGemini(prompt) │
│  File: geminiService.js          │
└──────┬───────────────────────────┘
       │
       │ Call Google Gemini API
       │ Model: gemini-2.0-flash
       │
       ▼
┌──────────────────────────────────┐
│  Gemini AI processes:            │
│  - User question                 │
│  - Weather context               │
│  - Generate natural response     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  AI Response:                    │
│  "Hà Nội hôm nay trời nhiều mây, │
│  nhiệt độ khoảng 28.5°C, độ ẩm   │
│  75%. Bạn nên mang theo áo mỏng."│
└──────┬───────────────────────────┘
       │
       │ Return to controller
       │
       ▼
┌──────────────────────────────────┐
│  Controller: res.json()          │
│  {"reply": "Hà Nội hôm nay..."}  │
└──────┬───────────────────────────┘
       │
       │ HTTP Response
       │
       ▼
┌──────────────────────────────────┐
│  Frontend: receive response      │
│  aiReply = data.reply            │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  hideTyping()                    │
│  Remove "..." animation          │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  addMessage(aiReply, 'bot')      │
│  Display AI response in chat     │
└──────────────────────────────────┘
```

---

## 10. KẾT LUẬN

### 10.1 Điểm mạnh của dự án

✅ **Kiến trúc hybrid SOAP + REST** - Thể hiện hiểu biết về cả kiến trúc cũ và mới  
✅ **Tích hợp AI hiện đại** - Sử dụng Google Gemini 2.0 Flash  
✅ **Phân tích ảnh thông minh** - Gemini Vision cho weather image analysis  
✅ **UI/UX đẹp** - Gradient animation, responsive, smooth transitions  
✅ **Code structure tốt** - Separation of concerns (controllers, services, routes)  
✅ **Error handling** - Try-catch blocks, validation middleware  
✅ **Multiple data sources** - Weather API + Geocoding + AI  
✅ **Interactive map** - Multiple map providers, switch between types  

### 10.2 Điểm có thể cải thiện

🔸 **Caching** - Implement Redis/memory cache cho weather data  
🔸 **Rate limiting** - Protect APIs from abuse  
🔸 **Authentication** - Add user authentication cho advanced features  
🔸 **Database** - Store chat history, favorite cities  
🔸 **Testing** - Unit tests, integration tests  
🔸 **Logging** - Structured logging (Winston, Morgan)  
🔸 **API documentation** - Swagger/OpenAPI docs  
🔸 **i18n** - Multi-language support  

### 10.3 Use cases

👥 **Người dùng cá nhân:**
- Tra cứu thời tiết nhanh chóng
- Chat với AI về thời tiết
- Upload ảnh trời để hỏi AI

🏢 **Doanh nghiệp:**
- Tích hợp vào app/website
- SOAP service cho legacy systems
- REST API cho modern apps

🎓 **Giáo dục:**
- Học SOAP vs REST
- Học AI integration
- Học full-stack development

### 10.4 Tech stack summary

```
┌─────────────────────────────────────┐
│          FRONTEND                   │
│  HTML5 + CSS3 + Vanilla JS          │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          BACKEND                    │
│  Node.js + Express.js               │
│  SOAP Service (node-soap)           │
│  REST API                           │
└─────────────────────────────────────┘
                 │
          ┌──────┴──────┐
          ▼             ▼
┌──────────────┐  ┌─────────────┐
│ External APIs│  │ AI Service  │
│ OpenWeather  │  │ Gemini 2.0  │
│ Google Maps  │  │             │
└──────────────┘  └─────────────┘
```

---

## PHỤ LỤC

### A. Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# APIs
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_SEARCH_API_KEY=your_google_search_key (optional)
GOOGLE_SEARCH_CX=your_custom_search_engine_id (optional)
```

### B. Installation & Run

```bash
# Install dependencies
cd Backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Run server
npm start

# Server will be available at:
# http://localhost:3000
```

### C. Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

**Tài liệu được tạo tự động từ phân tích mã nguồn**  
**Repository:** DuAN_TroLyThoiThiet_TraMy  
**Ngày:** 11/10/2025  
**Phiên bản:** 1.0

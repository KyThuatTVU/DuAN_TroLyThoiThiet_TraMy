# Trà My AI - Trợ Lý Thời Tiết Thông Minh

## 📁 Cấu Trúc Dự Án

```
DuAnSOAP/
├── 📄 .env                          # Biến môi trường (GEMINI_API_KEY)
├── 📄 .dockerignore                 # Loại trừ files khi build Docker
├── 📄 docker-compose.yml            # Docker Compose configuration
├── 📄 Dockerfile                    # Docker image definition
├── 📄 README.md                     # Tài liệu dự án
│
├── 📂 Backend/                      # Server-side code
│   ├── 📄 package.json             # Node.js dependencies
│   ├── 📄 server.js                # Main entry point
│   ├── 📄 config.js                # Configuration
│   │
│   ├── 📂 controllers/             # Business logic handlers
│   │   ├── chatController.js      # Chat với AI & thời tiết
│   │   ├── weatherController.js   # Xử lý thời tiết
│   │   └── imageWeatherController.js  # Phân tích ảnh thời tiết
│   │
│   ├── 📂 services/                # External API services
│   │   ├── geminiService.js       # Google Gemini AI
│   │   ├── googleSearchService.js # Google Search API
│   │   └── mapService.js          # Map/Location service
│   │
│   ├── 📂 soap/                    # SOAP Web Service
│   │   ├── weatherService.js      # SOAP logic
│   │   └── weatherWsdl.xml        # WSDL definition
│   │
│   ├── 📂 routes/                  # API Routes
│   │   └── index.js               # Route definitions
│   │
│   └── 📂 middleware/              # Express middleware
│       ├── index.js               # Middleware setup
│       └── upload.js              # File upload handler
│
├── 📂 Frontend/                    # Client-side code
│   ├── 📄 index.html              # Main HTML page (SPA)
│   ├── 📄 test-map.html           # Map testing page
│   ├── 📄 debug-map.html          # Map debugging page
│   ├── 📄 README-Components.md    # Frontend components docs
│   │
│   ├── 📂 js/                      # JavaScript modules
│   │   └── map-service.js         # Map functionality
│   │
│   ├── 📂 css/                     # Stylesheets
│   │   └── map.css                # Map styling
│   │
│   └── 📂 img/                     # Images & assets
│       ├── 1.jpeg                 # Logo
│       ├── chatbot-icon.svg       # Chatbot icon
│       ├── chatbot.jpg            # Chatbot avatar
│       ├── logo.svg               # App logo
│       └── mưa.jpg                # Weather image
│
└── 📂 node_modules/                # Dependencies (ignored in git)
```

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                         Frontend - SPA                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Chat UI     │  │  Weather UI  │  │  Map Display │         │
│  │  (Trà My AI) │  │  (Cards)     │  │  (OpenStreet)│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────┬────────────────────────────────────────────────────┘
             │ HTTP/AJAX Requests
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Express.js)                   │
│                      Port: 3000                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     MIDDLEWARE LAYER                      │  │
│  │  • CORS           • Body Parser    • Static Files        │  │
│  │  • Logger         • Error Handler  • Upload Handler      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────┼────────────────────────────┐    │
│  │           REST API Routes │                            │    │
│  ├───────────────────────────┴────────────────────────────┤    │
│  │  POST /chat              - Chat với AI                 │    │
│  │  POST /api/chat/image    - Chat với ảnh thời tiết      │    │
│  │  GET  /getWeatherJSON    - Lấy dữ liệu thời tiết       │    │
│  │  POST /weather           - SOAP Service endpoint       │    │
│  │  GET  /weather?wsdl      - WSDL definition             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│  ┌───────────────────────────┼────────────────────────────┐    │
│  │          CONTROLLERS      │                            │    │
│  ├───────────────────────────┴────────────────────────────┤    │
│  │  • chatController        - Xử lý chat logic            │    │
│  │  • weatherController     - Xử lý thời tiết             │    │
│  │  • imageWeatherController - Phân tích ảnh              │    │
│  └──────────────┬────────────────────────┬─────────────────┘   │
│                 │                        │                      │
│  ┌──────────────▼──────┐    ┌───────────▼──────────┐          │
│  │   SOAP SERVICE      │    │   EXTERNAL SERVICES  │          │
│  ├─────────────────────┤    ├──────────────────────┤          │
│  │ • Weather Service   │    │ • Gemini AI Service  │          │
│  │ • WSDL Definition   │    │ • Google Search API  │          │
│  └─────────────────────┘    │ • Map Service        │          │
│                              └──────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
             │                           │
             ▼                           ▼
┌──────────────────────┐    ┌─────────────────────────────┐
│  OpenWeatherMap API  │    │   Google Gemini AI API      │
│  (Weather Data)      │    │   (AI Chat & Vision)        │
└──────────────────────┘    └─────────────────────────────┘
```

## 🔄 Luồng Xử Lý Request

### 1. Chat với AI
```
User Input → Frontend → POST /chat → chatController
    ↓
  Check for city name
    ↓
  ├─ City found? → Get weather data (SOAP)
  ├─ Complex query? → Google Search
    ↓
  Create AI prompt
    ↓
  Gemini AI → Generate response
    ↓
  Return to Frontend → Display to user
```

### 2. Chat với Ảnh Thời Tiết
```
User uploads image → Frontend → POST /api/chat/image
    ↓
  Multer middleware (file upload)
    ↓
  imageWeatherController
    ↓
  Gemini Vision API → Analyze image
    ↓
  Generate weather analysis
    ↓
  Return to Frontend → Display result
```

### 3. Xem Thời Tiết
```
User enters city → Frontend → GET /getWeatherJSON?city=...
    ↓
  weatherController
    ↓
  SOAP weatherService → OpenWeatherMap API
    ↓
  Parse weather data
    ↓
  Return JSON → Frontend → Display weather card
```

## 🐳 Docker Deployment

```
┌─────────────────────────────────────────┐
│         Docker Container                │
│   (duansoap-weather-app-1)             │
├─────────────────────────────────────────┤
│  Base Image: node:20-alpine            │
│  Working Dir: /app                      │
│                                         │
│  Files Structure:                       │
│  /app/                                  │
│  ├── server.js                          │
│  ├── controllers/                       │
│  ├── services/                          │
│  ├── middleware/                        │
│  ├── routes/                            │
│  ├── soap/                              │
│  ├── Frontend/                          │
│  └── node_modules/                      │
│                                         │
│  Environment: NODE_ENV=production       │
│  Port: 3000 (mapped to host:3000)      │
│                                         │
│  Process: npm start → node server.js   │
└─────────────────────────────────────────┘
           │
           │ Port 3000
           ▼
    [Host Machine]
    http://localhost:3000
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **SOAP**: node-soap
- **AI**: Google Gemini AI (gemini-2.0-flash)
- **APIs**: OpenWeatherMap, Google Search

### Frontend
- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **UI**: Single Page Application (SPA)
- **Maps**: OpenStreetMap (iframe embed)
- **AJAX**: Fetch API

### DevOps
- **Container**: Docker + Docker Compose
- **Base Image**: node:20-alpine
- **Environment**: .env file

## 📊 Data Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│ Frontend │────▶│ Backend  │────▶│ External │
│ (Browser)│     │  (SPA)   │     │ (Express)│     │   APIs   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲                                   │                │
     │                                   ▼                ▼
     │           ┌──────────┐     ┌──────────┐     ┌──────────┐
     └───────────│ Response │◀────│  Process │◀────│   Data   │
                 └──────────┘     └──────────┘     └──────────┘
```

## 🚀 Deployment Options

### Option 1: Docker (Recommended)
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Option 2: Local Node.js
```bash
cd Backend
npm install
node server.js
```

## 📝 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serve frontend SPA |
| POST | `/chat` | Chat với AI |
| POST | `/api/chat/image` | Chat với ảnh |
| GET | `/getWeatherJSON` | Lấy thời tiết (JSON) |
| POST | `/weather` | SOAP endpoint |
| GET | `/weather?wsdl` | WSDL definition |
| GET | `/api/health` | Health check |

## 🔐 Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 👥 Team & Author

- **Project**: Weather SOAP Service với AI Chatbot
- **AI Assistant**: Trà My
- **Technologies**: SOAP, REST, AI, Docker

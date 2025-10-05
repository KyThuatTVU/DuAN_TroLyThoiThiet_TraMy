# Frontend Structure Documentation

## 📁 Cấu trúc thư mục mới

```
Frontend/
├── index-new.html          # File HTML chính (đã tách components)
├── index.html              # File HTML cũ (backup)
├── css/                    # Thư mục chứa các file CSS
│   ├── main.css           # CSS chính (layout, weather, header)
│   ├── chatbot.css        # CSS cho chatbot
│   ├── image-handling.css # CSS cho xử lý ảnh
│   └── responsive.css     # CSS responsive
├── js/                     # Thư mục chứa các JavaScript modules
│   ├── api-service.js     # Service gọi SOAP API
│   ├── weather-service.js # Service xử lý thời tiết
│   ├── chat-service.js    # Service chatbot
│   └── app.js             # App chính khởi tạo tất cả
├── components/             # Thư mục chứa HTML components
│   ├── header.html        # Component header
│   ├── weather-section.html # Component weather
│   └── background.html    # Component background
└── img/                   # Thư mục hình ảnh
```

## 🔧 Các thành phần đã tách

### 1. **CSS Modules**
- **main.css**: Styles chính, layout, weather display
- **chatbot.css**: Tất cả styles cho chatbot
- **image-handling.css**: Xử lý ảnh, lightbox, drag & drop
- **responsive.css**: Media queries cho mobile

### 2. **JavaScript Modules**
- **api-service.js**: Class ApiService - xử lý SOAP calls
- **weather-service.js**: Class WeatherService - logic thời tiết
- **chat-service.js**: Class ChatService - logic chatbot
- **app.js**: Class App - khởi tạo toàn bộ ứng dụng

### 3. **HTML Components**
- **header.html**: Phần header với logo
- **weather-section.html**: Section tìm kiếm thời tiết
- **background.html**: Animation background

## 🚀 Cách sử dụng

### File mới: `index-new.html`
- Import tất cả CSS modules
- Import tất cả JavaScript modules theo thứ tự
- HTML structure sạch sẽ, dễ đọc

### Classes và Services
```javascript
// API Service - Gọi SOAP API
const apiService = new ApiService();

// Weather Service - Logic thời tiết
const weatherService = new WeatherService(apiService);

// Chat Service - Logic chatbot
const chatService = new ChatService(apiService);

// App - Khởi tạo tất cả
const app = new App();
```

## 🔄 Migration Plan

1. **Test index-new.html** để đảm bảo hoạt động
2. **Backup index.html** cũ
3. **Rename index-new.html** thành index.html
4. **Update server** nếu cần thiết

## ✅ Lợi ích của cấu trúc mới

- **Maintainability**: Dễ bảo trì, mỗi file có trách nhiệm riêng
- **Reusability**: Components có thể tái sử dụng
- **Modularity**: Các module độc lập, dễ test
- **Scalability**: Dễ mở rộng thêm features
- **Clean Code**: Code sạch, có tổ chức
- **Performance**: Load CSS/JS tách biệt tối ưu hơn
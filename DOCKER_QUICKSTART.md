# 🚀 QUICK START - DOCKER

Hướng dẫn nhanh khởi động dự án với Docker trong 5 phút!

---

## ⚡ Cài đặt nhanh

### Windows
```powershell
# 1. Tải và cài Docker Desktop
# https://www.docker.com/products/docker-desktop/

# 2. Kiểm tra cài đặt
docker --version
docker compose version
```

---

## 🎯 Khởi động dự án (3 bước)

### Bước 1: Clone dự án
```powershell
git clone https://github.com/KyThuatTVU/DuAN_TroLyThoiThiet_TraMy.git
cd DuAN_TroLyThoiThiet_TraMy
```

### Bước 2: Cấu hình API Keys
Tạo file `Backend/.env`:
```env
OPENWEATHER_API_KEY=your_openweather_key_here
GEMINI_API_KEY=your_gemini_key_here
PORT=3000
```

### Bước 3: Chạy Docker
```powershell
# Build và start
docker compose up -d --build

# Xem logs
docker compose logs -f

# Mở trình duyệt
start http://localhost:3000
```

**🎉 XONG! Ứng dụng đang chạy tại http://localhost:3000**

---

## 📋 Các lệnh thường dùng

```powershell
# Xem container đang chạy
docker compose ps

# Xem logs
docker compose logs -f

# Dừng ứng dụng
docker compose down

# Khởi động lại
docker compose restart

# Rebuild khi có thay đổi code
docker compose up -d --build

# Truy cập vào container
docker exec -it duansoap-weather-app-1 sh

# Dọn dẹp (xóa containers, images, volumes)
docker compose down -v --rmi all
```

---

## ❓ Troubleshooting nhanh

### Port 3000 đã được sử dụng?
```powershell
# Tìm và kill process
netstat -ano | findstr :3000
taskkill /PID <process-id> /F

# Hoặc đổi port trong docker-compose.yml
ports:
  - "3001:3000"
```

### Container bị lỗi?
```powershell
# Xem logs chi tiết
docker compose logs --tail=50 weather-app

# Rebuild lại từ đầu
docker compose down
docker compose up --build
```

### Docker Desktop không chạy?
- Mở Docker Desktop từ Start Menu
- Đợi icon Docker trên taskbar chuyển sang màu xanh

---

## 📖 Đọc thêm

Xem [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) để biết chi tiết đầy đủ!

---

**Happy Coding! 🚀**

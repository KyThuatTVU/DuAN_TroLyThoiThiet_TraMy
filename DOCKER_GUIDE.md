# 🐳 HƯỚNG DẪN SỬ DỤNG DOCKER - DỰ ÁN TRỢ LÝ THỜI TIẾT TRÀ MY AI

**Ngày:** 13/10/2025  
**Dự án:** Hệ thống Trợ lý Thời tiết với SOAP & REST API  
**Docker Version:** Yêu cầu Docker 20.10+ và Docker Compose v2+

---

## 📋 MỤC LỤC

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cài đặt Docker](#2-cài-đặt-docker)
3. [Cấu trúc Docker trong dự án](#3-cấu-trúc-docker-trong-dự-án)
4. [Các lệnh Docker cơ bản](#4-các-lệnh-docker-cơ-bản)
5. [Khởi động dự án](#5-khởi-động-dự-án)
6. [Quản lý Container](#6-quản-lý-container)
7. [Debug và Troubleshooting](#7-debug-và-troubleshooting)
8. [Best Practices](#8-best-practices)

---

## 1. YÊU CẦU HỆ THỐNG

### 💻 Phần cứng tối thiểu:
- **RAM:** 4GB trở lên (khuyến nghị 8GB)
- **Disk:** 10GB dung lượng trống
- **CPU:** 2 cores trở lên

### 🔧 Phần mềm:
- **Docker Desktop:** 4.0+ (Windows/Mac) hoặc Docker Engine (Linux)
- **Docker Compose:** v2.0+ (đã tích hợp trong Docker Desktop)
- **Git:** Để clone dự án
- **Text Editor:** VS Code (khuyến nghị)

### 🌐 Hệ điều hành hỗ trợ:
- ✅ Windows 10/11 (Pro, Enterprise, Education)
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, Debian, CentOS)

---

## 2. CÀI ĐẶT DOCKER

### 📦 Windows

#### Bước 1: Tải Docker Desktop
```powershell
# Truy cập trang chủ Docker và tải xuống
# https://www.docker.com/products/docker-desktop/

# Hoặc sử dụng winget (Windows Package Manager)
winget install Docker.DockerDesktop
```

#### Bước 2: Cài đặt WSL 2 (nếu chưa có)
```powershell
# Bật Windows Subsystem for Linux
wsl --install

# Cập nhật WSL
wsl --update

# Đặt WSL 2 làm mặc định
wsl --set-default-version 2
```

#### Bước 3: Khởi động Docker Desktop
- Mở Docker Desktop từ Start Menu
- Đợi Docker khởi động hoàn tất
- Kiểm tra biểu tượng Docker trên System Tray

#### Bước 4: Kiểm tra cài đặt
```powershell
# Kiểm tra phiên bản Docker
docker --version
# Kết quả: Docker version 24.0.x, build xxxxx

# Kiểm tra Docker Compose
docker compose version
# Kết quả: Docker Compose version v2.x.x

# Kiểm tra Docker đang chạy
docker info
```

### 🍎 macOS

```bash
# Tải Docker Desktop từ trang chủ
# https://www.docker.com/products/docker-desktop/

# Hoặc sử dụng Homebrew
brew install --cask docker

# Khởi động Docker Desktop từ Applications
open -a Docker

# Kiểm tra cài đặt
docker --version
docker compose version
```

### 🐧 Linux (Ubuntu/Debian)

```bash
# Cập nhật package index
sudo apt-get update

# Cài đặt prerequisites
sudo apt-get install ca-certificates curl gnupg lsb-release

# Thêm Docker's GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Thêm Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Thêm user vào docker group (tránh phải dùng sudo)
sudo usermod -aG docker $USER
newgrp docker

# Kiểm tra cài đặt
docker --version
docker compose version
```

---

## 3. CẤU TRÚC DOCKER TRONG DỰ ÁN

### 📁 File Structure

```
DuAnSOAP/
├── Dockerfile                 # Định nghĩa cách build Docker image
├── docker-compose.yml         # Orchestration và configuration
├── .dockerignore             # Files/folders bỏ qua khi build
├── Backend/
│   ├── package.json          # Dependencies Node.js
│   ├── server.js             # Entry point
│   └── ...
└── Frontend/
    ├── index.html
    └── ...
```

### 📄 Dockerfile - Chi tiết

```dockerfile
# Sử dụng Node.js 20 Alpine (nhẹ nhất)
FROM node:20-alpine

# Đặt working directory trong container
WORKDIR /app

# Copy package.json và package-lock.json
COPY Backend/package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ Backend code
COPY Backend/ ./

# Copy Frontend code
COPY Frontend/ ./Frontend/

# Mở port 3000 cho ứng dụng
EXPOSE 3000

# Command khởi động server
CMD ["npm", "start"]
```

### 📄 docker-compose.yml - Chi tiết

```yaml
services:
  weather-app:                    # Tên service
    build: .                      # Build từ Dockerfile ở thư mục hiện tại
    ports:
      - "3000:3000"              # Map port host:container
    environment:
      - NODE_ENV=production      # Biến môi trường
    restart: unless-stopped      # Tự động khởi động lại khi crash
```

### 📄 .dockerignore (Nên tạo thêm)

```
node_modules
npm-debug.log
.git
.gitignore
.env
.DS_Store
*.md
Dockerfile
docker-compose.yml
.vscode
```

---

## 4. CÁC LỆNH DOCKER CƠ BẢN

### 🎯 Docker Image Commands

```powershell
# Xem danh sách images
docker images

# Xóa image
docker rmi <image-id>

# Xóa tất cả dangling images
docker image prune

# Build image từ Dockerfile
docker build -t weather-app:latest .

# Pull image từ Docker Hub
docker pull node:20-alpine

# Tag image
docker tag weather-app:latest weather-app:v1.0
```

### 🎯 Docker Container Commands

```powershell
# Xem containers đang chạy
docker ps

# Xem tất cả containers (cả đã dừng)
docker ps -a

# Chạy container
docker run -d -p 3000:3000 --name weather-app weather-app:latest

# Dừng container
docker stop weather-app

# Khởi động lại container
docker restart weather-app

# Xóa container
docker rm weather-app

# Xem logs
docker logs weather-app

# Xem logs realtime
docker logs -f weather-app

# Truy cập vào container
docker exec -it weather-app sh

# Xem resource usage
docker stats weather-app
```

### 🎯 Docker Compose Commands

```powershell
# Build và start services
docker compose up

# Build và start ở background
docker compose up -d

# Build lại images trước khi start
docker compose up --build

# Dừng services
docker compose down

# Dừng và xóa volumes
docker compose down -v

# Xem logs của tất cả services
docker compose logs

# Xem logs của một service cụ thể
docker compose logs weather-app

# Xem logs realtime
docker compose logs -f

# Restart services
docker compose restart

# Xem trạng thái services
docker compose ps
```

### 🎯 Docker Network Commands

```powershell
# Xem danh sách networks
docker network ls

# Tạo network
docker network create my-network

# Inspect network
docker network inspect bridge

# Kết nối container vào network
docker network connect my-network weather-app
```

### 🎯 Docker Volume Commands

```powershell
# Xem danh sách volumes
docker volume ls

# Tạo volume
docker volume create my-data

# Inspect volume
docker volume inspect my-data

# Xóa volume
docker volume rm my-data

# Xóa tất cả unused volumes
docker volume prune
```

---

## 5. KHỞI ĐỘNG DỰ ÁN

### 🚀 Phương pháp 1: Sử dụng Docker Compose (Khuyến nghị)

#### Bước 1: Clone dự án
```powershell
# Clone repository
git clone https://github.com/KyThuatTVU/DuAN_TroLyThoiThiet_TraMy.git

# Di chuyển vào thư mục dự án
cd DuAN_TroLyThoiThiet_TraMy
```

#### Bước 2: Cấu hình môi trường
```powershell
# Tạo file .env trong thư mục Backend (nếu chưa có)
# Thêm các biến môi trường cần thiết:

# Backend/.env
OPENWEATHER_API_KEY=your_api_key_here
GEMINI_API_KEY=your_gemini_key_here
PORT=3000
```

#### Bước 3: Build và khởi động
```powershell
# Build và start containers ở background
docker compose up -d --build

# Hoặc xem logs realtime
docker compose up --build
```

#### Bước 4: Kiểm tra
```powershell
# Xem trạng thái containers
docker compose ps

# Output:
# NAME                IMAGE               STATUS
# duansoap-weather-app-1   duansoap-weather-app   Up 10 seconds

# Xem logs
docker compose logs -f weather-app

# Truy cập ứng dụng
# Mở trình duyệt: http://localhost:3000
```

### 🚀 Phương pháp 2: Sử dụng Docker thuần (Không dùng Compose)

```powershell
# Bước 1: Build image
docker build -t weather-app:latest .

# Bước 2: Run container
docker run -d `
  --name weather-app `
  -p 3000:3000 `
  -e NODE_ENV=production `
  -e OPENWEATHER_API_KEY=your_key `
  --restart unless-stopped `
  weather-app:latest

# Bước 3: Kiểm tra
docker ps
docker logs -f weather-app
```

### 🚀 Phương pháp 3: Development Mode với Volume Mounting

```powershell
# Mount source code vào container để dev không cần rebuild
docker compose -f docker-compose.dev.yml up -d
```

**docker-compose.dev.yml** (Tạo file mới):
```yaml
services:
  weather-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./Backend:/app
      - ./Frontend:/app/Frontend
      - /app/node_modules  # Prevent overwriting node_modules
    environment:
      - NODE_ENV=development
    restart: unless-stopped
    command: npm run dev  # Sử dụng nodemon
```

---

## 6. QUẢN LÝ CONTAINER

### 📊 Xem thông tin Container

```powershell
# Xem trạng thái
docker compose ps

# Xem resource usage (CPU, Memory, Network, I/O)
docker stats

# Xem chi tiết container
docker inspect weather-app

# Xem processes trong container
docker top weather-app
```

### 📝 Xem Logs

```powershell
# Xem logs gần nhất
docker compose logs --tail=100 weather-app

# Xem logs từ 10 phút trước
docker compose logs --since 10m weather-app

# Xem logs với timestamp
docker compose logs -t weather-app

# Xem logs realtime và follow
docker compose logs -f weather-app
```

### 🔧 Truy cập và Debug

```powershell
# Truy cập shell trong container
docker exec -it weather-app sh

# Trong container, bạn có thể:
# - Xem files: ls -la
# - Xem processes: ps aux
# - Kiểm tra port: netstat -tuln
# - Xem môi trường: env
# - Test API: curl http://localhost:3000

# Chạy lệnh trong container mà không vào shell
docker exec weather-app ls -la

# Copy file từ container ra host
docker cp weather-app:/app/logs/app.log ./app.log

# Copy file từ host vào container
docker cp ./config.json weather-app:/app/config.json
```

### 🔄 Restart và Update

```powershell
# Restart container
docker compose restart weather-app

# Rebuild và restart (khi có thay đổi code)
docker compose up -d --build

# Pull image mới và restart
docker compose pull
docker compose up -d

# Restart với zero-downtime (nếu có nhiều replicas)
docker compose up -d --no-deps --build weather-app
```

### 🛑 Dừng và Xóa

```powershell
# Dừng containers
docker compose stop

# Dừng một service cụ thể
docker compose stop weather-app

# Dừng và xóa containers
docker compose down

# Dừng, xóa containers và volumes
docker compose down -v

# Dừng, xóa containers, volumes, và images
docker compose down -v --rmi all

# Force stop container
docker kill weather-app
```

---

## 7. DEBUG VÀ TROUBLESHOOTING

### ❌ Lỗi thường gặp và cách khắc phục

#### 1. Port đã được sử dụng

**Lỗi:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Giải pháp:**
```powershell
# Tìm process đang dùng port 3000
netstat -ano | findstr :3000

# Hoặc
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill process
taskkill /PID <process-id> /F

# Hoặc đổi port trong docker-compose.yml
ports:
  - "3001:3000"  # Map port host 3001 sang container 3000
```

#### 2. Docker daemon không chạy

**Lỗi:**
```
Cannot connect to the Docker daemon
```

**Giải pháp:**
```powershell
# Windows: Khởi động Docker Desktop
# Linux:
sudo systemctl start docker
sudo systemctl enable docker
```

#### 3. Build thất bại - Network error

**Lỗi:**
```
ERROR [internal] load metadata for docker.io/library/node:20-alpine
```

**Giải pháp:**
```powershell
# Kiểm tra kết nối internet
ping docker.io

# Thử pull image trước
docker pull node:20-alpine

# Sử dụng mirror (nếu ở Việt Nam)
# Thêm vào daemon.json:
# {
#   "registry-mirrors": ["https://mirror.gcr.io"]
# }
```

#### 4. Container exit ngay sau khi start

**Giải pháp:**
```powershell
# Xem logs để tìm lỗi
docker logs weather-app

# Xem exit code
docker inspect weather-app --format='{{.State.ExitCode}}'

# Common exit codes:
# 0   - Success
# 1   - Application error
# 137 - SIGKILL (Out of Memory)
# 139 - SIGSEGV (Segmentation fault)
```

#### 5. Cannot find module

**Lỗi:**
```
Error: Cannot find module 'express'
```

**Giải pháp:**
```powershell
# Rebuild image with --no-cache
docker compose build --no-cache

# Hoặc xóa node_modules và rebuild
docker compose down
docker system prune -a
docker compose up --build
```

### 🔍 Debug Commands

```powershell
# Xem tất cả logs
docker compose logs -f

# Xem logs với filter
docker compose logs -f | Select-String "Error"

# Xem environment variables
docker exec weather-app env

# Xem network configuration
docker inspect weather-app --format='{{.NetworkSettings.IPAddress}}'

# Xem mounted volumes
docker inspect weather-app --format='{{.Mounts}}'

# Test connectivity
docker exec weather-app ping google.com
docker exec weather-app curl http://localhost:3000

# Xem disk usage
docker system df

# Xem chi tiết disk usage
docker system df -v
```

---

## 8. BEST PRACTICES

### ✅ Development Best Practices

#### 1. Sử dụng .dockerignore
```
# .dockerignore
node_modules
npm-debug.log
.git
.env
*.md
.DS_Store
coverage
.vscode
```

#### 2. Multi-stage builds (Tối ưu image size)
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY Backend/package*.json ./
RUN npm ci --only=production

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY Backend/ ./
COPY Frontend/ ./Frontend/
EXPOSE 3000
CMD ["node", "server.js"]
```

#### 3. Sử dụng Health Check
```yaml
services:
  weather-app:
    build: .
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### 4. Quản lý secrets an toàn
```powershell
# KHÔNG commit API keys vào git
# Sử dụng .env file (đã có trong .gitignore)

# Backend/.env
OPENWEATHER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

#### 5. Sử dụng named volumes
```yaml
services:
  weather-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - app-data:/app/data
      - app-logs:/app/logs

volumes:
  app-data:
  app-logs:
```

### 🧹 Cleaning Up

```powershell
# Xóa tất cả stopped containers
docker container prune

# Xóa tất cả unused images
docker image prune -a

# Xóa tất cả unused volumes
docker volume prune

# Xóa tất cả unused networks
docker network prune

# Xóa tất cả (containers, images, volumes, networks)
docker system prune -a --volumes

# Xem disk usage trước khi clean
docker system df
```

### 📈 Performance Optimization

```powershell
# Giới hạn memory
docker run -m 512m weather-app

# Giới hạn CPU
docker run --cpus=".5" weather-app

# Trong docker-compose.yml:
services:
  weather-app:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## 9. CÁC LỆNH DOCKER NÂNG CAO

### 🔐 Docker Security

```powershell
# Scan image để tìm vulnerabilities
docker scan weather-app:latest

# Chạy container với user không phải root
docker run --user 1000:1000 weather-app

# Chạy với read-only filesystem
docker run --read-only weather-app

# Giới hạn capabilities
docker run --cap-drop=ALL weather-app
```

### 📦 Docker Registry

```powershell
# Login Docker Hub
docker login

# Tag image
docker tag weather-app:latest username/weather-app:v1.0

# Push to Docker Hub
docker push username/weather-app:v1.0

# Pull from Docker Hub
docker pull username/weather-app:v1.0
```

### 🌐 Docker Networking

```powershell
# Tạo custom network
docker network create --driver bridge weather-network

# Chạy container trong network
docker run --network weather-network weather-app

# Trong docker-compose.yml:
services:
  weather-app:
    networks:
      - weather-network

networks:
  weather-network:
    driver: bridge
```

---

## 10. CHECKLIST TRIỂN KHAI

### ✅ Pre-deployment Checklist

- [ ] Docker và Docker Compose đã được cài đặt
- [ ] API keys đã được cấu hình trong .env
- [ ] Port 3000 không bị chiếm dụng
- [ ] Đã test build local thành công
- [ ] Đã test chạy container local
- [ ] Logs không có error
- [ ] Health check passed

### ✅ Production Deployment Checklist

- [ ] Sử dụng production Docker image (optimized)
- [ ] Enable health checks
- [ ] Configure resource limits
- [ ] Set up logging và monitoring
- [ ] Configure restart policy
- [ ] Backup strategy
- [ ] SSL/TLS certificates (nếu deploy public)
- [ ] Firewall rules configured
- [ ] Documentation updated

---

## 11. TÀI LIỆU THAM KHẢO

### 📚 Official Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)

### 🎓 Learning Resources
- [Docker Getting Started](https://docs.docker.com/get-started/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Security](https://docs.docker.com/engine/security/)

### 🆘 Support
- **GitHub Issues:** [DuAN_TroLyThoiThiet_TraMy Issues](https://github.com/KyThuatTVU/DuAN_TroLyThoiThiet_TraMy/issues)
- **Docker Community:** [Docker Forums](https://forums.docker.com/)
- **Stack Overflow:** [Docker Questions](https://stackoverflow.com/questions/tagged/docker)

---

## 📞 LIÊN HỆ VÀ HỖ TRỢ

**Dự án:** Trợ Lý Thời Tiết Trà My AI  
**Repository:** [DuAN_TroLyThoiThiet_TraMy](https://github.com/KyThuatTVU/DuAN_TroLyThoiThiet_TraMy)  
**Owner:** KyThuatTVU  

**Tài liệu được tạo bởi:** GitHub Copilot  
**Ngày cập nhật:** 13/10/2025  
**Version:** 1.0

---

## 📝 NOTES

> **Lưu ý quan trọng:**
> - Luôn backup dữ liệu trước khi chạy `docker compose down -v`
> - Không commit file `.env` vào Git
> - Thay đổi API keys mặc định trước khi deploy production
> - Monitor resource usage thường xuyên
> - Update Docker images định kỳ để patch security vulnerabilities

**Happy Dockering! 🐳**

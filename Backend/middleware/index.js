const cors = require('cors');
const express = require('express');
const path = require('path');

/**
 * Cấu hình CORS
 */
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:8080'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

/**
 * Middleware ghi log request
 */
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
    
    // Log body cho POST requests (trừ password)
    if (method === 'POST' && req.body) {
        const safeBody = { ...req.body };
        if (safeBody.password) safeBody.password = '[HIDDEN]';
        console.log('Request Body:', JSON.stringify(safeBody, null, 2));
    }
    
    next();
};

/**
 * Middleware xử lý lỗi
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);
    
    // Lỗi validation
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Dữ liệu không hợp lệ',
            details: err.message
        });
    }
    
    // Lỗi cast (MongoDB ObjectId không hợp lệ)
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'ID không hợp lệ',
            details: err.message
        });
    }
    
    // Lỗi JSON parse
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'JSON không hợp lệ',
            details: 'Request body chứa JSON không đúng cú pháp'
        });
    }
    
    // Lỗi server nội bộ
    res.status(500).json({
        error: 'Lỗi server nội bộ',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Có lỗi xảy ra'
    });
};

/**
 * Middleware giới hạn kích thước request
 */
const requestLimiter = (req, res, next) => {
    // Giới hạn kích thước body là 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > maxSize) {
        return res.status(413).json({
            error: 'Request quá lớn',
            maxSize: '10MB'
        });
    }
    
    next();
};

/**
 * Middleware bảo mật cơ bản
 */
const basicSecurity = (req, res, next) => {
    // Thêm các header bảo mật
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:3000; frame-src 'self' https://www.openstreetmap.org;");
    
    // Loại bỏ header tiết lộ thông tin server
    res.removeHeader('X-Powered-By');
    
    next();
};

/**
 * Cấu hình tất cả middleware
 */
const setupMiddleware = (app) => {
    // Middleware bảo mật
    app.use(basicSecurity);
    
    // CORS
    app.use(cors(corsOptions));
    
    // Parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    // Middleware custom
    app.use(requestLimiter);
    app.use(requestLogger);
    
    // Static files
    // Check if running in Docker (files in /app) or locally (files in Backend/..)
    const isDocker = __dirname.startsWith('/app');
    const staticPath = isDocker 
        ? path.join('/app', 'Frontend')
        : path.join(__dirname, '..', '..', 'Frontend');
    
    app.use(express.static(staticPath));
    app.use('/img', express.static(path.join(staticPath, 'img')));
    console.log('Static middleware added for:', path.resolve(staticPath));
    
    // Middleware xử lý lỗi (phải để cuối)
    app.use(errorHandler);
};

module.exports = {
    setupMiddleware,
    requestLogger,
    errorHandler,
    requestLimiter,
    basicSecurity,
    corsOptions
};
require('dotenv').config();
const express = require('express');
const soap = require('soap');
const fs = require('fs');
const path = require('path');

// Import các thành phần đã tách
const { setupMiddleware } = require('./middleware');
const routes = require('./routes');
const { weatherServiceDefinition } = require('./soap/weatherService');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE SETUP ===
setupMiddleware(app);

// === ROOT ROUTE FOR FRONTEND ===
app.get('/', (req, res) => {
    // Check if running in Docker or locally
    const isDocker = __dirname.startsWith('/app');
    const indexPath = isDocker
        ? path.join('/app', 'Frontend', 'index.html')
        : path.join(__dirname, '..', 'Frontend', 'index.html');
    res.sendFile(indexPath);
});

// === API ROUTES ===
app.use('/api', routes);

// === LEGACY ROUTES (để tương thích ngược) ===
const chatController = require('./controllers/chatController');
const weatherController = require('./controllers/weatherController');

// Route chat cũ (không có prefix /api)
app.post('/chat', chatController.handleChat.bind(chatController));

// Route weather cũ (không có prefix /api) 
app.get('/getWeatherJSON', weatherController.getWeatherJSON.bind(weatherController));

// === SOAP SERVICE SETUP ===
const wsdlPath = path.join(__dirname, 'soap', 'weatherWsdl.xml');

let wsdlXML;
try {
    wsdlXML = fs.readFileSync(wsdlPath, 'utf8');
    console.log('✅ WSDL file loaded successfully');
} catch (error) {
    console.error('❌ Error loading WSDL file:', error.message);
    process.exit(1);
}

// === SERVER STARTUP ===
const server = app.listen(PORT, () => {
    console.log('\n🚀 ==========================================');
    console.log(`🌟 Weather SOAP Server Started Successfully`);
    console.log('🚀 ==========================================');
    console.log(`📡 Server running at: http://localhost:${PORT}`);
    console.log(`🌐 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log('🚀 ==========================================\n');
    
    // Khởi tạo SOAP service
    try {
        soap.listen(app, '/weather', weatherServiceDefinition, wsdlXML, () => {
            console.log('✅ SOAP service initialized successfully');
            console.log(`📋 WSDL available at: http://localhost:${PORT}/weather?wsdl`);
        });
    } catch (error) {
        console.error('❌ Error initializing SOAP service:', error.message);
    }
});

// === GRACEFUL SHUTDOWN ===
process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

// === ERROR HANDLING ===
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

module.exports = app;
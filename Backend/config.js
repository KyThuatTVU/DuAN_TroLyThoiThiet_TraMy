require('dotenv').config();

module.exports = {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
};
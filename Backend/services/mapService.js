// Map Service - Handles location and map data
const axios = require("axios");

// Map service logic
async function getLocationLogic(cityName) {
    if (!cityName) {
        throw new Error('Tên thành phố không được để trống');
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
        throw new Error('OPENWEATHER_API_KEY không được cấu hình trong file .env');
    }

    console.log(`Đang lấy thông tin vị trí cho: ${cityName}`);

    try {
        // 1. Gọi Geocoding API để lấy tọa độ
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
        const geoResponse = await axios.get(geocodingUrl);

        if (!geoResponse.data || geoResponse.data.length === 0) {
            throw new Error(`Không tìm thấy thành phố "${cityName}"`);
        }

        const locationData = geoResponse.data[0];
        const { lat, lon, name, country, state } = locationData;

        // 2. Tạo URLs cho các loại bản đồ
        const mapUrls = generateMapUrls(lat, lon, name);

        // 3. Lấy thông tin múi giờ (sử dụng tọa độ)
        const timezoneInfo = getTimezoneInfo(lat, lon);

        return {
            cityName: name || cityName,
            country: country || 'N/A',
            state: state || 'N/A',
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lon.toFixed(6)),
            mapUrl: mapUrls.interactive,
            streetMapUrl: mapUrls.street,
            satelliteMapUrl: mapUrls.satellite,
            timezone: timezoneInfo.name,
            timezoneOffset: timezoneInfo.offset
        };

    } catch (error) {
        console.error('Map Service Error:', error.message);
        if (error.response?.status === 401) {
            throw new Error('API key không hợp lệ');
        } else if (error.response?.status === 404) {
            throw new Error(`Không tìm thấy thành phố "${cityName}"`);
        } else {
            throw new Error(error.message || 'Có lỗi xảy ra khi lấy thông tin bản đồ');
        }
    }
}

// Generate different map URLs
function generateMapUrls(lat, lon, cityName) {
    const encodedCity = encodeURIComponent(cityName);
    
    return {
        // OpenStreetMap interactive map
        interactive: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=12#map=12/${lat}/${lon}`,
        
        // Google Maps street view
        street: `https://www.google.com/maps/search/${encodedCity}/@${lat},${lon},15z`,
        
        // Google Maps satellite view
        satellite: `https://www.google.com/maps/@${lat},${lon},15z/data=!3m1!1e3`
    };
}

// Get timezone information based on coordinates
function getTimezoneInfo(lat, lon) {
    // Simplified timezone calculation (can be enhanced with a real timezone API)
    const timezoneOffset = Math.round(lon / 15); // Rough approximation
    
    // Map common timezone names
    const timezoneNames = {
        7: 'Asia/Ho_Chi_Minh',    // Vietnam
        8: 'Asia/Shanghai',       // China
        9: 'Asia/Tokyo',          // Japan
        0: 'UTC',                 // GMT
        1: 'Europe/Paris',        // CET
        5: 'Asia/Karachi',        // PKT
        '-5': 'America/New_York', // EST
        '-8': 'America/Los_Angeles' // PST
    };

    return {
        name: timezoneNames[timezoneOffset] || `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`,
        offset: timezoneOffset
    };
}

module.exports = { getLocationLogic };
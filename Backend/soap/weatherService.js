// File: soap/weatherService.js (Phiên bản cuối cùng, đã thống nhất)

const axios = require("axios");
const { getLocationLogic } = require("../services/mapService");

// Hàm logic trung tâm, được sử dụng bởi cả SOAP và các endpoint khác
async function getWeatherLogic(cityName) {
  if (!cityName) {
    throw new Error('Tên thành phố không được để trống');
  }

  // SỬA LỖI: Thống nhất tên biến API Key
  const API_KEY = process.env.OPENWEATHER_API_KEY; 
  if (!API_KEY) {
    throw new Error('OPENWEATHER_API_KEY không được cấu hình trong file .env');
  }

  console.log(`Bắt đầu lấy dữ liệu cho: ${cityName}`);

  // 1. Gọi API thời tiết hiện tại để lấy tọa độ
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=vi`;
  const currentWeatherResponse = await axios.get(currentWeatherUrl);
  const { lat, lon } = currentWeatherResponse.data.coord;

  // 2. Sử dụng API miễn phí để lấy dự báo 5 ngày (thay thế OneCall API)
  let weather = currentWeatherResponse.data;
  let todayForecast = {};

  try {
    // Lấy dự báo 5 ngày với API miễn phí
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=vi`;
    const forecastResponse = await axios.get(forecastUrl);
    
    // Lấy dự báo cho ngày hôm nay từ forecast API
    if (forecastResponse.data.list && forecastResponse.data.list.length > 0) {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      // Tìm dự báo cho ngày hôm nay
      const todayData = forecastResponse.data.list.find(item => {
        const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
        return itemDate === todayStr;
      }) || forecastResponse.data.list[0];
      
      todayForecast = {
        temp: {
          max: todayData.main.temp_max,
          min: todayData.main.temp_min
        },
        weather: todayData.weather
      };
    }
    
    console.log('Đã lấy dự báo thời tiết thành công');
  } catch (forecastError) {
    console.warn('Không thể lấy dự báo, chỉ sử dụng dữ liệu hiện tại:', forecastError.response?.data?.message || forecastError.message);
    // Sử dụng dữ liệu từ current weather API thôi
  }
  
  return {
    temperature: weather.main?.temp?.toFixed(1) || '0',
    humidity: weather.main?.humidity || 0,
    description: weather.weather?.[0]?.description || 'Không có thông tin',
    windSpeed: Math.round((weather.wind?.speed || 0) * 3.6),
    feelsLike: weather.main?.feels_like?.toFixed(1) || '0',
    visibility: Math.round((weather.visibility || 0) / 1000),
    uvIndex: 0, // UV Index không có sẵn trong API miễn phí
    cityName: weather.name || cityName,
    icon: weather.weather?.[0]?.icon || '01d',
    // Thêm thông tin nhiệt độ max/min từ forecast nếu có
    tempMax: todayForecast.temp?.max?.toFixed(1) || weather.main?.temp_max?.toFixed(1) || '0',
    tempMin: todayForecast.temp?.min?.toFixed(1) || weather.main?.temp_min?.toFixed(1) || '0'
  };
}

// Định nghĩa cấu trúc SOAP service
const weatherServiceDefinition = {
  WeatherService: {
    WeatherPort: {
      getWeather: async function(args) {
        try {
          const soapResponse = await getWeatherLogic(args.city);
          return { getWeatherResponse: { ...soapResponse, error: "" } };
        } catch (err) {
          console.error('SOAP Service Error:', err.response?.data || err.message);
          return {
            getWeatherResponse: {
              error: err.response?.status === 404
                ? `Không tìm thấy thành phố "${args.city}"`
                : (err.message || "Có lỗi xảy ra khi lấy dữ liệu thời tiết")
            }
          };
        }
      },
      
      // Map/Location SOAP Operation
      getLocation: async function(args) {
        try {
          const locationResponse = await getLocationLogic(args.city);
          return { getLocationResponse: { ...locationResponse, error: "" } };
        } catch (err) {
          console.error('SOAP Map Service Error:', err.response?.data || err.message);
          return {
            getLocationResponse: {
              error: err.response?.status === 404
                ? `Không tìm thấy thành phố "${args.city}"`
                : (err.message || "Có lỗi xảy ra khi lấy thông tin bản đồ")
            }
          };
        }
      }
    }
  }
};

// Export cả hai để server.js có thể dùng
module.exports = { weatherServiceDefinition, getWeatherLogic, getLocationLogic };
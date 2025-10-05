const { getWeatherLogic } = require('../soap/weatherService');

class WeatherController {
    /**
     * Lấy dữ liệu thời tiết dưới dạng JSON
     */
    async getWeatherJSON(req, res) {
        try {
            const city = req.query.city;
            
            if (!city) {
                return res.status(400).json({ 
                    error: 'Tham số city là bắt buộc' 
                });
            }

            const weatherData = await getWeatherLogic(city);
            
            // Format response theo cấu trúc đơn giản
            const response = {
                city: weatherData.name || city,
                temp: weatherData.temperature,
                humidity: weatherData.humidity,
                description: weatherData.description,
                windSpeed: weatherData.windSpeed,
                feelsLike: weatherData.feelsLike,
                visibility: weatherData.visibility,
                uvIndex: weatherData.uvIndex,
                timestamp: new Date().toISOString()
            };

            res.json(response);

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
            
            let errorMessage = 'Không thể lấy dữ liệu thời tiết';
            
            if (error.response?.status === 404) {
                errorMessage = 'Không tìm thấy thông tin thời tiết cho thành phố này';
            } else if (error.response?.status === 401) {
                errorMessage = 'API key không hợp lệ';
            } else if (error.message) {
                errorMessage = error.message;
            }

            res.status(500).json({ 
                error: errorMessage,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Lấy dự báo thời tiết nhiều ngày
     */
    async getForecast(req, res) {
        try {
            const city = req.query.city;
            const days = parseInt(req.query.days) || 5;
            
            if (!city) {
                return res.status(400).json({ 
                    error: 'Tham số city là bắt buộc' 
                });
            }

            if (days < 1 || days > 7) {
                return res.status(400).json({ 
                    error: 'Số ngày dự báo phải từ 1 đến 7' 
                });
            }

            const weatherData = await getWeatherLogic(city);
            
            // Trả về dữ liệu dự báo nếu có
            const response = {
                city: weatherData.name || city,
                current: {
                    temp: weatherData.temperature,
                    humidity: weatherData.humidity,
                    description: weatherData.description,
                    windSpeed: weatherData.windSpeed
                },
                forecast: weatherData.daily ? weatherData.daily.slice(0, days).map(day => ({
                    date: new Date(day.dt * 1000).toLocaleDateString('vi-VN'),
                    temp: {
                        min: Math.round(day.temp.min),
                        max: Math.round(day.temp.max)
                    },
                    description: day.weather[0].description,
                    humidity: day.humidity,
                    windSpeed: Math.round(day.wind_speed * 3.6)
                })) : [],
                timestamp: new Date().toISOString()
            };

            res.json(response);

        } catch (error) {
            console.error('Lỗi khi lấy dự báo thời tiết:', error);
            
            res.status(500).json({ 
                error: 'Không thể lấy dự báo thời tiết',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Lấy danh sách các thành phố được hỗ trợ
     */
    getSupportedCities(req, res) {
        const cities = [
            { name: 'Hà Nội', code: 'hanoi' },
            { name: 'TP. Hồ Chí Minh', code: 'ho-chi-minh' },
            { name: 'Đà Nẵng', code: 'da-nang' },
            { name: 'Cần Thơ', code: 'can-tho' },
            { name: 'Hải Phòng', code: 'hai-phong' },
            { name: 'Nha Trang', code: 'nha-trang' },
            { name: 'Huế', code: 'hue' },
            { name: 'Vũng Tàu', code: 'vung-tau' }
        ];

        res.json({
            cities,
            total: cities.length,
            note: 'Bạn cũng có thể sử dụng tên thành phố khác không có trong danh sách này'
        });
    }
}

module.exports = new WeatherController();
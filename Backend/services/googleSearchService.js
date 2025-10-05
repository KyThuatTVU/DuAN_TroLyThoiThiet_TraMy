const axios = require('axios');
const cheerio = require('cheerio');

class GoogleSearchService {
    constructor() {
        this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
        this.apiKey = process.env.GOOGLE_SEARCH_API_KEY;
        this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
    }

    /**
     * Tìm kiếm thông tin trên Google
     * @param {string} query - Từ khóa tìm kiếm
     * @param {number} numResults - Số kết quả cần lấy (mặc định 3)
     * @returns {Promise<Array>} - Danh sách kết quả tìm kiếm
     */
    async searchGoogle(query, numResults = 3) {
        try {
            console.log(`🔍 Đang tìm kiếm Google cho: "${query}"`);

            // Nếu không có API key, sử dụng web scraping
            if (!this.apiKey || !this.searchEngineId) {
                return await this.fallbackWebSearch(query, numResults);
            }

            const response = await axios.get(this.baseUrl, {
                params: {
                    key: this.apiKey,
                    cx: this.searchEngineId,
                    q: query,
                    num: numResults,
                    safe: 'active'
                }
            });

            if (response.data && response.data.items) {
                const results = response.data.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    snippet: item.snippet,
                    source: 'Google Custom Search'
                }));

                console.log(`✅ Tìm thấy ${results.length} kết quả từ Google`);
                return results;
            }

            return [];
        } catch (error) {
            console.error('❌ Lỗi Google Search API:', error.message);
            // Fallback to web search
            return await this.fallbackWebSearch(query, numResults);
        }
    }

    /**
     * Tìm kiếm web fallback khi không có API key
     * @param {string} query - Từ khóa tìm kiếm
     * @param {number} numResults - Số kết quả cần lấy
     * @returns {Promise<Array>} - Danh sách kết quả tìm kiếm
     */
    async fallbackWebSearch(query, numResults = 3) {
        try {
            console.log(`🌐 Sử dụng web search fallback cho: "${query}"`);
            
            // Sử dụng DuckDuckGo hoặc tìm kiếm tin tức từ các trang web
            const weatherSources = await this.searchWeatherSources(query);
            return weatherSources.slice(0, numResults);
        } catch (error) {
            console.error('❌ Lỗi fallback search:', error.message);
            return [];
        }
    }

    /**
     * Tìm kiếm thông tin thời tiết từ các nguồn tin tức
     * @param {string} query - Từ khóa tìm kiếm
     * @returns {Promise<Array>} - Danh sách kết quả
     */
    async searchWeatherSources(query) {
        const results = [];
        
        try {
            // Tìm kiếm từ AccuWeather (tiếng Việt)
            const accuWeatherResult = await this.searchAccuWeather(query);
            if (accuWeatherResult) results.push(accuWeatherResult);

            // Tìm kiếm từ VnExpress Thời tiết
            const vnexpressResult = await this.searchVnExpressWeather(query);
            if (vnexpressResult) results.push(vnexpressResult);

            // Tìm kiếm từ Báo Thanh Niên Thời tiết
            const thanhNienResult = await this.searchThanhNienWeather(query);
            if (thanhNienResult) results.push(thanhNienResult);

        } catch (error) {
            console.error('❌ Lỗi tìm kiếm weather sources:', error.message);
        }

        return results;
    }

    /**
     * Tìm kiếm từ AccuWeather
     */
    async searchAccuWeather(query) {
        try {
            const searchUrl = `https://www.accuweather.com/vi/search-locations?query=${encodeURIComponent(query)}`;
            const response = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 5000
            });

            return {
                title: `Thông tin thời tiết ${query} - AccuWeather`,
                link: searchUrl,
                snippet: `Dự báo thời tiết chi tiết cho ${query} từ AccuWeather`,
                source: 'AccuWeather'
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Tìm kiếm từ VnExpress
     */
    async searchVnExpressWeather(query) {
        try {
            return {
                title: `Tin tức thời tiết ${query} - VnExpress`,
                link: `https://vnexpress.net/tim-kiem?q=${encodeURIComponent(query + ' thời tiết')}`,
                snippet: `Tin tức và dự báo thời tiết về ${query} từ VnExpress`,
                source: 'VnExpress'
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Tìm kiếm từ Báo Thanh Niên
     */
    async searchThanhNienWeather(query) {
        try {
            return {
                title: `Dự báo thời tiết ${query} - Thanh Niên`,
                link: `https://thanhnien.vn/tim-kiem.html?keywords=${encodeURIComponent(query + ' thời tiết')}`,
                snippet: `Thông tin thời tiết và khí hậu ${query} từ báo Thanh Niên`,
                source: 'Thanh Niên'
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Tìm kiếm thông tin thời tiết cụ thể
     * @param {string} location - Địa điểm
     * @param {string} topic - Chủ đề (bão, mưa, nắng nóng, v.v.)
     * @returns {Promise<Array>} - Kết quả tìm kiếm
     */
    async searchWeatherInfo(location, topic = '') {
        const query = topic ? 
            `${topic} ${location} thời tiết dự báo` : 
            `thời tiết ${location} dự báo hôm nay`;
            
        return await this.searchGoogle(query, 5);
    }

    /**
     * Tìm kiếm tin tức thời tiết mới nhất
     * @returns {Promise<Array>} - Tin tức thời tiết
     */
    async searchLatestWeatherNews() {
        const query = 'tin tức thời tiết Việt Nam hôm nay';
        return await this.searchGoogle(query, 4);
    }

    /**
     * Kiểm tra từ khóa có liên quan đến thời tiết không
     * @param {string} message - Tin nhắn từ user
     * @returns {boolean} - True nếu liên quan đến thời tiết
     */
    isWeatherRelated(message) {
        const weatherKeywords = [
            'thời tiết', 'dự báo', 'bão', 'mưa', 'nắng', 'lạnh', 'nóng',
            'độ ẩm', 'gió', 'nhiệt độ', 'khí hậu', 'thời tiết', 'weather',
            'forecast', 'rain', 'sun', 'storm', 'temperature', 'humidity',
            'áp thấp', 'siêu bão', 'lũ lụt', 'hạn hán', 'sương mù'
        ];
        
        const lowerMessage = message.toLowerCase();
        return weatherKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    /**
     * Trích xuất vị trí từ tin nhắn
     * @param {string} message - Tin nhắn
     * @returns {string|null} - Tên địa điểm
     */
    extractLocation(message) {
        const vietnameseCities = [
            'hà nội', 'sài gòn', 'hồ chí minh', 'đà nẵng', 'hải phòng',
            'cần thơ', 'nha trang', 'huế', 'vũng tàu', 'đà lạt',
            'hạ long', 'phú quốc', 'quy nhon', 'vinh', 'buôn ma thuột',
            'bắc ninh', 'nam định', 'thái bình', 'hưng yên', 'hải dương',
            'quảng ninh', 'lào cai', 'sơn la', 'điện biên', 'lai châu',
            'cao bằng', 'lạng sơn', 'bắc giang', 'thái nguyên', 'tuyên quang',
            'hà giang', 'yên bái', 'phú thọ', 'vĩnh phúc', 'bắc kạn',
            'trà vinh', 'vĩnh long', 'an giang', 'kiên giang', 'cà mau',
            'bạc liêu', 'sóc trăng', 'hậu giang', 'đồng tháp', 'tiền giang',
            'bến tre', 'long an', 'tây ninh', 'bình dương', 'đồng nai',
            'bà rịa vũng tàu', 'bình thuận', 'ninh thuận', 'khánh hòa',
            'phú yên', 'bình định', 'quảng ngãi', 'quảng nam', 'thừa thiên huế',
            'quảng bình', 'quảng trị', 'hà tĩnh', 'nghệ an', 'thanh hóa',
            'ninh bình', 'hòa bình', 'miền bắc', 'miền trung', 'miền nam'
        ];

        const lowerMessage = message.toLowerCase();
        
        for (const city of vietnameseCities) {
            if (lowerMessage.includes(city)) {
                return city;
            }
        }
        
        return null;
    }
}

module.exports = new GoogleSearchService();
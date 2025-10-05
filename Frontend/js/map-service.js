// Map Service - Handles map functionality
class MapService {
    constructor(apiService) {
        this.apiService = apiService;
        this.currentLocationData = null;
        this.currentMapType = 'street';
    }

    // Fetch location data via SOAP
    async fetchLocationViaSOAP(city) {
        const soapRequestXML = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:weat="http://example.com/weather">
               <soapenv:Header/>
               <soapenv:Body>
                  <weat:getLocationRequest>
                     <city>${city}</city>
                  </weat:getLocationRequest>
               </soapenv:Body>
            </soapenv:Envelope>`;

        try {
            const response = await fetch('http://localhost:3000/weather', {
                method: 'POST',
                headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
                body: soapRequestXML
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`);
            }

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            // Helper function to safely get node value
            const getNodeValue = (tagName) => {
                const node = xmlDoc.querySelector(`getLocationResponse > ${tagName}`);
                return node ? node.textContent : null;
            };

            const error = getNodeValue("error");
            if (error && error.trim() !== "") {
                return { error: error };
            }

            // Extract location data from response XML
            return {
                cityName: getNodeValue("cityName"),
                country: getNodeValue("country"),
                state: getNodeValue("state"),
                latitude: parseFloat(getNodeValue("latitude")),
                longitude: parseFloat(getNodeValue("longitude")),
                mapUrl: getNodeValue("mapUrl"),
                streetMapUrl: getNodeValue("streetMapUrl"),
                satelliteMapUrl: getNodeValue("satelliteMapUrl"),
                timezone: getNodeValue("timezone"),
                timezoneOffset: parseInt(getNodeValue("timezoneOffset"))
            };

        } catch (error) {
            console.error('Lỗi khi gọi SOAP Map API:', error);
            return { error: "Không thể kết nối tới SOAP Map service." };
        }
    }

    // Display map for a city
    async displayMap(city) {
        const mapSection = document.getElementById('mapSection');
        if (!mapSection) {
            this.createMapSection();
        }

        // Show loading
        this.showMapLoading();

        try {
            const locationData = await this.fetchLocationViaSOAP(city);
            
            if (locationData.error) {
                this.showMapError(locationData.error);
                return;
            }

            this.currentLocationData = locationData;
            this.renderMap(locationData);
            this.updateMapInfo(locationData);

        } catch (error) {
            console.error('Map display error:', error);
            this.showMapError('Không thể hiển thị bản đồ');
        }
    }

    // Create map section HTML
    createMapSection() {
        const container = document.querySelector('.container');
        const mapSectionHTML = `
            <div id="mapSection" class="map-section" style="display: none;">
                <div class="map-header">
                    <div class="map-title">
                        🗺️ Bản đồ vị trí
                    </div>
                    <div class="map-controls">
                        <button class="map-btn street" onclick="mapService.switchMapType('street')">
                            🛣️ Đường phố
                        </button>
                        <button class="map-btn satellite" onclick="mapService.switchMapType('satellite')">
                            🛰️ Vệ tinh
                        </button>
                    </div>
                </div>
                
                <div id="mapContainer" class="map-container">
                    <div class="map-loading">
                        📍 Đang tải bản đồ...
                    </div>
                </div>
                
                <div id="mapInfo" class="map-info" style="display: none;">
                    <!-- Map info will be populated here -->
                </div>
                
                <div id="mapLinks" class="map-links" style="display: none;">
                    <!-- Map links will be populated here -->
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', mapSectionHTML);
    }

    // Show map section
    showMapSection() {
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
            mapSection.style.display = 'block';
        }
    }

    // Hide map section
    hideMapSection() {
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
            mapSection.style.display = 'none';
        }
    }

    // Show map loading state
    showMapLoading() {
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-loading">
                    📍 Đang tải bản đồ...
                </div>
            `;
        }
        this.showMapSection();
    }

    // Show map error
    showMapError(errorMessage) {
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-error">
                    ❌ ${errorMessage}
                </div>
            `;
        }
        
        // Hide info sections
        const mapInfo = document.getElementById('mapInfo');
        const mapLinks = document.getElementById('mapLinks');
        if (mapInfo) mapInfo.style.display = 'none';
        if (mapLinks) mapLinks.style.display = 'none';
    }

    // Render map iframe
    renderMap(locationData) {
        const mapContainer = document.getElementById('mapContainer');
        const { latitude, longitude, cityName } = locationData;
        
        // Create embedded map URL (using OpenStreetMap)
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
        
        mapContainer.innerHTML = `
            <iframe 
                class="map-iframe"
                src="${mapUrl}"
                title="Bản đồ ${cityName}"
                allowfullscreen>
            </iframe>
        `;
    }

    // Update map information
    updateMapInfo(locationData) {
        const mapInfo = document.getElementById('mapInfo');
        const mapLinks = document.getElementById('mapLinks');
        
        if (mapInfo) {
            mapInfo.innerHTML = `
                <div class="map-info-card">
                    <div class="map-info-label">Thành phố</div>
                    <div class="map-info-value">${locationData.cityName}</div>
                </div>
                <div class="map-info-card">
                    <div class="map-info-label">Quốc gia</div>
                    <div class="map-info-value">${locationData.country}</div>
                </div>
                <div class="map-info-card">
                    <div class="map-info-label">Tọa độ</div>
                    <div class="map-info-value coordinates">
                        ${locationData.latitude.toFixed(4)}°N<br>
                        ${locationData.longitude.toFixed(4)}°E
                    </div>
                </div>
                <div class="map-info-card">
                    <div class="map-info-label">Múi giờ</div>
                    <div class="map-info-value">
                        ${locationData.timezone}<br>
                        <small>UTC${locationData.timezoneOffset >= 0 ? '+' : ''}${locationData.timezoneOffset}</small>
                    </div>
                </div>
            `;
            mapInfo.style.display = 'grid';
        }

        if (mapLinks) {
            mapLinks.innerHTML = `
                <a href="${locationData.streetMapUrl}" target="_blank" class="map-link">
                    🌍 Mở Google Maps
                </a>
                <a href="${locationData.mapUrl}" target="_blank" class="map-link">
                    🗺️ Mở OpenStreetMap
                </a>
                <a href="${locationData.satelliteMapUrl}" target="_blank" class="map-link">
                    🛰️ Xem vệ tinh
                </a>
            `;
            mapLinks.style.display = 'flex';
        }
    }

    // Switch map type
    switchMapType(type) {
        if (!this.currentLocationData) return;
        
        this.currentMapType = type;
        const { latitude, longitude, cityName } = this.currentLocationData;
        const mapContainer = document.getElementById('mapContainer');
        
        let mapUrl;
        if (type === 'satellite') {
            // Use satellite view (Google Maps embed doesn't work without API key, so we'll use a different approach)
            mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
        } else {
            // Default street view
            mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
        }
        
        mapContainer.innerHTML = `
            <iframe 
                class="map-iframe"
                src="${mapUrl}"
                title="Bản đồ ${cityName} (${type === 'satellite' ? 'Vệ tinh' : 'Đường phố'})"
                allowfullscreen>
            </iframe>
        `;

        // Update button states
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.style.opacity = '0.7';
        });
        document.querySelector(`.map-btn.${type}`).style.opacity = '1';
    }

    // Get current location data
    getCurrentLocationData() {
        return this.currentLocationData;
    }
}

// Export for global use
window.MapService = MapService;
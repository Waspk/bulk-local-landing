// js/utils/mapHandler.js

export class MapHandler {
    constructor() {
        this.map = null;
        this.markers = [];
        this.userMarker = null;
    }

    initMap() {
        this.map = L.map('map').setView([39.8283, -98.5795], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    addMarker(store, onClick) {
        const marker = L.marker(store.coordinates)
            .bindPopup(this.createPopupContent(store))
            .addTo(this.map);
            
        marker.on('click', () => onClick(store));
        this.markers.push(marker);
        return marker;
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }

    setUserLocation(coordinates) {
        if (this.userMarker) {
            this.userMarker.remove();
        }

        this.userMarker = L.marker(coordinates, {
            icon: L.divIcon({
                html: '<i class="fas fa-user-circle" style="color: #3498db; font-size: 24px;"></i>',
                className: 'user-marker',
                iconSize: [24, 24]
            })
        }).addTo(this.map);

        this.map.setView(coordinates, 11);
    }

    createPopupContent(store) {
        return `
            <div style="text-align: center; min-width: 200px;">
                <h3 style="margin-bottom: 8px;">${store.name}</h3>
                <p style="margin-bottom: 8px;">
                    <i class="fas fa-map-marker-alt"></i> 
                    ${store.address}
                </p>
                <p style="margin-bottom: 12px;">
                    <i class="fas fa-tag"></i> 
                    ${store.offers.length} offers available
                </p>
                <button onclick="app.showStoreDetails(${store.id})" 
                        class="btn">
                    <i class="fas fa-info-circle"></i>
                    View Details
                </button>
            </div>
        `;
    }
}
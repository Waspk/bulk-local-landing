// js/main.js

import { stores } from './data/storeLocations.js';
import { MapHandler } from './utils/mapHandler.js';
import { FilterHandler } from './utils/filterHandler.js';
import { 
    changeLanguage, 
    updatePageLanguage, 
    getCurrentLanguage 
} from './languages/languageHandler.js';

class StoreLocator {
    constructor() {
        this.mapHandler = new MapHandler();
        this.filterHandler = new FilterHandler(stores);
        this.userLocation = null;
        this.init();
    }

    init() {
        this.mapHandler.initMap();
        this.setupEventListeners();
        this.updateDisplay();
        updatePageLanguage();
    }

    setupEventListeners() {
        // Add your event listeners here
        document.getElementById('searchInput').addEventListener('input', () => this.handleSearch());
        // Add other event listeners
    }

    updateDisplay() {
        const filteredStores = this.filterHandler.filterStores(this.userLocation);
        const sortedStores = this.filterHandler.sortStores(filteredStores);
        
        this.mapHandler.clearMarkers();
        this.updateStoreList(sortedStores);
        this.updateStoreGrid(sortedStores);
    }

    // Add other methods for handling UI updates, user interaction, etc.
}

// Initialize the application
const app = new StoreLocator();
window.app = app; // Make it available globally for HTML onclick handlers
// js/data/storeLocations.js

import { StoreModel } from '../models/StoreModel.js';

const storeData = [
    // Your existing store data here
    // Include all locations from US, Sweden, Denmark, and Germany
];

export const stores = storeData.map(store => new StoreModel(store));
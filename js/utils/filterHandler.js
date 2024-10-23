// js/utils/filterHandler.js

export class FilterHandler {
    constructor(stores) {
        this.stores = stores;
        this.currentFilters = {
            search: '',
            category: '',
            offerType: '',
            distance: '',
            sortBy: 'name',
            sortDesc: false
        };
    }

    filterStores(userLocation) {
        return this.stores.filter(store => {
            const matchesSearch = !this.currentFilters.search || 
                store.matchesSearch(this.currentFilters.search);

            const matchesCategory = !this.currentFilters.category || 
                store.category === this.currentFilters.category;

            const matchesOffer = !this.currentFilters.offerType || 
                store.offers.some(offer => offer.type === this.currentFilters.offerType);

            const matchesDistance = !this.currentFilters.distance || 
                (userLocation && store.getDistance(userLocation) <= parseInt(this.currentFilters.distance));

            return matchesSearch && matchesCategory && matchesOffer && matchesDistance;
        });
    }

    sortStores(stores) {
        return [...stores].sort((a, b) => {
            let comparison = 0;
            switch (this.currentFilters.sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'distance':
                    comparison = a.getDistance(userLocation) - b.getDistance(userLocation);
                    break;
                case 'offers':
                    comparison = b.offers.length - a.offers.length;
                    break;
            }
            return this.currentFilters.sortDesc ? -comparison : comparison;
        });
    }

    updateFilters(newFilters) {
        this.currentFilters = { ...this.currentFilters, ...newFilters };
    }

    resetFilters() {
        this.currentFilters = {
            search: '',
            category: '',
            offerType: '',
            distance: '',
            sortBy: 'name',
            sortDesc: false
        };
    }
}
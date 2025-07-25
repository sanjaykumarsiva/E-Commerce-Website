class AmazonSearch {
    constructor() {
        // Replace with your actual SerpAPI key
        this.apiKey = 'YOUR_SERPAPI_KEY_HERE';
        this.baseUrl = 'https://serpapi.com/search.json';
        this.currentPage = 1;
        this.currentQuery = '';
        this.currentCategory = '';
        this.currentSort = 'relevance';
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // Form elements
        this.searchForm = document.getElementById('searchForm');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortFilter = document.getElementById('sortFilter');
        
        // Results elements
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsTitle = document.getElementById('resultsTitle');
        this.resultsCount = document.getElementById('resultsCount');
        this.productsGrid = document.getElementById('productsGrid');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Pagination elements
        this.pagination = document.getElementById('pagination');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.paginationInfo = document.getElementById('paginationInfo');
    }
    
    bindEvents() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch();
        });
        
        this.categoryFilter.addEventListener('change', () => {
            if (this.currentQuery) {
                this.currentPage = 1;
                this.performSearch();
            }
        });
        
        this.sortFilter.addEventListener('change', () => {
            if (this.currentQuery) {
                this.currentPage = 1;
                this.performSearch();
            }
        });
        
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.performSearch();
            }
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.currentPage++;
            this.performSearch();
        });
    }
    
    async performSearch() {
        if (this.isLoading) return;
        
        const query = this.searchInput.value.trim();
        if (!query) {
            this.showError('Please enter a search term');
            return;
        }
        
        this.currentQuery = query;
        this.currentCategory = this.categoryFilter.value;
        this.currentSort = this.sortFilter.value;
        
        this.showLoading();
        this.hideError();
        
        try {
            const results = await this.searchAmazon(query);
            this.displayResults(results);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Failed to search Amazon. Please check your API key and try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    async searchAmazon(query) {
        // Check if API key is set
        if (this.apiKey === 'YOUR_SERPAPI_KEY_HERE') {
            // Return mock data for demo purposes
            return this.getMockData(query);
        }
        
        const params = new URLSearchParams({
            engine: 'amazon',
            api_key: this.apiKey,
            amazon_domain: 'amazon.com',
            q: query,
            page: this.currentPage
        });
        
        // Add category filter if selected
        if (this.currentCategory) {
            params.append('department', this.currentCategory);
        }
        
        // Add sort filter
        const sortMapping = {
            'price_low_to_high': 'price-asc-rank',
            'price_high_to_low': 'price-desc-rank',
            'customer_review': 'review-rank',
            'newest': 'date-desc-rank'
        };
        
        if (sortMapping[this.currentSort]) {
            params.append('sort', sortMapping[this.currentSort]);
        }
        
        const response = await fetch(`${this.baseUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    getMockData(query) {
        // Mock data for demonstration when API key is not set
        return {
            search_metadata: {
                total_results: 1000
            },
            organic_results: [
                {
                    position: 1,
                    title: `${query} - Premium Quality Product`,
                    link: 'https://amazon.com/product1',
                    image: 'https://via.placeholder.com/300x300?text=Product+1',
                    price: {
                        raw: '$29.99',
                        value: 29.99
                    },
                    rating: 4.5,
                    reviews_count: 1234
                },
                {
                    position: 2,
                    title: `Best ${query} for Your Needs`,
                    link: 'https://amazon.com/product2',
                    image: 'https://via.placeholder.com/300x300?text=Product+2',
                    price: {
                        raw: '$49.99',
                        value: 49.99
                    },
                    rating: 4.3,
                    reviews_count: 856
                },
                {
                    position: 3,
                    title: `Professional ${query} Set`,
                    link: 'https://amazon.com/product3',
                    image: 'https://via.placeholder.com/300x300?text=Product+3',
                    price: {
                        raw: '$89.99',
                        value: 89.99
                    },
                    rating: 4.7,
                    reviews_count: 2341
                },
                {
                    position: 4,
                    title: `${query} Starter Kit`,
                    link: 'https://amazon.com/product4',
                    image: 'https://via.placeholder.com/300x300?text=Product+4',
                    price: {
                        raw: '$19.99',
                        value: 19.99
                    },
                    rating: 4.1,
                    reviews_count: 567
                },
                {
                    position: 5,
                    title: `Deluxe ${query} Collection`,
                    link: 'https://amazon.com/product5',
                    image: 'https://via.placeholder.com/300x300?text=Product+5',
                    price: {
                        raw: '$129.99',
                        value: 129.99
                    },
                    rating: 4.8,
                    reviews_count: 3456
                },
                {
                    position: 6,
                    title: `${query} Essentials`,
                    link: 'https://amazon.com/product6',
                    image: 'https://via.placeholder.com/300x300?text=Product+6',
                    price: {
                        raw: '$39.99',
                        value: 39.99
                    },
                    rating: 4.4,
                    reviews_count: 789
                }
            ]
        };
    }
    
    displayResults(data) {
        this.resultsSection.style.display = 'block';
        
        const results = data.organic_results || [];
        const totalResults = data.search_metadata?.total_results || 0;
        
        // Update results header
        this.resultsTitle.textContent = `Results for "${this.currentQuery}"`;
        this.resultsCount.textContent = `${totalResults.toLocaleString()} products found`;
        
        // Clear previous results
        this.productsGrid.innerHTML = '';
        
        if (results.length === 0) {
            this.productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: #cbd5e0; margin-bottom: 15px;"></i>
                    <p style="color: #718096; font-size: 18px;">No products found for "${this.currentQuery}"</p>
                    <p style="color: #a0aec0; font-size: 14px;">Try adjusting your search terms or filters</p>
                </div>
            `;
            this.pagination.style.display = 'none';
            return;
        }
        
        // Display products
        results.forEach(product => {
            const productCard = this.createProductCard(product);
            this.productsGrid.appendChild(productCard);
        });
        
        // Update pagination
        this.updatePagination(totalResults);
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const price = product.price?.raw || 'Price not available';
        const rating = product.rating || 0;
        const reviewsCount = product.reviews_count || 0;
        const image = product.image || 'https://via.placeholder.com/300x300?text=No+Image';
        
        card.innerHTML = `
            <img src="${image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <h4 class="product-title">${this.truncateText(product.title, 60)}</h4>
            <div class="product-price">${price}</div>
            ${rating > 0 ? `
                <div class="product-rating">
                    <div class="stars">${this.generateStars(rating)}</div>
                    <span class="rating-text">${rating} (${reviewsCount.toLocaleString()})</span>
                </div>
            ` : ''}
            <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="product-link">
                View on Amazon
            </a>
        `;
        
        return card;
    }
    
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
    
    updatePagination(totalResults) {
        const resultsPerPage = 20; // Amazon typically shows 20 results per page
        const totalPages = Math.ceil(totalResults / resultsPerPage);
        
        if (totalPages <= 1) {
            this.pagination.style.display = 'none';
            return;
        }
        
        this.pagination.style.display = 'flex';
        
        // Update pagination buttons
        this.prevBtn.disabled = this.currentPage <= 1;
        this.nextBtn.disabled = this.currentPage >= totalPages;
        
        // Update pagination info
        this.paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }
    
    showLoading() {
        this.isLoading = true;
        this.loading.style.display = 'block';
        this.productsGrid.style.display = 'none';
        this.pagination.style.display = 'none';
        this.searchBtn.disabled = true;
        this.searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    }
    
    hideLoading() {
        this.isLoading = false;
        this.loading.style.display = 'none';
        this.productsGrid.style.display = 'grid';
        this.searchBtn.disabled = false;
        this.searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
    }
    
    showError(message) {
        this.errorMessage.style.display = 'block';
        this.errorMessage.querySelector('p').textContent = message;
        this.productsGrid.style.display = 'none';
        this.pagination.style.display = 'none';
    }
    
    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const amazonSearch = new AmazonSearch();
    
    // Show API key setup message
    if (amazonSearch.apiKey === 'YOUR_SERPAPI_KEY_HERE') {
        console.log(`
        🔑 SerpAPI Setup Required:
        
        1. Sign up at https://serpapi.com/
        2. Get your free API key
        3. Replace 'YOUR_SERPAPI_KEY_HERE' in js/amazon-search.js
        
        Demo mode is currently active with mock data.
        `);
    }
});

// Utility functions for additional features
const utils = {
    // Format price for display
    formatPrice(price) {
        if (typeof price === 'number') {
            return `$${price.toFixed(2)}`;
        }
        return price || 'Price not available';
    },
    
    // Debounce function for search input
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if image URL is valid
    isValidImageUrl(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AmazonSearch, utils };
}
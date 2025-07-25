# Amazon Search API with SerpAPI

A beautiful, responsive web application for searching Amazon products using the SerpAPI service. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Search** - Search Amazon products with live results
- **Advanced Filtering** - Filter by category and sort by various criteria
- **Pagination** - Navigate through multiple pages of results
- **Product Cards** - Beautiful product cards with images, prices, ratings, and reviews
- **Loading States** - Smooth loading animations and user feedback
- **Error Handling** - Graceful error handling with user-friendly messages
- **Mock Data Mode** - Demo functionality without API key for testing

## 🚀 Getting Started

### Prerequisites

1. A web browser (Chrome, Firefox, Safari, Edge)
2. SerpAPI account (optional for demo mode)

### Setup Instructions

1. **Clone or Download** the project files
2. **Get SerpAPI Key** (Optional - works with mock data without key):
   - Sign up at [SerpAPI](https://serpapi.com/)
   - Get your free API key (100 free searches/month)
3. **Configure API Key**:
   - Open `js/amazon-search.js`
   - Replace `'YOUR_SERPAPI_KEY_HERE'` with your actual API key
4. **Open the Application**:
   - Open `amazon-search.html` in your web browser
   - Or serve it using a local web server

### Using a Local Server (Recommended)

For better performance and to avoid CORS issues, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with live-server)
npx live-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000/amazon-search.html` in your browser.

## 🎯 Usage

1. **Search Products**: Enter a product name in the search box and click "Search"
2. **Filter Results**: Use the category dropdown to filter by product type
3. **Sort Results**: Choose from different sorting options (price, reviews, etc.)
4. **Navigate Pages**: Use pagination controls to browse through results
5. **View Products**: Click "View on Amazon" to see the product on Amazon

## 📁 File Structure

```
project/
├── amazon-search.html      # Main HTML file
├── css/
│   └── amazon-search.css   # Responsive CSS styles
├── js/
│   └── amazon-search.js    # JavaScript functionality
├── index.html              # Your existing homepage
├── cart.html               # Your existing cart page
├── login.html              # Your existing login page
└── README.md               # This file
```

## 🎨 Features Details

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Search Functionality
- Real-time Amazon product search
- Category-based filtering
- Multiple sorting options
- Pagination support

### User Interface
- Modern glassmorphism design
- Smooth animations and transitions
- Loading states and feedback
- Error handling with helpful messages

### Technical Features
- Vanilla JavaScript (no frameworks)
- Async/await for API calls
- Class-based architecture
- Utility functions for common tasks

## ⚙️ Configuration Options

### API Configuration
```javascript
// In js/amazon-search.js
this.apiKey = 'your-serpapi-key-here';
this.baseUrl = 'https://serpapi.com/search.json';
```

### Search Parameters
- **Categories**: Electronics, Clothing, Books, Home & Kitchen, Sports, Toys
- **Sorting**: Relevance, Price (Low to High), Price (High to Low), Customer Reviews, Newest

### Pagination
- Results per page: 20 (Amazon default)
- Navigation: Previous/Next buttons
- Page information display

## 🔧 Customization

### Styling
Edit `css/amazon-search.css` to customize:
- Colors and gradients
- Font sizes and families
- Layout and spacing
- Animations and effects

### Functionality
Edit `js/amazon-search.js` to customize:
- API parameters
- Search behavior
- UI interactions
- Data processing

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔒 Security Notes

- API key is visible in client-side code (consider using a backend proxy for production)
- All external links open in new tabs with security attributes
- Input validation and sanitization included

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**:
   - Ensure your SerpAPI key is correctly set
   - Check if you have remaining API credits
   - Verify the API key is active

2. **CORS Issues**:
   - Use a local server instead of opening HTML files directly
   - SerpAPI supports CORS, but some browsers may block requests

3. **No Results**:
   - Try different search terms
   - Check internet connection
   - Verify API key and credits

4. **Mobile Issues**:
   - Ensure viewport meta tag is present
   - Test on actual devices, not just browser dev tools

## 📊 Performance Tips

- Images are lazy-loaded with fallback placeholders
- Debounced search inputs prevent excessive API calls
- Efficient DOM manipulation and event handling
- Optimized CSS for smooth animations

## 🔮 Future Enhancements

- Price tracking and alerts
- Product comparison features
- Wishlist functionality
- Advanced search filters
- Product review analysis
- Shopping cart integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or issues, please open an issue in the project repository.

---

**Happy Shopping! 🛒**
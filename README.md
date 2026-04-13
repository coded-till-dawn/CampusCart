# CampusCart - Student Marketplace Web Application

A full-stack peer-to-peer marketplace platform designed for students to buy, sell, and exchange used items within their campus community.

## Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)

## Features

### Marketplace Functionality
- Browse and search for used items across multiple categories
- Advanced filtering by category, price, and date
- Real-time product search with debouncing
- Responsive product grid layout

### Product Management
- Add new products with title, price, category, description, and image
- View detailed product information
- Edit and delete listings
- Manage multiple product listings
- Product categorization (Books, Electronics, Furniture, Clothing, Sports)

### Wishlist System
- Save products to personal wishlist
- View and manage wishlist items
- Remove items from wishlist
- Persistent wishlist storage

### Communication
- Direct messaging system between buyers and sellers
- Seller contact information display
- Message history persistence
- Conversation thread management

### User Experience
- Mobile-responsive design (works on all devices)
- Image fallback system for broken URLs
- Toast notifications for user feedback
- Smooth animations and transitions
- Professional color scheme and typography

## Project Overview

### Problem Statement
Students lack a centralized platform to buy and sell used items within their campus community. CampusCart solves this by providing a unified marketplace for peer-to-peer transactions.

### Objectives
- Create a centralized online marketplace for student transactions
- Enable simplified buying and selling of used college essentials
- Provide advanced search and filtering capabilities
- Facilitate direct communication between buyers and sellers
- Implement a wishlist system for interested buyers

## Technology Stack

### Frontend
- HTML5 - Semantic markup structure
- CSS3 - Responsive design with media queries
- JavaScript (ES6) - Client-side logic and interactivity
- Font Awesome - Icon library
- Google Fonts - Typography

### Backend
- Node.js - JavaScript runtime environment
- Express.js - Web application framework
- Mongoose - MongoDB object data modeling

### Database
- MongoDB Atlas - Cloud-hosted NoSQL database
- SSL/TLS encryption for secure connections
- Connection pooling and optimization

### Development Tools
- npm - Package manager
- Git - Version control
- VS Code - Code editor
- Nodemon - Development auto-reload

## Project Structure

```
CampusCart/
|
├── backend/
|   ├── config/
|   |   └── db.js                 # MongoDB connection configuration
|   ├── models/
|   |   ├── Item.js               # Product schema
|   |   ├── Wishlist.js           # Wishlist schema
|   |   └── Message.js            # Message schema
|   ├── controllers/
|   |   ├── itemController.js     # Product operations
|   |   ├── wishlistController.js # Wishlist operations
|   |   └── messageController.js  # Message operations
|   ├── routes/
|   |   ├── items.js              # Product endpoints
|   |   ├── wishlist.js           # Wishlist endpoints
|   |   └── messages.js           # Message endpoints
|   ├── loadSampleData.js         # Sample data initialization
|   ├── server.js                 # Express server setup
|   ├── package.json              # Dependencies
|   └── .env                      # Environment variables
|
├── frontend/
|   ├── index.html                # Homepage
|   ├── add-product.html          # Add product page
|   ├── product-details.html      # Product details page
|   ├── my-listings.html          # My listings page
|   ├── wishlist.html             # Wishlist page
|   ├── css/
|   |   └── style.css             # Global styles (1200+ lines)
|   └── js/
|       ├── app.js                # Main application logic
|       ├── api.js                # API communication layer
|       └── utils.js              # Utility functions
|
└── Documentation files
    ├── README.md                 # This file
    └── PROJECT_DOCUMENTATION.txt # Detailed documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python (v3.6+ for serving frontend)
- Git
- MongoDB Atlas account (free tier available)

### Step 1: Clone Repository

```bash
git clone https://github.com/coded-till-dawn/CampusCart.git
cd CampusCart
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

### Step 3: Frontend (No Installation Required)
The frontend is a static HTML/CSS/JavaScript application. No npm installation needed.

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campuscart
PORT=5000
NODE_ENV=development
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### MongoDB Atlas Setup

1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add a database user with read/write permissions
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Copy the connection string and add to .env

## Running the Application

### Start Backend Server

```bash
cd backend
npm run seed    # Load sample data (first time only)
npm start       # Start Express server on port 5000
```

The backend server will start at http://localhost:5000

### Start Frontend Server

Open a new terminal in the frontend directory:

```bash
cd frontend
python -m http.server 8000    # Python 3
# or
python -m SimpleHTTPServer 8000  # Python 2
```

The frontend will be available at http://localhost:8000

### Access the Application

Open your browser and navigate to: http://localhost:8000

## API Endpoints

### Items (Products)

- GET /api/items - Get all products
- GET /api/items/:id - Get product by ID
- POST /api/items - Create new product
- PUT /api/items/:id - Update product
- DELETE /api/items/:id - Delete product
- GET /api/items/category/:category - Get products by category
- GET /api/items/search/:query - Search products

### Wishlist

- GET /api/wishlist - Get user's wishlist
- POST /api/wishlist - Add item to wishlist
- DELETE /api/wishlist/:id - Remove item from wishlist
- GET /api/wishlist/check/:itemId - Check if item is wishlisted

### Messages

- GET /api/messages/item/:itemId - Get messages for a product
- POST /api/messages - Send message
- GET /api/messages/:id - Get specific message

## Database Schema

### Items Collection
```javascript
{
  _id: ObjectId,
  title: String,
  price: Number,
  category: String,
  description: String,
  image: String (URL),
  sellerName: String,
  contact: String,
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlists Collection
```javascript
{
  _id: ObjectId,
  itemId: ObjectId (reference to Items),
  addedAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  itemId: ObjectId (reference to Items),
  senderName: String,
  senderContact: String,
  message: String,
  createdAt: Date
}
```

## Development

### Running with Auto-Reload

For development with automatic restart on file changes:

```bash
cd backend
npm install -g nodemon  # Install globally (once)
npm run dev            # Uses nodemon from package.json scripts
```

### Code Structure

- **MVC Architecture**: Models, Controllers, Routes separation
- **RESTful API Design**: Standard HTTP methods for resource operations
- **Modular Components**: Reusable frontend components
- **Error Handling**: Comprehensive error messages and logging
- **Validation**: Input validation on both client and server

### Best Practices

- Use descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await for asynchronous operations
- Validate user input before processing
- Handle errors gracefully

## Deployment

### Backend Deployment (Heroku)

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create Heroku app: `heroku create app-name`
4. Add MongoDB URI to Heroku config: `heroku config:set MONGODB_URI=your_uri`
5. Deploy: `git push heroku main`

### Frontend Deployment (GitHub Pages / Netlify / Vercel)

1. Build the frontend (already static files)
2. Upload to GitHub Pages or selected hosting service
3. Update API endpoints to production backend URL

## Performance Optimization

- Image fallback system prevents broken image icons
- Database query optimization with proper indexing
- Client-side caching of product data
- Responsive images adapted to device size
- Minified CSS and JavaScript in production
- Connection pooling for database efficiency

## Security Measures

- HTTPS/SSL encryption for MongoDB connections
- Environment variables for sensitive credentials
- Input validation and sanitization
- CORS configuration for API security
- Protection against common web vulnerabilities

## Testing

### Manual Testing Checklist

- Browse and search for products
- Add new product listing
- Edit and delete products
- Add products to wishlist
- Filter by category and price
- Send messages to sellers
- View product details
- Test responsive design on mobile
- Verify image loading

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Sample Data

The application includes 12 pre-loaded sample products across categories:

- 3 Books (Computer Science, Physics, Calculus)
- 3 Electronics (Mouse, Keyboard, Monitor, Speaker)
- 2 Furniture (Desk, Chair)
- 1 Clothing (Winter Jacket)
- 2 Sports (Badminton Racket, Running Shoes)

Load sample data with: `npm run seed` in backend directory

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in .env file
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0)
- Ensure internet connection is stable
- Verify MongoDB credentials are correct

### Port Already in Use
- Backend: `netstat -ano | findstr :5000` (Windows) to find process
- Frontend: Use different port with `python -m http.server 8001`

### Image Loading Issues
- Check image URL is publicly accessible
- Verify CORS headers are proper
- Use image fallback system for broken URLs

### API Errors
- Check backend server is running
- Verify API endpoints documentation
- Check browser console for detailed error messages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- User authentication and profiles
- Payment gateway integration (Stripe, PayPal)
- Rating and review system
- Email notifications
- Advanced analytics dashboard
- Mobile app (React Native)
- Real-time notifications (WebSocket)
- Video product demonstrations
- Product condition ratings
- Transaction history

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue in GitHub repository
- Check existing documentation
- Review sample data and test cases

## Acknowledgments

- MongoDB Atlas for cloud database hosting
- Express.js community for framework
- Font Awesome for icon library
- All contributors and testers

## Version History

- v1.0.0 (April 2026) - Initial release
  - Full marketplace functionality
  - Product management system
  - Wishlist feature
  - Messaging system
  - Responsive design

---

Last Updated: April 14, 2026
Application Status: Production Ready
Maintained By: CampusCart Development Team

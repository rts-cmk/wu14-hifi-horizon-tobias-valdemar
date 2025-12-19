# Hi-Fi E-Commerce Project

## Overview

An e-commerce website for audio/electronics products, built with React and a custom API backend. Inspired by Hi-Fi Klubben, the site features a complete shopping experience with product browsing, cart management, and user authentication.

## Tech Stack

- **Frontend**: React 19, React Router v7, Vite
- **State Management**: Zustand (user auth & cart)
- **Styling**: SCSS/Sass
- **API**: JSON Server hosted on Render
- **Email**: Vercel Serverless Functions + Resend
- **UI Libraries**:
  - React Icons
  - Swiper (product carousel)
  - React Range (price filters)
  - DOMPurify (HTML sanitization)
  - React Router Hash Link (smooth scrolling)

## Features

- Product catalog organized by categories (amplifiers, speakers, headphones, etc.)
- Product detail pages with image galleries and specifications
- Color variant selection with stock tracking
- Price range filtering
- User authentication
- Shopping cart with add/remove functionality
- Discount pricing display
- Contact form with email integration
- Smooth scrolling navigation
- Responsive design

## Data Structure

The API serves a categories array, where each category contains multiple products:

```json
{
  "id": 1,
  "name": "amplifiers",
  "products": [
    {
      "id": 1,
      "name": "Creek Audio A50i Integrated Amplifier",
      "price": 899.99,
      "discount_price": 799.99,
      "image": "creek_a50I.jpg",
      "brand": "Creek",
      "description": "...",
      "variants": [
        {
          "color": "Silver",
          "hex": "#b8b8b8",
          "stock": 0,
          "image": "creek_a50I.jpg"
        }
      ],
      "additional_info": {
        "manufacturer": "Creek Audio",
        "warranty": "2 years",
        "delivery_time": "3-5 business days",
        ...
      },
      "specifications": {
        "power_output": "50W per channel",
        "frequency_response": "20Hz - 20kHz",
        ...
      },
      "images": ["creek_a50I.jpg", ...]
    }
  ]
}
```

**Key features:**

- Products support color variants with stock tracking
- Discount pricing for sales
- Detailed specifications for technical products
- Multiple product images for gallery view
- Additional info for delivery and warranty details

## Project Structure

```
├── api/                   # API configuration
├── design/                # Design files and assets
├── public/                # Static assets
├── src/
│   ├── Components/        # Reusable UI components
│   ├── Pages/             # Main page components
│   ├── Styles/            # Global SCSS/Sass styles
│   ├── Fonts/             # Custom fonts (Museo Sans)
│   ├── config/            # Configuration files
│   ├── loaders/           # React Router loaders
│   ├── stores/            # Zustand stores (auth, cart)
│   ├── App.jsx            # Main app component with router
│   └── main.jsx           # Application entry point
├── .gitignore
├── package.json
└── README.md
```

## Key Implementation Details

### Data Loading

- **React Router Loaders**: Fetch category and product data before rendering pages
- Images and JSON data served from Render API endpoint
- Loaders ensure data is available before component mounts

### State Management

- **Zustand Auth Store**: Manages user login state and authentication
- **Zustand Cart Store**: Handles add/remove items, quantity updates, and cart total calculations

### Contact Form

- Form submission handled via Vercel Serverless Function
- Emails sent using Resend API
- Server-side validation and error handling
- DOMPurify used for sanitizing form inputs

### Product Features

- **Swiper Carousels**: Product image galleries
- **React Range**: Price filter sliders for product filtering
- **Color Variants**: Users can select different color variants with stock tracking
- **Hash Link Navigation**: Smooth scrolling to sections using react-router-hash-link

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoint

The API is hosted on Render and serves:

- `/categories` - All product categories with nested products
- Product images stored and served from Render

## Environment Variables

```
VITE_API_URL=https://hi-fi-db.onrender.com/categories
```

---

**Developed by Tobias and Valdemar - 2025**

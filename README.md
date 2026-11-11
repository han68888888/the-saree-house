# The Saree House — E-commerce Template

A production-ready, mobile-first e-commerce template for Indian saree resellers. Features a responsive design, shopping cart, wishlist, and WhatsApp integration — perfect for resellers to customize and launch their own saree store.

## Features

- **Hero Carousel**: 5 rotating promotional banners with offers
- **Product Catalog**: 45+ handpicked sarees across multiple collections
- **Shopping Cart**: Add/remove items, localStorage persistence, tier-based discounts
- **Wishlist**: Save favorite sarees for later
- **Mobile-First Design**: Fully responsive from 375px to 1280px+ viewports
- **WhatsApp Integration**: Direct checkout via WhatsApp
- **Occasion-Based Shopping**: 11 illustrated collection cards (Wedding, Haldi, Mehendi, etc.)
- **Customer Testimonials**: Photo gallery of real customer reviews
- **Trust Badges**: Authenticity, fast shipping, easy returns
- **Instagram Community**: Links to social channels

## Quick Start

1. **No build process required** — just open `index.html` in a browser
2. All product data lives in `js/data.js` — no database needed
3. Customize colors, brand name, and products by editing `data.js`
4. All styling uses CSS tokens for easy re-theming

## Re-skinning for Your Store

This template is designed to be re-skinnable. To launch your own saree store:

### 1. Update Brand Info
Edit `js/data.js`, find the `brand` object:
```javascript
brand: {
  name: "Your Saree Store Name",
  tagline: "Your tagline here",
  whatsappNumber: "YOUR_WHATSAPP_NUMBER",
  instagram: "@your_instagram_handle",
  city: "Your City"
}
```

### 2. Customize Colors
Edit `css/style.css`, update the CSS variables at the top:
```css
--kumkum: #YOUR_ACCENT_COLOR;
--zari: #YOUR_GOLD_COLOR;
--ivory: #YOUR_BACKGROUND_COLOR;
```

### 3. Add Your Products
In `js/data.js`, update the `products` array with your sarees:
- Update product names, prices, fabrics, occasions
- Replace image IDs with your own (from Pexels or your server)
- Update product collections

### 4. Replace Images
- Update hero banners in `assets/hero/`
- Update occasion illustrations in `assets/occasions/`
- Update collection preview images in `assets/`

### 5. Adjust Shipping & Pricing
In `data.js`, configure:
- `freeShippingOver` — minimum order for free shipping
- `saveTiers` — bulk discount thresholds
- `fabricOffers` — special fabric promotions

## File Structure

```
The Saree House/
├── index.html                 # Homepage
├── product.html               # Individual product page
├── shop.html                  # Shop/catalog with filters
├── css/
│   └── style.css              # All styles (1800+ lines, CSS tokens)
├── js/
│   ├── data.js                # 🔑 MAIN: All products, data, branding
│   ├── app.js                 # Core cart, wishlist, UI logic
│   ├── home.js                # Homepage rendering
│   ├── shop.js                # Shop page filtering
│   └── product.js             # Product page logic
└── assets/
    ├── brand/                 # Logo mark, favicon
    ├── hero/                  # Hero carousel images (5)
    ├── occasions/             # Occasion illustrations (11)
    └── [product images]       # Product photos
```

## Technologies

- **Frontend**: Vanilla HTML, CSS, JavaScript (no build tools, no dependencies)
- **Styling**: CSS custom properties (variables) for easy re-theming
- **Data**: Single `window.SAREE_HOUSE` object with all products, collections, occasions
- **Storage**: localStorage for cart and wishlist persistence
- **Images**: Pexels API (free stock) + custom uploads supported
- **Performance**: IntersectionObserver for lazy loading, optimized images

## Customization Guide

### Change Logo
Replace `assets/brand/mark.svg` and update favicon reference in HTML

### Add New Occasion
1. Add entry to `occasions` array in `data.js`
2. Add illustration to `assets/occasions/`
3. Update `art` property with path to image

### Adjust Discounts
Edit `saveTiers` in `data.js` to change bulk discount tiers

### Add Payment Methods
Update WhatsApp message in `waLink()` function (js/app.js) or add Razorpay integration

### Change Layout
Edit grid columns, spacing, and fonts in `css/style.css` using CSS variables

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight: ~50KB HTML/CSS/JS (uncompressed)
- Fast load: Images are lazy-loaded via IntersectionObserver
- No external dependencies: Everything is vanilla JavaScript
- Mobile optimized: Mobile-first responsive design

## License

Free to use and customize. Designed for resellers.

## Credits

- Product images from Pexels (free stock photography)
- Inspiration from Vastranand and Koskii e-commerce designs
- Built with vanilla HTML, CSS, JavaScript

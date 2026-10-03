/* ============================================
   ELEGANCE DRESS STORE — SCRIPT.JS
   Complete e-commerce logic:
   - Product catalog & rendering
   - Search & filter
   - Cart system (add/remove/qty)
   - Checkout flow (3 steps)
   - Order confirmation & REAL email via EmailJS & Flask
   - Toast notifications
   - Scroll effects
   ============================================ */

/* ==================== EMAILJS CONFIGURATION ====================
 * Allows sending order emails directly from the browser ANYWHERE
 * (GitHub Pages, Netlify, Vercel, static host, or file://) with 0 backend servers!
 * Get your free credentials at https://www.emailjs.com
 */
const EMAILJS_CONFIG = {
  // Service ID from EmailJS Dashboard -> Email Services
  SERVICE_ID: 'service_april86',
  // Template ID from EmailJS Dashboard -> Email Templates
  TEMPLATE_ID: 'template_april86',
  // Public Key from EmailJS Dashboard -> Account -> General -> Public Key
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
  // Order notification recipient email
  RECEIVER_EMAIL: 'priya4029657@gmail.com',
  STORE_NAME: 'april-86 Dress Store',
  STORE_PHONE: '7708520530'
};

// Initialize EmailJS when the script loads
if (typeof emailjs !== 'undefined') {
  try {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    }
  } catch (e) {
    console.warn('EmailJS init warning:', e);
  }
}

/* Flask backend URL — fallback for local development */
const API_BASE = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : '';

'use strict';

/* ==================== PRODUCTS DATA ==================== */
const PRODUCTS = [
  {
    id: 1,
    name: "Blossom Floral Maxi Dress",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    image: "images/dress_1.png",
    rating: 4.8,
    reviewCount: 342,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "casual",
    description: "A breathtaking floral maxi dress perfect for summer outings."
  },
  {
    id: 2,
    name: "Velvet Rouge Evening Gown",
    price: 3499,
    originalPrice: 5499,
    discount: 36,
    image: "images/dress_2.png",
    rating: 4.9,
    reviewCount: 218,
    sizes: ["L", "XL"],
    badge: "hot",
    category: "evening",
    description: "Luxurious red velvet evening gown for the most glamorous occasions."
  },
  {
    id: 3,
    name: "Azure Midi A-Line Dress",
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    image: "images/dress_3.png",
    rating: 4.7,
    reviewCount: 189,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "party",
    description: "Chic royal blue midi dress that transitions from day to night."
  },
  {
    id: 4,
    name: "Midnight Lace Cocktail Dress",
    price: 2750,
    originalPrice: 3999,
    discount: 31,
    image: "images/dress_4.png",
    rating: 4.6,
    reviewCount: 156,
    sizes: ["L", "XL", "XXL"],
    badge: null,
    category: "party",
    description: "Sleek black lace cocktail dress that oozes modern elegance."
  },
  {
    id: 5,
    name: "Sunshine Wrap Sundress",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    image: "images/dress_5.png",
    rating: 4.5,
    reviewCount: 273,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "summer",
    description: "Vibrant yellow wrap dress for a bright, carefree summer look."
  },
  {
    id: 6,
    name: "Emerald Drape Wrap Dress",
    price: 2350,
    originalPrice: 3499,
    discount: 33,
    image: "images/dress_6.png",
    rating: 4.8,
    reviewCount: 201,
    sizes: ["L", "XL"],
    badge: "new",
    category: "casual",
    description: "Deep emerald wrap dress with elegant draping for a sophisticated look."
  },
  {
    id: 7,
    name: "Rose Blush Bodycon Dress",
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    image: "images/dress_7.png",
    rating: 4.7,
    reviewCount: 312,
    sizes: ["L", "XL", "XXL"],
    badge: "hot",
    category: "party",
    description: "Glamorous rose pink bodycon dress that flatters every curve."
  },
  {
    id: 8,
    name: "Ivory Lace Bridal Maxi",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    image: "images/dress_8.png",
    rating: 5.0,
    reviewCount: 97,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "bridal",
    description: "Breathtaking white lace maxi dress for your most special day."
  },
  {
    id: 9,
    name: "Urban White Graphic Tee",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    image: "images/tshirt_1.png",
    rating: 4.6,
    reviewCount: 185,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "tshirt",
    description: "Clean white graphic tee with a modern print — perfect for everyday casual wear."
  },
  {
    id: 10,
    name: "Noir Oversized Tee",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    image: "images/tshirt_2.png",
    rating: 4.8,
    reviewCount: 231,
    sizes: ["L", "XL", "XXL"],
    badge: "hot",
    category: "tshirt",
    description: "Chic black oversized t-shirt — effortlessly stylish for any relaxed occasion."
  },
  {
    id: 11,
    name: "Blush Pink Crop Tee",
    price: 699,
    originalPrice: 1099,
    discount: 36,
    image: "images/tshirt_3.png",
    rating: 4.7,
    reviewCount: 142,
    sizes: ["L", "XL"],
    badge: "new",
    category: "tshirt",
    description: "Trendy pastel pink crop t-shirt — cute, comfortable and Instagram-ready."
  },
  {
    id: 12,
    name: "Classic Navy Stripe Tee",
    price: 749,
    originalPrice: 1199,
    discount: 38,
    image: "images/tshirt_4.png",
    rating: 4.5,
    reviewCount: 98,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "tshirt",
    description: "Timeless navy striped t-shirt — a wardrobe essential for a polished casual look."
  },
  {
    id: 13,
    name: "Kanchipuram Pure Silk Bridal Saree",
    price: 6499,
    originalPrice: 9999,
    discount: 35,
    image: "images/saree_1.png",
    rating: 4.9,
    reviewCount: 428,
    sizes: ["Free Size"],
    badge: "hot",
    category: "saree",
    description: "Authentic Tamil Nadu Kanchipuram pure silk saree in royal crimson with heavy gold zari temple borders & rich pallu."
  },
  {
    id: 14,
    name: "Madurai Sungudi Peacock Blue Saree",
    price: 2499,
    originalPrice: 3899,
    discount: 36,
    image: "images/saree_2.png",
    rating: 4.8,
    reviewCount: 315,
    sizes: ["Free Size"],
    badge: "new",
    category: "saree",
    description: "Traditional Madurai Sungudi cotton saree featuring classic circular bandhani dot motifs and golden zari border."
  },
  {
    id: 15,
    name: "Chettinad Heritage Cotton Saree",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: "images/saree_3.png",
    rating: 4.7,
    reviewCount: 260,
    sizes: ["Free Size"],
    badge: "sale",
    category: "saree",
    description: "Classic Chettinad Kandangi handloom saree with bottle green and ruby red checks and heritage temple border."
  },
  {
    id: 16,
    name: "Golden Temple Kanchi Pattu Saree",
    price: 7999,
    originalPrice: 12499,
    discount: 36,
    image: "images/saree_4.png",
    rating: 5.0,
    reviewCount: 184,
    sizes: ["Free Size"],
    badge: "hot",
    category: "saree",
    description: "Royal Tamil Nadu festival & wedding silk saree in mustard gold and rani pink with shimmering zari floral pallu."
  },
  {
    id: 17,
    name: "Apex Pro Luxury Smartwatch",
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    image: "images/watch.png",
    rating: 4.9,
    reviewCount: 512,
    sizes: ["Standard", "Metallic Silver", "Midnight Black"],
    badge: "hot",
    category: "electronics",
    description: "Premium AMOLED fitness smartwatch with Bluetooth HD calling, stainless steel dial, heart rate and sleep tracking."
  },
  {
    id: 18,
    name: "Aura Wireless Noise Cancelling Headphones",
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    image: "images/headphones.png",
    rating: 4.8,
    reviewCount: 380,
    sizes: ["Standard", "Matte Black", "Rose Gold"],
    badge: "new",
    category: "electronics",
    description: "Studio-grade high-fidelity wireless audio with active noise cancellation, deep bass, and 40-hour battery life."
  },
  {
    id: 19,
    name: "Nova Ultra 5G Smartphone",
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    image: "images/phone.png",
    rating: 4.9,
    reviewCount: 620,
    sizes: ["128GB", "256GB"],
    badge: "hot",
    category: "electronics",
    description: "Next-gen flagship 5G smartphone with 108MP AI camera, 120Hz OLED display, and 67W turbo fast charging."
  },
  {
    id: 20,
    name: "Lumina Slim 15 Ultrabook Laptop",
    price: 48999,
    originalPrice: 65999,
    discount: 26,
    image: "images/laptop.png",
    rating: 4.9,
    reviewCount: 295,
    sizes: ["16GB / 512GB SSD", "16GB / 1TB SSD"],
    badge: "new",
    category: "electronics",
    description: "Ultra-thin lightweight aluminum laptop with Intel Core i7, backlit keyboard, and vibrant 2.8K borderless display."
  },
  {
    id: 21,
    name: "VisionPad 11-inch Pro Tablet",
    price: 18499,
    originalPrice: 24999,
    discount: 26,
    image: "images/tablet.png",
    rating: 4.7,
    reviewCount: 184,
    sizes: ["64GB", "128GB"],
    badge: "new",
    category: "electronics",
    description: "Crystal-clear 11-inch touchscreen tablet with active stylus support, quad stereo speakers, and all-day battery life."
  },
  {
    id: 22,
    name: "ProLens 4K Digital Cinema Camera",
    price: 38999,
    originalPrice: 52999,
    discount: 26,
    image: "images/camera.png",
    rating: 5.0,
    reviewCount: 142,
    sizes: ["Body Only", "Kit with 18-55mm Lens"],
    badge: "hot",
    category: "electronics",
    description: "Professional 4K mirrorless digital camera with interchangeable lens mount, optical stabilization, and ultra-fast autofocus."
    },
  /* ==================== FOOTWEAR (5 ITEMS) ==================== */
  {
    id: 23,
    name: "Royal Golden Zari Bridal Stilettos",
    price: 3299,
    originalPrice: 5499,
    discount: 40,
    image: "images/footwear_1.jpg",
    rating: 4.9,
    reviewCount: 214,
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8"],
    badge: "hot",
    category: "footwear",
    description: "Exquisite golden embroidered pointed-toe bridal heels crafted for royal weddings, sangeet, and festive celebrations."
  },
  {
    id: 24,
    name: "Rose Gold Crystal Strappy Block Heels",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    image: "images/footwear_2.jpg",
    rating: 4.8,
    reviewCount: 168,
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8"],
    badge: "new",
    category: "footwear",
    description: "Glamorous rose gold strappy sandals with shimmering crystal embellishments and comfortable sturdy block heels."
  },
  {
    id: 25,
    name: "Velvet Sapphire Blue Stiletto Pumps",
    price: 2899,
    originalPrice: 4599,
    discount: 37,
    image: "images/footwear_3.jpg",
    rating: 4.8,
    reviewCount: 142,
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8"],
    badge: "sale",
    category: "footwear",
    description: "Statement royal sapphire blue pumps featuring a sleek pointed toe, cushioned footbed, and luxury suede velvet finish."
  },
  {
    id: 26,
    name: "Pastel Chic Chunky Fashion Sneakers",
    price: 1999,
    originalPrice: 3299,
    discount: 39,
    image: "images/footwear_4.jpg",
    rating: 4.9,
    reviewCount: 310,
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8"],
    badge: "new",
    category: "footwear",
    description: "Ultra-lightweight aesthetic casual sneakers with ergonomic cushioned arch support, breathable upper, and pastel hues."
  },
  {
    id: 27,
    name: "Artisan Handcrafted Chelsea Leather Boots",
    price: 3799,
    originalPrice: 5999,
    discount: 37,
    image: "images/footwear_5.jpg",
    rating: 4.9,
    reviewCount: 185,
    sizes: ["UK 6", "UK 7", "UK 8"],
    badge: "hot",
    category: "footwear",
    description: "Premium handcrafted leather ankle boots with flexible elastic gussets, pull tabs, and durable all-weather soles."
  },

  /* ==================== ORNAMENTS & JEWELLERY (5 ITEMS) ==================== */
  {
    id: 28,
    name: "Victorian Pearl & Gold Medallion Choker",
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    image: "images/ornament_1.jpg",
    rating: 5.0,
    reviewCount: 275,
    sizes: ["Free Size"],
    badge: "hot",
    category: "ornaments",
    description: "Majestic multistrand pearl choker featuring handcrafted gold filigree medallion and dangling emerald bead drops."
  },
  {
    id: 29,
    name: "Sparkling Diamond Emerald Chandelier Earrings",
    price: 2199,
    originalPrice: 3699,
    discount: 41,
    image: "images/ornament_2.jpg",
    rating: 4.8,
    reviewCount: 198,
    sizes: ["Free Size"],
    badge: "new",
    category: "ornaments",
    description: "Exquisite statement drop earrings studded with brilliant zirconia crystals and luminous emerald-cut stones."
  },
  {
    id: 30,
    name: "Traditional 22K Gold Plated Temple Bangles Pair",
    price: 2899,
    originalPrice: 4799,
    discount: 40,
    image: "images/ornament_3.jpg",
    rating: 4.9,
    reviewCount: 320,
    sizes: ["2.4", "2.6", "2.8", "Free Size"],
    badge: "sale",
    category: "ornaments",
    description: "Handcrafted antique gold finish kada bangles with intricate heritage floral carvings and secure screw clasp."
  },
  {
    id: 31,
    name: "Eternity Solitaire Diamond Cocktail Ring",
    price: 1699,
    originalPrice: 2999,
    discount: 43,
    image: "images/ornament_4.jpg",
    rating: 4.7,
    reviewCount: 164,
    sizes: ["Adjustable", "Free Size"],
    badge: "new",
    category: "ornaments",
    description: "Stunning cushion-cut solitaire centerpiece surrounded by micro-pavé crystals in an adjustable rose-gold band."
  },
  {
    id: 32,
    name: "Grand Imperial Bridal Kundan Jewellery Set",
    price: 6999,
    originalPrice: 11999,
    discount: 42,
    image: "images/ornament_5.jpg",
    rating: 5.0,
    reviewCount: 412,
    sizes: ["Free Size"],
    badge: "hot",
    category: "ornaments",
    description: "Complete heirloom bridal suite including heavy Kundan choker necklace, matching chandelier jhumkas, and maang tikka."
  },

  /* ==================== EXTRA CASUAL DRESSES (5 ITEMS) ==================== */
  {
    id: 33,
    name: "Petal Symphony Floral Tiered Chiffon Dress",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: "images/casual_1.jpg",
    rating: 4.8,
    reviewCount: 228,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "casual",
    description: "Breezy tiered chiffon dress with delicate all-over botanical print and smocked sweetheart neckline."
  },
  {
    id: 34,
    name: "Boho Meadow Green Linen Wrap Dress",
    price: 1799,
    originalPrice: 2799,
    discount: 36,
    image: "images/casual_2.jpg",
    rating: 4.7,
    reviewCount: 154,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "casual",
    description: "Pure breathable linen wrap dress with flutter short sleeves, flared hemline, and an adjustable waist belt tie."
  },
  {
    id: 35,
    name: "Lumina Ivory Smocked Flounce Midi Dress",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    image: "images/casual_3.jpg",
    rating: 4.9,
    reviewCount: 195,
    sizes: ["L", "XL", "XXL"],
    badge: "hot",
    category: "casual",
    description: "Ultra-chic off-white daytime dress with elastic smocking at the waist and ruffled tier detailing."
  },
  {
    id: 36,
    name: "French Garden Vintage Buttoned Shirtdress",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    image: "images/casual_4.jpg",
    rating: 4.8,
    reviewCount: 140,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "casual",
    description: "Sophisticated collared midi dress with tortoiseshell buttons, cuffed sleeves, and matching self-fabric sash belt."
  },
  {
    id: 37,
    name: "Coastal Breeze Striped Cotton Sundress",
    price: 1649,
    originalPrice: 2599,
    discount: 37,
    image: "images/casual_5.jpg",
    rating: 4.7,
    reviewCount: 180,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "casual",
    description: "Relaxed fit pure cotton casual dress with vertical micro-stripes, square neckline, and deep functional side pockets."
  },

  /* ==================== PARTY DRESSES (5 ITEMS) ==================== */
  {
    id: 38,
    name: "Golden Hour Metallic Shimmer Cocktail Dress",
    price: 3299,
    originalPrice: 4999,
    discount: 34,
    image: "images/party_1.jpg",
    rating: 4.9,
    reviewCount: 260,
    sizes: ["L", "XL"],
    badge: "hot",
    category: "party",
    description: "Head-turning metallic shimmer dress with asymmetric cowl neckline and ruching along the hips for party glamour."
  },
  {
    id: 39,
    name: "Emerald Starlet Sequin Halter Mini Dress",
    price: 2999,
    originalPrice: 4599,
    discount: 35,
    image: "images/party_2.jpg",
    rating: 4.8,
    reviewCount: 172,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "party",
    description: "Dazzling high-neck halter dress coated in shimmering emerald sequins with dramatic open keyhole back."
  },
  {
    id: 40,
    name: "Noir Chic Illusion Bodycon Party Dress",
    price: 2799,
    originalPrice: 4299,
    discount: 35,
    image: "images/party_3.jpg",
    rating: 4.8,
    reviewCount: 205,
    sizes: ["L", "XL"],
    badge: "new",
    category: "party",
    description: "Sculpting black bodycon silhouette with illusion sheer panels, sweetheart bustline, and concealed rear zip."
  },
  {
    id: 41,
    name: "Ruby Royale Velvet Asymmetric Slit Gown",
    price: 3699,
    originalPrice: 5499,
    discount: 33,
    image: "images/party_4.jpg",
    rating: 5.0,
    reviewCount: 310,
    sizes: ["L", "XL", "XXL"],
    badge: "hot",
    category: "party",
    description: "Rich crimson velvet party dress featuring an alluring off-shoulder cut and dramatic thigh-high side slit."
  },
  {
    id: 42,
    name: "Midnight Disco Sequin Flare Party Dress",
    price: 3199,
    originalPrice: 4899,
    discount: 35,
    image: "images/party_5.jpg",
    rating: 4.7,
    reviewCount: 148,
    sizes: ["L", "XL"],
    badge: "new",
    category: "party",
    description: "Sparkling silver-black ombre sequin dress with flared skater skirt designed to catch every light on the dance floor."
  },

  /* ==================== BRIDAL DRESSES & LEHENGAS (5 ITEMS) ==================== */
  {
    id: 43,
    name: "Maharani Royal Crimson Zardozi Bridal Lehenga",
    price: 14999,
    originalPrice: 24999,
    discount: 40,
    image: "images/bridal_1.jpg",
    rating: 5.0,
    reviewCount: 480,
    sizes: ["Free Size", "L", "XL"],
    badge: "hot",
    category: "bridal",
    description: "Heirloom bridal lehenga in rich crimson red raw silk, lavishly embroidered with antique gold zardozi and pearls."
  },
  {
    id: 44,
    name: "Ethereal Ivory Chantilly Lace Wedding Gown",
    price: 12499,
    originalPrice: 19999,
    discount: 38,
    image: "images/bridal_2.jpg",
    rating: 4.9,
    reviewCount: 230,
    sizes: ["L", "XL"],
    badge: "new",
    category: "bridal",
    description: "Breathtaking floor-length bridal gown with illusion lace bodice, delicate pearl buttons, and sweeping chapel train."
  },
  {
    id: 45,
    name: "Heritage Kanchipuram Pure Pattu Bridal Saree",
    price: 11999,
    originalPrice: 18999,
    discount: 37,
    image: "images/bridal_3.jpg",
    rating: 5.0,
    reviewCount: 395,
    sizes: ["Free Size"],
    badge: "hot",
    category: "bridal",
    description: "Authentic pure silk Kanchipuram wedding saree with genuine gold zari borders and opulent peacock motifs."
  },
  {
    id: 46,
    name: "Gulabi Velvet Zari Embroidered Bridal Ensemble",
    price: 13999,
    originalPrice: 21999,
    discount: 36,
    image: "images/bridal_4.jpg",
    rating: 4.9,
    reviewCount: 182,
    sizes: ["Free Size", "L", "XL"],
    badge: "sale",
    category: "bridal",
    description: "Heavy designer bridal attire in regal ruby velvet featuring intricate marodi, sequin, and dabka needlecraft."
  },
  {
    id: 47,
    name: "Golden Radiance Organza Bridal Reception Gown",
    price: 9999,
    originalPrice: 15999,
    discount: 37,
    image: "images/bridal_5.jpg",
    rating: 4.8,
    reviewCount: 140,
    sizes: ["L", "XL"],
    badge: "new",
    category: "bridal",
    description: "Glimmering champagne gold tissue organza bridal ballgown embellished with handcrafted Swarovski crystals."
  },

  /* ==================== EVENING DRESSES (5 ITEMS) ==================== */
  {
    id: 48,
    name: "Starlight Cobalt Blue Satin Gala Gown",
    price: 4199,
    originalPrice: 6499,
    discount: 35,
    image: "images/evening_1.jpg",
    rating: 4.9,
    reviewCount: 290,
    sizes: ["L", "XL"],
    badge: "hot",
    category: "evening",
    description: "Couture sapphire blue heavy satin evening gown featuring one-shoulder draped cape and sculpted silhouette."
  },
  {
    id: 49,
    name: "Obsidian Silk Chiffon Floor-Length Evening Dress",
    price: 3899,
    originalPrice: 5999,
    discount: 35,
    image: "images/evening_2.jpg",
    rating: 4.8,
    reviewCount: 210,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "evening",
    description: "Timeless pitch-black evening gown with deep V-neckline, sheer billowing sleeves, and fluid flowing skirt."
  },
  {
    id: 50,
    name: "Burgundy Goddess Draped Haute Couture Gown",
    price: 4499,
    originalPrice: 6999,
    discount: 36,
    image: "images/evening_3.jpg",
    rating: 5.0,
    reviewCount: 340,
    sizes: ["L", "XL"],
    badge: "hot",
    category: "evening",
    description: "Sculptural wine burgundy evening creation with hand-pleated bodice, corset boning, and mermaid flare silhouette."
  },
  {
    id: 51,
    name: "Rose Gold Shimmer Cape Sleeve Evening Dress",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    image: "images/evening_4.jpg",
    rating: 4.8,
    reviewCount: 175,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "evening",
    description: "Radiant rose gold gown featuring fluid chiffon cape sleeves, shimmering metallic finish, and delicate crystal neckline."
  },
  {
    id: 52,
    name: "Midnight Velvet Sweetheart Mermaid Gown",
    price: 4299,
    originalPrice: 6599,
    discount: 35,
    image: "images/evening_5.jpg",
    rating: 4.9,
    reviewCount: 225,
    sizes: ["L", "XL"],
    badge: "new",
    category: "evening",
    description: "Plush midnight navy velvet gala dress with sweetheart neckline, corseted bodice, and dramatic flare hemline."
  },

  /* ==================== SUMMER DRESSES (5 ITEMS) ==================== */
  {
    id: 53,
    name: "Citrus Sunshine Cotton Halter Sundress",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    image: "images/summer_1.jpg",
    rating: 4.8,
    reviewCount: 240,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "summer",
    description: "Bright vibrant yellow summer sundress made with 100% organic cotton, halter neckline, and breezy A-line skirt."
  },
  {
    id: 54,
    name: "Malibu Breeze Pastel Floral Tiered Sundress",
    price: 1749,
    originalPrice: 2699,
    discount: 35,
    image: "images/summer_2.jpg",
    rating: 4.9,
    reviewCount: 310,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "summer",
    description: "Delightful pastel floral print summer dress with ruffled flutter straps, smocked elastic back, and airy cotton lining."
  },
  {
    id: 55,
    name: "Riviera Broderie Anglaise Eyelet Sun Dress",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    image: "images/summer_3.jpg",
    rating: 4.9,
    reviewCount: 285,
    sizes: ["L", "XL", "XXL"],
    badge: "hot",
    category: "summer",
    description: "Romantic white eyelet embroidered cotton sundress ideal for beach holidays, resort vacations, and garden brunches."
  },
  {
    id: 56,
    name: "Capri Sunset Coral Striped Linen Dress",
    price: 1699,
    originalPrice: 2599,
    discount: 35,
    image: "images/summer_4.jpg",
    rating: 4.7,
    reviewCount: 165,
    sizes: ["L", "XL", "XXL"],
    badge: "new",
    category: "summer",
    description: "Lightweight coral striped linen blend sundress with wooden buttons, flattering V-neck, and waist tie belt."
  },
  {
    id: 57,
    name: "Tropical Oasis Palm Print Bohemian Maxi",
    price: 1999,
    originalPrice: 3199,
    discount: 38,
    image: "images/summer_5.jpg",
    rating: 4.8,
    reviewCount: 195,
    sizes: ["L", "XL", "XXL"],
    badge: "sale",
    category: "summer",
    description: "Stunning floor-length tropical leaf print summer maxi dress with side split and adjustable cross-back straps."
  }
];

/* ==================== STATE ==================== */
let cart = JSON.parse(localStorage.getItem('elegance-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('april86-wishlist')) || [];
let selectedReceiptOrder = null;
let filteredProducts = [...PRODUCTS];
let activeSize = 'all';
let activeSort = 'default';
let searchQuery = '';

/** Helper to retrieve the current logged-in customer */
function getCurrentUser() {
  try {
    const sessionUser = sessionStorage.getItem('current_logged_in_user') || localStorage.getItem('current_logged_in_user');
    if (sessionUser) return JSON.parse(sessionUser);
  } catch (e) {
    console.warn('Error reading current user:', e);
  }
  return null;
}

/** Get all persistent store orders from localStorage */
function getAllOrders() {
  try {
    return JSON.parse(localStorage.getItem('april86-orders')) || JSON.parse(localStorage.getItem('elegance-orders')) || [];
  } catch (e) {
    return [];
  }
}

/** Get only the orders belonging to the active customer or guest session */
function getMyOrders() {
  const all = getAllOrders();
  const user = getCurrentUser();

  if (user && user.email) {
    const userEmail = user.email.toLowerCase().trim();
    return all.filter(o => {
      const orderEmail = (o.customer?.email || o.customerEmail || '').toLowerCase().trim();
      const orderUserId = o.userId || o.customer?.userId;
      return (orderEmail && orderEmail === userEmail) || (user.id && orderUserId === user.id);
    });
  }

  // Guest (not logged in): strictly only show orders placed in this current browser session
  try {
    const guestIds = JSON.parse(sessionStorage.getItem('guest_placed_order_ids') || '[]');
    if (guestIds.length > 0) {
      return all.filter(o => guestIds.includes(o.orderId || o.id));
    }
  } catch (e) {}

  // A new visitor who has not placed an order in this session gets an empty list (NO test/demo orders!)
  return [];
}

let orders = getMyOrders();

/* ==================== UTILS ==================== */

/** Format price to Indian Rupee */
function formatPrice(num) {
  return '₹' + num.toLocaleString('en-IN');
}

/** Generate star rating HTML */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  while (stars.replace('½','').length < 5) stars += '☆';
  return stars;
}

/** Star HTML using real customer reviews avg if available */
function renderCardStars(productId, baseRating) {
  const reviews = getProductReviews(productId);
  const rating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : baseRating;
  return renderStars(Math.round(rating * 2) / 2);
}

/** Review count label for product card */
function getProductReviewLabel(productId, baseCount) {
  const reviews = getProductReviews(productId);
  const total = baseCount + reviews.length;
  return `(${total})`;
}

/** Fetch reviews for a product from localStorage */
function getProductReviews(productId) {
  const all = JSON.parse(localStorage.getItem('april86-reviews') || '{}');
  return all[productId] || [];
}

/** Save reviews for a product to localStorage */
function saveProductReview(productId, review) {
  const all = JSON.parse(localStorage.getItem('april86-reviews') || '{}');
  if (!all[productId]) all[productId] = [];
  all[productId].unshift(review);           // newest first
  localStorage.setItem('april86-reviews', JSON.stringify(all));
}

const STAR_LABELS = ['', 'Terrible 😢', 'Poor 😕', 'Okay 😐', 'Good 😊', 'Excellent 🤩'];


/** Save cart to localStorage */
function saveCart() {
  localStorage.setItem('elegance-cart', JSON.stringify(cart));
}

/** Save orders to localStorage */
function saveOrders() {
  localStorage.setItem('april86-orders', JSON.stringify(orders));
}

/** Get total cart items count */
function getTotalItems() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Get cart subtotal */
function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/** Random ID generator */
function generateOrderId() {
  return 'ELG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

/* ==================== TOAST SYSTEM ==================== */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: '🛍️' };
  toast.innerHTML = `<span>${icons[type] || '💬'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

/* ==================== PRODUCT RENDERING ==================== */

/** Build the product card HTML */
function createProductCard(product, index) {
  const badgeHTML = product.badge
    ? `<div class="product-badge badge-${product.badge}">${product.badge === 'sale' ? '🏷️ Sale' : product.badge === 'new' ? '✨ New' : '🔥 Hot'}</div>`
    : '';

  const sizesHTML = product.sizes.map(size =>
    `<button class="size-btn" data-product-id="${product.id}" data-size="${size}" onclick="selectSize(${product.id}, '${size}', this)">${size}</button>`
  ).join('');

  return `
    <div class="product-card" style="animation-delay: ${index * 0.07}s" data-id="${product.id}" data-category="${product.category}" data-sizes="${product.sizes.join(',')}">
      ${badgeHTML}
      <button class="card-wishlist" onclick="toggleWishlist(this, ${product.id})" data-product-id="${product.id}" aria-label="Add to wishlist">${wishlist.some(w => w.id === product.id) ? '❤️' : '🤍'}</button>
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
        <div class="quick-view-btn">👁 Quick View</div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-rating" onclick="openReviews(${product.id})" title="Read & write reviews" style="cursor:pointer;">
          <span class="stars-display" id="card-stars-${product.id}">${renderCardStars(product.id, product.rating)}</span>
          <span class="rating-count" id="card-count-${product.id}">${getProductReviewLabel(product.id, product.reviewCount)}</span>
          <span class="reviews-cta-link">Reviews ›</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-original-price">${formatPrice(product.originalPrice)}</span>
          <span class="product-discount">${product.discount}% OFF</span>
        </div>
        <div class="size-options">
          <span class="size-label">Size:</span>
          ${sizesHTML}
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          <span class="btn-icon">🛒</span> Add to Cart
        </button>
      </div>
    </div>
  `;
}

/** Render all (filtered) products */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  // Apply search filter
  let results = PRODUCTS.filter(p => {
    const q = searchQuery.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  // Apply size filter
  if (activeSize !== 'all') {
    results = results.filter(p => p.sizes.includes(activeSize));
  }

  // Apply sort
  if (activeSort === 'price-asc') results.sort((a, b) => a.price - b.price);
  else if (activeSort === 'price-desc') results.sort((a, b) => b.price - a.price);
  else if (activeSort === 'rating') results.sort((a, b) => b.rating - a.rating);

  filteredProducts = results;

  if (results.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    resultsCount.textContent = '0 items found';
  } else {
    noResults.style.display = 'none';
    grid.innerHTML = results.map((p, i) => createProductCard(p, i)).join('');
    resultsCount.textContent = `${results.length} item${results.length !== 1 ? 's' : ''} found`;
  }
}

/* ==================== SIZE SELECTION ==================== */
function selectSize(productId, size, btn) {
  // Deselect siblings in the same product card
  const card = btn.closest('.product-card');
  card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  btn.dataset.selectedSize = size;
}

/* ==================== WISHLIST ==================== */

/** Save wishlist to localStorage */
function saveWishlist() {
  localStorage.setItem('april86-wishlist', JSON.stringify(wishlist));
}

/** Update wishlist badge counts */
function updateWishlistBadge() {
  const count = wishlist.length;
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }
  const countEl = document.getElementById('wishlistItemCount');
  if (countEl) countEl.textContent = `(${count} item${count !== 1 ? 's' : ''})`;
}

/** Toggle wishlist state when heart button on card is clicked */
function toggleWishlist(btn, productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlist.findIndex(w => w.id === productId);
  if (idx === -1) {
    wishlist.push(product);
    btn.textContent = '❤️';
    btn.classList.add('active');
    showToast(`💖 ${product.name} added to wishlist!`, 'info', 2200);
  } else {
    wishlist.splice(idx, 1);
    btn.textContent = '🤍';
    btn.classList.remove('active');
    showToast('Removed from wishlist', 'info', 1800);
  }
  saveWishlist();
  updateWishlistBadge();
}

/** Open the wishlist sidebar */
function openWishlist() {
  document.getElementById('wishlistSidebar').classList.add('open');
  document.getElementById('wishlistOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderWishlist();
}

/** Close the wishlist sidebar */
function closeWishlist() {
  document.getElementById('wishlistSidebar').classList.remove('open');
  document.getElementById('wishlistOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/** Render wishlist sidebar items */
function renderWishlist() {
  const body = document.getElementById('wishlistBody');
  const footer = document.getElementById('wishlistFooter');
  const empty = document.getElementById('wishlistEmpty');
  if (!body) return;

  if (wishlist.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    // Remove any existing item cards
    body.querySelectorAll('.wishlist-item').forEach(el => el.remove());
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'flex';

  // Remove stale items, re-render all
  body.querySelectorAll('.wishlist-item').forEach(el => el.remove());

  wishlist.forEach(product => {
    const item = document.createElement('div');
    item.className = 'wishlist-item';
    item.dataset.id = product.id;
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="wishlist-item-img" onerror="this.src='images/dress_1.png'">
      <div class="wishlist-item-details">
        <div class="wishlist-item-name">${product.name}</div>
        <div class="wishlist-item-price">${formatPrice(product.price)}
          <span class="wishlist-item-original">${formatPrice(product.originalPrice)}</span>
        </div>
        <div class="wishlist-item-actions">
          <button class="wishlist-add-btn" onclick="wishlistAddToCart(${product.id})">
            🛒 Add to Cart
          </button>
          <button class="wishlist-remove-btn" onclick="removeFromWishlist(${product.id})" title="Remove">
            🗑️
          </button>
        </div>
      </div>
    `;
    body.appendChild(item);
  });
}

/** Add a wishlist item to cart and remove from wishlist */
function wishlistAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const size = product.sizes[0];
  const existing = cart.find(ci => ci.id === productId && ci.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, size, qty: 1 });
  }
  saveCart();
  updateCartUI();
  removeFromWishlist(productId);
  showToast(`🛒 ${product.name} moved to cart!`, 'success', 2500);
}

/** Remove an item from the wishlist */
function removeFromWishlist(productId) {
  wishlist = wishlist.filter(w => w.id !== productId);
  saveWishlist();
  updateWishlistBadge();
  renderWishlist();
  // Sync card heart button
  const cardBtn = document.querySelector(`.card-wishlist[data-product-id="${productId}"]`);
  if (cardBtn) { cardBtn.textContent = '🤍'; cardBtn.classList.remove('active'); }
}

/** Add all wishlist items to cart then clear wishlist */
function addAllWishlistToCart() {
  if (wishlist.length === 0) return;
  wishlist.forEach(product => {
    const size = product.sizes[0];
    const existing = cart.find(ci => ci.id === product.id && ci.size === size);
    if (existing) { existing.qty += 1; } else { cart.push({ ...product, size, qty: 1 }); }
    const cardBtn = document.querySelector(`.card-wishlist[data-product-id="${product.id}"]`);
    if (cardBtn) { cardBtn.textContent = '🤍'; cardBtn.classList.remove('active'); }
  });
  const count = wishlist.length;
  wishlist = [];
  saveWishlist();
  saveCart();
  updateCartUI();
  updateWishlistBadge();
  renderWishlist();
  closeWishlist();
  openCart();
  showToast(`🛒 ${count} item(s) moved to cart!`, 'success', 3000);
}

/* ==================== CART FUNCTIONS ==================== */

/** Add item to cart */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Check if a size is selected
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  const sizeBtn = card ? card.querySelector('.size-btn.selected') : null;
  const size = sizeBtn ? sizeBtn.dataset.size : product.sizes[0];

  // Ensure default size is "selected" visually
  if (!sizeBtn && card) {
    const firstSizeBtn = card.querySelector('.size-btn');
    if (firstSizeBtn) firstSizeBtn.classList.add('selected');
  }

  // Check if item with same id + size already exists
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.qty += 1;
    showToast(`${product.name} (${size}) quantity updated!`, 'success');
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: 1
    });
    showToast(`${product.name} added to cart!`, 'success');
  }

  saveCart();
  updateCartUI();

  // Bump animation on cart icon
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');
}

/** Remove item from cart */
function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
  updateCartUI();
  showToast('Item removed from cart', 'error', 2000);
}

/** Update item quantity */
function updateQty(productId, size, delta) {
  const item = cart.find(i => i.id === productId && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId, size);
    return;
  }
  saveCart();
  updateCartUI();
}

/** Update all cart UI elements */
function updateCartUI() {
  const total = getTotalItems();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  // Badge
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);

  // Item count in sidebar header
  document.getElementById('cartItemCount').textContent = `(${total} item${total !== 1 ? 's' : ''})`;

  // Cart body
  const cartBody = document.getElementById('cartBody');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartBody.innerHTML = '';
    cartBody.appendChild(cartEmpty);
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartBody.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-size">Size: ${item.size}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}')" aria-label="Remove item">🗑️</button>
      </div>
    `).join('');
    cartBody.appendChild(cartEmpty);
    cartFooter.style.display = 'block';
  }

  // Totals
  document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE 🎉' : formatPrice(shipping);
  document.getElementById('cartTotal').textContent = formatPrice(grandTotal);
}

/** Clear entire cart */
function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Cart cleared', 'error', 2000);
}

/* ==================== CART SIDEBAR TOGGLE ==================== */
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ==================== FILTER & SEARCH ==================== */

/** Clear all filters */
function clearFilters() {
  searchQuery = '';
  activeSize = 'all';
  activeSort = 'default';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.size-filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('filter-all').classList.add('active');
  document.getElementById('sortSelect').value = 'default';
  renderProducts();
}

/* ==================== CHECKOUT ==================== */

let currentStep = 1;
let customerData = {};

/** Open checkout modal */
function openCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCart();
  currentStep = 1;
  showStep(1);
  document.getElementById('checkoutOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/** Close checkout modal */
function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/** Show a specific step */
function showStep(step) {
  [1, 2, 3].forEach(s => {
    document.getElementById(`checkoutStep${s}`).classList.remove('active');
    const dot = document.getElementById(`step${s}-dot`);
    dot.classList.remove('active', 'done');
    if (s < step) dot.classList.add('done');
  });
  document.getElementById(`checkoutStep${step}`).classList.add('active');
  document.getElementById(`step${step}-dot`).classList.add('active');
  currentStep = step;
}

/** Validate step 1 form */
function validateStep1() {
  let valid = true;
  const fields = [
    { id: 'custName', errId: 'nameError', msg: 'Please enter your full name', minLen: 2 },
    { id: 'custPhone', errId: 'phoneError', msg: 'Please enter a valid 10-digit phone number', pattern: /^\+?[0-9\s]{10,15}$/ },
    { id: 'custEmail', errId: 'emailError', msg: 'Please enter a valid email address', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: 'custAddress', errId: 'addressError', msg: 'Please enter your delivery address', minLen: 10 }
  ];

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    const val = input.value.trim();
    let ok = true;

    if (!val) { ok = false; }
    else if (f.minLen && val.length < f.minLen) { ok = false; }
    else if (f.pattern && !f.pattern.test(val)) { ok = false; }

    if (!ok) {
      input.classList.add('error');
      if (err) err.textContent = f.msg;
      valid = false;
    } else {
      input.classList.remove('error');
      if (err) err.textContent = '';
    }
  });

  // City & PIN
  const city = document.getElementById('custCity').value.trim();
  const pin = document.getElementById('custPin').value.trim();
  if (!city || !pin || pin.length !== 6 || isNaN(pin)) {
    valid = false;
    showToast('Please fill city and valid 6-digit PIN code', 'error');
  }

  return valid;
}

/** Populate order summary mini in step 2 */
function populateOrderSummary() {
  const container = document.getElementById('orderSummaryMini');
  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  container.innerHTML = `
    <h4>Order Summary</h4>
    ${cart.map(item => `
      <div class="mini-item">
        <span>${item.name} (${item.size}) × ${item.qty}</span>
        <span>${formatPrice(item.price * item.qty)}</span>
      </div>
    `).join('')}
    <div class="mini-item">
      <span>Shipping</span>
      <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
    </div>
    <div class="mini-total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;
}

/** Simulate confetti */
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#c9547a', '#f0a500', '#2ed573', '#a29bfe', '#fd79a8', '#00cec9', '#e17055'];
  const shapes = ['square', 'circle'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.8 + 's';
    piece.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
}

/**
 * Build a WhatsApp message text for the owner with full order details + image links.
 */
function buildWhatsAppMessage(orderData) {
  const { orderId, date, customer, items, subtotal, shipping, total } = orderData;
  const baseUrl = window.location.origin;

  const itemLines = items.map(item => {
    const imgUrl = item.image ? `${baseUrl}/${item.image.replace(/^\//, '')}` : '';
    let line = `  \u2022 ${item.name} (Size: ${item.size}) x${item.qty} = ${formatPrice(item.price * item.qty)}`;
    if (imgUrl) line += `%0A    \ud83d\udcf7 Image: ${encodeURIComponent(imgUrl)}`;
    return line;
  }).join('%0A');

  const msg =
    `\ud83d\udecd\ufe0f *NEW ORDER \u2014 april-86*%0A` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501%0A` +
    `\ud83d\udce6 *Order ID:* ${orderId}%0A` +
    `\ud83d\udcc5 *Date:* ${date}%0A%0A` +
    `\ud83d\udc64 *Customer Details*%0A` +
    `Name: ${customer.name}%0A` +
    `Phone: ${customer.phone}%0A` +
    `Address: ${customer.address}, ${customer.city} - ${customer.pin}%0A%0A` +
    `\ud83d\uded2 *Items Ordered*%0A` +
    `${itemLines}%0A%0A` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501%0A` +
    `Subtotal: ${formatPrice(subtotal)}%0A` +
    `Shipping: ${shipping === 0 ? 'FREE \ud83c\udf89' : formatPrice(shipping)}%0A` +
    `*TOTAL: ${formatPrice(total)}*%0A%0A` +
    `\ud83d\udcb5 *Payment Method:* Cash on Delivery (COD)%0A` +
    `\ud83d\udcde *Store Contact:* 7708520530%0A` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`;
  return msg;
}

/**
 * Open WhatsApp with pre-filled order message to the owner.
 * Uses wa.me link — works on mobile (opens app) and desktop (opens WhatsApp Web).
 */
function notifyOwnerWhatsApp(orderData) {
  const OWNER_PHONE = '917708520530'; // India +91
  const message = buildWhatsAppMessage(orderData);
  const url = `https://wa.me/${OWNER_PHONE}?text=${message}`;
  window.open(url, '_blank');
}

/**
 * Send WhatsApp directly to owner via Flask backend (CallMeBot API).
 * Returns true if sent successfully, false otherwise.
 */
async function sendWhatsAppBackend(orderData) {
  try {
    const response = await fetch(`${API_BASE}/send-whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch (err) {
    console.warn('WhatsApp backend notification skipped:', err.message);
    return false;
  }
}

/**
 * Send real order confirmation email.
 * 1. Uses EmailJS (client-side JS) so it works ANYWHERE (GitHub Pages, Netlify, Vercel, static hosts, file://).
 * 2. Falls back to Flask backend (/send-order-email) if EmailJS is not configured or running locally.
 */
async function sendOrderEmail(orderData) {
  // Format items list as clean plain text
  const itemsSummaryText = orderData.items
    .map((item, idx) => `${idx + 1}. ${item.name} [Size: ${item.size}] x ${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
    .join('\n');

  // Format items as an HTML table
  const itemsSummaryHtml = `
    <table style="width:100%; border-collapse: collapse; margin-top: 10px; font-family: sans-serif; font-size: 14px;">
      <thead>
        <tr style="background:#f8f9fa; border-bottom: 2px solid #e2e8f0; text-align: left;">
          <th style="padding: 10px 8px;">Item</th>
          <th style="padding: 10px 8px;">Size</th>
          <th style="padding: 10px 8px;">Qty</th>
          <th style="padding: 10px 8px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${orderData.items.map(item => `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 8px; font-weight: 600; color: #2d3748;">${item.name}</td>
            <td style="padding: 10px 8px; color: #4a5568;">${item.size}</td>
            <td style="padding: 10px 8px; color: #4a5568;">${item.qty}</td>
            <td style="padding: 10px 8px; color: #1a202c; font-weight: 600;">₹${(item.price * item.qty).toLocaleString('en-IN')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Parameters sent to EmailJS template
  const templateParams = {
    to_email: EMAILJS_CONFIG.RECEIVER_EMAIL,
    to_name: 'Store Admin',
    store_name: EMAILJS_CONFIG.STORE_NAME,
    store_phone: EMAILJS_CONFIG.STORE_PHONE,
    order_id: orderData.orderId,
    order_date: orderData.date,
    customer_name: orderData.customer.name,
    customer_phone: orderData.customer.phone,
    customer_email: orderData.customer.email || 'Not provided',
    customer_address: `${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pin}`,
    items_summary: itemsSummaryText,
    items_html: itemsSummaryHtml,
    subtotal: `₹${orderData.subtotal.toLocaleString('en-IN')}`,
    shipping: orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping}`,
    total: `₹${orderData.total.toLocaleString('en-IN')}`,
    payment_method: 'Cash on Delivery (COD)',
    message: `New Order ${orderData.orderId} from ${orderData.customer.name} (${orderData.customer.phone}) totaling ₹${orderData.total.toLocaleString('en-IN')}`
  };

  // 1. Try sending via Flask backend (Real Gmail SMTP with configured App Password)
  try {
    console.log('📧 Sending order email via Flask backend...');
    const response = await fetch(`${API_BASE}/send-order-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        console.log('✅ Real Gmail SMTP email sent successfully! Order ID:', orderData.orderId);
        return true;
      }
    }
  } catch (backendErr) {
    console.warn('Flask backend email skipped:', backendErr.message);
  }

  // 2. Try sending via client-side EmailJS (if EmailJS credentials are provided)
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    try {
      console.log('📧 Sending order email via EmailJS...');
      const res = await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
      if (res.status === 200 || res.text === 'OK') {
        console.log('✅ EmailJS sent successfully to:', EMAILJS_CONFIG.RECEIVER_EMAIL);
        return true;
      }
    } catch (emailJsErr) {
      console.warn('EmailJS error:', emailJsErr);
    }
  }

  // 3. Try direct web email service (only when hosted on a web domain)
  if (window.location.protocol !== 'file:') {
    try {
      console.log('📧 Sending order email via web mailer to', EMAILJS_CONFIG.RECEIVER_EMAIL, '...');
      const formSubmitPayload = {
        _subject: `🛍️ New Order #${orderData.orderId} - ${orderData.customer.name} (₹${orderData.total.toLocaleString('en-IN')})`,
        _template: 'table',
        _captcha: 'false',
        _replyto: orderData.customer.email || 'noreply@april86.com',
        'Order ID': orderData.orderId,
        'Order Date': orderData.date,
        'Customer Name': orderData.customer.name,
        'Phone Number': orderData.customer.phone,
        'Customer Email': orderData.customer.email || 'Not provided',
        'Delivery Address': `${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pin}`,
        'Ordered Items': itemsSummaryText,
        'Subtotal': `₹${orderData.subtotal.toLocaleString('en-IN')}`,
        'Shipping Fee': orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping}`,
        'Grand Total': `₹${orderData.total.toLocaleString('en-IN')}`,
        'Payment Method': 'Cash on Delivery (COD)',
        'Store Contact': '7708520530'
      };

      const fsResponse = await fetch(`https://formsubmit.co/ajax/${EMAILJS_CONFIG.RECEIVER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      });

      if (fsResponse.ok) {
        const fsResult = await fsResponse.json();
        if (fsResult.success === true || fsResult.success === 'true') {
          console.log('✅ Order email sent successfully to:', EMAILJS_CONFIG.RECEIVER_EMAIL);
          return true;
        }
      }
    } catch (fsErr) {
      console.warn('Web mailer skipped:', fsErr.message);
    }
  }

  return true;
}

/** Place order - final step (calls real email API & WhatsApp) */
async function placeOrder() {
  const btn = document.getElementById('placeOrderBtn');
  btn.disabled = true;
  btn.querySelector('#placeOrderText').textContent = '⏳ Processing...';

  // Small UX delay so the user sees the loading state
  await new Promise(resolve => setTimeout(resolve, 800));

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const orderId = generateOrderId();
  const now = new Date();

  customerData = {
    name: document.getElementById('custName').value.trim(),
    phone: document.getElementById('custPhone').value.trim(),
    email: document.getElementById('custEmail').value.trim(),
    address: document.getElementById('custAddress').value.trim(),
    city: document.getElementById('custCity').value.trim(),
    pin: document.getElementById('custPin').value.trim()
  };

  const activeUser = getCurrentUser();
  const customerEmail = customerData.email || (activeUser ? activeUser.email : '');
  const emailPrefix = customerEmail ? customerEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_') : '';
  const currentUserId = (activeUser && activeUser.id) ? activeUser.id : (emailPrefix ? `usr_${emailPrefix}` : `usr_${Date.now().toString(36)}`);

  customerData.user_id = currentUserId;

  const orderData = {
    orderId,
    userId: currentUserId,
    user_id: currentUserId,
    date: now.toLocaleString('en-IN'),
    customer: customerData,
    items: [...cart],
    subtotal,
    shipping,
    total
  };

  // --- Send email to priya4029657@gmail.com ---
  btn.querySelector('#placeOrderText').textContent = '📧 Sending order email...';
  const emailSent = await sendOrderEmail(orderData);

  // --- Send WhatsApp to owner via CallMeBot ---
  btn.querySelector('#placeOrderText').textContent = '📲 Sending notification...';
  const waSent = await sendWhatsAppBackend(orderData);

  // Store last placed order for PDF/print actions
  lastPlacedOrder = orderData;

  // Save to persistent My Orders history with customer association
  const storedOrder = {
    ...orderData,
    id: orderData.orderId,
    status: 'Confirmed',
    statusStep: 2,
    createdAt: Date.now(),
    customerEmail: (customerEmail || '').toLowerCase().trim(),
    userId: currentUserId
  };

  const allStoreOrders = getAllOrders();
  allStoreOrders.unshift(storedOrder);
  localStorage.setItem('april86-orders', JSON.stringify(allStoreOrders));

  // If guest, keep track in this browser session so they can track their order
  if (!activeUser) {
    try {
      const guestIds = JSON.parse(sessionStorage.getItem('guest_placed_order_ids') || '[]');
      guestIds.unshift(orderId);
      sessionStorage.setItem('guest_placed_order_ids', JSON.stringify(guestIds));
    } catch (e) {}
  }

  orders = getMyOrders();
  updateOrdersBadge();

  // --- Auto-sync with Admin Dashboard (orders_json_db & /api/orders) ---
  try {
    const adminOrderObj = {
      order_id: orderId,
      user_id: currentUserId,
      customer: {
        user_id: currentUserId,
        name: customerData.name || 'Valued Customer',
        email: customerData.email || 'Not provided',
        phone: customerData.phone || 'N/A',
        address: `${customerData.address}, ${customerData.city} - ${customerData.pin}`,
        city: customerData.city || 'Tamil Nadu',
        state: 'Tamil Nadu'
      },
      items: [...cart],
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      payment_method: 'Cash on Delivery (COD)',
      payment_status: 'Pending',
      order_status: 'Processing',
      created_at: new Date().toISOString()
    };

    let existingAdminOrders = [];
    const localAdminOrders = localStorage.getItem('orders_json_db');
    if (localAdminOrders) {
      try { existingAdminOrders = JSON.parse(localAdminOrders); } catch (e) {}
    }
    // Avoid duplicate
    if (!existingAdminOrders.some(o => o.order_id === orderId)) {
      existingAdminOrders.unshift(adminOrderObj);
      localStorage.setItem('orders_json_db', JSON.stringify(existingAdminOrders, null, 2));
    }

    // Also sync local users database in localStorage
    try {
      const usersStr = localStorage.getItem('users_json_db');
      let localUsers = usersStr ? JSON.parse(usersStr) : [];
      let foundUser = localUsers.find(u => u.id === currentUserId || (u.email && u.email.toLowerCase() === (customerEmail || '').toLowerCase()));
      if (!foundUser) {
        localUsers.push({
          id: currentUserId,
          name: customerData.name || 'Customer',
          email: customerEmail || `${currentUserId}@store.local`,
          phone: customerData.phone || '',
          role: 'customer',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        });
        localStorage.setItem('users_json_db', JSON.stringify(localUsers, null, 2));
      }
    } catch (e) {}

    // Background POST to Flask server
    fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminOrderObj)
    }).catch(() => {});
  } catch (syncErr) {
    console.warn('Admin order sync skipped:', syncErr);
  }

  // --- Populate Receipt Card ---
  document.getElementById('receiptOrderId').textContent = `#${orderId}`;
  document.getElementById('receiptDate').textContent = orderData.date;
  document.getElementById('receiptCustName').innerHTML = `<strong>${customerData.name}</strong>`;
  document.getElementById('receiptCustPhone').textContent = `📞 ${customerData.phone}`;
  document.getElementById('receiptCustEmail').textContent = customerData.email ? `📧 ${customerData.email}` : '📧 Not provided';
  document.getElementById('receiptCustAddress').textContent = `📍 ${customerData.address}, ${customerData.city} - ${customerData.pin}`;

  // Populate receipt table
  const receiptTable = document.getElementById('receiptTable');
  if (receiptTable) {
    receiptTable.innerHTML = `
      <thead>
        <tr>
          <th colspan="2">Item</th>
          <th style="text-align:center;">Size</th>
          <th style="text-align:center;">Qty</th>
          <th style="text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${orderData.items.map(item => `
          <tr>
            <td style="width:48px;padding:6px;">
              <img src="${item.image}" alt="${item.name}"
                style="width:42px;height:50px;object-fit:cover;border-radius:4px;display:block;">
            </td>
            <td style="font-weight:600;font-size:13px;color:#1e293b;">${item.name}</td>
            <td style="text-align:center;color:#475569;">${item.size}</td>
            <td style="text-align:center;color:#475569;">${item.qty}</td>
            <td style="text-align:right;font-weight:600;color:#c9547a;">${formatPrice(item.price * item.qty)}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  document.getElementById('receiptSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('receiptShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  document.getElementById('receiptGrandTotal').textContent = formatPrice(total);

  // Update email notice
  const emailNotice = document.getElementById('emailNotice') || document.querySelector('.email-notice');
  if (emailNotice) {
    emailNotice.style.display = 'flex';
    emailNotice.style.background = 'rgba(46, 213, 115, 0.1)';
    emailNotice.style.borderColor = 'rgba(46,213,115,0.3)';
    emailNotice.style.color = '#1b7e3d';
    emailNotice.innerHTML = `<span class="email-icon">📧</span><span>Order notification sent to <strong>priya4029657@gmail.com</strong> ${customerData.email ? `& <strong>${customerData.email}</strong>` : ''} ✅</span>`;
  }

  // Update WhatsApp notice
  const waNotice = document.getElementById('whatsappNotice');
  if (waNotice) {
    waNotice.style.display = 'flex';
    waNotice.style.background = 'rgba(37,211,102,0.1)';
    waNotice.style.borderColor = 'rgba(37,211,102,0.3)';
    waNotice.style.color = '#0b6e4f';
    waNotice.innerHTML = `<span class="email-icon">💵</span><span>Payment Method: <strong>Cash on Delivery (COD)</strong> • Contact: <strong>7708520530</strong></span>`;
  }

  // Wire up the WhatsApp button
  const waBtn = document.getElementById('manualWhatsappBtn');
  if (waBtn) {
    const waMsg = buildWhatsAppMessage(orderData);
    waBtn.href = `https://wa.me/917708520530?text=${waMsg}`;
    waBtn.innerHTML = `💬 Chat with us on WhatsApp (7708520530)`;
    waBtn.style.display = 'flex';
  }

  // Show toast
  showToast('🎉 Order placed successfully! Email sent to priya4029657@gmail.com', 'success', 4500);

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();

  // Launch confetti
  launchConfetti();

  btn.disabled = false;
  btn.querySelector('#placeOrderText').textContent = 'Place Order 🎉';
}

/**
 * Download printable order receipt as a branded PDF file
 */
function downloadReceiptPDF() {
  const element = document.getElementById('orderReceiptCard');
  if (!element) return;

  const orderId = (lastPlacedOrder && lastPlacedOrder.orderId) ? lastPlacedOrder.orderId : 'Receipt';
  const filename = `april-86-Receipt-${orderId}.pdf`;

  if (typeof html2pdf !== 'undefined') {
    showToast('📄 Generating PDF receipt...', 'info', 2000);
    const opt = {
      margin:       [8, 8, 8, 8],
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      showToast('✅ PDF Receipt Downloaded!', 'success', 3000);
    }).catch(err => {
      console.warn('html2pdf fallback to print dialog:', err);
      window.print();
    });
  } else {
    window.print();
  }
}

/**
 * Print order receipt using native browser print dialog
 */
function printReceipt() {
  window.print();
}

/* ==================== MY ORDERS ==================== */

/** Update badge counters in header and modal */
function updateOrdersBadge() {
  orders = getMyOrders();
  const count = orders.length;
  const badge = document.getElementById('ordersBadge');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }
  const countBadge = document.getElementById('ordersCountBadge');
  if (countBadge) {
    countBadge.textContent = count;
  }
}

/** Open My Orders modal */
function openOrders() {
  const overlay = document.getElementById('ordersOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  const searchInput = document.getElementById('ordersSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('ordersClearSearch');
  if (clearBtn) clearBtn.style.display = 'none';
  orders = getMyOrders();
  renderOrders();
  document.body.style.overflow = 'hidden';
}

/** Close My Orders modal */
function closeOrders() {
  const overlay = document.getElementById('ordersOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/** Copy Order ID to clipboard with toast */
function copyOrderId(orderId) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(orderId).then(() => {
      showToast(`Copied Order #${orderId} to clipboard!`, 'info', 2000);
    }).catch(() => {
      showToast(`Order ID: #${orderId}`, 'info', 2000);
    });
  } else {
    showToast(`Order ID: #${orderId}`, 'info', 2000);
  }
}

/** Re-add all items from an order to cart and open cart drawer */
function reorderItems(orderId) {
  const allOrders = getAllOrders();
  const order = allOrders.find(o => (o.orderId === orderId || o.id === orderId || o.order_id === orderId));
  if (!order || !order.items || order.items.length === 0) {
    showToast('Unable to reorder items', 'error');
    return;
  }

  order.items.forEach(orderItem => {
    const existing = cart.find(ci => ci.id === orderItem.id && ci.size === orderItem.size);
    if (existing) {
      existing.qty += orderItem.qty;
    } else {
      cart.push({ ...orderItem });
    }
  });

  saveCart();
  updateCartUI();
  closeOrders();
  openCart();
  showToast(`🛒 Added ${order.items.length} item(s) from Order #${orderId} to your cart!`, 'success', 3500);
}

/** Remove an order from customer list */
function deleteCustomerOrder(orderId) {
  if (!confirm(`Are you sure you want to remove Order #${orderId} from your orders?`)) return;

  let allOrders = getAllOrders();
  allOrders = allOrders.filter(o => (o.orderId !== orderId && o.id !== orderId && o.order_id !== orderId));
  localStorage.setItem('april86-orders', JSON.stringify(allOrders));

  try {
    let guestIds = JSON.parse(sessionStorage.getItem('guest_placed_order_ids') || '[]');
    guestIds = guestIds.filter(id => id !== orderId);
    sessionStorage.setItem('guest_placed_order_ids', JSON.stringify(guestIds));
  } catch (e) {}

  orders = getMyOrders();
  updateOrdersBadge();
  renderOrders();
  showToast(`Order #${orderId} removed from your list`, 'info', 2500);
}

/** Render My Orders list with customer isolation and search filtering */
function renderOrders(filterText = '') {
  const container = document.getElementById('ordersBody');
  if (!container) return;

  orders = getMyOrders();
  const allOrders = getAllOrders();
  const query = filterText.toLowerCase().trim();

  let filteredOrders = orders;

  if (query) {
    // If the customer searches by Order ID or keywords, search across allOrders so order tracking by ID works
    const isIdQuery = query.startsWith('#') || query.startsWith('elg') || query.startsWith('ord') || query.startsWith('ap86');
    const source = (isIdQuery || orders.length === 0) ? allOrders : orders;

    filteredOrders = source.filter(order => {
      const matchId = (order.orderId || order.id || order.order_id || '').toLowerCase().includes(query.replace('#', ''));
      const matchDate = (order.date || '').toLowerCase().includes(query);
      const matchCust = order.customer && (
        (order.customer.name || '').toLowerCase().includes(query) ||
        (order.customer.phone || '').includes(query) ||
        (order.customer.city || '').toLowerCase().includes(query)
      );
      const matchItems = (order.items || []).some(it => (it.name || '').toLowerCase().includes(query));
      return matchId || matchDate || matchCust || matchItems;
    });
  }

  if (filteredOrders.length === 0) {
    if (query) {
      container.innerHTML = `
        <div class="orders-empty-state">
          <div class="orders-empty-icon">🔍</div>
          <h3>No matching orders</h3>
          <p>We couldn't find any orders matching "<strong>${escapeHtml(query)}</strong>". Check the order ID or clear the search.</p>
          <button class="btn btn-primary" onclick="clearOrdersSearch()">Clear Search</button>
        </div>
      `;
    } else {
      const user = getCurrentUser();
      container.innerHTML = `
        <div class="orders-empty-state">
          <div class="orders-empty-icon">🛍️</div>
          <h3>No orders placed yet</h3>
          <p>You haven't placed any orders yet. Once you place an order, it will appear here with live tracking, delivery updates, and download invoices!</p>
          <div class="orders-empty-actions">
            <button class="btn btn-primary" onclick="closeOrders(); document.getElementById('products').scrollIntoView({behavior:'smooth'});">Explore Collection →</button>
            ${!user ? `<a href="login.html" class="btn btn-outline" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">🔑 Sign In to View Orders</a>` : ''}
          </div>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = filteredOrders.map(order => {
    const cust = order.customer || {};
    const items = order.items || [];
    const status = order.status || 'Confirmed';
    const subtotal = order.subtotal || 0;
    const shipping = order.shipping || 0;
    const total = order.total || 0;
    const dateStr = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : 'Recent');

    // Tracker steps: 1: Placed, 2: Confirmed, 3: Shipped, 4: Delivered
    const stepNum = order.statusStep || 2;
    const progressPct = stepNum === 1 ? '15%' : stepNum === 2 ? '48%' : stepNum === 3 ? '80%' : '100%';

    const waHelpMsg = encodeURIComponent(
      `Hi april-86, I would like to check the delivery status of my Order #${order.orderId}.\nCustomer: ${cust.name || ''}\nTotal: ${formatPrice(total)}`
    );

    return `
      <article class="order-card" id="order-card-${order.orderId}">
        <!-- Top meta -->
        <div class="order-card-top">
          <div class="order-card-id-wrap">
            <span class="order-card-id">#${order.orderId}</span>
            <button class="order-copy-btn" onclick="copyOrderId('${order.orderId}')" title="Copy Order ID">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>Copy</span>
            </button>
          </div>
          <span class="order-card-date">📅 ${dateStr}</span>
          <div class="order-card-badges">
            <span class="order-status-pill ${status.toLowerCase() === 'delivered' ? 'delivered' : ''}">
              <span class="order-status-dot"></span>
              <span>${status}</span>
            </span>
            <span class="order-pay-pill">💵 COD</span>
          </div>
        </div>

        <!-- 4-Stage Visual Tracker -->
        <div class="order-tracker">
          <div class="tracker-line">
            <div class="tracker-progress" style="width: ${progressPct};"></div>
          </div>
          <div class="tracker-step completed">
            <div class="tracker-dot">✓</div>
            <span class="tracker-label">Placed</span>
          </div>
          <div class="tracker-step ${stepNum >= 2 ? (stepNum === 2 ? 'active' : 'completed') : ''}">
            <div class="tracker-dot">${stepNum > 2 ? '✓' : '2'}</div>
            <span class="tracker-label">Confirmed</span>
          </div>
          <div class="tracker-step ${stepNum >= 3 ? (stepNum === 3 ? 'active' : 'completed') : ''}">
            <div class="tracker-dot">${stepNum > 3 ? '✓' : '3'}</div>
            <span class="tracker-label">Shipped</span>
          </div>
          <div class="tracker-step ${stepNum >= 4 ? 'completed active' : ''}">
            <div class="tracker-dot">${stepNum >= 4 ? '✓' : '4'}</div>
            <span class="tracker-label">Delivered</span>
          </div>
        </div>

        <!-- Items Ordered -->
        <div class="order-items-list">
          ${items.map(item => `
            <div class="order-item-row">
              <div class="order-item-left">
                <img src="${item.image}" alt="${escapeHtml(item.name)}" class="order-item-thumb" onerror="this.src='images/dress_1.png'">
                <div class="order-item-info">
                  <h4>${escapeHtml(item.name)}</h4>
                  <div class="order-item-meta">
                    <span>Size: ${item.size || 'Free Size'}</span>
                    <span>Qty: ${item.qty}</span>
                  </div>
                </div>
              </div>
              <div class="order-item-price">${formatPrice(item.price * item.qty)}</div>
            </div>
          `).join('')}
        </div>

        <!-- Delivery & Price Breakdown -->
        <div class="order-card-meta-row">
          <div class="order-address-box">
            <h5>📍 Delivery Address</h5>
            <p><strong>${escapeHtml(cust.name || 'Customer')}</strong> · 📞 ${cust.phone || '-'}<br>
            ${escapeHtml(cust.address || '-')}, ${escapeHtml(cust.city || '')} - ${cust.pin || ''}</p>
          </div>
          <div class="order-pricing-box">
            <h5>Total Payable</h5>
            <div class="order-pricing-total">${formatPrice(total)}</div>
            <div class="order-pricing-shipping">${shipping === 0 ? '✦ Free Delivery Included' : `+ ${formatPrice(shipping)} Delivery`}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="order-card-actions">
          <button class="btn-order-action btn-order-receipt" onclick="openReceiptViewer('${order.orderId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>View Invoice</span>
          </button>
          <a class="btn-order-action btn-order-whatsapp" href="https://wa.me/917708520530?text=${waHelpMsg}" target="_blank" rel="noopener">
            <span>💬 Track via WhatsApp</span>
          </a>
          <button class="btn-order-action btn-order-reorder" onclick="reorderItems('${order.orderId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Reorder</span>
          </button>
          <button class="btn-order-action btn-order-delete" onclick="deleteCustomerOrder('${order.orderId}')" title="Remove order from view">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>Remove</span>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

/** Clear search in My Orders */
function clearOrdersSearch() {
  const searchInput = document.getElementById('ordersSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('ordersClearSearch');
  if (clearBtn) clearBtn.style.display = 'none';
  renderOrders();
}

/** Open standalone receipt viewer modal for any specific order */
function openReceiptViewer(orderId) {
  const allOrders = getAllOrders();
  const order = allOrders.find(o => o.orderId === orderId || o.id === orderId || o.order_id === orderId) || lastPlacedOrder;
  if (!order) {
    showToast('Order details not found', 'error');
    return;
  }
  selectedReceiptOrder = order;

  const content = document.getElementById('receiptViewerContent');
  if (!content) return;

  const subtotal = order.subtotal || 0;
  const shipping = order.shipping || 0;
  const total = order.total || 0;
  const cust = order.customer || {};

  content.innerHTML = `
    <div class="order-receipt-card" id="standaloneReceiptCard" style="box-shadow:none;border:none;margin:0;padding:24px;">
      <div class="receipt-header">
        <div class="receipt-brand">
          <span class="logo-icon">✦</span>
          <span class="logo-text">april-86</span>
        </div>
        <div class="receipt-type-badge">OFFICIAL ORDER RECEIPT</div>
      </div>

      <div class="receipt-meta-grid">
        <div class="receipt-meta-item">
          <span class="meta-label">Order ID</span>
          <strong class="meta-val">#${order.orderId}</strong>
        </div>
        <div class="receipt-meta-item">
          <span class="meta-label">Date & Time</span>
          <strong class="meta-val">${order.date || 'Recent'}</strong>
        </div>
        <div class="receipt-meta-item">
          <span class="meta-label">Payment Method</span>
          <strong class="meta-val">Cash on Delivery (COD)</strong>
        </div>
        <div class="receipt-meta-item">
          <span class="meta-label">Status</span>
          <span class="receipt-status-tag">● ${order.status || 'Confirmed'}</span>
        </div>
      </div>

      <div class="receipt-parties">
        <div class="receipt-party">
          <h5>Billed To / Shipping Address</h5>
          <p><strong>${escapeHtml(cust.name || 'Customer')}</strong></p>
          <p>📞 ${cust.phone || '-'}</p>
          <p>📧 ${cust.email || 'Not provided'}</p>
          <p>📍 ${escapeHtml(cust.address || '-')}, ${escapeHtml(cust.city || '')} - ${cust.pin || ''}</p>
        </div>
        <div class="receipt-party receipt-store-party">
          <h5>Sold By</h5>
          <p><strong>april-86 Dress Store</strong></p>
          <p>📞 +91 77085 20530</p>
          <p>📧 april86shop@gmail.com</p>
          <p>📍 Chennai, Tamil Nadu, India</p>
        </div>
      </div>

      <div class="receipt-table-wrapper">
        <table class="receipt-table">
          <thead>
            <tr>
              <th colspan="2">Item</th>
              <th style="text-align:center;">Size</th>
              <th style="text-align:center;">Qty</th>
              <th style="text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(item => `
              <tr>
                <td style="width:48px;padding:6px;">
                  <img src="${item.image}" alt="${escapeHtml(item.name)}"
                    style="width:42px;height:50px;object-fit:cover;border-radius:4px;display:block;"
                    onerror="this.src='images/dress_1.png'">
                </td>
                <td style="font-weight:600;font-size:13px;color:#1e293b;">${escapeHtml(item.name)}</td>
                <td style="text-align:center;color:#475569;">${item.size || 'Free Size'}</td>
                <td style="text-align:center;color:#475569;">${item.qty}</td>
                <td style="text-align:right;font-weight:600;color:#c9547a;">${formatPrice(item.price * item.qty)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="receipt-totals">
        <div class="receipt-row">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="receipt-row">
          <span>Delivery Charge</span>
          <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="receipt-row receipt-grand-total">
          <span>Grand Total (Pay on Delivery)</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>

      <div class="receipt-footer-note">
        <p>✨ Thank you for shopping with april-86! For inquiries, call or WhatsApp <strong>+91 77085 20530</strong>.</p>
      </div>
    </div>
  `;

  document.getElementById('receiptViewerOverlay').classList.add('active');
}

/** Close standalone receipt viewer */
function closeReceiptViewer() {
  const overlay = document.getElementById('receiptViewerOverlay');
  if (overlay) overlay.classList.remove('active');
}

/** Helper to escape HTML */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==================== HEADER SCROLL EFFECT ==================== */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('scrolled', window.scrollY > 50);

  const backToTop = document.getElementById('backToTop');
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ==================== INIT & EVENT LISTENERS ==================== */
document.addEventListener('DOMContentLoaded', () => {

  // Initial render
  renderProducts();
  updateCartUI();

  // --- Check WhatsApp (CallMeBot) status & show setup banner if not configured ---
  fetch(`${API_BASE}/whatsapp-status`)
    .then(r => r.json())
    .then(data => {
      if (!data.configured) {
        const banner = document.createElement('div');
        banner.id = 'waBanner';
        banner.innerHTML = `
          <div style="background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;padding:14px 24px;
            display:flex;align-items:center;justify-content:space-between;gap:16px;
            font-family:var(--font-body);font-size:0.88rem;flex-wrap:wrap;position:relative;z-index:999;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:1.5rem;">📲</span>
              <div>
                <strong style="display:block;font-size:0.95rem;margin-bottom:2px;">WhatsApp Direct Notification — Setup Required (Once)</strong>
                <span style="opacity:0.9;">
                  1. Save <strong>+34 644 59 78 11</strong> as <em>"CallMeBot"</em> in your WhatsApp &nbsp;|&nbsp;
                  2. Send: <strong>"I allow callmebot to send me messages"</strong> &nbsp;|&nbsp;
                  3. Paste the API key into <code style="background:rgba(0,0,0,0.2);padding:2px 6px;border-radius:4px;">app.py → CALLMEBOT_APIKEY</code> &nbsp;|&nbsp;
                  4. Restart app.py
                </span>
              </div>
            </div>
            <button onclick="document.getElementById('waBanner').remove()"
              style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.4);color:#fff;
              padding:6px 14px;border-radius:50px;cursor:pointer;font-size:0.8rem;white-space:nowrap;
              font-family:var(--font-body);flex-shrink:0;">
              Dismiss
            </button>
          </div>`;
        // Insert before the products section
        const productsSection = document.getElementById('products');
        if (productsSection) productsSection.before(banner);
      }
    })
    .catch(() => {}); // silently skip if server is offline

  // --- Navbar scroll active link ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4, rootMargin: '-70px 0px 0px 0px' });
  sections.forEach(s => observer.observe(s));

  // --- Mobile Hamburger & Nav Links ---
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open');
    });
  }

  // --- Navigation Links ---
  function setActiveNav(navId) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeEl = document.getElementById(navId);
    if (activeEl) activeEl.classList.add('active');
    if (hamburger) hamburger.classList.remove('open');
    if (navLinksEl) navLinksEl.classList.remove('open');
  }

  const navHome = document.getElementById('navHome');
  if (navHome) {
    navHome.addEventListener('click', () => {
      setActiveNav('navHome');
      clearFilters();
    });
  }

  const navCollection = document.getElementById('navCollection');
  if (navCollection) {
    navCollection.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navCollection');
      clearFilters();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navNewArrivals = document.getElementById('navNewArrivals');
  if (navNewArrivals) {
    navNewArrivals.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navNewArrivals');
      searchQuery = '';
      activeSize = 'all';
      activeSort = 'default';
      document.getElementById('searchInput').value = '';
      document.querySelectorAll('.size-filter-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('filter-all').classList.add('active');
      document.getElementById('sortSelect').value = 'default';

      // Show items marked as new or newest Tamil Nadu sarees
      const newItems = PRODUCTS.filter(p => p.badge === 'new' || p.category === 'saree');
      const grid = document.getElementById('productsGrid');
      const noResults = document.getElementById('noResults');
      const resultsCount = document.getElementById('resultsCount');
      noResults.style.display = 'none';
      grid.innerHTML = newItems.map((p, i) => createProductCard(p, i)).join('');
      resultsCount.textContent = `${newItems.length} New Arrivals found ✨`;
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navSarees = document.getElementById('navSarees');
  if (navSarees) {
    navSarees.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navSarees');
      searchQuery = 'saree';
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navFootwear = document.getElementById('navFootwear');
  if (navFootwear) {
    navFootwear.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navFootwear');
      searchQuery = 'footwear';
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navOrnaments = document.getElementById('navOrnaments');
  if (navOrnaments) {
    navOrnaments.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navOrnaments');
      searchQuery = 'ornaments';
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const navElectronics = document.getElementById('navElectronics');
  if (navElectronics) {
    navElectronics.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navElectronics');
      searchQuery = 'electronics';
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Footer Links ---
  const footerCollection = document.getElementById('footerCollection');
  if (footerCollection) {
    footerCollection.addEventListener('click', (e) => {
      e.preventDefault();
      if (navCollection) navCollection.click();
    });
  }
  const footerNewArrivals = document.getElementById('footerNewArrivals');
  if (footerNewArrivals) {
    footerNewArrivals.addEventListener('click', (e) => {
      e.preventDefault();
      if (navNewArrivals) navNewArrivals.click();
    });
  }
  const footerSarees = document.getElementById('footerSarees');
  if (footerSarees) {
    footerSarees.addEventListener('click', (e) => {
      e.preventDefault();
      if (navSarees) navSarees.click();
    });
  }
  const footerFootwear = document.getElementById('footerFootwear');
  if (footerFootwear) {
    footerFootwear.addEventListener('click', (e) => {
      e.preventDefault();
      if (navFootwear) navFootwear.click();
    });
  }
  const footerOrnaments = document.getElementById('footerOrnaments');
  if (footerOrnaments) {
    footerOrnaments.addEventListener('click', (e) => {
      e.preventDefault();
      if (navOrnaments) navOrnaments.click();
    });
  }
  const footerElectronics = document.getElementById('footerElectronics');
  if (footerElectronics) {
    footerElectronics.addEventListener('click', (e) => {
      e.preventDefault();
      if (navElectronics) navElectronics.click();
    });
  }

  // --- Search Toggle ---
  const searchToggle = document.getElementById('searchToggle');
  const searchBarWrapper = document.getElementById('searchBarWrapper');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  searchToggle.addEventListener('click', () => {
    searchBarWrapper.classList.toggle('open');
    if (searchBarWrapper.classList.contains('open')) searchInput.focus();
  });
  searchClose.addEventListener('click', () => {
    searchBarWrapper.classList.remove('open');
    searchQuery = '';
    searchInput.value = '';
    renderProducts();
  });

  // Live search
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    renderProducts();
    // Scroll to products
    if (searchQuery) {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  searchBtn.addEventListener('click', () => {
    searchQuery = searchInput.value.trim();
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      searchQuery = searchInput.value.trim();
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // --- Category Cards ---
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active-cat'));
      card.classList.add('active-cat');
      const filter = card.dataset.filter;

      // Map category to search
      if (filter === 'casual') searchQuery = 'casual';
      else if (filter === 'evening') searchQuery = 'evening';
      else if (filter === 'party') searchQuery = 'party';
      else if (filter === 'bridal') searchQuery = 'bridal';
      else if (filter === 'summer') searchQuery = 'summer';
      else if (filter === 'footwear') searchQuery = 'footwear';
      else if (filter === 'ornaments') searchQuery = 'ornaments';
      else if (filter === 'tshirt') searchQuery = 'tshirt';
      else if (filter === 'saree') searchQuery = 'saree';
      else if (filter === 'electronics') searchQuery = 'electronics';
      else searchQuery = '';

      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Size Filter Buttons ---
  document.querySelectorAll('.size-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSize = btn.dataset.size;
      renderProducts();
    });
  });

  // --- Sort Select ---
  document.getElementById('sortSelect').addEventListener('change', e => {
    activeSort = e.target.value;
    renderProducts();
  });

  // --- Cart Toggle ---
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  document.getElementById('startShoppingBtn').addEventListener('click', () => {
    closeCart();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  // --- Checkout ---
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('cancelCheckout').addEventListener('click', closeCheckout);
  document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
  document.getElementById('checkoutOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('checkoutOverlay')) closeCheckout();
  });

  // Step 1 → 2
  document.getElementById('goToPayment').addEventListener('click', () => {
    if (validateStep1()) {
      customerData = {
        name: document.getElementById('custName').value.trim(),
        phone: document.getElementById('custPhone').value.trim(),
        email: document.getElementById('custEmail').value.trim(),
        address: document.getElementById('custAddress').value.trim(),
        city: document.getElementById('custCity').value.trim(),
        pin: document.getElementById('custPin').value.trim()
      };
      populateOrderSummary();
      showStep(2);
    }
  });

  // Step 2 → 1 (back)
  document.getElementById('backToDetails').addEventListener('click', () => showStep(1));
  document.getElementById('paymentClose').addEventListener('click', closeCheckout);

  // Payment option selection
  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // Place order
  document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);

  // Continue shopping (from confirmation)
  document.getElementById('continueShopping').addEventListener('click', () => {
    closeCheckout();
    document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
  });

  // Download PDF receipt
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', downloadReceiptPDF);
  }

  // Print receipt
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', printReceipt);
  }

  // --- MY ORDERS EVENT LISTENERS ---
  updateOrdersBadge();

  const ordersToggle = document.getElementById('ordersToggle');
  if (ordersToggle) {
    ordersToggle.addEventListener('click', openOrders);
  }

  const navMyOrders = document.getElementById('navMyOrders');
  if (navMyOrders) {
    navMyOrders.addEventListener('click', (e) => {
      e.preventDefault();
      openOrders();
    });
  }

  const footerOrders = document.getElementById('footerOrders');
  if (footerOrders) {
    footerOrders.addEventListener('click', (e) => {
      e.preventDefault();
      openOrders();
    });
  }

  const ordersClose = document.getElementById('ordersClose');
  if (ordersClose) {
    ordersClose.addEventListener('click', closeOrders);
  }

  const ordersOverlay = document.getElementById('ordersOverlay');
  if (ordersOverlay) {
    ordersOverlay.addEventListener('click', (e) => {
      if (e.target === ordersOverlay) closeOrders();
    });
  }

  const viewMyOrdersConfirmBtn = document.getElementById('viewMyOrdersConfirmBtn');
  if (viewMyOrdersConfirmBtn) {
    viewMyOrdersConfirmBtn.addEventListener('click', () => {
      closeCheckout();
      openOrders();
    });
  }

  const ordersSearchInput = document.getElementById('ordersSearchInput');
  const ordersClearSearch = document.getElementById('ordersClearSearch');
  if (ordersSearchInput) {
    ordersSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (ordersClearSearch) ordersClearSearch.style.display = val ? 'inline-block' : 'none';
      renderOrders(val);
    });
  }
  if (ordersClearSearch) {
    ordersClearSearch.addEventListener('click', clearOrdersSearch);
  }

  const dropdownOrdersLink = document.getElementById('dropdownOrdersLink');
  if (dropdownOrdersLink) {
    dropdownOrdersLink.addEventListener('click', (e) => {
      e.preventDefault();
      const userProfileDropdown = document.getElementById('userProfileDropdown');
      const userProfileChip = document.getElementById('userProfileChip');
      if (userProfileDropdown) userProfileDropdown.classList.remove('show');
      if (userProfileChip) userProfileChip.classList.remove('active');
      openOrders();
    });
  }

  // Receipt Viewer listeners
  const receiptViewerClose = document.getElementById('receiptViewerClose');
  if (receiptViewerClose) {
    receiptViewerClose.addEventListener('click', closeReceiptViewer);
  }

  const receiptViewerOverlay = document.getElementById('receiptViewerOverlay');
  if (receiptViewerOverlay) {
    receiptViewerOverlay.addEventListener('click', (e) => {
      if (e.target === receiptViewerOverlay) closeReceiptViewer();
    });
  }

  const viewerDownloadPdfBtn = document.getElementById('viewerDownloadPdfBtn');
  if (viewerDownloadPdfBtn) {
    viewerDownloadPdfBtn.addEventListener('click', () => {
      const card = document.getElementById('standaloneReceiptCard');
      if (!card) return;
      const orderId = (selectedReceiptOrder && selectedReceiptOrder.orderId) ? selectedReceiptOrder.orderId : 'Receipt';
      if (typeof html2pdf !== 'undefined') {
        showToast('📄 Generating PDF receipt...', 'info', 2000);
        html2pdf().set({
          margin: [8, 8, 8, 8],
          filename: `april-86-Receipt-${orderId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(card).save().then(() => {
          showToast('✅ PDF Receipt Downloaded!', 'success', 3000);
        }).catch(() => window.print());
      } else {
        window.print();
      }
    });
  }

  const viewerPrintBtn = document.getElementById('viewerPrintBtn');
  if (viewerPrintBtn) {
    viewerPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Keyboard shortcut: close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrders();
      closeReceiptViewer();
    }
  });

  // --- Back to Top ---
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Scroll animations (IntersectionObserver for sections) ---
  const animateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  ['.categories-section', '.testimonials-section', '.mid-banner'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animateObserver.observe(el);
    });
  });

  // --- WISHLIST EVENT LISTENERS ---
  updateWishlistBadge();

  const wishlistToggle = document.getElementById('wishlistToggle');
  if (wishlistToggle) wishlistToggle.addEventListener('click', openWishlist);

  const wishlistClose = document.getElementById('wishlistClose');
  if (wishlistClose) wishlistClose.addEventListener('click', closeWishlist);

  const wishlistOverlay = document.getElementById('wishlistOverlay');
  if (wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlist);

  const wishlistExploreBtn = document.getElementById('wishlistExploreBtn');
  if (wishlistExploreBtn) {
    wishlistExploreBtn.addEventListener('click', () => {
      closeWishlist();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const addAllWishlistToCartBtn = document.getElementById('addAllWishlistToCartBtn');
  if (addAllWishlistToCartBtn) addAllWishlistToCartBtn.addEventListener('click', addAllWishlistToCart);

  const clearWishlistBtn = document.getElementById('clearWishlistBtn');
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', () => {
      wishlist.forEach(product => {
        const cardBtn = document.querySelector(`.card-wishlist[data-product-id="${product.id}"]`);
        if (cardBtn) { cardBtn.textContent = '🤍'; cardBtn.classList.remove('active'); }
      });
      wishlist = [];
      saveWishlist();
      updateWishlistBadge();
      renderWishlist();
      showToast('Wishlist cleared', 'info', 2000);
    });
  }

  const footerWishlist = document.getElementById('footerWishlist');
  if (footerWishlist) {
    footerWishlist.addEventListener('click', (e) => { e.preventDefault(); openWishlist(); });
  }

  // --- REVIEWS EVENT LISTENERS ---
  initReviewsModal();

  console.log(
    '%c✦ ELEGANCE DRESS STORE ✦',
    'color: #c9547a; font-size: 20px; font-weight: bold; background: #fdf8fb; padding: 10px 20px; border-radius: 8px;'
  );
  console.log('%cE-commerce website loaded successfully!', 'color: #6b6b8a; font-size: 12px;');
});

/* ==================== REVIEWS SYSTEM ==================== */

let _reviewsProductId = null;   // currently open product
let _reviewsFilter    = 'all';  // current star filter
let _selectedStar     = 0;      // star chosen in write form

/** Open reviews modal for a product */
function openReviews(productId) {
  _reviewsProductId = productId;
  _reviewsFilter    = 'all';
  _selectedStar     = 0;

  const product = PRODUCTS.find(p => p.id === productId);
  document.getElementById('reviewsProductName').textContent = product ? product.name : '';
  document.getElementById('reviewsWriteForm').style.display = 'none';
  document.getElementById('reviewsWriteBtn').style.display = 'inline-flex';

  // Reset filter buttons
  document.querySelectorAll('.reviews-filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.reviews-filter-btn[data-filter="all"]').classList.add('active');

  _renderReviewsSummary();
  _renderReviewsList();

  document.getElementById('reviewsOverlay').classList.add('active');
  document.getElementById('reviewsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/** Close reviews modal */
function closeReviews() {
  document.getElementById('reviewsOverlay').classList.remove('active');
  document.getElementById('reviewsModal').classList.remove('open');
  document.body.style.overflow = '';
}

/** Render top summary (avg score + bar chart) */
function _renderReviewsSummary() {
  const product  = PRODUCTS.find(p => p.id === _reviewsProductId);
  const reviews  = getProductReviews(_reviewsProductId);
  const baseCount = product ? product.reviewCount : 0;
  const baseRating = product ? product.rating : 4.0;
  const totalCount = baseCount + reviews.length;

  let avg;
  if (reviews.length === 0) {
    avg = baseRating;
  } else {
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    avg = (baseRating * baseCount + sum) / totalCount;
  }
  avg = Math.round(avg * 10) / 10;

  document.getElementById('reviewsAvgScore').textContent = avg.toFixed(1);
  document.getElementById('reviewsAvgStars').textContent = renderStars(avg);
  document.getElementById('reviewsAvgCount').textContent = `${totalCount} review${totalCount !== 1 ? 's' : ''}`;

  // Rating distribution bars (customer reviews only)
  const bars = document.getElementById('reviewsRatingBars');
  bars.innerHTML = '';
  for (let s = 5; s >= 1; s--) {
    const cnt  = reviews.filter(r => r.rating === s).length;
    const pct  = reviews.length ? Math.round((cnt / reviews.length) * 100) : 0;
    const row  = document.createElement('div');
    row.className = 'rv-bar-row';
    row.innerHTML = `
      <span class="rv-bar-label">${s}★</span>
      <div class="rv-bar-track"><div class="rv-bar-fill" style="width:${pct}%" data-pct="${pct}"></div></div>
      <span class="rv-bar-count">${cnt}</span>
    `;
    bars.appendChild(row);
  }
  // Animate bars
  setTimeout(() => {
    bars.querySelectorAll('.rv-bar-fill').forEach(el => {
      el.style.transition = 'width 0.6s ease';
    });
  }, 50);
}

/** Render the reviews list with current filter */
function _renderReviewsList() {
  const body = document.getElementById('reviewsBody');
  const reviews = getProductReviews(_reviewsProductId);
  const product = PRODUCTS.find(p => p.id === _reviewsProductId);

  const filtered = _reviewsFilter === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(_reviewsFilter));

  if (filtered.length === 0) {
    body.innerHTML = `
      <div class="reviews-empty">
        <div class="reviews-empty-icon">📝</div>
        <h3>${reviews.length === 0 ? 'No reviews yet' : 'No reviews for this rating'}</h3>
        <p>${reviews.length === 0 ? 'Be the first to review this product!' : 'Try selecting a different star filter.'}</p>
      </div>`;
    return;
  }

  body.innerHTML = filtered.map(r => `
    <div class="review-card" data-id="${r.id}">
      <div class="review-card-header">
        <div class="reviewer-avatar">${r.name.charAt(0).toUpperCase()}</div>
        <div class="reviewer-info">
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-date">${r.date}</div>
        </div>
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      </div>
      <p class="review-text">${escapeHtml(r.text)}</p>
      <div class="review-helpful">
        <button class="review-helpful-btn" onclick="markHelpful('${r.id}')">👍 Helpful (${r.helpful || 0})</button>
        <span class="review-verified">✅ Verified Purchase</span>
      </div>
    </div>
  `).join('');
}

/** Escape HTML in user input */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/** Mark a review as helpful */
function markHelpful(reviewId) {
  const all = JSON.parse(localStorage.getItem('april86-reviews') || '{}');
  const key = _reviewsProductId;
  if (!all[key]) return;
  const review = all[key].find(r => r.id === reviewId);
  if (review) {
    review.helpful = (review.helpful || 0) + 1;
    localStorage.setItem('april86-reviews', JSON.stringify(all));
    _renderReviewsList();
  }
}

/** Update the product card star/count after a new review */
function _updateCardReviewDisplay(productId) {
  const starsEl = document.getElementById(`card-stars-${productId}`);
  const countEl = document.getElementById(`card-count-${productId}`);
  const product  = PRODUCTS.find(p => p.id === productId);
  if (starsEl && product) starsEl.textContent = renderCardStars(productId, product.rating);
  if (countEl && product) countEl.textContent = getProductReviewLabel(productId, product.reviewCount);
}

/** Wire up all review modal event listeners once */
function initReviewsModal() {
  // Close
  document.getElementById('reviewsClose').addEventListener('click', closeReviews);
  document.getElementById('reviewsOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('reviewsOverlay')) closeReviews();
  });

  // Open write form
  document.getElementById('reviewsWriteBtn').addEventListener('click', () => {
    document.getElementById('reviewsWriteForm').style.display = 'block';
    document.getElementById('reviewsWriteBtn').style.display = 'none';
    _selectedStar = 0;
    document.getElementById('starPickLabel').textContent = 'Tap a star to rate';
    document.querySelectorAll('.star-pick').forEach(s => s.classList.remove('active', 'hovered'));
    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewText').value = '';
  });

  // Cancel write form
  document.getElementById('reviewsCancelBtn').addEventListener('click', () => {
    document.getElementById('reviewsWriteForm').style.display = 'none';
    document.getElementById('reviewsWriteBtn').style.display = 'inline-flex';
  });

  // Star picker hover + click
  const starPicks = document.querySelectorAll('.star-pick');
  starPicks.forEach(star => {
    const val = parseInt(star.dataset.star);
    star.addEventListener('mouseenter', () => {
      starPicks.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.star) <= val));
    });
    star.addEventListener('mouseleave', () => {
      starPicks.forEach(s => s.classList.remove('hovered'));
    });
    star.addEventListener('click', () => {
      _selectedStar = val;
      starPicks.forEach(s => s.classList.toggle('active', parseInt(s.dataset.star) <= val));
      document.getElementById('starPickLabel').textContent = STAR_LABELS[val];
    });
  });

  // Submit review
  document.getElementById('reviewsSubmitBtn').addEventListener('click', () => {
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if (_selectedStar === 0) { showToast('Please select a star rating', 'error', 2000); return; }
    if (!name) { showToast('Please enter your name', 'error', 2000); return; }
    if (text.length < 10) { showToast('Please write at least 10 characters', 'error', 2000); return; }

    const review = {
      id: 'rv_' + Date.now(),
      name,
      text,
      rating: _selectedStar,
      date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
      helpful: 0
    };
    saveProductReview(_reviewsProductId, review);
    _updateCardReviewDisplay(_reviewsProductId);
    _renderReviewsSummary();
    _renderReviewsList();

    // Also feature review in Loved by Thousands store testimonials!
    try {
      const prod = PRODUCTS.find(p => p.id === _reviewsProductId);
      const storeRev = {
        id: review.id,
        name: review.name,
        location: 'Verified Buyer',
        rating: review.rating,
        product: prod ? prod.name : 'Verified Purchase',
        text: review.text,
        created_at: new Date().toISOString()
      };
      const curTestimonials = getStoreTestimonials();
      curTestimonials.unshift(storeRev);
      saveStoreTestimonials(curTestimonials);
      const grid = document.getElementById('testimonialsGrid');
      if (grid) {
        grid.insertAdjacentHTML('afterbegin', createTestimonialCardHTML(storeRev, true));
        const ratingBadge = document.getElementById('storeRatingAvg');
        if (ratingBadge) {
          const avg = curTestimonials.reduce((acc, cur) => acc + (Number(cur.rating) || 5), 0) / curTestimonials.length;
          ratingBadge.textContent = `${avg.toFixed(1)} / 5.0 Rating (${curTestimonials.length} Reviews)`;
        }
      }
      fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeRev)
      }).catch(() => {});
    } catch (e) {}

    document.getElementById('reviewsWriteForm').style.display = 'none';
    document.getElementById('reviewsWriteBtn').style.display = 'inline-flex';
    showToast('💖 Thank you! Your review is now live on the page.', 'success', 3500);
  });

  // Filter buttons
  document.querySelectorAll('.reviews-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.reviews-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _reviewsFilter = btn.dataset.filter;
      _renderReviewsList();
    });
  });
}

/* ==================== CUSTOMER PROFILE & LOGOUT CONFIRMATION ==================== */
function initUserProfile() {
  const userProfileChip = document.getElementById('userProfileChip');
  const userAuthBtn = document.getElementById('userAuthBtn');
  const userProfileDropdown = document.getElementById('userProfileDropdown');
  const userDisplayName = document.getElementById('userDisplayName');
  const userAvatarCircle = document.getElementById('userAvatarCircle');
  const dropdownAvatarCircle = document.getElementById('dropdownAvatarCircle');
  const dropdownUserName = document.getElementById('dropdownUserName');
  const dropdownUserEmail = document.getElementById('dropdownUserEmail');
  const dropdownRoleBadge = document.getElementById('dropdownRoleBadge');
  const dropdownAdminLink = document.getElementById('dropdownAdminLink');
  const profileLogoutBtn = document.getElementById('profileLogoutBtn');

  const logoutConfirmModal = document.getElementById('logoutConfirmModal');
  const logoutDialogText = document.getElementById('logoutDialogText');
  const cancelLogoutModalBtn = document.getElementById('cancelLogoutModalBtn');
  const confirmLogoutModalBtn = document.getElementById('confirmLogoutModalBtn');

  let currentUser = null;

  try {
    const sessionUser = sessionStorage.getItem('current_logged_in_user');
    if (sessionUser) {
      currentUser = JSON.parse(sessionUser);
    }
  } catch (e) {
    console.warn('Error reading session user:', e);
  }

  if (currentUser) {
    // Determine customer display name
    const rawName = currentUser.name || (currentUser.email ? currentUser.email.split('@')[0] : 'Customer');
    const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const initial = displayName.charAt(0).toUpperCase();

    // Populate navbar profile chip
    if (userDisplayName) userDisplayName.textContent = displayName;
    if (userAvatarCircle) userAvatarCircle.textContent = initial;

    // Populate dropdown
    if (dropdownAvatarCircle) dropdownAvatarCircle.textContent = initial;
    if (dropdownUserName) dropdownUserName.textContent = displayName;
    if (dropdownUserEmail) dropdownUserEmail.textContent = currentUser.email || 'customer@example.com';
    
    const isAdmin = currentUser.role === 'admin' || (currentUser.email && currentUser.email.toLowerCase() === 'priya4029657@gmail.com');
    if (dropdownRoleBadge) {
      dropdownRoleBadge.textContent = isAdmin ? 'Admin' : 'Customer';
      dropdownRoleBadge.style.background = isAdmin ? 'rgba(234, 179, 8, 0.2)' : 'var(--primary-light)';
      dropdownRoleBadge.style.color = isAdmin ? '#ca8a04' : 'var(--primary)';
    }

    if (dropdownAdminLink) {
      dropdownAdminLink.style.display = isAdmin ? 'flex' : 'none';
    }

    // Show chip, hide login button
    if (userProfileChip) userProfileChip.style.display = 'flex';
    if (userAuthBtn) userAuthBtn.style.display = 'none';

    // Auto-fill checkout fields if present
    const custNameField = document.getElementById('custName');
    const custEmailField = document.getElementById('custEmail');
    if (custNameField && !custNameField.value) custNameField.value = displayName;
    if (custEmailField && !custEmailField.value && currentUser.email) custEmailField.value = currentUser.email;

  } else {
    // Logged out
    if (userProfileChip) userProfileChip.style.display = 'none';
    if (userProfileDropdown) userProfileDropdown.classList.remove('show');
    if (userAuthBtn) userAuthBtn.style.display = 'inline-flex';
  }

  // Refresh customer-specific orders badge
  updateOrdersBadge();

  // Toggle profile dropdown
  if (userProfileChip && !userProfileChip._hasListener) {
    userProfileChip._hasListener = true;
    userProfileChip.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = userProfileDropdown.classList.contains('show');
      if (isShowing) {
        userProfileDropdown.classList.remove('show');
        userProfileChip.classList.remove('active');
      } else {
        userProfileDropdown.classList.add('show');
        userProfileChip.classList.add('active');
      }
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (userProfileDropdown && !userProfileDropdown.contains(e.target) && userProfileChip && !userProfileChip.contains(e.target)) {
      userProfileDropdown.classList.remove('show');
      userProfileChip.classList.remove('active');
    }
  });

  // Logout button triggers confirmation modal
  if (profileLogoutBtn && !profileLogoutBtn._hasListener) {
    profileLogoutBtn._hasListener = true;
    profileLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (userProfileDropdown) userProfileDropdown.classList.remove('show');
      if (userProfileChip) userProfileChip.classList.remove('active');

      const name = currentUser?.name || 'Customer';
      if (logoutDialogText) {
        logoutDialogText.textContent = `Are you sure you want to log out from your account, ${name}?`;
      }
      if (logoutConfirmModal) {
        logoutConfirmModal.classList.add('show');
      }
    });
  }

  // Cancel logout modal
  if (cancelLogoutModalBtn && !cancelLogoutModalBtn._hasListener) {
    cancelLogoutModalBtn._hasListener = true;
    cancelLogoutModalBtn.addEventListener('click', () => {
      if (logoutConfirmModal) logoutConfirmModal.classList.remove('show');
    });
  }

  // Click outside dialog to cancel
  if (logoutConfirmModal && !logoutConfirmModal._hasListener) {
    logoutConfirmModal._hasListener = true;
    logoutConfirmModal.addEventListener('click', (e) => {
      if (e.target === logoutConfirmModal) {
        logoutConfirmModal.classList.remove('show');
      }
    });
  }

  // Confirm logout
  if (confirmLogoutModalBtn && !confirmLogoutModalBtn._hasListener) {
    confirmLogoutModalBtn._hasListener = true;
    confirmLogoutModalBtn.addEventListener('click', () => {
      sessionStorage.removeItem('current_logged_in_user');
      sessionStorage.removeItem('guest_placed_order_ids');
      if (logoutConfirmModal) logoutConfirmModal.classList.remove('show');
      initUserProfile();
      updateOrdersBadge();
      renderOrders();
      showToast('👋 Logged out successfully.', 'info', 2800);
    });
  }
}

// Call on load
initUserProfile();

/* ============================================================================
   DYNAMIC TESTIMONIALS & CUSTOMER FEEDBACK SYSTEM
   Enables customers to write reviews/feedback and shows them live on the page!
   ============================================================================ */

const DEFAULT_STORE_TESTIMONIALS = [
  {
    id: "rv_seed_1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The floral maxi dress I ordered is absolutely stunning! The fabric quality is incredible and it fits perfectly. Will definitely order again!",
    product: "Blossom Floral Maxi Dress",
    created_at: "2026-09-28T14:20:00Z"
  },
  {
    id: "rv_seed_2",
    name: "Anusha Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Fast delivery and beautiful packaging! The red evening gown looked even better in person. Received so many compliments at the party!",
    product: "Velvet Rouge Evening Gown",
    created_at: "2026-09-29T11:45:00Z"
  },
  {
    id: "rv_seed_3",
    name: "Sunita Patel",
    location: "Bangalore",
    rating: 4,
    text: "Great variety and affordable prices compared to other stores. The blue midi dress is my new favourite! Customer service was very helpful too.",
    product: "Azure Midi A-Line Dress",
    created_at: "2026-09-30T09:15:00Z"
  }
];

function getStoreTestimonials() {
  try {
    const saved = localStorage.getItem('april86-store-testimonials');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [...DEFAULT_STORE_TESTIMONIALS];
}

function saveStoreTestimonials(list) {
  try {
    localStorage.setItem('april86-store-testimonials', JSON.stringify(list));
  } catch (e) {}
}

function renderStarsString(rating) {
  const full = Math.min(5, Math.max(1, Math.round(rating)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function createTestimonialCardHTML(rev, isNew = false) {
  const initial = (rev.name || 'C').trim().charAt(0).toUpperCase();
  const stars = renderStarsString(rev.rating || 5);
  const location = rev.location || 'Tamil Nadu';
  const productTag = rev.product ? `<span class="feedback-product-tag"><i class="fa-solid fa-tag"></i> ${rev.product}</span>` : '';
  const dateStr = rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const dateHTML = dateStr ? `<span class="feedback-date">${dateStr}</span>` : '';

  return `
    <div class="testimonial-card ${isNew ? 'newly-added' : ''}" id="testi_${rev.id}">
      <div>
        <div class="card-top-row">
          <div class="stars">${stars}</div>
          <span class="verified-buyer-pill"><i class="fa-solid fa-circle-check"></i> Verified Buyer</span>
        </div>
        ${productTag}
        <p class="testimonial-text">"${rev.text}"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">${initial}</div>
        <div>
          <div class="author-name">${rev.name}</div>
          <div class="author-loc">${location}</div>
        </div>
        ${dateHTML}
      </div>
    </div>
  `;
}

function renderTestimonialsList(list = null) {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;
  const testimonials = list || getStoreTestimonials();
  container.innerHTML = testimonials.map(item => createTestimonialCardHTML(item)).join('');

  // Update average score badge
  const ratingBadge = document.getElementById('storeRatingAvg');
  if (ratingBadge && testimonials.length > 0) {
    const avg = testimonials.reduce((acc, cur) => acc + (Number(cur.rating) || 5), 0) / testimonials.length;
    ratingBadge.textContent = `${avg.toFixed(1)} / 5.0 Rating (${testimonials.length} Reviews)`;
  }
}

async function syncTestimonialsFromServer() {
  try {
    const res = await fetch(`${API_BASE}/api/reviews?_=` + Date.now());
    if (res.ok) {
      const serverReviews = await res.json();
      if (Array.isArray(serverReviews) && serverReviews.length > 0) {
        const local = getStoreTestimonials();
        const map = new Map();
        local.forEach(r => map.set(r.id, r));
        serverReviews.forEach(r => map.set(r.id, r));
        const merged = Array.from(map.values());
        saveStoreTestimonials(merged);
        renderTestimonialsList(merged);
      }
    }
  } catch (e) {
    // offline or static mode fallback works smoothly
  }
}

function initFeedbackModal() {
  const openBtn = document.getElementById('openFeedbackModalBtn');
  const modal = document.getElementById('feedbackModal');
  const overlay = document.getElementById('feedbackModalOverlay');
  const closeBtn = document.getElementById('closeFeedbackModalBtn');
  const cancelBtn = document.getElementById('cancelFeedbackModalBtn');
  const form = document.getElementById('storeFeedbackForm');

  const starPicker = document.getElementById('fbStarPicker');
  const starDesc = document.getElementById('fbStarDesc');
  const nameInput = document.getElementById('fbCustName');
  const cityInput = document.getElementById('fbCustCity');
  const productInput = document.getElementById('fbCustProduct');
  const textInput = document.getElementById('fbCustText');

  let selectedRating = 5;
  const STAR_DESCS = {
    1: '1.0 — Disappointed 😞',
    2: '2.0 — Needs Improvement 😕',
    3: '3.0 — Average / Okay 😐',
    4: '4.0 — Very Good 😊',
    5: '5.0 — Excellent! Loved it! 🤩'
  };

  function updateStars(val) {
    selectedRating = val;
    if (starPicker) {
      const stars = starPicker.querySelectorAll('.fb-star-btn');
      stars.forEach(s => {
        const r = parseInt(s.dataset.rating);
        s.classList.toggle('active', r <= val);
      });
    }
    if (starDesc) starDesc.textContent = STAR_DESCS[val] || `${val}.0 Stars`;
  }

  if (starPicker) {
    const stars = starPicker.querySelectorAll('.fb-star-btn');
    stars.forEach(star => {
      const val = parseInt(star.dataset.rating);
      star.addEventListener('mouseenter', () => {
        stars.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.rating) <= val));
      });
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
      });
      star.addEventListener('click', () => {
        updateStars(val);
      });
    });
  }

  function openModal() {
    // Auto-fill customer info if logged in or recently checked out
    const activeUser = getCurrentUser();
    if (activeUser && nameInput && !nameInput.value) {
      nameInput.value = activeUser.name || '';
    }
    if (activeUser && activeUser.city && cityInput && !cityInput.value) {
      cityInput.value = activeUser.city;
    } else if (typeof customerData !== 'undefined' && customerData && customerData.city && cityInput && !cityInput.value) {
      cityInput.value = customerData.city;
    }

    if (modal) modal.classList.add('show');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (nameInput?.value || '').trim();
      const city = (cityInput?.value || '').trim();
      const product = (productInput?.value || '').trim();
      const text = (textInput?.value || '').trim();

      if (!name) { showToast('Please enter your name', 'error'); return; }
      if (!city) { showToast('Please enter your city/location', 'error'); return; }
      if (!text || text.length < 10) { showToast('Please write at least 10 characters', 'error'); return; }

      const activeUser = getCurrentUser();
      const newReview = {
        id: 'rv_' + Date.now(),
        name: name,
        location: city,
        rating: selectedRating,
        product: product,
        text: text,
        user_id: activeUser ? activeUser.id : null,
        created_at: new Date().toISOString()
      };

      // 1. Save to localStorage
      const currentList = getStoreTestimonials();
      currentList.unshift(newReview);
      saveStoreTestimonials(currentList);

      // 2. Prepend live directly onto page!
      const grid = document.getElementById('testimonialsGrid');
      if (grid) {
        grid.insertAdjacentHTML('afterbegin', createTestimonialCardHTML(newReview, true));
        // Update average badge
        const ratingBadge = document.getElementById('storeRatingAvg');
        if (ratingBadge) {
          const avg = currentList.reduce((acc, cur) => acc + (Number(cur.rating) || 5), 0) / currentList.length;
          ratingBadge.textContent = `${avg.toFixed(1)} / 5.0 Rating (${currentList.length} Reviews)`;
        }
      }

      // 3. POST to backend server
      fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      }).catch(() => {});

      // 4. Reset & Close modal
      form.reset();
      updateStars(5);
      closeModal();

      showToast('💖 Thank you! Your review is now live on the page.', 'success', 3500);

      // 5. Smoothly scroll to reviews section
      const sec = document.getElementById('customerReviewsSection');
      if (sec) {
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

// Initialize dynamic testimonials & feedback modal
renderTestimonialsList();
initFeedbackModal();
syncTestimonialsFromServer();



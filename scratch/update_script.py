import re

new_products_code = """  },
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
];"""

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the end of PRODUCTS array (id 22 ending)
target_end = """    badge: "hot",
    category: "electronics",
    description: "Professional 4K mirrorless digital camera with interchangeable lens mount, optical stabilization, and ultra-fast autofocus."
  }
];"""

if target_end in content:
    content = content.replace(target_end, target_end[:-4] + new_products_code)
    print("Appended 35 new products successfully!")
else:
    print("ERROR: target_end not found!")

# 2. Update category-card click listener
old_cat_listener = """      // Map category to search
      if (filter === 'casual') searchQuery = 'casual';
      else if (filter === 'evening') searchQuery = 'evening';
      else if (filter === 'party') searchQuery = 'party';
      else if (filter === 'bridal') searchQuery = 'bridal';
      else if (filter === 'summer') searchQuery = 'summer';
      else if (filter === 'tshirt') searchQuery = 'tshirt';
      else if (filter === 'saree') searchQuery = 'saree';
      else if (filter === 'electronics') searchQuery = 'electronics';
      else searchQuery = '';"""

new_cat_listener = """      // Map category to search
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
      else searchQuery = '';"""

if old_cat_listener in content:
    content = content.replace(old_cat_listener, new_cat_listener)
    print("Updated category-card listener!")
else:
    print("ERROR: old_cat_listener not found!")

# 3. Add navFootwear, navOrnaments, footerFootwear, footerOrnaments handlers
old_nav_electronics = """  const navElectronics = document.getElementById('navElectronics');
  if (navElectronics) {
    navElectronics.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav('navElectronics');
      searchQuery = 'electronics';
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  }"""

new_nav_handlers = """  const navFootwear = document.getElementById('navFootwear');
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
  }"""

if old_nav_electronics in content:
    content = content.replace(old_nav_electronics, new_nav_handlers)
    print("Updated nav listeners!")
else:
    print("ERROR: old_nav_electronics not found!")

# 4. Add footerFootwear, footerOrnaments listeners
old_footer_electronics = """  const footerElectronics = document.getElementById('footerElectronics');
  if (footerElectronics) {
    footerElectronics.addEventListener('click', (e) => {
      e.preventDefault();
      if (navElectronics) navElectronics.click();
    });
  }"""

new_footer_handlers = """  const footerFootwear = document.getElementById('footerFootwear');
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
  }"""

if old_footer_electronics in content:
    content = content.replace(old_footer_electronics, new_footer_handlers)
    print("Updated footer listeners!")
else:
    print("ERROR: old_footer_electronics not found!")

# 5. Update results count phrasing from 'dresses found' to 'items found'
content = content.replace("resultsCount.textContent = '0 dresses found';", "resultsCount.textContent = '0 items found';")
content = content.replace("resultsCount.textContent = `${results.length} dress${results.length !== 1 ? 'es' : ''} found`;", "resultsCount.textContent = `${results.length} item${results.length !== 1 ? 's' : ''} found`;")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved script.js successfully!")

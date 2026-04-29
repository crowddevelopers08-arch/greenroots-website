export type CategoryKey =
  | "T-Shirts"
  | "Shirts"
  | "Pants"
  | "Watches"
  | "Shoes"
  | "Bags"
  | "Slippers";

export type Product = {
  id: number;
  name: string;
  sub: string;
  desc: string;
  badge?: string;
  img: string;
};

export const CAT: Record<
  CategoryKey,
  { subs: string[]; col: string; cnt: number; img: string }
> = {
  "T-Shirts": {
    subs: ["All", "Classic Tees", "Graphic Tees", "Polo Shirts", "Oversized"],
    col: "#C4A882",
    cnt: 8,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=560&fit=crop&q=80",
  },
  Shirts: {
    subs: ["All", "Casual Shirts", "Formal Shirts", "Denim Shirts", "Linen"],
    col: "#8AACC0",
    cnt: 6,
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=560&fit=crop&q=80",
  },
  Pants: {
    subs: ["All", "Jeans", "Formal Pants", "Cargo", "Shorts"],
    col: "#8A92BC",
    cnt: 7,
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=560&fit=crop&q=80",
  },
  Watches: {
    subs: ["All", "Analog", "Digital", "Smart", "Luxury"],
    col: "#C49A6C",
    cnt: 6,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=560&fit=crop&q=80",
  },
  Shoes: {
    subs: ["All", "Sneakers", "Formal", "Sports", "Boots"],
    col: "#6CA882",
    cnt: 8,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=560&fit=crop&q=80",
  },
  Bags: {
    subs: ["All", "Travel Bags", "Hand Bags", "Backpacks", "Laptop Bags"],
    col: "#C48880",
    cnt: 8,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=560&fit=crop&q=80",
  },
  Slippers: {
    subs: ["All", "Casual", "Beach", "Indoor", "Sport Slides"],
    col: "#9480C4",
    cnt: 6,
    img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=560&fit=crop&q=80",
  },
};

export const PRODS: Record<CategoryKey, Product[]> = {
  "T-Shirts": [
    { id: 1, name: "Essential Cotton Tee", sub: "Classic Tees", desc: "100% organic cotton, relaxed fit", badge: "New", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80" },
    { id: 2, name: "Washed Graphic Tee", sub: "Graphic Tees", desc: "Vintage-washed with artistic print", img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop&q=80" },
    { id: 3, name: "Pique Polo", sub: "Polo Shirts", desc: "Classic pique knit, breathable cotton", badge: "New", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop&q=80" },
    { id: 4, name: "Oversized Drop Tee", sub: "Oversized", desc: "Boxy silhouette, dropped shoulders", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop&q=80" },
    { id: 5, name: "Striped Breton", sub: "Classic Tees", desc: "Nautical stripes, fine jersey cotton", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=800&fit=crop&q=80" },
    { id: 6, name: "Minimal Logo Tee", sub: "Graphic Tees", desc: "Subtle tonal embroidery, premium cotton", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&q=80" },
    { id: 7, name: "Slim Polo", sub: "Polo Shirts", desc: "Tailored fit, moisture-wicking fabric", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop&q=80" },
    { id: 8, name: "Heavyweight Crew", sub: "Oversized", desc: "450gsm fleece, unisex sizing", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&q=80" },
  ],
  Shirts: [
    { id: 10, name: "Oxford Button-Down", sub: "Casual Shirts", desc: "Classic oxford weave, button-down collar", badge: "New", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80" },
    { id: 11, name: "Slim Dress Shirt", sub: "Formal Shirts", desc: "Fine poplin, tailored slim silhouette", img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=800&fit=crop&q=80" },
    { id: 12, name: "Indigo Denim Shirt", sub: "Denim Shirts", desc: "Japanese selvedge denim, faded wash", img: "https://images.unsplash.com/photo-1594938298603-c8148c4b2cfa?w=600&h=800&fit=crop&q=80" },
    { id: 13, name: "Linen Resort Shirt", sub: "Linen", desc: "Breezy linen blend, camp collar", badge: "New", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80" },
    { id: 14, name: "Flannel Check Shirt", sub: "Casual Shirts", desc: "Brushed flannel, relaxed fit", img: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=800&fit=crop&q=80" },
    { id: 15, name: "Mandarin Collar Shirt", sub: "Formal Shirts", desc: "Clean minimal collar, stretch cotton", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop&q=80" },
  ],
  Pants: [
    { id: 20, name: "Slim Taper Jeans", sub: "Jeans", desc: "12oz denim, slim taper from knee", badge: "New", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80" },
    { id: 21, name: "Straight Leg Jeans", sub: "Jeans", desc: "Classic straight cut, vintage wash", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80" },
    { id: 22, name: "Wool Dress Trousers", sub: "Formal Pants", desc: "Italian wool blend, pleated front", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80" },
    { id: 23, name: "Slim Chinos", sub: "Formal Pants", desc: "Stretch cotton twill, tapered leg", badge: "New", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop&q=80" },
    { id: 24, name: "Multi-Pocket Cargo", sub: "Cargo", desc: "Ripstop nylon, utility pockets", img: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=800&fit=crop&q=80" },
    { id: 25, name: "Tech Cargo Pants", sub: "Cargo", desc: "Weatherproof fabric, articulated knees", img: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&h=800&fit=crop&q=80" },
    { id: 26, name: "Linen Pull-On Shorts", sub: "Shorts", desc: "Drawstring waist, side pockets", img: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&h=800&fit=crop&q=80" },
  ],
  Watches: [
    { id: 30, name: "Minimalist Field Watch", sub: "Analog", desc: "36mm case, sapphire crystal, leather strap", badge: "New", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&q=80" },
    { id: 31, name: "Dive Watch Pro", sub: "Analog", desc: "200m water resistant, rotating bezel", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=800&fit=crop&q=80" },
    { id: 32, name: "Digital Sport Watch", sub: "Digital", desc: "Multi-function display, tough resin case", img: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&h=800&fit=crop&q=80" },
    { id: 33, name: "Fitness Tracker Elite", sub: "Smart", desc: "AMOLED display, health monitoring", badge: "New", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=800&fit=crop&q=80" },
    { id: 34, name: "Classic Dress Watch", sub: "Luxury", desc: "Swiss movement, alligator leather band", img: "https://images.unsplash.com/photo-1548171915-e79a380a2a4e?w=600&h=800&fit=crop&q=80" },
    { id: 35, name: "Chronograph Pilot", sub: "Luxury", desc: "Aviation-inspired, stainless steel case", img: "https://images.unsplash.com/photo-1594534475808-b18acae9d50b?w=600&h=800&fit=crop&q=80" },
  ],
  Shoes: [
    { id: 40, name: "Canvas Low-Top", sub: "Sneakers", desc: "Vulcanised sole, cotton canvas upper", badge: "New", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80" },
    { id: 41, name: "Leather Runner", sub: "Sneakers", desc: "Full-grain leather, responsive foam sole", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop&q=80" },
    { id: 42, name: "Oxford Brogue", sub: "Formal", desc: "Calfskin leather, Goodyear welt construction", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=800&fit=crop&q=80" },
    { id: 43, name: "Derby Plain-Toe", sub: "Formal", desc: "Burnished leather, classic silhouette", badge: "New", img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop&q=80" },
    { id: 44, name: "Trail Runner", sub: "Sports", desc: "Grippy outsole, breathable mesh upper", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop&q=80" },
    { id: 45, name: "Chelsea Boot", sub: "Boots", desc: "Elastic side panels, stacked leather heel", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop&q=80" },
    { id: 46, name: "Desert Boot", sub: "Boots", desc: "Suede upper, crepe rubber sole", img: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&h=800&fit=crop&q=80" },
    { id: 47, name: "Cross-Trainer Pro", sub: "Sports", desc: "Lateral support, responsive cushioning", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=800&fit=crop&q=80" },
  ],
  Bags: [
    { id: 50, name: "Weekend Duffle", sub: "Travel Bags", desc: "Full-grain leather trim, 40L capacity", badge: "New", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80" },
    { id: 51, name: "Rolling Trolley", sub: "Travel Bags", desc: "Polycarbonate shell, TSA lock", img: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&h=800&fit=crop&q=80" },
    { id: 52, name: "Structured Tote", sub: "Hand Bags", desc: "Pebbled leather, magnetic snap closure", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80" },
    { id: 53, name: "Mini Crossbody", sub: "Hand Bags", desc: "Adjustable chain strap, suede lining", badge: "New", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80" },
    { id: 54, name: "Canvas Daypack", sub: "Backpacks", desc: "Waxed canvas, leather base panel", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop&q=80" },
    { id: 55, name: "Technical Backpack", sub: "Backpacks", desc: "Modular organisation system, 26L", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=800&fit=crop&q=80" },
    { id: 56, name: "Slim Laptop Sleeve", sub: "Laptop Bags", desc: 'Padded neoprene, fits 14-16"', badge: "New", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=800&fit=crop&q=80" },
    { id: 57, name: "Executive Briefcase", sub: "Laptop Bags", desc: "Full-grain leather, combination lock", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80" },
  ],
  Slippers: [
    { id: 60, name: "Suede Mule", sub: "Casual", desc: "Genuine suede, memory foam footbed", badge: "New", img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop&q=80" },
    { id: 61, name: "Leather Slide", sub: "Casual", desc: "Full-grain leather upper, EVA sole", img: "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&h=800&fit=crop&q=80" },
    { id: 62, name: "Resort Flip-Flop", sub: "Beach", desc: "Quick-dry straps, non-slip grip sole", img: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&h=800&fit=crop&q=80" },
    { id: 63, name: "Woven Jute Sandal", sub: "Beach", desc: "Natural jute platform, ankle strap", img: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&h=800&fit=crop&q=80" },
    { id: 64, name: "Sherpa Slipper", sub: "Indoor", desc: "Plush sherpa lining, anti-slip rubber sole", img: "https://images.unsplash.com/photo-1520219306100-ec4afbdb2a06?w=600&h=800&fit=crop&q=80" },
    { id: 65, name: "Sport Slide", sub: "Sport Slides", desc: "Contoured footbed, adjustable strap", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop&q=80" },
  ],
};

export const TICKER_ITEMS = [
  "Premium Quality",
  "Enquire Within 24h",
  "Worldwide Delivery",
  "Handcrafted Selection",
  "Free Consultation",
  "Request a Quote",
  "New Collection 2026",
  "Luxury Essentials",
  "Italian Sourced Leather",
  "Sustainable Materials",
];

export const HERO_SCARDS = [
  { cat: "Bags" as CategoryKey, name: "Structured Tote", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=180&fit=crop&q=80" },
  { cat: "Watches" as CategoryKey, name: "Field Watch", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=180&fit=crop&q=80" },
  { cat: "Shoes" as CategoryKey, name: "Leather Runner", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=180&fit=crop&q=80" },
];

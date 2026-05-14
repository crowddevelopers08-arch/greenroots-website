export type CategoryKey =
  | "Apparel"
  | "Bags"
  | "Electronics"
  | "Home Appliances"
  | "Premium Gifts"
  | "Water Bottles";

export type Product = {
  id: number;
  name: string;
  sub: string;
  desc: string;
  badge?: string;
  img: string;
};

export const BS_GALLERY_IMAGES = [
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0001_cevnam",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0002_ejzvtb",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0003_s4bzye",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0004_vfi1sy",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0005_qzyw9d",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0006_kmpeye",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0007_nhfncg",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0008_xprmar",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0009_axa4wc",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0010_hejjvf",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0011_tmsrfk",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0012_cnvumh",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0013_htzpmd",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0014_u3t0mu",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0015_oevwtd",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0016_elsmc3",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0017_rovbct",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0018_jptvq3",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0019_ghw1zn",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0020_a8t7nv",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0021_ijg5pv",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0022_x94vho",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0023_piryrz",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0024_n59tdg",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0025_w8lz14",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0026_grt65u",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0027_exqpkn",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0028_hqas4s",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0029_vznlpa",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0030_sixguc",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0031_uiiz2t",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0032_jpdxaq",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0033_wqx6dm",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0034_lbieoo",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0035_itzrrt",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0036_sfeheu",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0037_tgld8t",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0038_sp8occ",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0039_brqqbi",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0040_k6tpf1",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0041_v8l2lg",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0042_byqivv",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0043_fhwoor",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0044_xczj7l",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0045_simq7a",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0046_dy0eg2",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0047_cb2k5z",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0048_skukde",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0049_azgvd4",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0050_ajoggk",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0051_ickypa",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0052_lwk2ys",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0053_tmvdjh",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0054_njaq0n",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0055_lvmonw",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0056_mygaxt",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0057_t0sxzs",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0058_p3wih6",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0059_ub6fw4",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0060_caqrca",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0061_rgiqer",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0062_qmthvg",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0063_dmxe5z",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0064_tkmdjf",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0065_vw9vpz",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0066_qozsft",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0067_w6dfia",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0068_dwla6p",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0069_cctnma",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0070_d8he14",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0071_wv0fba",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0072_h2mqwf",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0073_i56nbv",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0074_vxiazt",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0075_zccyrr",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0076_ovi8sb",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0077_zcat2h",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0078_r9htfq",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0079_a4fk3x",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0080_lkomq5",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0081_l7sc5v",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0082_vikarw",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0083_xcngmb",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0084_zcujpk",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0085_haslpk",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0086_yruuiz",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0087_faiyw2",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0088_qsqf96",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0089_ubaacx",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0090_re5res",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0091_uidsjj",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0092_gpsid6",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0093_axyzzv",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0094_ku6szc",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0095_tgcxfu",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0096_pzxuyo",
  "https://res.cloudinary.com/diezixk4v/image/upload/BS_-_Stocks_17th_Aug_2024_1__page-0097_zyj0kq",
];

const APPAREL_IMAGE =
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80";
const APPAREL_IMAGE_2 =
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80";
const APPAREL_IMAGE_3 =
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80";
const BAGS_IMAGE =
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80";
const BAGS_IMAGE_2 =
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80";
const BAGS_IMAGE_3 =
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80";
const ELECTRONICS_IMAGE =
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80";
const ELECTRONICS_IMAGE_2 =
  "https://images.unsplash.com/photo-1546435770-a3e736b19889?auto=format&fit=crop&w=900&q=80";
const ELECTRONICS_IMAGE_3 =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80";
const HOME_APPLIANCES_IMAGE =
  "https://images.unsplash.com/photo-1745166439895-3e6126e18370?auto=format&fit=crop&w=900&q=80";
const HOME_APPLIANCES_IMAGE_2 =
  "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=900&q=80";
const HOME_APPLIANCES_IMAGE_3 =
  "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=900&q=80";
const PREMIUM_GIFTS_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80";
const PREMIUM_GIFTS_IMAGE_2 =
  "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=900&q=80";
const PREMIUM_GIFTS_IMAGE_3 =
  "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=900&q=80";
const WATER_BOTTLES_IMAGE =
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80";
const WATER_BOTTLES_IMAGE_2 =
  "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80";
const WATER_BOTTLES_IMAGE_3 =
  "https://images.unsplash.com/photo-1556195332-95503f664ced?auto=format&fit=crop&w=900&q=80";

export const CAT: Record<
  CategoryKey,
  { subs: string[]; col: string; cnt: number; img: string }
> = {
  Apparel: {
    subs: ["All", "BS", "PUMA", "Rare Rabbit", "SWISS MILITARY", "Adidas", "ALLEN SOLLY", "Reebok", "VANHEUSEN", "Crocodile Polo"],
    col: "#C4A882",
    cnt: 9,
    img: APPAREL_IMAGE,
  },
  Bags: {
    subs: ["All", "FD CAT Travel Bags", "TBB", "Artistix", "2024 Tucano", "Fur Jaden", "The House Of Creas", "Delsey Paris", "SWISS MILITARY", "Wildcraft", "Safari"],
    col: "#8AACC0",
    cnt: 10,
    img: BAGS_IMAGE,
  },
  Electronics: {
    subs: ["All", "Hammer", "Ambrane", "SkullCandy", "JBL B2B", "MIVI", "Philips", "Xecch", "Blaupunkt", "Noise"],
    col: "#6CA882",
    cnt: 9,
    img: ELECTRONICS_IMAGE,
  },
  "Home Appliances": {
    subs: ["All", "Diva & La Opala", "Kent Corporate Gifting", "Kutchina", "Skyline", "Zarah and Dazzle", "FABER", "Franke Faber", "Havells", "Hawkins", "Wonderchef", "BOROSIL", "BOROSIL BOTTLE & APPLIANCE"],
    col: "#C49A6C",
    cnt: 12,
    img: HOME_APPLIANCES_IMAGE,
  },
  "Premium Gifts": {
    subs: ["All", "Sheaffer", "Lapis Bard", "Parker", "Picassio Parri"],
    col: "#8A92BC",
    cnt: 4,
    img: PREMIUM_GIFTS_IMAGE,
  },
  "Water Bottles": {
    subs: ["All", "AQUAMINDER", "Glasafe", "Artiart", "Divine Copper", "Headway", "Borosil", "B4-BOT", "Bot-All"],
    col: "#7AACB8",
    cnt: 8,
    img: WATER_BOTTLES_IMAGE,
  },
};

export const PRODS: Record<CategoryKey, Product[]> = {
  Apparel: [
    {
      id: 1,
      name: "BS",
      sub: "BS",
      desc: "Premium formal shirts, crisp cotton fabric, tailored for the modern professional",
      badge: "New",
      img: BS_GALLERY_IMAGES[0],
    },
    {
      id: 2,
      name: "PUMA",
      sub: "PUMA",
      desc: "High-performance sportswear, innovative DryCELL technology, bold athletic designs",
      img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Rare Rabbit",
      sub: "Rare Rabbit",
      desc: "Contemporary fashion shirts, premium linen blends, resort and office-ready styles",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 4,
      name: "SWISS MILITARY",
      sub: "SWISS MILITARY",
      desc: "Durable outdoor and sports apparel, water-resistant finishes, ergonomic active cuts",
      img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 5,
      name: "Adidas",
      sub: "Adidas",
      desc: "Iconic sportswear tees, moisture-wicking Climalite fabric, relaxed athletic fit",
      badge: "New",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 6,
      name: "ALLEN SOLLY",
      sub: "ALLEN SOLLY",
      desc: "Classic Oxford weave shirts, button-down collar, slim tailored corporate fit",
      img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 7,
      name: "Reebok",
      sub: "Reebok",
      desc: "100% cotton jersey tees, iconic Reebok branding, everyday comfort and style",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 8,
      name: "VANHEUSEN",
      sub: "VANHEUSEN",
      desc: "Fine poplin cotton shirts, wrinkle-resistant finish, tailored professional silhouette",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 9,
      name: "Crocodile Polo",
      sub: "Crocodile Polo",
      desc: "Premium pique knit polo shirts, embroidered logo, classic three-button placket",
      badge: "New",
      img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop&q=80",
    },
  ],

  Bags: [
    {
      id: 20,
      name: "FD CAT Travel Bags",
      sub: "FD CAT Travel Bags",
      desc: "Durable travel bags, spacious compartments, built for frequent travelers",
      badge: "New",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 21,
      name: "TBB",
      sub: "TBB",
      desc: "PU leather executive bags, quick-access document sleeve, padded laptop compartment",
      img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 22,
      name: "Artistix",
      sub: "Artistix",
      desc: "Bold graphic backpacks, water-resistant base, 20L main compartment",
      img: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 23,
      name: "2024 Tucano",
      sub: "2024 Tucano",
      desc: "Italian designed laptop bags, fits 15.6\" laptops, padded air-flow back panel",
      badge: "New",
      img: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 24,
      name: "Fur Jaden",
      sub: "Fur Jaden",
      desc: "Vegan leather accent backpacks, anti-theft back pocket, USB charging port",
      img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 25,
      name: "The House Of Creas",
      sub: "The House Of Creas",
      desc: "Artisan-crafted backpacks, premium materials, distinctive design language",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 26,
      name: "Delsey Paris",
      sub: "Delsey Paris",
      desc: "Polycarbonate shell trolleys, 360° spinner wheels, TSA combination lock",
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 27,
      name: "SWISS MILITARY",
      sub: "SWISS MILITARY",
      desc: "Military-grade nylon shell bags, reinforced zippers, spacious organized compartments",
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 28,
      name: "Wildcraft",
      sub: "Wildcraft",
      desc: "30L adventure backpacks, padded laptop sleeve, ergonomic shoulder straps",
      badge: "New",
      img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 29,
      name: "Safari",
      sub: "Safari",
      desc: "Lightweight ABS trolleys, expandable zip compartment, secure wheel housing",
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80",
    },
  ],

  Electronics: [
    {
      id: 40,
      name: "Hammer",
      sub: "Hammer",
      desc: "High-fidelity true wireless earbuds, deep bass drivers, foldable wireless design",
      badge: "New",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 41,
      name: "Ambrane",
      sub: "Ambrane",
      desc: "20000mAh power banks, 22.5W fast charge, dual output Type-C and USB-A",
      img: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 42,
      name: "SkullCandy",
      sub: "SkullCandy",
      desc: "Premium over-ear headphones, sensory bass, 40hr battery, adjustable haptic feedback",
      img: "https://images.unsplash.com/photo-1546435770-a3e736b19889?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 43,
      name: "JBL B2B",
      sub: "JBL B2B",
      desc: "Professional JBL audio solutions, pure bass sound, IPX5 water-resistant designs",
      badge: "New",
      img: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 44,
      name: "MIVI",
      sub: "MIVI",
      desc: "Made in India earbuds, 13mm drivers, quad microphones, 48hr playback",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 45,
      name: "Philips",
      sub: "Philips",
      desc: "Rich stereo speakers, Bluetooth 5.0, compact portable design, premium sound",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 46,
      name: "Xecch",
      sub: "Xecch",
      desc: "Cutting-edge wireless earbuds, active noise cancellation, extended playtime",
      img: "https://images.unsplash.com/photo-1546435770-a3e736b19889?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 47,
      name: "Blaupunkt",
      sub: "Blaupunkt",
      desc: "360° surround sound Bluetooth speakers, IPX6 waterproof, 12hr playtime, TWS mode",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 48,
      name: "Noise",
      sub: "Noise",
      desc: "Active noise cancellation earbuds, hyper sync technology, 50hr total playtime",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=800&fit=crop&q=80",
    },
  ],

  "Home Appliances": [
    {
      id: 60,
      name: "Diva & La Opala",
      sub: "Diva & La Opala",
      desc: "Premium opalware dinner sets, 27-piece collections, dishwasher-safe chip-resistant edges",
      badge: "New",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 61,
      name: "Kent Corporate Gifting",
      sub: "Kent Corporate Gifting",
      desc: "RO+UV+UF water purifiers, 8L storage tank, mineral retention technology",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 62,
      name: "Kutchina",
      sub: "Kutchina",
      desc: "Premium kitchen chimneys and hobs, high suction capacity, auto-clean technology",
      img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 63,
      name: "Skyline",
      sub: "Skyline",
      desc: "Modern kitchen appliances, innovative designs, reliable performance for everyday cooking",
      badge: "New",
      img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 64,
      name: "Zarah and Dazzle",
      sub: "Zarah and Dazzle",
      desc: "Stylish kitchen accessories, premium quality cookware, elegant gifting collections",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 65,
      name: "FABER",
      sub: "FABER",
      desc: "1200 m³/hr suction chimneys, baffle filter, auto-clean with touch control panel",
      img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 66,
      name: "Franke Faber",
      sub: "Franke Faber",
      desc: "Swiss precision kitchen solutions, premium sinks, faucets, and kitchen accessories",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 67,
      name: "Havells",
      sub: "Havells",
      desc: "750W mixer grinders, 3 stainless steel jars, overload protection, wide appliance range",
      img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 68,
      name: "Hawkins",
      sub: "Hawkins",
      desc: "Hard anodised pressure cookers, 5L capacity, gasket release system, trusted legacy brand",
      img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 69,
      name: "Wonderchef",
      sub: "Wonderchef",
      desc: "Nutri-blend mixers, hard anodised cookware sets, induction compatible, PFOA-free",
      badge: "New",
      img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 70,
      name: "BOROSIL",
      sub: "BOROSIL",
      desc: "Borosilicate glassware, 1.0L electric kettles, 1500W cordless swivel base designs",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 71,
      name: "BOROSIL BOTTLE & APPLIANCE",
      sub: "BOROSIL BOTTLE & APPLIANCE",
      desc: "Premium Borosil water bottles and small kitchen appliances, trusted quality and design",
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=800&fit=crop&q=80",
    },
  ],

  "Premium Gifts": [
    {
      id: 80,
      name: "Sheaffer",
      sub: "Sheaffer",
      desc: "Glossy black lacquer rollerballs, palladium trim, premium fountain pen and ballpoint combos",
      badge: "New",
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 81,
      name: "Lapis Bard",
      sub: "Lapis Bard",
      desc: "Luxury pen, card holder and cufflinks trios, gold plating, premium branded packaging",
      img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 82,
      name: "Parker",
      sub: "Parker",
      desc: "18k gold-plated nib fountain pens, Jotter duo sets, stainless steel executive gift boxes",
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 83,
      name: "Picassio Parri",
      sub: "Picassio Parri",
      desc: "Iridium-tipped fountain pen sets, ornate gift case, 3 premium ink cartridges included",
      badge: "New",
      img: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&h=800&fit=crop&q=80",
    },
  ],

  "Water Bottles": [
    {
      id: 100,
      name: "AQUAMINDER",
      sub: "AQUAMINDER",
      desc: "Hydration reminder LED, 750ml, vacuum-insulated double wall, smart bottle technology",
      badge: "New",
      img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 101,
      name: "Glasafe",
      sub: "Glasafe",
      desc: "500ml crystal-clear borosilicate glass, anti-slip sleeve, dishwasher-safe design",
      img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 102,
      name: "Artiart",
      sub: "Artiart",
      desc: "Suction-base innovation, 450ml borosilicate glass, non-slip desk-friendly design",
      img: "https://images.unsplash.com/photo-1571950006183-89d3c4a31e99?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 103,
      name: "Divine Copper",
      sub: "Divine Copper",
      desc: "Pure copper bottles, hand-etched floral design, Ayurvedic wellness benefits",
      badge: "New",
      img: "https://images.unsplash.com/photo-1629803915328-89ac8a9e22c0?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 104,
      name: "Headway",
      sub: "Headway",
      desc: "18/8 food-grade steel, 1L insulated, 24hr cold and 12hr hot retention, leak-proof lid",
      img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 105,
      name: "Borosil",
      sub: "Borosil",
      desc: "Borosilicate glass bottles, protective silicone sleeve, screw-top stainless steel cap",
      img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 106,
      name: "B4-BOT",
      sub: "B4-BOT",
      desc: "BPA-free stainless steel bottles, powder-coated finish, wide-mouth flip cap design",
      img: "https://images.unsplash.com/photo-1556195332-95503f664ced?w=600&h=800&fit=crop&q=80",
    },
    {
      id: 107,
      name: "Bot-All",
      sub: "Bot-All",
      desc: "500ml sport bottles, durable powder-coated finish, wide-mouth flip cap, BPA-free",
      img: "https://images.unsplash.com/photo-1556195332-95503f664ced?w=600&h=800&fit=crop&q=80",
    },
  ],
};

export const TICKER_ITEMS = [
  "Premium Corporate Gifting",
  "Enquire Within 24h",
  "Pan-India Delivery",
  "Curated Brand Selection",
  "Free Consultation",
  "Request a Quote",
  "New Catalogues 2024-25",
  "Bulk Order Discounts",
  "50+ Premium Brands",
  "Custom Branding Available",
];

export const HERO_SCARDS = [
  { cat: "Bags" as CategoryKey, name: "Wildcraft", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&h=180&fit=crop&q=80" },
  { cat: "Electronics" as CategoryKey, name: "JBL B2B", img: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=300&h=180&fit=crop&q=80" },
  { cat: "Apparel" as CategoryKey, name: "Crocodile Polo", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=180&fit=crop&q=80" },
];

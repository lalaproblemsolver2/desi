export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUrdu: string;
  category: 'cow-ghee' | 'buffalo-ghee' | 'a2-ghee' | 'makhan' | 'gift-box';
  shortDescription: string;
  description: string;
  priceFrom: number;
  sizes: { label: string; weight: string; price: number; stock: number }[];
  images: string[];
  badge?: string;
  bestSeller?: boolean;
  benefits: string[];
  howMade: string;
  storage: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'desi-cow-ghee-bilona',
    name: 'Desi Cow Ghee (Bilona)',
    nameUrdu: ' desi گھی',
    category: 'cow-ghee',
    shortDescription: 'Traditional Bilona hand-churned cow ghee — golden, aromatic, pure.',
    description: 'Our signature Desi Cow Ghee is made using the ancient Bilona method. Milk from grass-fed indigenous cows is boiled, set into curd in clay pots, then hand-churned with a wooden madhani to extract makhan, which is slow-cooked on wood fire into golden ghee. No machines, no shortcuts — just purity you can taste.',
    priceFrom: 1200,
    sizes: [
      { label: '250g', weight: '250g', price: 1200, stock: 45 },
      { label: '500g', weight: '500g', price: 2200, stock: 30 },
      { label: '1kg', weight: '1kg', price: 4200, stock: 15 },
    ],
    images: ['/images/cow-ghee.svg'],
    badge: 'Best Seller',
    bestSeller: true,
    benefits: ['Rich in Vitamin A & K2', 'Aids digestion', 'Boosts immunity', 'High smoke point'],
    howMade: 'Grass-fed cow milk → boiled → curd set in clay pot → hand-churned with wooden madhani → makhan extracted → slow-cooked on wood fire',
    storage: 'Store in a cool, dry place away from direct sunlight. No refrigeration needed. Use a clean, dry spoon.',
    rating: 4.9,
    reviewCount: 218,
  },
  {
    id: 'p2',
    slug: 'desi-buffalo-ghee',
    name: 'Desi Buffalo Ghee',
    nameUrdu: 'بھینس کا desi گھی',
    category: 'buffalo-ghee',
    shortDescription: 'Creamier, richer buffalo ghee — perfect for cooking and traditional recipes.',
    description: 'Made from the milk of free-grazing buffaloes, our Desi Buffalo Ghee is thicker and whiter than cow ghee, with a distinct rich flavor. Prepared using the same Bilona method for authentic taste and maximum nutrition.',
    priceFrom: 2000,
    sizes: [
      { label: '500g', weight: '500g', price: 2000, stock: 28 },
      { label: '1kg', weight: '1kg', price: 3800, stock: 20 },
    ],
    images: ['/images/buffalo-ghee.svg'],
    benefits: ['Higher fat content', 'Rich in calcium', 'Excellent for cooking', 'Longer shelf life'],
    howMade: 'Buffalo milk → boiled → curd set → hand-churned → makhan extracted → slow-cooked on wood fire',
    storage: 'Store in a cool, dry place. No refrigeration needed.',
    rating: 4.7,
    reviewCount: 142,
  },
  {
    id: 'p3',
    slug: 'a2-cow-ghee-premium',
    name: 'A2 Cow Ghee (Premium)',
    nameUrdu: 'A2 desi گھی',
    category: 'a2-ghee',
    shortDescription: 'Premium A2 protein ghee from indigenous Sahiwal and Gir cows.',
    description: 'Our most premium offering — A2 Cow Ghee made exclusively from the milk of indigenous Sahiwal and Gir cow breeds. These cows produce A2 beta-casein protein, which is easier to digest and considered superior in Ayurvedic tradition. Every batch is Bilona-method, lab-tested, and traceable to the farm.',
    priceFrom: 1800,
    sizes: [
      { label: '250g', weight: '250g', price: 1800, stock: 22 },
      { label: '500g', weight: '500g', price: 3400, stock: 18 },
      { label: '1kg', weight: '1kg', price: 6400, stock: 8 },
    ],
    images: ['/images/a2-ghee.svg'],
    badge: 'Premium',
    bestSeller: true,
    benefits: ['A2 protein — easier to digest', 'Highest CLA content', 'Ayurvedic superfood', 'Rich, nutty aroma'],
    howMade: 'A2 cow milk (Sahiwal/Gir) → boiled → curd in clay pot → hand-churned with madhani → makhan → slow-cooked on wood fire',
    storage: 'Store in a cool, dry place away from sunlight. Use clean, dry spoon.',
    rating: 5.0,
    reviewCount: 96,
  },
  {
    id: 'p4',
    slug: 'desi-makhan-white-butter',
    name: 'Desi Makhan (White Butter)',
    nameUrdu: ' desi مکھن',
    category: 'makhan',
    shortDescription: 'Fresh hand-churned white butter — the intermediate treasure before ghee.',
    description: 'Before ghee comes makhan — the fresh, creamy white butter extracted by hand-churning curd. Our Desi Makhan is soft, fragrant, and perfect for spreading on parathas or adding to your favorite dishes. Made fresh in small batches.',
    priceFrom: 900,
    sizes: [
      { label: '250g', weight: '250g', price: 900, stock: 12 },
      { label: '500g', weight: '500g', price: 1700, stock: 10 },
    ],
    images: ['/images/makhan.svg'],
    badge: 'Fresh',
    benefits: ['Natural probiotics', 'Rich, creamy texture', 'No added salt', 'Made fresh weekly'],
    howMade: 'Curd hand-churned with wooden madhani → makhan separated → lightly seasoned → packed fresh',
    storage: 'Refrigerate immediately. Consume within 7 days. Do not freeze.',
    rating: 4.8,
    reviewCount: 73,
  },
  {
    id: 'p5',
    slug: 'family-combo-gift-box',
    name: 'Family Combo Gift Box',
    nameUrdu: 'فتلی کمبو پیک',
    category: 'gift-box',
    shortDescription: 'The perfect gift — Cow Ghee + A2 Ghee + Makhan in a beautiful gift box.',
    description: 'A thoughtfully curated gift box for your loved ones. Contains one 250g Desi Cow Ghee, one 250g A2 Cow Ghee, and one 250g Desi Makhan, beautifully packaged in a premium wooden gift box with jute lining. Ideal for Eid, weddings, and corporate gifts.',
    priceFrom: 4500,
    sizes: [
      { label: 'Standard', weight: '3 × 250g', price: 4500, stock: 25 },
      { label: 'Premium', weight: '3 × 500g', price: 8500, stock: 12 },
    ],
    images: ['/images/gift-box.svg'],
    badge: 'Gift Box',
    bestSeller: true,
    benefits: ['3 products in one box', 'Premium wooden packaging', 'Perfect for gifting', 'Save Rs. 500'],
    howMade: 'Curated from our finest Bilona ghee and fresh makhan, packaged in a handcrafted wooden box.',
    storage: 'Store ghee at room temperature. Refrigerate makhan immediately.',
    rating: 4.9,
    reviewCount: 54,
  },
];

export const productCategories = [
  { id: 'cow-ghee', name: 'Cow Ghee', nameUrdu: 'گائے کا گھی' },
  { id: 'buffalo-ghee', name: 'Buffalo Ghee', nameUrdu: 'بھینس کا گھی' },
  { id: 'a2-ghee', name: 'A2 Ghee', nameUrdu: 'A2 گھی' },
  { id: 'makhan', name: 'Makhan', nameUrdu: 'مکھن' },
  { id: 'gift-box', name: 'Gift Boxes', nameUrdu: 'فتری پیک' },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const product = getProduct(slug);
  if (!product) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug && p.category === product.category).concat(
    products.filter((p) => p.slug !== slug && p.category !== product.category)
  ).slice(0, limit);
}

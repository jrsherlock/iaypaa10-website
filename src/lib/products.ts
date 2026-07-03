export type ProductCategory = "apparel" | "accessories" | "stickers";

export type Product = {
  id: string;
  name: string;
  /** One plain line — what it is, no wink. */
  description: string;
  /** Typewriter spec caption (material / cut), catalogue-plate voice. */
  spec: string;
  price: number;
  image: string;
  category: ProductCategory;
  printfulUrl: string;
  /** Quiet typewriter tag, not a bright pill ("first run", "new", …). */
  badge?: string;
  /** The lead specimen — gets the full asymmetric plate at the top. */
  featured?: boolean;
  soldOut?: boolean;
};

export const PRINTFUL_STORE_URL = "https://your-store.printful.me";

// Placeholder photography (Unsplash) until the real product shots are in.
// Swap the `image` values for /merch/*.webp when they land — nothing else
// needs to change.
const ph = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "primordial-ooze-hoodie",
    name: "Primordial Ooze Hoodie",
    description:
      "Heavyweight black hoodie carrying the tenth-anniversary mark.",
    spec: "Heavyweight fleece · unisex · S–3XL",
    price: 45.0,
    image: ph("photo-1556821840-3a63f95609a7"),
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/primordial-ooze-hoodie`,
    badge: "Most ordered",
    featured: true,
  },
  {
    id: "ooze-tee",
    name: "Primordial Ooze Tee",
    description:
      "The conference artwork on a soft, true-black premium tee.",
    spec: "Combed cotton · unisex · S–3XL",
    price: 25.0,
    image: ph("photo-1521572163474-6864f9cf17ab"),
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-tee`,
  },
  {
    id: "iaypaa-x-longsleeve",
    name: "IAYPAA X Long Sleeve",
    description:
      "Commemorative long sleeve marking a decade, with a back print.",
    spec: "Mid-weight cotton · front + back · S–2XL",
    price: 30.0,
    image: ph("photo-1620799140408-edc6dcb6d633"),
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/iaypaa-x-longsleeve`,
    badge: "New",
  },
  {
    id: "ooze-trucker-hat",
    name: "IAYPAA X Trucker Hat",
    description: "Embroidered front mark on a structured snapback.",
    spec: "Foam-front snapback · one size",
    price: 22.0,
    image: ph("photo-1588850561407-ed78c282e89b"),
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-trucker-hat`,
  },
  {
    id: "slime-tote",
    name: "Conference Tote",
    description:
      "Heavy canvas tote, roomy enough for a Big Book and a coffee.",
    spec: "12 oz canvas · 15\" × 16\"",
    price: 18.0,
    image: ph("photo-1597481499750-3e6b22637e12"),
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/slime-tote`,
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack",
    description:
      "Die-cut vinyl set of the conference artwork. Stick it anywhere.",
    spec: "Five die-cut vinyl · weatherproof",
    price: 8.0,
    image: ph("photo-1612965607446-25e1332775ae"),
    category: "stickers",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/sticker-pack`,
    badge: "First run",
  },
  {
    id: "ooze-drip-sticker",
    name: "Emergence Sticker",
    description: "Large-format single sticker. Laptops, bottles, bumpers.",
    spec: "Single die-cut vinyl · weatherproof",
    price: 4.0,
    image: ph("photo-1626785774573-4b799315345d"),
    category: "stickers",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-drip-sticker`,
  },
  {
    id: "iaypaa-x-pin",
    name: "IAYPAA X Enamel Pin",
    description: "Collectible hard-enamel pin of the tenth-anniversary mark.",
    spec: "Hard enamel · black nickel · 1\"",
    price: 10.0,
    image: ph("photo-1611605698335-8b1569810432"),
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/iaypaa-x-pin`,
  },
];

export const PRODUCT_CATEGORIES: {
  label: string;
  value: ProductCategory | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
  { label: "Stickers", value: "stickers" },
];

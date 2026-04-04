export type ProductCategory = "apparel" | "accessories" | "stickers";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  printfulUrl: string;
  badge?: string;
  soldOut?: boolean;
};

export const PRINTFUL_STORE_URL = "https://your-store.printful.me";

export const PRODUCTS: Product[] = [
  {
    id: "primordial-ooze-hoodie",
    name: "Primordial Ooze Hoodie",
    description:
      "Premium black hoodie with glow-in-the-dark ooze design. Stay warm. Stay slimy.",
    price: 45.0,
    image: "/merch/hoodie-front.webp",
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/primordial-ooze-hoodie`,
    badge: "Best Seller",
  },
  {
    id: "ooze-tee",
    name: "Primordial Ooze Tee",
    description:
      "Glow-in-the-dark ooze design on a premium black tee. Because your wardrobe needs more slime.",
    price: 25.0,
    image: "/merch/tee-front.webp",
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-tee`,
  },
  {
    id: "iaypaa-x-longsleeve",
    name: "IAYPAA X Long Sleeve",
    description:
      "Commemorative 10th anniversary long sleeve. Neon green on black with back print.",
    price: 30.0,
    image: "/merch/longsleeve-front.webp",
    category: "apparel",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/iaypaa-x-longsleeve`,
    badge: "New",
  },
  {
    id: "ooze-trucker-hat",
    name: "Ooze Trucker Hat",
    description:
      "Embroidered IAYPAA X logo on a snapback trucker hat. Neon green on black. Enough said.",
    price: 22.0,
    image: "/merch/trucker-hat.webp",
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-trucker-hat`,
  },
  {
    id: "slime-tote",
    name: "Slime Tote Bag",
    description:
      "Carry your Big Book in style. Heavy-duty canvas tote with dripping ooze graphic.",
    price: 18.0,
    image: "/merch/tote-bag.webp",
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/slime-tote`,
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack",
    description:
      "Die-cut vinyl stickers featuring the Primordial Ooze artwork. Laptop, water bottle, Big Book — stick 'em anywhere.",
    price: 8.0,
    image: "/merch/sticker-pack.webp",
    category: "stickers",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/sticker-pack`,
    badge: "Limited",
  },
  {
    id: "ooze-drip-sticker",
    name: "Ooze Drip Sticker",
    description:
      "Large format dripping ooze sticker. Waterproof vinyl, perfect for car bumpers and laptops.",
    price: 4.0,
    image: "/merch/drip-sticker.webp",
    category: "stickers",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/ooze-drip-sticker`,
  },
  {
    id: "iaypaa-x-pin",
    name: "IAYPAA X Enamel Pin",
    description:
      "Collectible enamel pin with the IAYPAA X logo. Green enamel on black nickel.",
    price: 10.0,
    image: "/merch/enamel-pin.webp",
    category: "accessories",
    printfulUrl: `${PRINTFUL_STORE_URL}/product/iaypaa-x-pin`,
  },
];

export const PRODUCT_CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
  { label: "Stickers", value: "stickers" },
];

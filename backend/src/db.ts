import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Product, products } from "./catalog";

dotenv.config();

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string;
  sport_tags: string;
  tribe_tags: string;
  is_new: number;
  is_featured: number;
};

type OrderItemInput = {
  productId: string;
  size: string;
  qty: number;
  unitPriceMinor: number;
};

type OrderInput = {
  id: string;
  stripeSessionId: string;
  amountTotalMinor: number | null;
  currency: string | null;
  customerEmail: string | null;
  status: string | null;
  items: OrderItemInput[];
};

const dbPath =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "primaltrend.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    sizes TEXT NOT NULL,
    sport_tags TEXT NOT NULL,
    tribe_tags TEXT NOT NULL,
    is_new INTEGER NOT NULL,
    is_featured INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    stripe_session_id TEXT UNIQUE NOT NULL,
    amount_total INTEGER,
    currency TEXT,
    customer_email TEXT,
    status TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    size TEXT NOT NULL,
    qty INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );
`);

const productCount = db
  .prepare("SELECT COUNT(1) as count FROM products")
  .get() as { count: number };

if (productCount.count === 0) {
  const insert = db.prepare(
    `INSERT INTO products
      (id, slug, name, price, description, image, sizes, sport_tags, tribe_tags, is_new, is_featured)
      VALUES (@id, @slug, @name, @price, @description, @image, @sizes, @sport_tags, @tribe_tags, @is_new, @is_featured)`
  );

  const insertMany = db.transaction((items: Product[]) => {
    for (const product of items) {
      insert.run({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        sizes: JSON.stringify(product.sizes),
        sport_tags: JSON.stringify(product.sportTags),
        tribe_tags: JSON.stringify(product.tribeTags),
        is_new: product.isNew ? 1 : 0,
        is_featured: product.isFeatured ? 1 : 0
      });
    }
  });

  insertMany(products);
}

const mapProduct = (row: ProductRow): Product => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  price: row.price,
  description: row.description,
  image: row.image,
  sizes: JSON.parse(row.sizes),
  sportTags: JSON.parse(row.sport_tags),
  tribeTags: JSON.parse(row.tribe_tags),
  isNew: Boolean(row.is_new),
  isFeatured: Boolean(row.is_featured)
});

export function listProducts(): Product[] {
  const rows = db.prepare("SELECT * FROM products ORDER BY name").all() as
    | ProductRow[]
    | undefined;
  return (rows ?? []).map(mapProduct);
}

export function findProductBySlug(slug: string): Product | null {
  const row = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(slug) as ProductRow | undefined;
  return row ? mapProduct(row) : null;
}

export function findProductById(id: string): Product | null {
  const row = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(id) as ProductRow | undefined;
  return row ? mapProduct(row) : null;
}

export function insertOrder(order: OrderInput) {
  const insertOrderStmt = db.prepare(
    `INSERT OR IGNORE INTO orders
      (id, stripe_session_id, amount_total, currency, customer_email, status, created_at)
      VALUES (@id, @stripeSessionId, @amountTotalMinor, @currency, @customerEmail, @status, @createdAt)`
  );

  const insertItemStmt = db.prepare(
    `INSERT INTO order_items
      (order_id, product_id, size, qty, unit_price)
      VALUES (@orderId, @productId, @size, @qty, @unitPriceMinor)`
  );

  const tx = db.transaction((payload: OrderInput) => {
    const result = insertOrderStmt.run({
      id: payload.id,
      stripeSessionId: payload.stripeSessionId,
      amountTotalMinor: payload.amountTotalMinor,
      currency: payload.currency,
      customerEmail: payload.customerEmail,
      status: payload.status,
      createdAt: new Date().toISOString()
    });

    if (result.changes === 0) {
      return;
    }

    for (const item of payload.items) {
      insertItemStmt.run({
        orderId: payload.id,
        productId: item.productId,
        size: item.size,
        qty: item.qty,
        unitPriceMinor: item.unitPriceMinor
      });
    }
  });

  tx(order);
}

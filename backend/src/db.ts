import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
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
  category_tags: string;
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

type CartItemRow = {
  product_id: string;
  size: string;
  qty: number;
  slug: string;
  name: string;
  price: number;
  image: string;
};

export type CartItemDetailed = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
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
    category_tags TEXT NOT NULL DEFAULT '[]',
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

  CREATE TABLE IF NOT EXISTS carts (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    size TEXT NOT NULL,
    qty INTEGER NOT NULL,
    UNIQUE (cart_id, product_id, size),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS cart_items_cart_id ON cart_items(cart_id);
`);

const productColumns = db
  .prepare("PRAGMA table_info(products)")
  .all() as Array<{ name: string }>;
const columnNames = new Set(productColumns.map((col) => col.name));
if (!columnNames.has("category_tags")) {
  db.exec(
    "ALTER TABLE products ADD COLUMN category_tags TEXT NOT NULL DEFAULT '[]'"
  );
}

const productCount = db
  .prepare("SELECT COUNT(1) as count FROM products")
  .get() as { count: number };

if (productCount.count === 0) {
  const insert = db.prepare(
    `INSERT INTO products
      (id, slug, name, price, description, image, sizes, sport_tags, tribe_tags, category_tags, is_new, is_featured)
      VALUES (@id, @slug, @name, @price, @description, @image, @sizes, @sport_tags, @tribe_tags, @category_tags, @is_new, @is_featured)`
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
        category_tags: JSON.stringify(product.categoryTags),
        is_new: product.isNew ? 1 : 0,
        is_featured: product.isFeatured ? 1 : 0
      });
    }
  });

  insertMany(products);
}

const updateCategoryTags = db.prepare(
  "UPDATE products SET category_tags = @category_tags WHERE id = @id"
);

const syncCategories = db.transaction((items: Product[]) => {
  for (const product of items) {
    updateCategoryTags.run({
      id: product.id,
      category_tags: JSON.stringify(product.categoryTags)
    });
  }
});

syncCategories(products);

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
  categoryTags: JSON.parse(row.category_tags ?? "[]"),
  isNew: Boolean(row.is_new),
  isFeatured: Boolean(row.is_featured)
});

export function listProducts(): Product[] {
  const rows = db.prepare("SELECT * FROM products ORDER BY id").all() as
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

export function upsertOrder(order: OrderInput) {
  const insertOrderStmt = db.prepare(
    `INSERT INTO orders
      (id, stripe_session_id, amount_total, currency, customer_email, status, created_at)
      VALUES (@id, @stripeSessionId, @amountTotalMinor, @currency, @customerEmail, @status, @createdAt)
      ON CONFLICT(id) DO UPDATE SET
        stripe_session_id = excluded.stripe_session_id,
        amount_total = COALESCE(excluded.amount_total, orders.amount_total),
        currency = COALESCE(excluded.currency, orders.currency),
        customer_email = COALESCE(excluded.customer_email, orders.customer_email),
        status = COALESCE(excluded.status, orders.status)`
  );

  const insertItemStmt = db.prepare(
    `INSERT INTO order_items
      (order_id, product_id, size, qty, unit_price)
      VALUES (@orderId, @productId, @size, @qty, @unitPriceMinor)`
  );

  const itemCountStmt = db.prepare(
    `SELECT COUNT(1) as count FROM order_items WHERE order_id = ?`
  );

  const tx = db.transaction((payload: OrderInput) => {
    insertOrderStmt.run({
      id: payload.id,
      stripeSessionId: payload.stripeSessionId,
      amountTotalMinor: payload.amountTotalMinor,
      currency: payload.currency,
      customerEmail: payload.customerEmail,
      status: payload.status,
      createdAt: new Date().toISOString()
    });

    const existing = itemCountStmt.get(payload.id) as { count: number };
    if (existing.count > 0) {
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

export function createCart(): string {
  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO carts (id, status, created_at, updated_at)
     VALUES (?, 'open', ?, ?)`
  ).run(id, now, now);
  return id;
}

export function cartExists(id: string): boolean {
  const row = db
    .prepare("SELECT 1 as existsFlag FROM carts WHERE id = ?")
    .get(id) as { existsFlag?: number } | undefined;
  return Boolean(row?.existsFlag);
}

export function touchCart(id: string) {
  db.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(
    new Date().toISOString(),
    id
  );
}

export function listCartItemsDetailed(cartId: string): CartItemDetailed[] {
  const rows = db
    .prepare(
      `SELECT ci.product_id, ci.size, ci.qty, p.slug, p.name, p.price, p.image
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = ?
       ORDER BY ci.id`
    )
    .all(cartId) as CartItemRow[];

  return rows.map((row) => ({
    productId: row.product_id,
    slug: row.slug,
    name: row.name,
    price: row.price,
    image: row.image,
    size: row.size,
    qty: row.qty
  }));
}

export function addCartItem(
  cartId: string,
  productId: string,
  size: string,
  qty: number
) {
  db.prepare(
    `INSERT INTO cart_items (cart_id, product_id, size, qty)
     VALUES (@cartId, @productId, @size, @qty)
     ON CONFLICT(cart_id, product_id, size)
     DO UPDATE SET qty = qty + excluded.qty`
  ).run({ cartId, productId, size, qty });
  touchCart(cartId);
}

export function setCartItemQty(
  cartId: string,
  productId: string,
  size: string,
  qty: number
) {
  if (qty <= 0) {
    removeCartItem(cartId, productId, size);
    return;
  }
  db.prepare(
    `UPDATE cart_items
     SET qty = ?
     WHERE cart_id = ? AND product_id = ? AND size = ?`
  ).run(qty, cartId, productId, size);
  touchCart(cartId);
}

export function removeCartItem(cartId: string, productId: string, size: string) {
  db.prepare(
    `DELETE FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?`
  ).run(cartId, productId, size);
  touchCart(cartId);
}

export function clearCartItems(cartId: string) {
  db.prepare(`DELETE FROM cart_items WHERE cart_id = ?`).run(cartId);
  touchCart(cartId);
}

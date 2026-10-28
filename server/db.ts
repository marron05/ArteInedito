import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { INITIAL_PRODUCTS, INITIAL_QUOTES, INITIAL_SETTINGS } from '../src/data/initialCatalog';

// Asegurar existencia de carpeta para la base de datos SQLite
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'arteinedito.sqlite');
console.log(`[SQLite] Conectando base de datos en: ${dbPath}`);

export const db = new Database(dbPath);

// Configuración pragmas SQLite para rendimiento y durabilidad
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');

/**
 * Inicialización de esquemas SQLite
 * Estructura modular lista para producción para pequeños negocios
 */
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      base_price_usd REAL,
      price_note TEXT,
      unit TEXT NOT NULL,
      turnaround_days TEXT NOT NULL,
      available_materials TEXT NOT NULL,
      available_finishes TEXT NOT NULL,
      badge TEXT,
      image_url TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      client_company TEXT,
      client_phone TEXT NOT NULL,
      client_email TEXT,
      category TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      material TEXT NOT NULL,
      finish TEXT NOT NULL,
      dimensions TEXT,
      quantity INTEGER NOT NULL,
      notes TEXT,
      art_file_name TEXT,
      estimated_total_usd REAL,
      status TEXT NOT NULL DEFAULT 'Nueva',
      admin_notes TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Semilla de configuración si no existe
  const settingsCount = (db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number }).count;
  if (settingsCount === 0) {
    const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    insertSetting.run('company_data', JSON.stringify(INITIAL_SETTINGS));
    console.log('[SQLite] Configuración inicial de Arte Inédito insertada.');
  }

  // Semilla de productos si está vacía
  const productCount = (db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number }).count;
  if (productCount === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (
        id, category, name, tagline, description, base_price_usd, price_note,
        unit, turnaround_days, available_materials, available_finishes,
        badge, image_url, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((products) => {
      for (const p of products) {
        insertProduct.run(
          p.id,
          p.category,
          p.name,
          p.tagline,
          p.description,
          p.basePriceUsd ?? null,
          p.priceNote ?? null,
          p.unit,
          p.turnaroundDays,
          JSON.stringify(p.availableMaterials),
          JSON.stringify(p.availableFinishes),
          p.badge ?? null,
          p.imageUrl,
          p.active ? 1 : 0
        );
      }
    });

    transaction(INITIAL_PRODUCTS);
    console.log(`[SQLite] ${INITIAL_PRODUCTS.length} productos del catálogo insertados.`);
  }

  // Semilla de cotizaciones si está vacía
  const quoteCount = (db.prepare('SELECT COUNT(*) as count FROM quotes').get() as { count: number }).count;
  if (quoteCount === 0) {
    const insertQuote = db.prepare(`
      INSERT INTO quotes (
        id, client_name, client_company, client_phone, client_email,
        category, product_id, product_name, material, finish, dimensions,
        quantity, notes, art_file_name, estimated_total_usd, status, admin_notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const txQuotes = db.transaction((quotes) => {
      for (const q of quotes) {
        insertQuote.run(
          q.id,
          q.clientName,
          q.clientCompany || null,
          q.clientPhone,
          q.clientEmail || null,
          q.category,
          q.productId,
          q.productName,
          q.material,
          q.finish,
          q.dimensions || null,
          q.quantity,
          q.notes || null,
          q.artFileName || null,
          q.estimatedTotalUsd || null,
          q.status,
          q.adminNotes || null,
          q.createdAt
        );
      }
    });

    txQuotes(INITIAL_QUOTES);
    console.log(`[SQLite] ${INITIAL_QUOTES.length} cotizaciones de demostración insertadas.`);
  }
}

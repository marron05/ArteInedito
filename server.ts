import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db, initDatabase } from './server/db';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Inicializar esquemas y datos iniciales en SQLite
initDatabase();

app.use(express.json());

// API Endpoints para Arte Inédito

// 1. Obtener lista de productos
app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products ORDER BY category ASC, name ASC').all() as any[];
    const products = rows.map((r) => ({
      id: r.id,
      category: r.category,
      name: r.name,
      tagline: r.tagline,
      description: r.description,
      basePriceUsd: r.base_price_usd,
      priceNote: r.price_note,
      unit: r.unit,
      turnaroundDays: r.turnaround_days,
      availableMaterials: JSON.parse(r.available_materials || '[]'),
      availableFinishes: JSON.parse(r.available_finishes || '[]'),
      badge: r.badge,
      imageUrl: r.image_url,
      active: Boolean(r.active)
    }));
    res.json(products);
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Crear nuevo producto
app.post('/api/products', (req, res) => {
  try {
    const p = req.body;
    const id = p.id || `prod-${Date.now()}`;
    const insert = db.prepare(`
      INSERT INTO products (
        id, category, name, tagline, description, base_price_usd, price_note,
        unit, turnaround_days, available_materials, available_finishes, badge, image_url, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      p.category,
      p.name,
      p.tagline || '',
      p.description || '',
      p.basePriceUsd ?? null,
      p.priceNote ?? null,
      p.unit || 'unidad',
      p.turnaroundDays || '3 a 5 días',
      JSON.stringify(p.availableMaterials || []),
      JSON.stringify(p.availableFinishes || []),
      p.badge ?? null,
      p.imageUrl || '/src/assets/images/hero_workshop_craft_1793205546075.jpg',
      p.active !== false ? 1 : 0
    );

    res.status(201).json({ id, success: true });
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Actualizar producto
app.put('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const p = req.body;
    const update = db.prepare(`
      UPDATE products SET
        category = ?, name = ?, tagline = ?, description = ?, base_price_usd = ?, price_note = ?,
        unit = ?, turnaround_days = ?, available_materials = ?, available_finishes = ?,
        badge = ?, image_url = ?, active = ?
      WHERE id = ?
    `);

    update.run(
      p.category,
      p.name,
      p.tagline || '',
      p.description || '',
      p.basePriceUsd ?? null,
      p.priceNote ?? null,
      p.unit,
      p.turnaroundDays,
      JSON.stringify(p.availableMaterials || []),
      JSON.stringify(p.availableFinishes || []),
      p.badge ?? null,
      p.imageUrl,
      p.active ? 1 : 0,
      id
    );

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Eliminar producto
app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Obtener lista de cotizaciones
app.get('/api/quotes', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM quotes ORDER BY created_at DESC').all() as any[];
    const quotes = rows.map((r) => ({
      id: r.id,
      clientName: r.client_name,
      clientCompany: r.client_company,
      clientPhone: r.client_phone,
      clientEmail: r.client_email,
      category: r.category,
      productId: r.product_id,
      productName: r.product_name,
      material: r.material,
      finish: r.finish,
      dimensions: r.dimensions,
      quantity: r.quantity,
      notes: r.notes,
      artFileName: r.art_file_name,
      estimatedTotalUsd: r.estimated_total_usd,
      status: r.status,
      adminNotes: r.admin_notes,
      createdAt: r.created_at
    }));
    res.json(quotes);
  } catch (error: any) {
    console.error('Error al obtener cotizaciones:', error);
    res.status(500).json({ error: error.message });
  }
});

// 6. Crear nueva cotización
app.post('/api/quotes', (req, res) => {
  try {
    const q = req.body;
    // Generar Folio consecutivo único tipo AI-2026-0843
    const year = new Date().getFullYear();
    const countRow = db.prepare('SELECT COUNT(*) as count FROM quotes').get() as { count: number };
    const folioNumber = 840 + countRow.count + 1;
    const id = q.id || `AI-${year}-${folioNumber.toString().padStart(4, '0')}`;
    const createdAt = new Date().toISOString();

    const insert = db.prepare(`
      INSERT INTO quotes (
        id, client_name, client_company, client_phone, client_email,
        category, product_id, product_name, material, finish, dimensions,
        quantity, notes, art_file_name, estimated_total_usd, status, admin_notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
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
      q.quantity || 1,
      q.notes || null,
      q.artFileName || null,
      q.estimatedTotalUsd ?? null,
      'Nueva',
      null,
      createdAt
    );

    res.status(201).json({ id, success: true, createdAt });
  } catch (error: any) {
    console.error('Error al registrar cotización:', error);
    res.status(500).json({ error: error.message });
  }
});

// 7. Actualizar estado y notas de cotización
app.patch('/api/quotes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    let query = 'UPDATE quotes SET ';
    const params: any[] = [];
    if (status !== undefined) {
      query += 'status = ? ';
      params.push(status);
    }
    if (adminNotes !== undefined) {
      if (params.length > 0) query += ', ';
      query += 'admin_notes = ? ';
      params.push(adminNotes);
    }
    query += 'WHERE id = ?';
    params.push(id);

    db.prepare(query).run(...params);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Obtener y actualizar configuración de la empresa
app.get('/api/settings', (req, res) => {
  try {
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('company_data') as { value: string } | undefined;
    if (row) {
      res.json(JSON.parse(row.value));
    } else {
      res.json({});
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const data = req.body;
    db.prepare(`
      INSERT INTO settings (key, value) VALUES ('company_data', ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run(JSON.stringify(data));
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Estadísticas para el panel de control
app.get('/api/stats', (req, res) => {
  try {
    const totalQuotes = (db.prepare('SELECT COUNT(*) as c FROM quotes').get() as any).c;
    const newQuotes = (db.prepare("SELECT COUNT(*) as c FROM quotes WHERE status = 'Nueva'").get() as any).c;
    const inProduction = (db.prepare("SELECT COUNT(*) as c FROM quotes WHERE status = 'En Producción'").get() as any).c;
    const delivered = (db.prepare("SELECT COUNT(*) as c FROM quotes WHERE status = 'Entregada'").get() as any).c;
    const totalRevenueEst = (db.prepare("SELECT SUM(estimated_total_usd) as s FROM quotes").get() as any).s || 0;
    const activeProducts = (db.prepare("SELECT COUNT(*) as c FROM products WHERE active = 1").get() as any).c;

    res.json({
      totalQuotes,
      newQuotes,
      inProduction,
      delivered,
      totalRevenueEst,
      activeProducts
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Setup Vite middleware en desarrollo o servir dist en producción
async function setupViteServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Arte Inédito] Servidor corriendo en http://0.0.0.0:${PORT}`);
  });
}

setupViteServer().catch((err) => {
  console.error('Error al arrancar el servidor:', err);
});

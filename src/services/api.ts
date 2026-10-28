import { ProductItem, QuoteRecord, CompanySettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_QUOTES, INITIAL_SETTINGS } from '../data/initialCatalog';

// Llaves de almacenamiento local para persistencia en Vercel y modo offline
const STORAGE_KEYS = {
  PRODUCTS: 'arteinedito_products_data_v1',
  QUOTES: 'arteinedito_quotes_data_v1',
  SETTINGS: 'arteinedito_settings_data_v1'
};

function getLocalData<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error al leer ${key} de localStorage:`, e);
  }
  return defaultData;
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error al guardar ${key} en localStorage:`, e);
  }
}

export const api = {
  // 1. Obtener productos (intenta SQLite API primero, luego fallback a localStorage)
  async getProducts(): Promise<ProductItem[]> {
    try {
      const res = await fetch('/api/products');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        setLocalData(STORAGE_KEYS.PRODUCTS, data);
        return data;
      }
    } catch {
      // Entorno Vercel estático o sin backend activo
    }
    return getLocalData<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  // 2. Crear producto
  async createProduct(product: Partial<ProductItem>): Promise<{ id: string; success: boolean }> {
    const newId = product.id || `prod-${Date.now()}`;
    const fullProduct: ProductItem = {
      id: newId,
      category: product.category || 'corporeos',
      name: product.name || 'Nuevo Producto',
      tagline: product.tagline || '',
      description: product.description || '',
      basePriceUsd: product.basePriceUsd ?? 50,
      priceNote: product.priceNote,
      unit: product.unit || 'unidad',
      turnaroundDays: product.turnaroundDays || '3 a 5 días',
      availableMaterials: product.availableMaterials || ['Material Estándar'],
      availableFinishes: product.availableFinishes || ['Acabado Estándar'],
      badge: product.badge,
      imageUrl: product.imageUrl || '/assets/images/hero_workshop_craft_1793205546075.jpg',
      active: product.active !== false
    };

    // Actualizar localStorage para Vercel
    const current = getLocalData<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setLocalData(STORAGE_KEYS.PRODUCTS, [fullProduct, ...current]);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullProduct)
      });
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        return await res.json();
      }
    } catch {
      // Ignorar si está en Vercel estático
    }

    return { id: newId, success: true };
  },

  // 3. Actualizar producto
  async updateProduct(id: string, product: Partial<ProductItem>): Promise<boolean> {
    const current = getLocalData<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = current.map((p) => (p.id === id ? { ...p, ...product } : p));
    setLocalData(STORAGE_KEYS.PRODUCTS, updated);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      return res.ok;
    } catch {
      return true; // En Vercel fue actualizado en localStorage
    }
  },

  // 4. Eliminar producto
  async deleteProduct(id: string): Promise<boolean> {
    const current = getLocalData<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setLocalData(STORAGE_KEYS.PRODUCTS, current.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch {
      return true;
    }
  },

  // 5. Obtener cotizaciones
  async getQuotes(): Promise<QuoteRecord[]> {
    try {
      const res = await fetch('/api/quotes');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        setLocalData(STORAGE_KEYS.QUOTES, data);
        return data;
      }
    } catch {
      // Vercel estático
    }
    return getLocalData<QuoteRecord[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES as QuoteRecord[]);
  },

  // 6. Enviar cotización (genera folio con formato oficial AI-2026-XXXX)
  async submitQuote(quoteData: Omit<QuoteRecord, 'id' | 'status' | 'createdAt'>): Promise<{ id: string; success: boolean }> {
    const currentQuotes = getLocalData<QuoteRecord[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES as QuoteRecord[]);
    const year = new Date().getFullYear();
    const folioNum = 840 + currentQuotes.length + 1;
    const generatedFolio = `AI-${year}-${folioNum.toString().padStart(4, '0')}`;
    const createdAt = new Date().toISOString();

    const newQuoteRecord: QuoteRecord = {
      ...quoteData,
      id: generatedFolio,
      status: 'Nueva',
      createdAt
    };

    // Guardar en localStorage para que aparezca inmediatamente en el panel
    setLocalData(STORAGE_KEYS.QUOTES, [newQuoteRecord, ...currentQuotes]);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuoteRecord)
      });
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        return await res.json();
      }
    } catch {
      // Vercel estático
    }

    return { id: generatedFolio, success: true };
  },

  // 7. Actualizar estado de cotización
  async updateQuoteStatus(id: string, status: string, adminNotes?: string): Promise<boolean> {
    const currentQuotes = getLocalData<QuoteRecord[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES as QuoteRecord[]);
    const updated = currentQuotes.map((q) =>
      q.id === id ? { ...q, status: status as any, adminNotes: adminNotes ?? q.adminNotes } : q
    );
    setLocalData(STORAGE_KEYS.QUOTES, updated);

    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      return res.ok;
    } catch {
      return true;
    }
  },

  // 8. Configuración de empresa
  async getSettings(): Promise<CompanySettings> {
    try {
      const res = await fetch('/api/settings');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.companyName) {
          setLocalData(STORAGE_KEYS.SETTINGS, data);
          return data;
        }
      }
    } catch {
      // Vercel
    }
    return getLocalData<CompanySettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: CompanySettings): Promise<boolean> {
    setLocalData(STORAGE_KEYS.SETTINGS, settings);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return res.ok;
    } catch {
      return true;
    }
  },

  // 9. Estadísticas
  async getStats() {
    try {
      const res = await fetch('/api/stats');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        return await res.json();
      }
    } catch {}

    const quotes = getLocalData<QuoteRecord[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES as QuoteRecord[]);
    const products = getLocalData<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);

    return {
      totalQuotes: quotes.length,
      newQuotes: quotes.filter((q) => q.status === 'Nueva').length,
      inProduction: quotes.filter((q) => q.status === 'En Producción').length,
      delivered: quotes.filter((q) => q.status === 'Entregada').length,
      totalRevenueEst: quotes.reduce((acc, q) => acc + (q.estimatedTotalUsd || 0), 0),
      activeProducts: products.filter((p) => p.active).length
    };
  }
};

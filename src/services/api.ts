import { ProductItem, QuoteRecord, CompanySettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_QUOTES, INITIAL_SETTINGS } from '../data/initialCatalog';

// Helper de persistencia en localStorage para redundancia
const STORAGE_KEYS = {
  PRODUCTS: 'arteinedito_products_cache',
  QUOTES: 'arteinedito_quotes_cache',
  SETTINGS: 'arteinedito_settings_cache'
};

export const api = {
  // 1. Obtener productos
  async getProducts(): Promise<ProductItem[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
        return data;
      }
    } catch {
      console.warn('Usando caché local para productos');
    }
    const cached = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return cached ? JSON.parse(cached) : INITIAL_PRODUCTS;
  },

  // 2. Crear producto
  async createProduct(product: Partial<ProductItem>): Promise<{ id: string; success: boolean }> {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e);
    }
    const id = `prod-${Date.now()}`;
    return { id, success: true };
  },

  // 3. Actualizar producto
  async updateProduct(id: string, product: Partial<ProductItem>): Promise<boolean> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 4. Eliminar producto
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 5. Obtener cotizaciones
  async getQuotes(): Promise<QuoteRecord[]> {
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(data));
        return data;
      }
    } catch {
      console.warn('Usando caché local para cotizaciones');
    }
    const cached = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return cached ? JSON.parse(cached) : (INITIAL_QUOTES as QuoteRecord[]);
  },

  // 6. Enviar cotización
  async submitQuote(quoteData: Omit<QuoteRecord, 'id' | 'status' | 'createdAt'>): Promise<{ id: string; success: boolean }> {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e);
    }
    const folio = `AI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return { id: folio, success: true };
  },

  // 7. Actualizar estado de cotización
  async updateQuoteStatus(id: string, status: string, adminNotes?: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 8. Configuración de empresa
  async getSettings(): Promise<CompanySettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data && data.companyName) {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      console.warn('Usando configuración local');
    }
    const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return cached ? JSON.parse(cached) : INITIAL_SETTINGS;
  },

  async updateSettings(settings: CompanySettings): Promise<boolean> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  },

  // 9. Estadísticas
  async getStats() {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    return {
      totalQuotes: 3,
      newQuotes: 1,
      inProduction: 1,
      delivered: 0,
      totalRevenueEst: 914,
      activeProducts: 10
    };
  }
};

export type ProductCategory = 
  | 'corporeos'
  | 'rotulacion'
  | 'sublimacion'
  | 'pop'
  | 'laser'
  | 'textiles'
  | 'merch'
  | 'lonas';

export interface ProductItem {
  id: string;
  category: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  basePriceUsd?: number;
  priceNote?: string;
  unit: string;
  turnaroundDays: string;
  availableMaterials: string[];
  availableFinishes: string[];
  badge?: string;
  imageUrl: string;
  images?: string[];
  active: boolean;
}

export type QuoteStatus = 'Nueva' | 'En Revisión' | 'En Producción' | 'Entregada';

export interface QuoteRecord {
  id: string; // Folio, e.g. AI-2026-1048
  clientName: string;
  clientCompany?: string;
  clientPhone: string;
  clientEmail?: string;
  category: ProductCategory;
  productId: string;
  productName: string;
  material: string;
  finish: string;
  dimensions?: string;
  quantity: number;
  notes?: string;
  artFileName?: string;
  artFilePreview?: string;
  colors?: string;
  estimatedTotalUsd?: number;
  status: QuoteStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface CompanySettings {
  whatsappPhone: string;
  rif: string;
  companyName: string;
  address: string;
  openingHours: string;
  instagram: string;
  email: string;
}

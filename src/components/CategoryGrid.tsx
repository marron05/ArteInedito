import React from 'react';
import { ProductCategory } from '../types';
import { 
  Box, 
  Car, 
  Shirt, 
  Sparkles, 
  Flame, 
  Maximize2, 
  Gift, 
  Store,
  ArrowRight
} from 'lucide-react';
import { glassCardStyle, glassPillStyle } from '../styles/glass';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenQuoteWithCategory: (category: ProductCategory) => void;
}

interface CategoryCardInfo {
  id: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  materials: string;
  turnaround: string;
}

export const CATEGORIES: CategoryCardInfo[] = [
  {
    id: 'corporeos',
    title: 'Corpóreos 3D',
    subtitle: 'Señalética Dimensional',
    description: 'Letras volumétricas y logotipos en relieve con o sin iluminación LED. Alto impacto para fachadas y recepciones.',
    icon: Box,
    materials: 'PVC espumado 10-20mm, Acrílico, ACM',
    turnaround: '4 a 7 días'
  },
  {
    id: 'rotulacion',
    title: 'Rotulación Comercial',
    subtitle: 'Vehicular y Vitrinas',
    description: 'Vinil automotriz con laminado UV y microperforado para vitrinas en Lechería, Barcelona y Puerto La Cruz.',
    icon: Car,
    materials: 'Vinil polimérico, Microperforado, Frosted',
    turnaround: '3 a 5 días'
  },
  {
    id: 'textiles',
    title: 'Textiles & Uniformes',
    subtitle: 'Chemises & Franelas',
    description: 'Confección y personalización con bordado digital y estampados. Incluye nuestra línea de cobijas y batas.',
    icon: Shirt,
    materials: 'Piqué 65/35, Dry-Fit, Polar Fleece',
    turnaround: '4 a 7 días'
  },
  {
    id: 'sublimacion',
    title: 'Sublimación Full Print',
    subtitle: 'Color sin límites',
    description: 'Diseño continuo que cubre el 100% de la prenda o producto. Tintas reactivas indelebles que no destiñen.',
    icon: Sparkles,
    materials: 'Poliéster transpirable, Tazas cerámicas',
    turnaround: '3 a 5 días'
  },
  {
    id: 'laser',
    title: 'Grabado Láser',
    subtitle: 'Precisión Milimétrica',
    description: 'Corte y grabado en madera, metales anodizados, acrílico y cuero. Ideal para placas y detalles finos.',
    icon: Flame,
    materials: 'Teca, Acero inox, Acrílico 3-5mm',
    turnaround: '1 a 3 días'
  },
  {
    id: 'pop',
    title: 'Diseño POP & Displays',
    subtitle: 'Punto de Venta',
    description: 'Estructuras y exhibidores de mostrador para impulsar la venta de tus productos en el punto de contacto.',
    icon: Store,
    materials: 'Acrílico moldeado, MDF, Sintra',
    turnaround: '5 a 8 días'
  },
  {
    id: 'merch',
    title: 'Merchandising',
    subtitle: 'Artículos Promocionales',
    description: 'Powerbanks personalizados, botellas térmicas, libretas corporativas y kits de bienvenida para marcas.',
    icon: Gift,
    materials: 'Baterías 10k mAh, Acero inoxidable',
    turnaround: '2 a 5 días'
  },
  {
    id: 'lonas',
    title: 'Lonas & Gran Formato',
    subtitle: 'Exteriores e Inauguraciones',
    description: 'Impresión de alta resolución resistente al sol y lluvia costera. Incluye ojales reforzados y soporte roll-up.',
    icon: Maximize2,
    materials: 'Frontlit 13oz, Lona mesh, Roll-Up',
    turnaround: '24 a 48 hrs'
  }
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onOpenQuoteWithCategory
}) => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div 
              style={glassPillStyle}
              className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Capacidades de Taller</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em] text-balance">
              Líneas de Producción
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              No tercerizamos la calidad: cada corpóreo, rotulación o uniforme sale de nuestras manos en la Esquina Inédita. Selecciona una línea para ver opciones y cotizar.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-numbers">
            <span style={glassPillStyle} className="glass-pill px-3 py-1.5 rounded-full">08 Técnicas Integradas</span>
            <span style={glassPillStyle} className="glass-pill px-3 py-1.5 rounded-full">Sede Lechería</span>
          </div>
        </div>

        {/* Grid de Frosted Dark Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                style={glassCardStyle}
                className="glass-card group flex flex-col justify-between p-6 sm:p-7 rounded-3xl relative overflow-hidden"
              >
                {/* Iluminación de fondo sutil al hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/[0.04] group-hover:bg-red-600/[0.12] blur-2xl rounded-full transition-all duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-[#C41E3A] group-hover:text-white transition-all duration-300 shadow-inner">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span 
                      style={glassPillStyle}
                      className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-mono text-neutral-400 font-mono-numbers"
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-semibold text-neutral-400 mt-1 mb-3">
                    {cat.subtitle}
                  </div>

                  <p className="text-xs text-neutral-400/90 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <div className="text-[11px] text-neutral-400 space-y-1.5 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500">Material:</span>
                      <span className="text-neutral-300 truncate max-w-[130px] font-medium">{cat.materials}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500">Tiempo:</span>
                      <span className="text-neutral-300 font-medium">{cat.turnaround}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onSelectCategory(cat.id)}
                      className="btn-secondary-glass py-2.5 px-3 text-xs font-semibold text-neutral-300 text-center cursor-pointer"
                    >
                      Ver Ficha
                    </button>
                    <button
                      onClick={() => onOpenQuoteWithCategory(cat.id)}
                      className="btn-primary-material py-2.5 px-3 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="gradient-divider max-w-6xl mx-auto mt-24" />
    </section>
  );
};

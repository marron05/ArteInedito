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
    description: 'Confección y personalización con bordado digital y estampados. Incluye nuestra línea viral de cobijas y batas.',
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
    <section className="py-20 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado editorial sin slop ni comentarios */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E53935]">
              Líneas de Fabricación
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight text-balance">
              Capacidades técnicas de nuestro taller
            </h2>
            <p className="text-neutral-400 mt-3 text-base leading-relaxed">
              No tercerizamos la calidad: cada corpóreo, rotulación o uniforme sale de nuestras manos en la Esquina Inédita. Selecciona una línea para ver opciones y cotizar.
            </p>
          </div>
          <div className="text-xs text-neutral-400 font-mono-numbers text-left md:text-right">
            <span>08 Líneas Integradas</span>
            <span className="mx-2">/</span>
            <span>Taller Propio Lechería</span>
          </div>
        </div>

        {/* Grid Asimétrico y estructurado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between p-6 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-red-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 group-hover:bg-[#C41E3A] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500 font-mono-numbers">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-medium text-neutral-400 mb-3">
                    {cat.subtitle}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-900">
                  <div className="text-[11px] text-neutral-400 space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Material:</span>
                      <span className="text-neutral-300 truncate max-w-[130px]">{cat.materials}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Tiempo:</span>
                      <span className="text-neutral-300">{cat.turnaround}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCategory(cat.id)}
                      className="px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Ver Opciones
                    </button>
                    <button
                      onClick={() => onOpenQuoteWithCategory(cat.id)}
                      className="px-3 py-2 text-xs font-bold text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ProductItem } from '../types';
import { CATEGORIES } from './CategoryGrid';
import { Search, ArrowRight, X, Check } from 'lucide-react';
import { glassCardStyle, glassPanelStyle } from '../styles/glass';

interface CatalogViewProps {
  products: ProductItem[];
  onSelectProductForQuote: (product: ProductItem) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onSelectProductForQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // Filtrado de catálogo
  const filteredProducts = products.filter((p) => {
    if (!p.active) return false;
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.availableMaterials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleOpenModal = (product: ProductItem) => {
    setActiveModalProduct(product);
    setActiveGalleryIndex(0);
  };

  return (
    <section className="py-14 sm:py-24 relative min-h-screen">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[350px] bg-red-600/[0.015] blur-[140px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial de Catálogo */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E8E4DF]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#C41E3A] uppercase tracking-wider font-mono">
                Showroom Digital
              </span>
              <span className="text-[#9A9A9A]" aria-hidden="true">·</span>
              <span className="text-[#5C5C5C] font-medium">Catálogo Técnico & Materiales</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-[-0.038em] leading-[1.08] text-balance">
              Catálogo de Producción
            </h1>
            <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed font-normal">
              Materializamos ideas con especificaciones industriales y acabados premium. Consulta fichas técnicas detalladas o inicia la cotización directamente.
            </p>
          </div>

          {/* Buscador Outlined Elegante */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#9A9A9A] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Buscar corpóreo, vinil, textil, láser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all shadow-[0_1px_3px_rgba(28,25,23,0.03)]"
            />
          </div>
        </div>

        {/* Filtros por Categoría con Estado Activo Muy Claro */}
        <div className="mb-12 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C41E3A] text-white border border-[#B01730] shadow-[0_2px_8px_rgba(196,30,58,0.25)]'
                : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border border-[#E8E4DF] shadow-[0_1px_2px_rgba(28,25,23,0.02)]'
            }`}
          >
            Todos los Productos ({products.filter(p => p.active).length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter(p => p.category === cat.id && p.active).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C41E3A] text-white font-bold border border-[#B01730] shadow-[0_2px_8px_rgba(196,30,58,0.25)]'
                    : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border border-[#E8E4DF] shadow-[0_1px_2px_rgba(28,25,23,0.02)]'
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid de Productos o Estado Vacío */}
        {filteredProducts.length === 0 ? (
          <div 
            style={glassPanelStyle}
            className="py-16 px-6 sm:px-12 text-center rounded-3xl max-w-2xl mx-auto space-y-5 bg-white border border-[#E8E4DF] shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DF] text-[#C41E3A] flex items-center justify-center mx-auto shadow-sm">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1A1A1A]">No encontramos productos para tu búsqueda</h3>
              <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                No hay coincidencias para &ldquo;{searchQuery}&rdquo;. En nuestro taller fabricamos piezas personalizadas sin importar tamaño ni material.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-secondary-glass px-5 py-2.5 text-xs font-semibold text-[#1A1A1A] cursor-pointer w-full sm:w-auto"
              >
                Ver todas las categorías
              </button>
              <button
                onClick={() => onSelectProductForQuote({
                  id: 'custom-prod',
                  category: 'corporeos',
                  name: 'Proyecto Personalizado a Medida',
                  tagline: 'Fabricación bajo plano o requerimiento específico',
                  description: 'Cotización especial con especificaciones de taller',
                  unit: 'proyecto',
                  turnaroundDays: 'A convenir',
                  availableMaterials: ['A convenir con taller'],
                  availableFinishes: ['Acabado especial'],
                  imageUrl: '/assets/images/hero_workshop_craft_1793205546075.jpg',
                  active: true
                })}
                className="btn-primary-material px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Cotizar Proyecto Especial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredProducts.map((product) => {
              const isHighPriorityBadge = product.badge?.toLowerCase().includes('solicitado') || product.badge?.toLowerCase().includes('flotas');
              return (
                <div
                  key={product.id}
                  style={glassCardStyle}
                  className="glass-card group flex flex-col justify-between rounded-3xl overflow-hidden relative bg-white border border-[#E8E4DF] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_36px_-8px_rgba(28,25,23,0.08)]"
                >
                  <div>
                    {/* Imagen de Producto Dominante */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden p-3 bg-[#FAF8F5]">
                      <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#F0EEEC]">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Badges de Autoridad Editorial */}
                        {product.badge && (
                          <div 
                            className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono shadow-sm ${
                              isHighPriorityBadge
                                ? 'bg-[#C41E3A] text-white border border-[#B01730]'
                                : 'bg-white/95 text-[#1A1A1A] border border-[#E8E4DF]'
                            }`}
                          >
                            {product.badge}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido de Ficha */}
                    <div className="p-6 sm:p-7 pt-4">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C41E3A] mb-1.5">
                        {product.category}
                      </div>
                      
                      <h3 className="text-xl font-black text-[#1A1A1A] tracking-[-0.025em] group-hover:text-[#C41E3A] transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-[#5C5C5C] mt-2 line-clamp-2 leading-relaxed font-normal">
                        {product.tagline}
                      </p>

                      {/* Metadata con Separador Sutil */}
                      <div className="mt-5 pt-4 border-t border-[#E8E4DF] flex items-center justify-between text-xs text-[#5C5C5C]">
                        <div>
                          <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Entrega Estimada</span>
                          <span className="text-[#1A1A1A] font-semibold">{product.turnaroundDays}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Base Referencial</span>
                          <span className="text-[#1A1A1A] font-black text-base font-mono-numbers">
                            {product.basePriceUsd ? `$${product.basePriceUsd} USD` : 'A Cotizar'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones de la Tarjeta con Mayor Claridad */}
                  <div className="p-6 sm:p-7 pt-0 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="btn-secondary-glass py-3 px-3 text-xs font-semibold text-[#1A1A1A] text-center cursor-pointer"
                    >
                      Ficha Técnica
                    </button>
                    <button
                      onClick={() => onSelectProductForQuote(product)}
                      className="btn-primary-material py-3 px-3 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group/btn"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal de Ficha Técnica Detallada */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div 
            style={glassPanelStyle}
            className="rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto bg-white border border-[#E8E4DF] shadow-[0_24px_50px_-12px_rgba(28,25,23,0.18)]"
          >
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white border border-[#E8E4DF] text-[#5C5C5C] hover:text-[#1A1A1A] cursor-pointer shadow-sm transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-7">
              {/* Columna Izquierda: Galería Interactiva */}
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Imagen Principal */}
                <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] h-64 sm:h-72 border border-[#E8E4DF] relative shadow-inner">
                  <img
                    src={
                      activeModalProduct.images && activeModalProduct.images[activeGalleryIndex]
                        ? activeModalProduct.images[activeGalleryIndex]
                        : activeModalProduct.imageUrl
                    }
                    alt={activeModalProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {activeModalProduct.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-bold text-[#C41E3A] uppercase tracking-wider font-mono shadow-sm bg-white border border-[#E8E4DF]">
                      {activeModalProduct.badge}
                    </div>
                  )}
                </div>

                {/* Tira de Miniaturas de Galería */}
                {activeModalProduct.images && activeModalProduct.images.length > 1 && (
                  <div className="flex items-center gap-2">
                    {activeModalProduct.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          activeGalleryIndex === idx
                            ? 'border-[#C41E3A] ring-2 ring-[#C41E3A]/30 scale-105'
                            : 'border-[#E8E4DF] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${activeModalProduct.name} vista ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-3 rounded-2xl text-[11px] text-[#5C5C5C] flex items-center justify-between bg-[#FAF8F5] border border-[#E8E4DF]">
                  <span className="text-[#9A9A9A] font-mono text-[10px] uppercase">Precio base referencial:</span>
                  <span className="text-[#1A1A1A] font-black text-sm font-mono-numbers">
                    {activeModalProduct.basePriceUsd ? `$${activeModalProduct.basePriceUsd} USD / ${activeModalProduct.unit}` : 'A convenir'}
                  </span>
                </div>
              </div>

              {/* Columna Derecha: Especificaciones y CTA */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="text-[11px] font-mono uppercase text-[#C41E3A] font-bold">
                  {activeModalProduct.category}
                </div>

                <h3 className="text-2xl font-black text-[#1A1A1A] tracking-[-0.03em] leading-snug">
                  {activeModalProduct.name}
                </h3>

                <p className="text-xs text-[#5C5C5C] leading-relaxed font-normal">
                  {activeModalProduct.description}
                </p>

                <div className="space-y-4 pt-2 text-xs">
                  <div>
                    <span className="font-bold text-[#1A1A1A] block mb-2 uppercase text-[10px] tracking-wider font-mono">
                      Materiales y Soportes Disponibles:
                    </span>
                    <ul className="space-y-1.5">
                      {activeModalProduct.availableMaterials.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-[#1A1A1A]">
                          <Check className="w-3.5 h-3.5 text-[#C41E3A] shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#1A1A1A] block mb-2 uppercase text-[10px] tracking-wider font-mono">
                      Acabados e Iluminación:
                    </span>
                    <ul className="space-y-1.5">
                      {activeModalProduct.availableFinishes.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[#1A1A1A]">
                          <Check className="w-3.5 h-3.5 text-[#C41E3A] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DF] flex justify-between items-center text-xs">
                    <span className="text-[#5C5C5C]">Tiempo estimado en taller:</span>
                    <span className="text-[#1A1A1A] font-bold font-mono">{activeModalProduct.turnaroundDays}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      const prod = activeModalProduct;
                      setActiveModalProduct(null);
                      onSelectProductForQuote(prod);
                    }}
                    className="btn-primary-material w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                  >
                    <span>Personalizar y Cotizar Esta Variante</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

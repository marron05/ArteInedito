import React, { useState } from 'react';
import { ProductItem, ProductCategory } from '../types';
import { CATEGORIES } from './CategoryGrid';
import { Search, ArrowRight, X, Clock, Layers, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { glassCardStyle, glassPillStyle, glassPillActiveStyle, glassPanelStyle } from '../styles/glass';

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

  return (
    <section className="py-16 sm:py-24 relative min-h-screen">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[350px] bg-red-600/[0.05] blur-[120px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de catálogo */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div 
              style={glassPillStyle}
              className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Showroom Digital</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em]">
              Catálogo de Producción
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Materializamos ideas con especificaciones industriales y acabados premium. Selecciona un producto para consultar fichas técnicas o cotizar.
            </p>
          </div>

          {/* Buscador Glass */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Buscar corpóreo, vinil, franela..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={glassPillStyle}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Filtros por Categoría en Glass Pills */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            style={selectedCategory === 'all' ? glassPillActiveStyle : glassPillStyle}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'glass-pill-active text-white'
                : 'glass-pill text-neutral-400 hover:text-white hover:bg-white/[0.06]'
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
                style={isSelected ? glassPillActiveStyle : glassPillStyle}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'glass-pill-active text-white'
                    : 'glass-pill text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div 
            style={glassPanelStyle}
            className="py-24 text-center glass-panel rounded-3xl p-8 border border-white/10"
          >
            <p className="text-neutral-400 text-sm">
              No se encontraron productos que coincidan con la búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 btn-secondary-glass px-5 py-2.5 text-xs font-semibold text-white cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={glassCardStyle}
                className="glass-card group flex flex-col justify-between rounded-3xl overflow-hidden relative"
              >
                <div>
                  {/* Imagen de Producto con contenedor estilizado */}
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-900 p-2">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/20 to-transparent opacity-85" />
                      
                      {/* Badge Glass pill */}
                      {product.badge && (
                        <div 
                          style={glassPillStyle}
                          className="absolute top-3 right-3 glass-pill px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider font-mono"
                        >
                          {product.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenido de Ficha */}
                  <div className="p-6 sm:p-7 pt-4">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 mb-1.5">
                      {product.category}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Metadata con separadores elegantes */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-mono tracking-wider">Entrega</span>
                        <span className="text-neutral-200 font-semibold">{product.turnaroundDays}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-neutral-500 block text-[10px] uppercase font-mono tracking-wider">Base Ref.</span>
                        <span className="text-white font-black text-sm font-mono-numbers">
                          {product.basePriceUsd ? `$${product.basePriceUsd} USD` : 'A Cotizar'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="p-6 sm:p-7 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="btn-secondary-glass py-3 px-3 text-xs font-semibold text-neutral-200 text-center cursor-pointer"
                  >
                    Ficha Técnica
                  </button>
                  <button
                    onClick={() => onSelectProductForQuote(product)}
                    className="btn-primary-material py-3 px-3 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal de Ficha Técnica Detallada (Liquid Glass 2026) */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div 
            style={glassPanelStyle}
            className="glass-panel rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveModalProduct(null)}
              style={glassPillStyle}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden bg-neutral-900 h-56 sm:h-auto border border-white/10">
                <img
                  src={activeModalProduct.imageUrl}
                  alt={activeModalProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-4">
                <div 
                  style={glassPillStyle}
                  className="glass-pill inline-flex px-3 py-1 rounded-full text-[11px] font-mono uppercase text-red-400"
                >
                  {activeModalProduct.category}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {activeModalProduct.name}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activeModalProduct.description}
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <span className="font-bold text-neutral-400 block mb-1.5 uppercase text-[10px] tracking-wider font-mono">
                      Materiales Disponibles:
                    </span>
                    <ul className="space-y-1.5">
                      {activeModalProduct.availableMaterials.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-neutral-400 block mb-1.5 uppercase text-[10px] tracking-wider font-mono">
                      Acabados & Opciones:
                    </span>
                    <ul className="space-y-1.5">
                      {activeModalProduct.availableFinishes.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex justify-between items-center">
                    <span className="text-neutral-400 text-xs">Tiempo de producción:</span>
                    <span className="text-white font-bold text-xs">{activeModalProduct.turnaroundDays}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      const prod = activeModalProduct;
                      setActiveModalProduct(null);
                      onSelectProductForQuote(prod);
                    }}
                    className="btn-primary-material w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Configurar y Cotizar Ahora</span>
                    <ArrowRight className="w-4 h-4" />
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

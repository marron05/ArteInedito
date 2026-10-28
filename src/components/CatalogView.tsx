import React, { useState } from 'react';
import { ProductItem, ProductCategory } from '../types';
import { CATEGORIES } from './CategoryGrid';
import { Search, ArrowRight, X, Clock, Layers, Sparkles, Check } from 'lucide-react';

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
    <section className="py-16 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de catálogo */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E53935]">
              Catálogo de Producción
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Soluciones Publicitarias & Textiles
            </h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Explora las soluciones reales fabricadas en nuestro taller en Lechería. Cada producto cuenta con especificaciones de materiales y opciones de acabado.
            </p>
          </div>

          {/* Buscador */}
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Buscar corpóreo, vinil, franela..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Filtros por Categoría (Segmented Controls sin Badges Garish) */}
        <div className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-neutral-100 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Todos los Productos ({products.filter(p => p.active).length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter(p => p.category === cat.id && p.active).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C41E3A] text-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-400 text-sm">
              No se encontraron productos que coincidan con la búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-neutral-950 border border-neutral-800/80 rounded-xl overflow-hidden hover:border-red-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
              >
                <div>
                  {/* Imagen de Producto con fallback seguro */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Badge editorial no-pill */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 uppercase tracking-wider font-mono">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Contenido de Ficha */}
                  <div className="p-6">
                    <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1 font-mono">
                      {product.category}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Metadata limpia sin cápsulas */}
                    <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-mono">Entrega</span>
                        <span className="text-neutral-300 font-medium">{product.turnaroundDays}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-neutral-500 block text-[10px] uppercase font-mono">Precio Base Ref.</span>
                        <span className="text-white font-bold font-mono-numbers">
                          {product.basePriceUsd ? `$${product.basePriceUsd} USD` : 'A Cotizar'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="px-3 py-2 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-center transition-colors cursor-pointer"
                  >
                    Ficha Técnica
                  </button>
                  <button
                    onClick={() => onSelectProductForQuote(product)}
                    className="px-3 py-2 text-xs font-bold text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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

      {/* Modal de Ficha Técnica Detallada */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2 rounded-xl overflow-hidden bg-neutral-900 h-52 sm:h-auto">
                <img
                  src={activeModalProduct.imageUrl}
                  alt={activeModalProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-4">
                <div className="text-xs font-mono uppercase text-[#E53935]">
                  {activeModalProduct.category}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeModalProduct.name}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activeModalProduct.description}
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-400 block mb-1">
                      Materiales Disponibles:
                    </span>
                    <ul className="space-y-1">
                      {activeModalProduct.availableMaterials.map((m) => (
                        <li key={m} className="flex items-center gap-1.5 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-neutral-400 block mb-1">
                      Opciones de Acabado:
                    </span>
                    <ul className="space-y-1">
                      {activeModalProduct.availableFinishes.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-neutral-900 flex justify-between">
                    <span className="text-neutral-400">Tiempo de producción:</span>
                    <span className="text-white font-medium">{activeModalProduct.turnaroundDays}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      const prod = activeModalProduct;
                      setActiveModalProduct(null);
                      onSelectProductForQuote(prod);
                    }}
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
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

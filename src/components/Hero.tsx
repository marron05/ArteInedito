import React from 'react';
import { ArrowRight, Sparkles, MapPin, Layers, Flame } from 'lucide-react';

interface HeroProps {
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Metadata limpia sin cápsulas */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              <span className="text-[#E53935] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Propuestas de Valor
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Esquina Inédita, Lechería</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>RIF J-412848798</span>
            </div>

            {/* Titular Principal de Alto Impacto */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              Imprimimos, vestimos, diseñamos y <span className="text-[#E53935]">construimos ideas.</span>
            </h1>

            {/* Bajada editorial */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
              No somos solo una imprenta ni solo confección textil: materializamos la identidad de tu marca de la pantalla al objeto físico. Corpóreos 3D, rotulación, sublimación, displays POP y grabado láser en nuestro taller en Lechería.
            </p>

            {/* CTAs con jerarquía estricta */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartQuote}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg shadow-lg shadow-red-950/40 transition-all cursor-pointer"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-all cursor-pointer"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>

            {/* Pruebas Cuantitativas Rigurosas (Adyacentes a la propuesta) */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-6 text-neutral-300">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">39.2K</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Comunidad en Instagram</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">8</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Técnicas en Taller Propio</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">100%</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Fabricación a Medida</div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Focal Carrier Visual */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full h-[380px] sm:h-[440px] lg:h-full rounded-2xl overflow-hidden border border-neutral-800 group shadow-2xl bg-neutral-900">
              <img
                src="/src/assets/images/hero_workshop_craft_1793205546075.jpg"
                alt="Taller y Showroom de Arte Inédito en Lechería"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />
              
              {/* Tarjeta de ubicación física en la esquina inferior */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/95 border border-neutral-700/60 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-white">
                    <MapPin className="w-4 h-4 text-[#E53935]" />
                    Esquina Inédita
                  </span>
                  <span className="text-neutral-400">Av. Principal de Lechería</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Showroom abierto al público para revisar muestras de acrílico, texturas y corpóreos.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

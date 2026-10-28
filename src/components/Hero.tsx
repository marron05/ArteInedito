import React from 'react';
import { ArrowRight, MapPin, Flame, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32">
      {/* Luces ambientales tenues (Red Ambient Glow < 5%) */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-red-600/10 blur-[130px] rounded-full -z-10"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/3 -right-20 w-[400px] h-[400px] bg-red-800/[0.07] blur-[110px] rounded-full -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Pills de Glass con metadata */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(229,57,53,0.8)]" />
                <span className="text-white font-bold tracking-wide">Propuestas de Valor</span>
              </div>
              <div className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-400">
                <span>Esquina Inédita · Lechería</span>
              </div>
              <div className="glass-pill px-3 py-1.5 rounded-full text-[11px] font-mono text-neutral-400 font-mono-numbers">
                RIF J-412848798
              </div>
            </div>

            {/* Titular Principal Imponente (Editorial Luxury 2026) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-[-0.035em] text-white leading-[1.05] text-balance">
                Imprimimos, vestimos, diseñamos y{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-[#C41E3A]">
                  construimos ideas.
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full opacity-80" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300/90 max-w-2xl leading-relaxed font-normal pt-2">
                De la pantalla al objeto físico. Transformamos la presencia de tu marca con corpóreos 3D, rotulación comercial, sublimación de alta gama, diseño POP y grabado láser en nuestro taller en Lechería.
              </p>
            </div>

            {/* CTAs con Sistema de Materiales */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartQuote}
                className="btn-primary-material inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white cursor-pointer"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold text-neutral-200 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <Compass className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Métricas Cuantitativas en Glass Cards */}
            <div className="pt-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers tracking-tight">
                    39.2K
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-medium">
                    Seguidores en Instagram
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers tracking-tight">
                    08
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-medium">
                    Líneas en Taller Propio
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers tracking-tight">
                    100%
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-medium">
                    Fabricación a Medida
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Visual Carrier con Marco Glass y Reflejo Especular */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden glass-card p-2 group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src="/assets/images/hero_workshop_craft_1793205546075.jpg"
                  alt="Taller y Showroom de Arte Inédito en Lechería"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Degradado cinematográfico */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/20 to-transparent opacity-90 pointer-events-none" />

                {/* Sello de Ubicación en Liquid Glass */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl liquid-glass-nav border border-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                    <span className="flex items-center gap-2 text-white font-bold">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Esquina Inédita
                    </span>
                    <span className="text-neutral-400 text-[11px]">Av. Principal de Lechería</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                    Showroom físico abierto al público. Muestras de acrílico 3D, cortes láser y texturas textiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Separador fino con gradiente rojo */}
      <div className="gradient-divider max-w-6xl mx-auto mt-20" />
    </section>
  );
};

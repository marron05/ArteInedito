import React from 'react';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { glassCardStyle } from '../styles/glass';

interface HeroProps {
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Sutil halo ambiental cálido */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/[0.02] blur-[150px] rounded-full -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor Editorial */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Kicker Editorial Unboxed */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="font-bold text-[#C41E3A] uppercase tracking-wider font-mono">
                Taller de Materialización
              </span>
              <span className="text-[#9A9A9A]" aria-hidden="true">·</span>
              <span className="text-[#5C5C5C] font-medium">Esquina Inédita, Lechería</span>
              <span className="text-[#9A9A9A]" aria-hidden="true">·</span>
              <span className="text-[#9A9A9A] font-mono font-mono-numbers">RIF J-412848798</span>
            </div>

            {/* Titular Principal Imponente (Editorial Luxury 2026) */}
            <div className="space-y-5">
              <h1 className="text-5xl sm:text-6xl lg:text-[4.65rem] font-black tracking-[-0.038em] text-[#1A1A1A] leading-[1.03] text-balance">
                Imprimimos, vestimos, diseñamos y{' '}
                <span className="relative inline-block text-[#C41E3A]">
                  construimos ideas.
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#C41E3A] rounded-full opacity-80" />
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#5C5C5C] max-w-2xl leading-relaxed font-normal">
                De la pantalla al objeto físico. Transformamos la presencia de tu marca con corpóreos 3D, rotulación comercial, sublimación textil de alta gama, diseño POP y corte láser en nuestro propio taller en Lechería.
              </p>
            </div>

            {/* CTAs con Contraste Claro */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartQuote}
                className="btn-primary-material inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white cursor-pointer shadow-sm"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="btn-secondary-glass inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold text-[#1A1A1A] cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <Compass className="w-4 h-4 text-[#5C5C5C]" />
              </button>
            </div>

            {/* Métricas Integradas en una Sola Tira Editorial (No 3 cajas sueltas) */}
            <div className="pt-3">
              <div className="bg-white rounded-2xl border border-[#E8E4DF] shadow-[0_2px_12px_-2px_rgba(28,25,23,0.04)] grid grid-cols-3 divide-x divide-[#E8E4DF] overflow-hidden">
                <div className="p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    39.2K
                  </div>
                  <div className="text-xs text-[#5C5C5C] mt-1 font-medium leading-snug">
                    Seguidores Instagram
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    08
                  </div>
                  <div className="text-xs text-[#5C5C5C] mt-1 font-medium leading-snug">
                    Líneas de Taller Propio
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    100%
                  </div>
                  <div className="text-xs text-[#5C5C5C] mt-1 font-medium leading-snug">
                    Fabricación a Medida
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Visual Carrier con Marco Premium y Sombra Suave */}
          <div className="lg:col-span-5 flex items-center">
            <div 
              style={glassCardStyle}
              className="relative w-full rounded-3xl overflow-hidden glass-card p-3 group border border-[#E8E4DF] shadow-[0_12px_36px_-6px_rgba(28,25,23,0.08)] bg-white"
            >
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src="/assets/images/hero_workshop_craft_1793205546075.jpg"
                  alt="Taller y Showroom de Arte Inédito en Lechería"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Sello de Ubicación Editorial */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E4DF] shadow-md">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
                    <span className="flex items-center gap-2 text-[#1A1A1A] font-bold">
                      <MapPin className="w-4 h-4 text-[#C41E3A]" />
                      Esquina Inédita
                    </span>
                    <span className="text-[#5C5C5C] text-[11px] font-mono">Av. Principal de Lechería</span>
                  </div>
                  <p className="text-[11px] text-[#5C5C5C] mt-1.5 leading-relaxed">
                    Showroom físico abierto al público. Muestrarios de acrílico 3D, cortes láser y texturas textiles para evaluar en vivo.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Separador fino */}
      <div className="gradient-divider max-w-6xl mx-auto mt-16 lg:mt-24" />
    </section>
  );
};

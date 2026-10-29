import React from 'react';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { glassCardStyle, glassPillStyle, glassHeaderStyle } from '../styles/glass';

interface HeroProps {
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Luces ambientales tenues (Red Ambient Glow < 3%) */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-red-600/[0.025] blur-[140px] rounded-full -z-10"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/3 -right-20 w-[400px] h-[400px] bg-amber-500/[0.03] blur-[120px] rounded-full -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            
            {/* Pills con metadata */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div 
                style={glassPillStyle}
                className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#5C5C5C]"
              >
                <span className="w-2 h-2 rounded-full bg-[#C41E3A] shadow-sm" />
                <span className="text-[#1A1A1A] font-bold tracking-wide">Propuestas de Valor</span>
              </div>
              <div 
                style={glassPillStyle}
                className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium text-[#5C5C5C]"
              >
                <span>Esquina Inédita · Lechería</span>
              </div>
              <div 
                style={glassPillStyle}
                className="glass-pill px-3 py-1.5 rounded-full text-[11px] font-mono text-[#9A9A9A] font-mono-numbers"
              >
                RIF J-412848798
              </div>
            </div>

            {/* Titular Principal Imponente (Editorial Premium Claro) */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-black tracking-[-0.04em] text-[#1A1A1A] leading-[1.02] text-balance">
                Imprimimos, vestimos, diseñamos y{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#C41E3A] via-rose-600 to-[#A81830]">
                  construimos ideas.
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C41E3A] via-rose-500 to-transparent rounded-full opacity-90 shadow-sm" />
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#5C5C5C] max-w-2xl leading-relaxed font-normal pt-1">
                De la pantalla al objeto físico. Transformamos la presencia de tu marca con corpóreos 3D, rotulación comercial, sublimación de alta gama, diseño POP y grabado láser en nuestro taller en Lechería.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onStartQuote}
                className="btn-primary-material inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white cursor-pointer shadow-md"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold text-[#1A1A1A] cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <Compass className="w-4 h-4 text-[#5C5C5C]" />
              </button>
            </div>

            {/* Métricas Cuantitativas en White Glass Cards */}
            <div className="pt-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div 
                  style={glassCardStyle}
                  className="glass-card p-4 sm:p-5 rounded-2xl relative group border border-[#E8E4DF]"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    39.2K
                  </div>
                  <div className="text-[11px] text-[#5C5C5C] mt-1 font-medium">
                    Seguidores en Instagram
                  </div>
                </div>

                <div 
                  style={glassCardStyle}
                  className="glass-card p-4 sm:p-5 rounded-2xl relative group border border-[#E8E4DF]"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    08
                  </div>
                  <div className="text-[11px] text-[#5C5C5C] mt-1 font-medium">
                    Líneas en Taller Propio
                  </div>
                </div>

                <div 
                  style={glassCardStyle}
                  className="glass-card p-4 sm:p-5 rounded-2xl relative group border border-[#E8E4DF]"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    100%
                  </div>
                  <div className="text-[11px] text-[#5C5C5C] mt-1 font-medium">
                    Fabricación a Medida
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Visual Carrier con Marco Glass Claro */}
          <div className="lg:col-span-5 flex items-center">
            <div 
              style={glassCardStyle}
              className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden glass-card p-2.5 group border border-[#E8E4DF]"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#F0EEEC]">
                <img
                  src="/assets/images/hero_workshop_craft_1793205546075.jpg"
                  alt="Taller y Showroom de Arte Inédito en Lechería"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Sello de Ubicación en Liquid Glass Claro */}
                <div 
                  style={glassHeaderStyle}
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl liquid-glass-nav border border-[#E8E4DF] shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
                    <span className="flex items-center gap-2 text-[#1A1A1A] font-bold">
                      <MapPin className="w-4 h-4 text-[#C41E3A]" />
                      Esquina Inédita
                    </span>
                    <span className="text-[#5C5C5C] text-[11px]">Av. Principal de Lechería</span>
                  </div>
                  <p className="text-[11px] text-[#5C5C5C] mt-1.5 leading-relaxed">
                    Showroom físico abierto al público. Muestras de acrílico 3D, cortes láser y texturas textiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Separador fino */}
      <div className="gradient-divider max-w-6xl mx-auto mt-16" />
    </section>
  );
};

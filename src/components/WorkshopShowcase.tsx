import React from 'react';
import { MapPin, Clock, Instagram, Phone, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompanySettings } from '../types';
import { glassCardStyle, glassPillStyle, glassPanelStyle } from '../styles/glass';

interface WorkshopShowcaseProps {
  settings: CompanySettings;
  onOpenQuote: () => void;
}

export const WorkshopShowcase: React.FC<WorkshopShowcaseProps> = ({
  settings,
  onOpenQuote
}) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-red-600/[0.05] blur-[130px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado Principal */}
        <div className="max-w-3xl space-y-3">
          <div 
            style={glassPillStyle}
            className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Showroom Físico & Taller</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em] text-balance">
            La Esquina Inédita en Lechería
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Un espacio creado para ver, tocar y experimentar texturas antes de producir. Desde letras corpóreas con iluminación LED perimetral hasta muestras de acrílico, vinilos de corte y acabados láser.
          </p>
        </div>

        {/* Grid de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tarjeta de Ubicación e Información en Glass Panel */}
          <div 
            style={glassPanelStyle}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-4 pb-6 border-b border-white/[0.08]">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-red-600/30 blur-sm" />
                <img
                  src="/assets/aistudio/image_b216ff69.png"
                  alt="Arte Inédito"
                  className="relative w-12 h-12 rounded-2xl object-contain bg-[#C41E3A] p-1 border border-white/20 shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Arte Inédito</h3>
                <span className="text-xs text-neutral-400 font-mono">RIF: {settings.rif}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Dirección Showroom:</span>
                  <span className="text-neutral-300 leading-relaxed">{settings.address}</span>
                  <div className="mt-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Avenida+Principal+de+Lecheria+Anzoategui+Venezuela"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Cómo llegar en Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Horario de Taller & Showroom:</span>
                  <span className="text-neutral-200 font-medium">{settings.openingHours}</span>
                  <span className="block text-[11px] text-emerald-400 mt-0.5">● Muestrarios físicos disponibles al público</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">WhatsApp Directo:</span>
                  <span className="text-neutral-300 font-mono-numbers">{settings.whatsappPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Comunidad Oficial:</span>
                  <a
                    href="https://instagram.com/arteinedito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    {settings.instagram} (~39.2K seguidores)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <a
                href="https://wa.link/alpo7z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-material w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Escribir por WhatsApp (wa.link/alpo7z)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Avenida+Principal+de+Lecheria+Anzoategui+Venezuela"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass w-full py-3 px-6 text-xs font-semibold text-neutral-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Abrir Ubicación en GPS / Maps</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Equipamiento y Garantías del Taller */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="text-red-400 text-xs font-bold font-mono uppercase mb-1.5">
                  Maquinaria Propia
                </div>
                <h4 className="text-lg font-bold text-white">Láser CNC & Router</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Corte y grabado de precisión en acrílico, madera, metal y MDF con tolerancias de medio milímetro.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="text-red-400 text-xs font-bold font-mono uppercase mb-1.5">
                  Colorimetría Textil
                </div>
                <h4 className="text-lg font-bold text-white">Sublimación Continua</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Prensas de calor de alta presión con tintas que fusionan a nivel molecular en la tela. Cero decoloración.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="text-red-400 text-xs font-bold font-mono uppercase mb-1.5">
                  Resistencia Costera
                </div>
                <h4 className="text-lg font-bold text-white">Laminado Automotriz UV</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Tratamientos protectores para el salitre y sol caribeño en Lechería y todo el oriente del país.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="text-red-400 text-xs font-bold font-mono uppercase mb-1.5">
                  Servicio Integral
                </div>
                <h4 className="text-lg font-bold text-white">Instalación en Sitio</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Equipo especializado para montaje en altura de corpóreos, rotulaciones y vallas en locales comerciales.
                </p>
              </div>
            </div>

            {/* Mini Galería de Taller & Showroom */}
            <div 
              style={glassCardStyle}
              className="glass-card p-5 rounded-3xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Visuales del Showroom & Taller Físico
                </span>
                <span className="text-[10px] text-neutral-400">Esquina Inédita, Lechería</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-28 rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img
                    src="/assets/images/hero_workshop_craft_1793205546075.jpg"
                    alt="Muestrario de acrílico y corte"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Muestrarios 3D</span>
                </div>
                <div className="h-28 rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img
                    src="/assets/images/laser_wood_craft_1793214061392.jpg"
                    alt="Área de grabado láser"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Láser de Fibra</span>
                </div>
                <div className="h-28 rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img
                    src="/assets/images/sublimacion_full_apparel_1793214135069.jpg"
                    alt="Showroom de textiles y sublimación"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Textiles & POP</span>
                </div>
              </div>
            </div>

            {/* Testimonio en Liquid Glass */}
            <div 
              style={glassPanelStyle}
              className="glass-panel p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <p className="text-sm italic text-neutral-200 leading-relaxed">
                  “Cada lona, cada corpóreo, cada taza o uniforme sale de nuestras manos… porque aquí las ideas no se quedan en pantalla: se materializan.”
                </p>
                <div className="text-xs text-neutral-400 font-mono">
                  — Dirección de Arte Inédito, Lechería
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="btn-secondary-glass shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
              >
                Iniciar Proyecto
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

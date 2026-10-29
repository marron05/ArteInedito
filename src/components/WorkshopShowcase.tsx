import React from 'react';
import { MapPin, Clock, Instagram, Phone, ArrowRight } from 'lucide-react';
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
    <section className="py-20 relative overflow-hidden">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-red-600/[0.02] blur-[130px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Encabezado Principal */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C41E3A] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
            <span>Showroom Físico & Taller</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-[-0.035em] leading-[1.05] text-balance">
            La Esquina Inédita en Lechería
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed">
            Un espacio creado para ver, tocar y experimentar texturas antes de producir. Desde letras corpóreas con iluminación LED perimetral hasta muestras de acrílico, vinilos de corte y acabados láser.
          </p>
        </div>

        {/* Grid de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tarjeta de Ubicación e Información en White Glass Panel */}
          <div 
            style={glassPanelStyle}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 bg-white border border-[#E8E4DF] shadow-md"
          >
            <div className="flex items-center gap-4 pb-6 border-b border-[#E8E4DF]">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-red-600/10 blur-sm" />
                <img
                  src="/assets/aistudio/image_b216ff69.png"
                  alt="Arte Inédito"
                  className="relative w-12 h-12 rounded-2xl object-contain bg-[#C41E3A] p-1 border border-[#E8E4DF] shadow-sm"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">Arte Inédito</h3>
                <span className="text-xs text-[#5C5C5C] font-mono">RIF: {settings.rif}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center text-[#C41E3A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1A1A1A] block">Dirección Showroom:</span>
                  <span className="text-[#5C5C5C] leading-relaxed">{settings.address}</span>
                  <div className="mt-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Avenida+Principal+de+Lecheria+Anzoategui+Venezuela"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#C41E3A] hover:text-[#A81830] font-semibold"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Cómo llegar en Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center text-[#C41E3A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1A1A1A] block">Horario de Taller & Showroom:</span>
                  <span className="text-[#5C5C5C] font-medium">{settings.openingHours}</span>
                  <span className="block text-[11px] text-emerald-600 mt-0.5">● Muestrarios físicos disponibles al público</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center text-[#C41E3A] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1A1A1A] block">WhatsApp Directo:</span>
                  <span className="text-[#5C5C5C] font-mono-numbers">{settings.whatsappPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center text-[#C41E3A] shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1A1A1A] block">Comunidad Oficial:</span>
                  <a
                    href="https://instagram.com/arteinedito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C41E3A] hover:text-[#A81830] font-semibold transition-colors"
                  >
                    {settings.instagram} (~39.2K seguidores)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4DF] space-y-2.5">
              <a
                href="https://wa.link/alpo7z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-material w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Escribir por WhatsApp (wa.link/alpo7z)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Avenida+Principal+de+Lecheria+Anzoategui+Venezuela"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass w-full py-3 px-6 text-xs font-semibold text-[#1A1A1A] flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#C41E3A]" />
                <span>Abrir Ubicación en GPS / Maps</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Equipamiento y Garantías del Taller */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl bg-white border border-[#E8E4DF]"
              >
                <div className="text-[#C41E3A] text-xs font-bold font-mono uppercase mb-1.5">
                  Maquinaria Propia
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Láser CNC & Router</h4>
                <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed">
                  Corte y grabado de precisión en acrílico, madera, metal y MDF con tolerancias de medio milímetro.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl bg-white border border-[#E8E4DF]"
              >
                <div className="text-[#C41E3A] text-xs font-bold font-mono uppercase mb-1.5">
                  Colorimetría Textil
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Sublimación Continua</h4>
                <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed">
                  Prensas de calor de alta presión con tintas que fusionan a nivel molecular en la tela. Cero decoloración.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl bg-white border border-[#E8E4DF]"
              >
                <div className="text-[#C41E3A] text-xs font-bold font-mono uppercase mb-1.5">
                  Resistencia Costera
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Laminado Automotriz UV</h4>
                <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed">
                  Tratamientos protectores para el salitre y sol caribeño en Lechería y todo el oriente del país.
                </p>
              </div>

              <div 
                style={glassCardStyle}
                className="glass-card p-6 rounded-3xl bg-white border border-[#E8E4DF]"
              >
                <div className="text-[#C41E3A] text-xs font-bold font-mono uppercase mb-1.5">
                  Servicio Integral
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Instalación en Sitio</h4>
                <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed">
                  Equipo especializado para montaje en altura de corpóreos, rotulaciones y vallas en locales comerciales.
                </p>
              </div>
            </div>

            {/* Mini Galería de Taller & Showroom */}
            <div 
              style={glassCardStyle}
              className="glass-card p-5 rounded-3xl space-y-3 bg-white border border-[#E8E4DF]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">
                  Visuales del Showroom & Taller Físico
                </span>
                <span className="text-[10px] text-[#5C5C5C]">Esquina Inédita, Lechería</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-28 rounded-2xl overflow-hidden border border-[#E8E4DF] relative group bg-[#F0EEEC]">
                  <img
                    src="/assets/images/hero_workshop_craft_1793205546075.jpg"
                    alt="Muestrario de acrílico y corte"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Muestrarios 3D</span>
                </div>
                <div className="h-28 rounded-2xl overflow-hidden border border-[#E8E4DF] relative group bg-[#F0EEEC]">
                  <img
                    src="/assets/images/laser_wood_craft_1793214061392.jpg"
                    alt="Área de grabado láser"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Láser de Fibra</span>
                </div>
                <div className="h-28 rounded-2xl overflow-hidden border border-[#E8E4DF] relative group bg-[#F0EEEC]">
                  <img
                    src="/assets/images/sublimacion_full_apparel_1793214135069.jpg"
                    alt="Showroom de textiles y sublimación"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">Textiles & POP</span>
                </div>
              </div>
            </div>

            {/* Testimonio en Liquid Glass */}
            <div 
              style={glassPanelStyle}
              className="glass-panel p-7 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#FAF8F5] border border-[#E8E4DF]"
            >
              <div className="space-y-2">
                <p className="text-sm italic text-[#1A1A1A] leading-relaxed">
                  “Cada lona, cada corpóreo, cada taza o uniforme sale de nuestras manos… porque aquí las ideas no se quedan en pantalla: se materializan.”
                </p>
                <div className="text-xs text-[#5C5C5C] font-mono">
                  — Dirección de Arte Inédito, Lechería
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="btn-secondary-glass shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] cursor-pointer shadow-sm"
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

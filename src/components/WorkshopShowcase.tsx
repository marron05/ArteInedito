import React from 'react';
import { MapPin, Clock, Instagram, Phone, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompanySettings } from '../types';

interface WorkshopShowcaseProps {
  settings: CompanySettings;
  onOpenQuote: () => void;
}

export const WorkshopShowcase: React.FC<WorkshopShowcaseProps> = ({
  settings,
  onOpenQuote
}) => {
  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado Principal */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E53935]">
            Sede Física · Showroom & Taller
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight text-balance">
            La Esquina Inédita en Lechería
          </h2>
          <p className="text-neutral-400 text-base mt-3 leading-relaxed">
            Un espacio creado para que veas, toques y experimentes las texturas antes de producir. Desde letras corpóreas con iluminación hasta muestras de tela, vinilos y acabados láser.
          </p>
        </div>

        {/* Grid de 2 Columnas: Información de Sede + Galería de Taller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tarjeta de Ubicación e Información de Contacto */}
          <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
              <img
                src="/assets/aistudio/image_b216ff69.png"
                alt="Arte Inédito"
                className="w-12 h-12 rounded-xl object-contain bg-[#C41E3A] p-1"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Arte Inédito</h3>
                <span className="text-xs text-neutral-400 font-mono">RIF: {settings.rif}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Dirección Showroom:</span>
                  <span className="text-neutral-300 leading-relaxed">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Horario de Atención:</span>
                  <span className="text-neutral-300">{settings.openingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Línea Directa / WhatsApp:</span>
                  <span className="text-neutral-300 font-mono-numbers">{settings.whatsappPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Comunidad Oficial:</span>
                  <a
                    href="https://instagram.com/arteinedito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    {settings.instagram} (~39.2K seguidores)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <a
                href="https://wa.link/alpo7z"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg transition-colors"
              >
                <span>Escribir por WhatsApp (wa.link/alpo7z)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna Derecha: Equipamiento y Garantías del Taller */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <div className="text-red-500 text-xs font-bold font-mono uppercase mb-1">
                  Maquinaria Propia
                </div>
                <h4 className="text-base font-bold text-white">Láser CNC & Router</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Corte y grabado de precisión en acrílico, madera, metal y MDF con tolerancias de medio milímetro.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <div className="text-red-500 text-xs font-bold font-mono uppercase mb-1">
                  Colorimetría Textil
                </div>
                <h4 className="text-base font-bold text-white">Sublimación Continua</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Prensas de calor de alta presión con tintas que fusionan a nivel molecular en la tela. Cero decoloración.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <div className="text-red-500 text-xs font-bold font-mono uppercase mb-1">
                  Resistencia Costera
                </div>
                <h4 className="text-base font-bold text-white">Laminado Automotriz UV</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Tratamientos protectores para el salitre y sol caribeño en Lechería y todo el oriente del país.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <div className="text-red-500 text-xs font-bold font-mono uppercase mb-1">
                  Servicio Integral
                </div>
                <h4 className="text-base font-bold text-white">Instalación en Sitio</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Equipo especializado para montaje en altura de corpóreos, rotulaciones y vallas en locales comerciales.
                </p>
              </div>
            </div>

            {/* Testimonio y Respaldo de Clientes */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs italic text-neutral-300">
                  “Cada lona, cada corpóreo, cada taza o uniforme sale de nuestras manos… porque aquí las ideas no se quedan en pantalla: se materializan.”
                </p>
                <div className="text-xs text-neutral-400 mt-2 font-mono">
                  — Dirección de Arte Inédito, Lechería
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="shrink-0 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
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

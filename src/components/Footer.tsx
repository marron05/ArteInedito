import React from 'react';
import { ArrowUpRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { CompanySettings } from '../types';

interface FooterProps {
  settings: CompanySettings;
  onNavigate: (view: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin') => void;
  onToggleAdmin: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onToggleAdmin,
  isAdmin
}) => {
  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.08] text-neutral-400 text-xs">
      {/* Separador fino superior */}
      <div className="gradient-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Marca & Esencia */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-red-600/30 blur-sm" />
                <img
                  src="/assets/aistudio/image_b216ff69.png"
                  alt="Arte Inédito"
                  className="relative w-9 h-9 rounded-xl object-contain bg-[#C41E3A] p-0.5 border border-white/20 shadow-md"
                />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Arte Inédito
              </span>
            </div>
            
            <p className="text-neutral-400 max-w-md text-xs leading-relaxed">
              La empresa de publicidad que imprime, viste, diseña y construye ideas que se hacen realidad. Corpóreos 3D, rotulación comercial, sublimación textil y grabado láser en Lechería.
            </p>
            
            <div className="glass-pill inline-flex px-3 py-1 rounded-full text-[11px] font-mono text-neutral-400">
              RIF: {settings.rif} · Lechería, Estado Anzoátegui
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-neutral-300 text-[11px] font-mono">
              Explorar
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catálogo & Técnicas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sede Esquina Inédita
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote')}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors cursor-pointer"
                >
                  Cotizador Guiado
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-neutral-300 text-[11px] font-mono">
              Visítanos
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Av. Principal de Lechería, frente a La Bodeguilla.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">
              {settings.openingHours}
            </div>
            <div className="pt-2">
              <a
                href="https://wa.link/alpo7z"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-red-400 hover:text-red-300 font-bold transition-all cursor-pointer"
              >
                <span>WhatsApp: {settings.whatsappPhone}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Línea inferior limpia */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Arte Inédito C.A. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/arteinedito"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              @arteinedito (~39.2K)
            </a>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={onToggleAdmin}
              className="hover:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>{isAdmin ? 'Vista Cliente' : 'Acceso Taller'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

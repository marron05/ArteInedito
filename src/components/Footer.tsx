import React from 'react';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
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
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Columna 1: Marca & Esencia */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_b216ff69.png"
                alt="Arte Inédito"
                className="w-8 h-8 rounded-lg object-contain bg-[#C41E3A] p-0.5"
              />
              <span className="text-base font-bold text-white tracking-tight">
                Arte Inédito
              </span>
            </div>
            <p className="text-neutral-400 max-w-md text-xs leading-relaxed">
              La empresa de publicidad que imprime, viste, diseña y construye ideas que se hacen realidad. Corpóreos 3D, rotulación comercial, sublimación textil y grabado láser.
            </p>
            <div className="text-[11px] font-mono text-neutral-500">
              RIF: {settings.rif} · Lechería, Estado Anzoátegui
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-2">
            <div className="font-bold uppercase tracking-wider text-neutral-300 text-[11px]">
              Explorar
            </div>
            <ul className="space-y-1.5">
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
                  className="hover:text-white text-red-400 transition-colors cursor-pointer"
                >
                  Cotizador Guiado
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-2">
            <div className="font-bold uppercase tracking-wider text-neutral-300 text-[11px]">
              Visítanos
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Av. Principal de Lechería, frente a La Bodeguilla.
            </p>
            <div className="text-[11px] text-neutral-400">
              {settings.openingHours}
            </div>
            <div className="pt-1">
              <a
                href="https://wa.link/alpo7z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold"
              >
                <span>WhatsApp: {settings.whatsappPhone}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Línea inferior limpia */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Arte Inédito C.A. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/arteinedito"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @arteinedito
            </a>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={onToggleAdmin}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>{isAdmin ? 'Volver a Vista Cliente' : 'Acceso Administrador'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

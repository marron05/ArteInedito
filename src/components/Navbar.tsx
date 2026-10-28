import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin';
  onNavigate: (view: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin') => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  onToggleAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group whitespace-nowrap shrink-0"
        >
          <img
            src="/assets/aistudio/image_b216ff69.png"
            alt="Arte Inédito"
            className="w-10 h-10 rounded-lg object-contain bg-[#C41E3A] p-0.5 border border-red-500/30 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
              Arte Inédito
            </span>
            <span className="text-[11px] font-medium text-neutral-400 tracking-wider uppercase">
              Publicidad & Textiles
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Navigation Links (single-line text) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentView === 'home' ? 'text-white border-b-2 border-[#C41E3A] pb-1' : 'text-neutral-400'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentView === 'catalog' ? 'text-white border-b-2 border-[#C41E3A] pb-1' : 'text-neutral-400'
            }`}
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentView === 'workshop' ? 'text-white border-b-2 border-[#C41E3A] pb-1' : 'text-neutral-400'
            }`}
          >
            Esquina Inédita
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentView === 'quote' ? 'text-white border-b-2 border-[#C41E3A] pb-1' : 'text-neutral-400'
            }`}
          >
            Cotizador Guiado
          </button>
          <button
            onClick={onToggleAdmin}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              isAdmin ? 'text-red-400 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
            }`}
            title="Alternar vista de taller / administración"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAdmin ? 'Modo Taller' : 'Gestión'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('quote')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <span>Materializar Idea</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-200"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-200"
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-200"
          >
            Esquina Inédita (Sede Lechería)
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            className="block w-full text-left py-2 text-sm font-medium text-red-400 font-semibold"
          >
            Cotizador Guiado (4 Pasos)
          </button>
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm text-neutral-400"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAdmin ? 'Salir de Modo Taller' : 'Acceso a Panel Taller / Admin'}</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] rounded-lg"
            >
              Iniciar Cotización
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

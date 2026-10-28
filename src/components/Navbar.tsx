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
    <div className="sticky top-0 sm:top-3 z-50 w-full px-2 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
      <header className="liquid-glass-nav rounded-2xl sm:rounded-3xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-6 transition-all">
        
        {/* Zone 1: Brand Wordmark with refined glow */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left focus:outline-none group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-red-600/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/aistudio/image_b216ff69.png"
              alt="Arte Inédito"
              className="relative w-10 h-10 rounded-xl object-contain bg-[#C41E3A] p-0.5 border border-white/20 shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-[-0.02em] text-white group-hover:text-red-400 transition-colors">
              Arte Inédito
            </span>
            <span className="text-[10px] font-semibold text-neutral-400 tracking-[0.16em] uppercase">
              Publicidad & Textiles
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Liquid Glass Segmented) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'home'
                ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'catalog'
                ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'workshop'
                ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Esquina Inédita
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'quote'
                ? 'bg-red-950/60 text-red-300 shadow-sm border border-red-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Cotizador Guiado
          </button>
          <button
            onClick={onToggleAdmin}
            className={`px-3 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-red-900/40 text-red-300 border border-red-500/40'
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]'
            }`}
            title="Alternar panel de gestión y taller"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>{isAdmin ? 'Taller' : 'Gestión'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action with Material Red Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('quote')}
            className="btn-primary-material inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Materializar Idea</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] border border-white/10"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-5 rounded-2xl liquid-glass-nav space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-neutral-200 hover:bg-white/[0.06]"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-neutral-200 hover:bg-white/[0.06]"
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-neutral-200 hover:bg-white/[0.06]"
          >
            Esquina Inédita (Sede Lechería)
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-red-400 bg-red-950/30 border border-red-900/40"
          >
            Cotizador Guiado (4 Pasos)
          </button>
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-400 hover:bg-white/[0.06]"
          >
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>{isAdmin ? 'Salir de Modo Taller' : 'Panel de Taller & Gestión'}</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="btn-primary-material w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white"
            >
              Iniciar Cotización
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

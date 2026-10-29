import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { glassHeaderStyle, glassPillStyle, glassPillActiveStyle } from '../styles/glass';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 sm:top-3 z-50 w-full px-2 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
      <header 
        style={glassHeaderStyle}
        className={`liquid-glass-nav rounded-2xl sm:rounded-3xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-6 transition-all duration-300 ${
          isScrolled 
            ? 'shadow-[0_10px_30px_-4px_rgba(28,25,23,0.08)] bg-white/98' 
            : 'shadow-[0_2px_12px_rgba(28,25,23,0.03)] bg-white/92'
        }`}
      >
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left focus:outline-none group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="relative">
            <img
              src="/assets/aistudio/image_b216ff69.png"
              alt="Arte Inédito"
              className="relative w-10 h-10 rounded-xl object-contain bg-[#C41E3A] p-0.5 border border-[#E8E4DF] shadow-sm transition-transform group-hover:scale-105 duration-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-[-0.03em] text-[#1A1A1A] group-hover:text-[#C41E3A] transition-colors leading-tight">
              Arte Inédito
            </span>
            <span className="text-[10px] font-semibold text-[#5C5C5C] tracking-[0.16em] uppercase">
              Publicidad & Textiles
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Liquid Glass Segmented Claro) */}
        <nav 
          style={glassPillStyle}
          className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full text-xs font-semibold text-[#5C5C5C] bg-[#FAF8F5] border border-[#E8E4DF]"
        >
          <button
            onClick={() => handleNavClick('home')}
            style={currentView === 'home' ? glassPillActiveStyle : undefined}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'home'
                ? 'glass-pill-active text-white font-bold'
                : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-white'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            style={currentView === 'catalog' ? glassPillActiveStyle : undefined}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'catalog'
                ? 'glass-pill-active text-white font-bold'
                : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-white'
            }`}
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            style={currentView === 'workshop' ? glassPillActiveStyle : undefined}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'workshop'
                ? 'glass-pill-active text-white font-bold'
                : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-white'
            }`}
          >
            Esquina Inédita
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            style={currentView === 'quote' ? glassPillActiveStyle : undefined}
            className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              currentView === 'quote'
                ? 'glass-pill-active text-white font-bold'
                : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-white'
            }`}
          >
            Cotizador Guiado
          </button>
          <button
            onClick={onToggleAdmin}
            style={isAdmin ? glassPillActiveStyle : undefined}
            className={`px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              isAdmin
                ? 'glass-pill-active text-white font-bold'
                : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-white'
            }`}
            title="Alternar panel de gestión y taller"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAdmin ? 'text-white' : 'text-[#C41E3A]'}`} />
            <span>{isAdmin ? 'Taller' : 'Gestión'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action with Material Red Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('quote')}
            className="btn-primary-material inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap shrink-0 cursor-pointer shadow-sm group"
          >
            <span>Materializar Idea</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={glassPillStyle}
            className="p-2 text-[#5C5C5C] hover:text-[#1A1A1A] rounded-xl cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={glassHeaderStyle}
          className="md:hidden mt-2 p-5 rounded-2xl liquid-glass-nav space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 bg-white shadow-xl border border-[#E8E4DF]"
        >
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F5F2]"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F5F2]"
          >
            Catálogo & Servicios
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F5F2]"
          >
            Esquina Inédita (Sede Lechería)
          </button>
          <button
            onClick={() => handleNavClick('quote')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#C41E3A] bg-red-50 border border-red-200"
          >
            Cotizador Guiado (4 Pasos)
          </button>
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#5C5C5C] hover:bg-[#F7F5F2]"
          >
            <ShieldCheck className="w-4 h-4 text-[#C41E3A]" />
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

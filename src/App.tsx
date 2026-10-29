import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { CatalogView } from './components/CatalogView';
import { QuoteWizard } from './components/QuoteWizard';
import { WorkshopShowcase } from './components/WorkshopShowcase';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

import { api } from './services/api';
import { ProductItem, QuoteRecord, CompanySettings, ProductCategory, QuoteStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_QUOTES, INITIAL_SETTINGS } from './data/initialCatalog';
import { CheckCircle2, ArrowRight } from 'lucide-react';

import { glassCardStyle } from './styles/glass';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'quote' | 'workshop' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Datos globales
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [quotes, setQuotes] = useState<QuoteRecord[]>(INITIAL_QUOTES as QuoteRecord[]);
  const [settings, setSettings] = useState<CompanySettings>(INITIAL_SETTINGS);

  // Parámetros de navegación rápida para el cotizador
  const [preselectedCategory, setPreselectedCategory] = useState<ProductCategory | null>(null);

  // Notificación de cotización enviada
  const [lastSubmittedFolio, setLastSubmittedFolio] = useState<string | null>(null);

  // Carga inicial desde SQLite API o LocalStorage
  useEffect(() => {
    async function loadData() {
      try {
        const [loadedProducts, loadedQuotes, loadedSettings] = await Promise.all([
          api.getProducts(),
          api.getQuotes(),
          api.getSettings()
        ]);
        if (loadedProducts && loadedProducts.length > 0) setProducts(loadedProducts);
        if (loadedQuotes && loadedQuotes.length > 0) setQuotes(loadedQuotes);
        if (loadedSettings && loadedSettings.companyName) setSettings(loadedSettings);
      } catch (err) {
        console.warn('Usando datos de inicio en memoria:', err);
      }
    }
    loadData();
  }, []);

  // Handlers para navegación
  const handleNavigate = (view: 'home' | 'catalog' | 'quote' | 'workshop' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin') {
      setIsAdmin(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdmin = () => {
    if (!isAdmin) {
      setIsAdmin(true);
      setCurrentView('admin');
    } else {
      setIsAdmin(false);
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Abrir cotizador con categoría específica
  const handleOpenQuoteWithCategory = (cat: ProductCategory) => {
    setPreselectedCategory(cat);
    setCurrentView('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Abrir cotizador con producto seleccionado del catálogo
  const handleSelectProductForQuote = (prod: ProductItem) => {
    setPreselectedCategory(prod.category);
    setCurrentView('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Crear cotización
  const handleSubmitQuote = async (data: any) => {
    const res = await api.submitQuote(data);
    setLastSubmittedFolio(res.id);
    
    // Actualizar lista local de cotizaciones
    const updatedQuotes = await api.getQuotes();
    setQuotes(updatedQuotes);
    
    return res;
  };

  // Handlers de administración
  const handleUpdateQuoteStatus = async (id: string, status: QuoteStatus, adminNotes?: string) => {
    const success = await api.updateQuoteStatus(id, status, adminNotes);
    if (success) {
      setQuotes(prev =>
        prev.map(q => (q.id === id ? { ...q, status, adminNotes: adminNotes ?? q.adminNotes } : q))
      );
    }
    return success;
  };

  const handleCreateProduct = async (productData: Partial<ProductItem>) => {
    const res = await api.createProduct(productData);
    const updated = await api.getProducts();
    setProducts(updated);
    return res;
  };

  const handleUpdateProduct = async (id: string, productData: Partial<ProductItem>) => {
    const success = await api.updateProduct(id, productData);
    if (success) {
      const updated = await api.getProducts();
      setProducts(updated);
    }
    return success;
  };

  const handleDeleteProduct = async (id: string) => {
    const success = await api.deleteProduct(id);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    return success;
  };

  const handleUpdateSettings = async (newSettings: CompanySettings) => {
    const success = await api.updateSettings(newSettings);
    if (success) {
      setSettings(newSettings);
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C41E3A] selection:text-white relative overflow-x-hidden ambient-mesh-glow">
      
      {/* Luz ambiental sutil global */}
      <div 
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-red-600/[0.015] blur-[150px] rounded-full -z-20"
        aria-hidden="true" 
      />

      {/* Floating Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Notificación flotante de cotización */}
      {lastSubmittedFolio && currentView !== 'quote' && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4DF] shadow-[0_12px_36px_-6px_rgba(28,25,23,0.12)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#C41E3A] flex items-center justify-center text-white shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1A1A1A]">Cotización registrada en taller</div>
                <div className="text-[11px] text-[#5C5C5C]">
                  Folio <strong className="text-[#C41E3A] font-mono-numbers">{lastSubmittedFolio}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAdmin(true);
                  setCurrentView('admin');
                }}
                className="btn-secondary-glass px-3.5 py-1.5 text-[11px] font-bold text-[#1A1A1A] cursor-pointer"
              >
                Ver en Taller
              </button>
              <button
                onClick={() => setLastSubmittedFolio(null)}
                className="p-1.5 text-[#9A9A9A] hover:text-[#1A1A1A] cursor-pointer rounded-lg hover:bg-[#FAF8F5] transition-colors"
                aria-label="Cerrar notificación"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal según vista */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onStartQuote={() => handleNavigate('quote')}
              onExploreCatalog={() => handleNavigate('catalog')}
            />

            <div className="gradient-divider max-w-6xl mx-auto my-4" />
            
            <CategoryGrid
              onSelectCategory={(cat) => {
                setPreselectedCategory(cat);
                handleNavigate('catalog');
              }}
              onOpenQuoteWithCategory={handleOpenQuoteWithCategory}
            />

            <div className="gradient-divider max-w-6xl mx-auto my-4" />

            {/* Sección de Casos / Trabajos Recientes con Identidad Inédita (Showroom Digital) */}
            <section className="py-20 lg:py-28 relative bg-[#FAF8F5] border-y border-[#E8E4DF]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#C41E3A] uppercase tracking-wider font-mono">
                        Portfolio Seleccionado
                      </span>
                      <span className="text-[#9A9A9A]" aria-hidden="true">·</span>
                      <span className="text-[#5C5C5C] font-medium">Proyectos en Anzoátegui</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-[-0.038em] leading-[1.08] text-balance">
                      Proyectos en Oriente
                    </h2>
                    <p className="text-[#5C5C5C] text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                      Una muestra de ideas construidas y montadas para marcas y comercios en Lechería, Barcelona y Puerto La Cruz.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('catalog')}
                    className="btn-secondary-glass inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider cursor-pointer group"
                  >
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight className="w-4 h-4 text-[#C41E3A] transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Proyecto 1: Corpóreo */}
                  <div 
                    style={glassCardStyle}
                    className="glass-card group rounded-3xl overflow-hidden p-3.5 bg-white border border-[#E8E4DF] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(28,25,23,0.08)]"
                  >
                    <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative bg-[#F0EEEC]">
                      <img
                        src="/assets/images/corporeo_3d_signage_1793205547566.jpg"
                        alt="Corpóreo 3D para ATECO Global"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md text-[10px] font-mono text-[#C41E3A] font-bold uppercase shadow-sm bg-white border border-[#E8E4DF]">
                        Corpóreos & Fachadas
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight group-hover:text-[#C41E3A] transition-colors">
                        Logo 3D Retroiluminado LED
                      </h3>
                      <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed font-normal">
                        Acrílico cristal con halo de luz LED cálida perimetral instalado en lobby corporativo en Lechería.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 2: Rotulación Vehicular */}
                  <div 
                    style={glassCardStyle}
                    className="glass-card group rounded-3xl overflow-hidden p-3.5 bg-white border border-[#E8E4DF] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(28,25,23,0.08)]"
                  >
                    <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative bg-[#F0EEEC]">
                      <img
                        src="/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg"
                        alt="Rotulación vehicular comercial"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md text-[10px] font-mono text-[#C41E3A] font-bold uppercase shadow-sm bg-white border border-[#E8E4DF]">
                        Rotulación Móvil
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight group-hover:text-[#C41E3A] transition-colors">
                        Branding Flotas Comerciales
                      </h3>
                      <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed font-normal">
                        Vinil polimérico con laminación UV protectora contra el salitre costero y alta temperatura.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 3: Merchandising */}
                  <div 
                    style={glassCardStyle}
                    className="glass-card group rounded-3xl overflow-hidden p-3.5 bg-white border border-[#E8E4DF] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(28,25,23,0.08)]"
                  >
                    <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative bg-[#F0EEEC]">
                      <img
                        src="/assets/images/sublimacion_merch_showcase_1793205546710.jpg"
                        alt="Powerbanks y Termos con Grabado Láser"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md text-[10px] font-mono text-[#C41E3A] font-bold uppercase shadow-sm bg-white border border-[#E8E4DF]">
                        Láser & Merchandising
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight group-hover:text-[#C41E3A] transition-colors">
                        Powerbanks & Termos Grabados
                      </h3>
                      <p className="text-xs text-[#5C5C5C] mt-2 leading-relaxed font-normal">
                        Kits corporativos con grabado láser de fibra óptica de precisión milimétrica indeleble.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="gradient-divider max-w-6xl mx-auto my-4" />

            {/* Banner de Sede Física */}
            <WorkshopShowcase
              settings={settings}
              onOpenQuote={() => handleNavigate('quote')}
            />
          </>
        )}

        {currentView === 'catalog' && (
          <CatalogView
            products={products}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        )}

        {currentView === 'quote' && (
          <QuoteWizard
            products={products}
            companySettings={settings}
            initialCategory={preselectedCategory}
            onQuoteSubmitted={(folio) => setLastSubmittedFolio(folio)}
            onSubmitQuote={handleSubmitQuote}
          />
        )}

        {currentView === 'workshop' && (
          <WorkshopShowcase
            settings={settings}
            onOpenQuote={() => handleNavigate('quote')}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            quotes={quotes}
            products={products}
            settings={settings}
            onUpdateQuoteStatus={handleUpdateQuoteStatus}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onToggleAdmin={handleToggleAdmin}
        isAdmin={isAdmin}
      />
    </div>
  );
}

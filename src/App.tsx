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
import { CheckCircle2, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#08080A] text-neutral-100 flex flex-col font-sans selection:bg-[#C41E3A] selection:text-white relative overflow-x-hidden">
      
      {/* Luz ambiental sutil global */}
      <div 
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-600/[0.035] blur-[160px] rounded-full -z-20"
        aria-hidden="true" 
      />

      {/* Floating Island Navigation (Liquid Glass 2026) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Notificación flotante de cotización en Liquid Glass */}
      {lastSubmittedFolio && currentView !== 'quote' && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="liquid-glass-nav p-4 rounded-2xl border border-red-500/40 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Cotización registrada</div>
                <div className="text-[11px] text-neutral-400">
                  Folio <strong className="text-red-400 font-mono-numbers">{lastSubmittedFolio}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAdmin(true);
                  setCurrentView('admin');
                }}
                className="btn-secondary-glass px-3 py-1.5 text-[11px] font-bold text-white cursor-pointer"
              >
                Ver en Taller
              </button>
              <button
                onClick={() => setLastSubmittedFolio(null)}
                className="p-1 text-neutral-400 hover:text-white cursor-pointer"
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
            
            <CategoryGrid
              onSelectCategory={(cat) => {
                setPreselectedCategory(cat);
                handleNavigate('catalog');
              }}
              onOpenQuoteWithCategory={handleOpenQuoteWithCategory}
            />

            {/* Sección de Casos / Trabajos Recientes con Identidad Inédita (Showroom Digital) */}
            <section className="py-24 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
                  <div className="space-y-3">
                    <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>Portfolio Seleccionado</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em]">
                      Proyectos en Oriente
                    </h2>
                    <p className="text-neutral-400 text-sm max-w-lg">
                      Una muestra de ideas construidas y montadas para marcas y comercios en Anzoátegui.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('catalog')}
                    className="btn-secondary-glass inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-neutral-200 uppercase tracking-wider cursor-pointer"
                  >
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Proyecto 1: Corpóreo */}
                  <div className="glass-card group rounded-3xl overflow-hidden p-2">
                    <div className="h-64 rounded-2xl overflow-hidden relative">
                      <img
                        src="/assets/images/corporeo_3d_signage_1793205547566.jpg"
                        alt="Corpóreo 3D para ATECO Global"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/20 to-transparent opacity-85" />
                      <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-red-400 font-bold uppercase">
                        Corpóreos & Fachadas
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        Logo 3D Retroiluminado LED
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        Acrílico cristal con halo de luz LED cálida perimetral instalado en lobby corporativo en Lechería.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 2: Rotulación Vehicular */}
                  <div className="glass-card group rounded-3xl overflow-hidden p-2">
                    <div className="h-64 rounded-2xl overflow-hidden relative">
                      <img
                        src="/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg"
                        alt="Rotulación vehicular comercial"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/20 to-transparent opacity-85" />
                      <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-red-400 font-bold uppercase">
                        Rotulación Móvil
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        Branding Flotas Comerciales
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        Vinil polimérico con laminación UV protectora contra el salitre costero y alta temperatura.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 3: Merchandising */}
                  <div className="glass-card group rounded-3xl overflow-hidden p-2">
                    <div className="h-64 rounded-2xl overflow-hidden relative">
                      <img
                        src="/assets/images/sublimacion_merch_showcase_1793205546710.jpg"
                        alt="Powerbanks y Termos con Grabado Láser"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/20 to-transparent opacity-85" />
                      <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-red-400 font-bold uppercase">
                        Láser & Merchandising
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        Powerbanks & Termos Grabados
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        Kits corporativos con grabado láser de fibra óptica de precisión milimétrica indeleble.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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

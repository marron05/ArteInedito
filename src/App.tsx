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
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

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

  // Carga inicial desde SQLite API
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#C41E3A] selection:text-white">
      {/* Barra superior obligatoria con contrato de 3 zonas */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Notificación si hay un folio recién generado */}
      {lastSubmittedFolio && currentView !== 'quote' && (
        <div className="bg-gradient-to-r from-red-950/90 to-neutral-900 border-b border-red-800/60 px-4 py-2.5 text-xs text-white flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Cotización registrada exitosamente con folio <strong>{lastSubmittedFolio}</strong>.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAdmin(true);
                  setCurrentView('admin');
                }}
                className="underline hover:text-red-300 font-semibold cursor-pointer"
              >
                Ver en Panel Taller
              </button>
              <button
                onClick={() => setLastSubmittedFolio(null)}
                className="text-neutral-400 hover:text-white ml-2"
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

            {/* Sección de Casos / Trabajos Recientes con Identidad Inédita */}
            <section className="py-20 bg-neutral-950 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E53935]">
                      Materialización de Marcas
                    </span>
                    <h2 className="text-3xl font-extrabold text-white mt-1">
                      Proyectos terminados en Oriente
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('catalog')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-white uppercase tracking-wider"
                  >
                    <span>Ver Todo el Catálogo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Proyecto 1: Corpóreo */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden group">
                    <div className="h-56 overflow-hidden">
                      <img
                        src="/src/assets/images/corporeo_3d_signage_1793205547566.jpg"
                        alt="Corpóreo 3D para ATECO Global"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-mono text-red-400 uppercase">Corpóreos & Fachadas</div>
                      <h3 className="text-base font-bold text-white mt-1">Logo 3D Retroiluminado LED</h3>
                      <p className="text-xs text-neutral-400 mt-2">
                        Acrílico cristal con halo de luz LED cálida sobre pared texturizada en Lechería.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 2: Rotulación Vehicular */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden group">
                    <div className="h-56 overflow-hidden">
                      <img
                        src="/src/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg"
                        alt="Rotulación vehicular comercial"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-mono text-red-400 uppercase">Rotulación Móvil</div>
                      <h3 className="text-base font-bold text-white mt-1">Branding Flotas Comerciales</h3>
                      <p className="text-xs text-neutral-400 mt-2">
                        Vinil polimérico con laminación UV resistente a altas temperaturas y salitre costero.
                      </p>
                    </div>
                  </div>

                  {/* Proyecto 3: Merchandising */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden group">
                    <div className="h-56 overflow-hidden">
                      <img
                        src="/src/assets/images/sublimacion_merch_showcase_1793205546710.jpg"
                        alt="Powerbanks y Termos con Grabado Láser"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-mono text-red-400 uppercase">Láser & Merchandising</div>
                      <h3 className="text-base font-bold text-white mt-1">Powerbanks & Termos Grabados</h3>
                      <p className="text-xs text-neutral-400 mt-2">
                        Kits corporativos con grabado láser milimétrico indeleble para marcas aliadas.
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

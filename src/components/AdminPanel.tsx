import React, { useState } from 'react';
import { 
  QuoteRecord, 
  ProductItem, 
  CompanySettings, 
  QuoteStatus,
  ProductCategory 
} from '../types';
import { CATEGORIES } from './CategoryGrid';
import { glassCardStyle, glassPillStyle, glassPanelStyle } from '../styles/glass';
import { 
  Inbox, 
  Package, 
  Settings, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  MessageSquare, 
  Download,
  Filter,
  Eye,
  ExternalLink,
  X,
  Flame
} from 'lucide-react';

interface AdminPanelProps {
  quotes: QuoteRecord[];
  products: ProductItem[];
  settings: CompanySettings;
  onUpdateQuoteStatus: (id: string, status: QuoteStatus, adminNotes?: string) => Promise<boolean>;
  onCreateProduct: (product: Partial<ProductItem>) => Promise<any>;
  onUpdateProduct: (id: string, product: Partial<ProductItem>) => Promise<boolean>;
  onDeleteProduct: (id: string) => Promise<boolean>;
  onUpdateSettings: (settings: CompanySettings) => Promise<boolean>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  quotes,
  products,
  settings,
  onUpdateQuoteStatus,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'products' | 'settings'>('quotes');

  // Estado para gestión de cotizaciones
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [quoteSearch, setQuoteSearch] = useState<string>('');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<QuoteRecord | null>(null);
  const [editNotesText, setEditNotesText] = useState<string>('');
  const [notesSavedMsg, setNotesSavedMsg] = useState<boolean>(false);

  // Estado para producto modal / edición
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);

  // Estado para configuración
  const [formSettings, setFormSettings] = useState<CompanySettings>({ ...settings });
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<boolean>(false);

  // Filtrado de cotizaciones
  const filteredQuotes = quotes.filter((q) => {
    const matchStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchSearch =
      quoteSearch.trim() === '' ||
      q.id.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.clientName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      (q.clientCompany && q.clientCompany.toLowerCase().includes(quoteSearch.toLowerCase())) ||
      q.productName.toLowerCase().includes(quoteSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Estadísticas rápidas calculadas
  const totalCount = quotes.length;
  const newCount = quotes.filter((q) => q.status === 'Nueva').length;
  const inProdCount = quotes.filter((q) => q.status === 'En Producción').length;
  const deliveredCount = quotes.filter((q) => q.status === 'Entregada').length;
  const totalValuation = quotes.reduce((acc, q) => acc + (q.estimatedTotalUsd || 0), 0);

  // Manejo de cambio de estado de cotización
  const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
    await onUpdateQuoteStatus(quoteId, newStatus, editNotesText || undefined);
    if (selectedQuoteDetail && selectedQuoteDetail.id === quoteId) {
      setSelectedQuoteDetail({ ...selectedQuoteDetail, status: newStatus });
    }
  };

  const handleSaveAdminNotes = async () => {
    if (!selectedQuoteDetail) return;
    await onUpdateQuoteStatus(selectedQuoteDetail.id, selectedQuoteDetail.status, editNotesText);
    setSelectedQuoteDetail({ ...selectedQuoteDetail, adminNotes: editNotesText });
    setNotesSavedMsg(true);
    setTimeout(() => setNotesSavedMsg(false), 2500);
  };

  // Exportar a CSV
  const handleExportCsv = () => {
    if (quotes.length === 0) return;
    const headers = [
      'Folio',
      'Cliente',
      'Empresa',
      'Telefono',
      'Email',
      'Servicio',
      'Material',
      'Acabado',
      'Medidas',
      'Cantidad',
      'Estimado_USD',
      'Estado',
      'Fecha'
    ];
    const rows = quotes.map((q) => [
      q.id,
      `"${q.clientName}"`,
      `"${q.clientCompany || ''}"`,
      `"${q.clientPhone}"`,
      `"${q.clientEmail || ''}"`,
      `"${q.productName}"`,
      `"${q.material}"`,
      `"${q.finish}"`,
      `"${q.dimensions || ''}"`,
      q.quantity,
      q.estimatedTotalUsd || 0,
      q.status,
      q.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cotizaciones_arte_inedito_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Guardar configuración
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateSettings(formSettings);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  // Guardar producto
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    if (isNewProduct) {
      await onCreateProduct(editingProduct);
    } else if (editingProduct.id) {
      await onUpdateProduct(editingProduct.id, editingProduct);
    }
    setEditingProduct(null);
    setIsNewProduct(false);
  };

  return (
    <div className="py-16 sm:py-24 relative min-h-screen">
      {/* Luz de fondo sutil */}
      <div 
        className="pointer-events-none absolute top-10 right-1/4 w-[600px] h-[350px] bg-red-600/[0.04] blur-[140px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span 
                style={glassPillStyle}
                className="glass-pill px-3 py-1 rounded-full text-xs font-mono font-bold text-red-400 uppercase"
              >
                Panel de Taller
              </span>
              <span className="text-xs text-neutral-400">Esquina Inédita Lechería</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Gestión de Cotizaciones & Producción
            </h1>
          </div>

          {/* Navegación por Pestañas Liquid Glass */}
          <div 
            style={glassPillStyle}
            className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-pill"
          >
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Cotizaciones ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catálogo ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
          </div>
        </div>

        {/* ======================= PESTAÑA 1: COTIZACIONES ======================= */}
        {activeTab === 'quotes' && (
          <div className="space-y-8">
            
            {/* KPI Cards en Frosted Glass */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Total Solicitudes</span>
                <div className="text-3xl font-black text-white mt-1 font-mono-numbers">{totalCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">Nuevas por Revisar</span>
                <div className="text-3xl font-black text-blue-400 mt-1 font-mono-numbers">{newCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">En Taller</span>
                <div className="text-3xl font-black text-amber-400 mt-1 font-mono-numbers">{inProdCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Valor Referencial</span>
                <div className="text-3xl font-black text-emerald-400 mt-1 font-mono-numbers">${totalValuation} USD</div>
              </div>
            </div>

            {/* Filtros y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'Nueva', 'En Revisión', 'En Producción', 'Entregada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? 'glass-pill-active text-white'
                        : 'glass-pill text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'Todas' : st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Buscar cliente, folio..."
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                  />
                </div>
                <button
                  onClick={handleExportCsv}
                  className="btn-secondary-glass inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 cursor-pointer"
                  title="Descargar reporte en CSV"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Contenedor de Cotizaciones: Desktop Table + Mobile Cards */}
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Vista Móvil (Cards) */}
              <div className="block md:hidden p-3.5 sm:p-4 space-y-4">
                {filteredQuotes.length === 0 ? (
                  <div className="py-12 text-center text-neutral-500 text-xs">
                    No se encontraron cotizaciones con los criterios seleccionados.
                  </div>
                ) : (
                  filteredQuotes.map((q) => (
                    <div 
                      key={q.id} 
                      style={glassCardStyle}
                      className="p-5 rounded-2xl space-y-3.5 relative border border-white/10"
                    >
                      {/* Top Bar: Folio & Status Selector */}
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-red-400 font-mono-numbers">{q.id}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Selector directo de estado con feedback de color */}
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                          className={`text-[10px] font-bold uppercase rounded-xl px-2.5 py-1.5 border transition-all cursor-pointer focus:outline-none ${
                            q.status === 'Nueva'
                              ? 'text-blue-400 border-blue-500/40 bg-blue-950/80'
                              : q.status === 'En Revisión'
                              ? 'text-amber-400 border-amber-500/40 bg-amber-950/80'
                              : q.status === 'En Producción'
                              ? 'text-red-400 border-red-500/40 bg-red-950/80'
                              : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80'
                          }`}
                        >
                          <option value="Nueva">Nueva</option>
                          <option value="En Revisión">En Revisión</option>
                          <option value="En Producción">En Producción</option>
                          <option value="Entregada">Entregada</option>
                        </select>
                      </div>

                      {/* Datos del Cliente */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold text-white tracking-tight">{q.clientName}</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            {q.clientCompany ? `${q.clientCompany} · ` : ''}{q.clientPhone}
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/${q.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hola ${q.clientName}, te escribimos de Arte Inédito respecto a tu cotización ${q.id}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:text-white shrink-0"
                          title="Abrir WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Especificaciones Técnicas */}
                      <div className="text-xs p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{q.productName}</span>
                          <span 
                            style={glassPillStyle}
                            className="glass-pill px-2 py-0.5 rounded-md text-[9px] font-mono uppercase text-neutral-400"
                          >
                            {q.category}
                          </span>
                        </div>
                        <div className="text-neutral-300 text-[11px] font-medium">
                          {q.material} · {q.finish}
                        </div>
                        {q.dimensions && (
                          <div className="text-neutral-400 text-[10px] font-mono">
                            Medidas: {q.dimensions}
                          </div>
                        )}
                        {q.artFileName && (
                          <div className="text-red-400 text-[10px] font-mono truncate">
                            Arte: {q.artFileName}
                          </div>
                        )}
                      </div>

                      {/* Footer de Card: Precio, Cantidad y Botón Detalle */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div>
                          <span className="text-neutral-500 text-[10px] uppercase font-mono block">
                            {q.quantity} uds · Total Ref:
                          </span>
                          <span className="font-mono-numbers font-black text-sm text-white">
                            ${q.estimatedTotalUsd || 0} USD
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedQuoteDetail(q);
                            setEditNotesText(q.adminNotes || '');
                          }}
                          className="btn-secondary-glass px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                        >
                          Ver Ficha Completa
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Vista Desktop (Tabla) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] border-b border-white/[0.08] text-neutral-400 uppercase font-mono tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-4">Folio</th>
                      <th className="px-5 py-4">Cliente / Empresa</th>
                      <th className="px-5 py-4">Servicio & Soporte</th>
                      <th className="px-5 py-4 text-center">Cant.</th>
                      <th className="px-5 py-4">Total Ref.</th>
                      <th className="px-5 py-4">Estado (Cambiar directo)</th>
                      <th className="px-5 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-16 text-center text-neutral-500">
                          No se encontraron cotizaciones con los criterios seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-white/[0.03] transition-colors">
                          <td className="px-5 py-4 font-mono text-white font-bold whitespace-nowrap">
                            {q.id}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-white">{q.clientName}</div>
                            <div className="text-[11px] text-neutral-400">
                              {q.clientCompany || 'Particular'} · {q.clientPhone}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-white">{q.productName}</div>
                            <div className="text-[11px] text-neutral-400">
                              {q.material} · {q.finish}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center font-mono-numbers font-bold">
                            {q.quantity}
                          </td>
                          <td className="px-5 py-4 font-mono-numbers font-bold text-white whitespace-nowrap">
                            ${q.estimatedTotalUsd || 0} USD
                          </td>
                          <td className="px-5 py-4">
                            {/* Selector directo de estado en la fila */}
                            <select
                              value={q.status}
                              onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                              className={`text-[11px] font-bold uppercase rounded-xl px-3 py-1.5 border transition-all cursor-pointer focus:outline-none ${
                                q.status === 'Nueva'
                                  ? 'text-blue-400 border-blue-500/40 bg-blue-950/60'
                                  : q.status === 'En Revisión'
                                  ? 'text-amber-400 border-amber-500/40 bg-amber-950/60'
                                  : q.status === 'En Producción'
                                  ? 'text-red-400 border-red-500/40 bg-red-950/60'
                                  : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60'
                              }`}
                            >
                              <option value="Nueva">Nueva</option>
                              <option value="En Revisión">En Revisión</option>
                              <option value="En Producción">En Producción</option>
                              <option value="Entregada">Entregada</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedQuoteDetail(q);
                                setEditNotesText(q.adminNotes || '');
                              }}
                              className="btn-secondary-glass px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer"
                            >
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================= PESTAÑA 2: CATÁLOGO DE PRODUCTOS ======================= */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Catálogo de Productos</h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Agrega, edita o desactiva productos del catálogo público de Arte Inédito.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    category: 'corporeos',
                    unit: 'unidad',
                    turnaroundDays: '3 a 5 días',
                    availableMaterials: ['Material Estándar'],
                    availableFinishes: ['Acabado Estándar'],
                    active: true,
                    imageUrl: '/assets/images/corporeo_3d_signage_1793205547566.jpg'
                  });
                  setIsNewProduct(true);
                }}
                className="btn-primary-material inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Listado de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className={`glass-card p-6 rounded-3xl ${
                    prod.active ? '' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase text-red-400">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-lg text-white mt-2">{prod.name}</h4>
                    </div>
                    <span className="text-sm font-mono-numbers font-black text-white">
                      ${prod.basePriceUsd} USD
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {prod.turnaroundDays}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...prod });
                          setIsNewProduct(false);
                        }}
                        className="btn-secondary-glass p-2 text-neutral-300 hover:text-white rounded-xl cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="btn-secondary-glass p-2 text-neutral-400 hover:text-red-400 rounded-xl cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= PESTAÑA 3: CONFIGURACIÓN ======================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl glass-panel rounded-3xl p-8 sm:p-10 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Datos del Taller</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Configura los números de contacto para la integración con WhatsApp y la sede en Lechería.
              </p>
            </div>

            {settingsSavedMsg && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs rounded-2xl flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Configuración guardada exitosamente.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Nombre Comercial
                </label>
                <input
                  type="text"
                  value={formSettings.companyName}
                  onChange={(e) => setFormSettings({ ...formSettings, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-red-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                    RIF
                  </label>
                  <input
                    type="text"
                    value={formSettings.rif}
                    onChange={(e) => setFormSettings({ ...formSettings, rif: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-red-500/60"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                    WhatsApp Comercial
                  </label>
                  <input
                    type="text"
                    value={formSettings.whatsappPhone}
                    onChange={(e) => setFormSettings({ ...formSettings, whatsappPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-red-500/60 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Dirección Sede (Esquina Inédita)
                </label>
                <input
                  type="text"
                  value={formSettings.address}
                  onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-red-500/60"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={formSettings.openingHours}
                  onChange={(e) => setFormSettings({ ...formSettings, openingHours: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-red-500/60"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary-material inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Modal de Detalle de Cotización en Liquid Glass */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
          <div className="glass-panel rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative max-h-[92vh] overflow-y-auto space-y-6 border border-white/10 shadow-2xl">
            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header de la Ficha */}
            <div className="border-b border-white/[0.08] pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono font-bold text-red-400 font-mono-numbers">
                  {selectedQuoteDetail.id}
                </span>
                <span 
                  className={`text-[10px] font-bold uppercase rounded-full px-2.5 py-0.5 border ${
                    selectedQuoteDetail.status === 'Nueva'
                      ? 'text-blue-400 border-blue-500/40 bg-blue-950/60'
                      : selectedQuoteDetail.status === 'En Revisión'
                      ? 'text-amber-400 border-amber-500/40 bg-amber-950/60'
                      : selectedQuoteDetail.status === 'En Producción'
                      ? 'text-red-400 border-red-500/40 bg-red-950/60'
                      : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60'
                  }`}
                >
                  {selectedQuoteDetail.status}
                </span>
                <span className="text-xs text-neutral-400 font-mono-numbers ml-auto pr-8 sm:pr-0">
                  Ingreso: {new Date(selectedQuoteDetail.createdAt).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {selectedQuoteDetail.clientName}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                {selectedQuoteDetail.clientCompany ? `${selectedQuoteDetail.clientCompany} · ` : 'Particular · '}
                Tel: {selectedQuoteDetail.clientPhone}
                {selectedQuoteDetail.clientEmail && ` · ${selectedQuoteDetail.clientEmail}`}
              </p>
            </div>

            {/* HISTORIAL / LÍNEA DE TIEMPO DEL ESTADO */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 font-mono flex items-center justify-between">
                <span>Historial de Estado & Flujo de Taller</span>
                <span className="text-[10px] text-neutral-500 font-normal">Toca un estado para cambiar</span>
              </label>

              {/* Stepper visual interactivo de 4 etapas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'Nueva', desc: '1. Recibida', icon: Inbox },
                  { key: 'En Revisión', desc: '2. Medidas/Arte', icon: Eye },
                  { key: 'En Producción', desc: '3. En Taller', icon: Flame },
                  { key: 'Entregada', desc: '4. Entregada', icon: CheckCircle }
                ].map((stepItem, idx) => {
                  const isCurrent = selectedQuoteDetail.status === stepItem.key;
                  const statusOrder = ['Nueva', 'En Revisión', 'En Producción', 'Entregada'];
                  const currentIndex = statusOrder.indexOf(selectedQuoteDetail.status);
                  const isPassed = currentIndex >= idx;
                  const Icon = stepItem.icon;

                  return (
                    <button
                      key={stepItem.key}
                      onClick={() => handleStatusChange(selectedQuoteDetail.id, stepItem.key as QuoteStatus)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-red-600/20 border-red-500/60 text-white shadow-lg shadow-red-950/40 ring-1 ring-red-500/30'
                          : isPassed
                          ? 'bg-white/[0.04] border-white/10 text-neutral-200 hover:bg-white/[0.08]'
                          : 'bg-black/40 border-white/[0.04] text-neutral-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-red-400' : isPassed ? 'text-emerald-400' : 'text-neutral-500'}`} />
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      <div className="font-bold text-xs">{stepItem.key}</div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{stepItem.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ESPECIFICACIONES TÉCNICAS COMPLETAS */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Especificaciones de Fabricación
              </label>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Servicio / Producto:</span>
                    <span className="text-white font-bold text-sm block mt-0.5">{selectedQuoteDetail.productName}</span>
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">{selectedQuoteDetail.category}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Cantidad Solicitada:</span>
                    <span className="text-white font-black font-mono-numbers text-sm block mt-0.5">
                      {selectedQuoteDetail.quantity} unidades
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Soporte / Material:</span>
                    <span className="text-neutral-200 font-semibold">{selectedQuoteDetail.material}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Acabado / Técnica:</span>
                    <span className="text-neutral-200 font-semibold">{selectedQuoteDetail.finish}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Medidas o Formato:</span>
                    <span className="text-neutral-200 font-semibold">{selectedQuoteDetail.dimensions || 'A definir en taller'}</span>
                  </div>
                </div>

                {selectedQuoteDetail.artFileName && (
                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Archivo de Arte Adjunto:</span>
                    <span className="text-red-400 font-mono text-xs font-semibold">{selectedQuoteDetail.artFileName}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3">
                  <span className="text-neutral-400 font-medium">Presupuesto Referencial Estimado:</span>
                  <span className="text-xl font-black text-white font-mono-numbers">
                    ${selectedQuoteDetail.estimatedTotalUsd || 0} <span className="text-xs text-neutral-400 font-normal">USD</span>
                  </span>
                </div>
              </div>
            </div>

            {/* OBSERVACIONES DEL CLIENTE */}
            {selectedQuoteDetail.notes && (
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                  Indicaciones del Cliente
                </label>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300 leading-relaxed italic">
                  &ldquo;{selectedQuoteDetail.notes}&rdquo;
                </div>
              </div>
            )}

            {/* NOTAS INTERNAS DEL TALLER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider font-mono">
                  Notas Internas del Taller
                </label>
                {notesSavedMsg && (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 animate-in fade-in">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Guardado en base de datos</span>
                  </span>
                )}
              </div>
              <textarea
                rows={2}
                value={editNotesText}
                onChange={(e) => setEditNotesText(e.target.value)}
                placeholder="Ej: Muestra de acrílico aprobada por WhatsApp, corte CNC programado para el jueves..."
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/60 leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAdminNotes}
                  className="btn-secondary-glass inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-red-400" />
                  <span>Guardar Notas Internas</span>
                </button>
              </div>
            </div>

            {/* BOTÓN WHATSAPP DIRECTO */}
            <div className="pt-2 border-t border-white/[0.08]">
              <a
                href={`https://wa.me/${selectedQuoteDetail.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hola ${selectedQuoteDetail.clientName}, te escribimos desde Arte Inédito (Esquina Inédita, Lechería) con respecto a tu cotización ${selectedQuoteDetail.id} para ${selectedQuoteDetail.productName} (Estado actual: ${selectedQuoteDetail.status}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl transition-all cursor-pointer shadow-xl shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contactar Cliente por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear / Editar Producto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="glass-panel rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {isNewProduct ? 'Nuevo Producto / Servicio' : 'Editar Producto'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Categoría</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-900 border border-white/10 text-white focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Nombre</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Subtítulo / Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Descripción</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Precio Base (USD)</label>
                  <input
                    type="number"
                    value={editingProduct.basePriceUsd || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePriceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Tiempo de Entrega</label>
                  <input
                    type="text"
                    value={editingProduct.turnaroundDays || '3 a 5 días'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, turnaroundDays: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn-secondary-glass px-5 py-2.5 text-neutral-300 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary-material px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

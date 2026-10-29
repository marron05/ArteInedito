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
  CheckCircle, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  MessageSquare, 
  Download,
  Eye,
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
    <div className="py-12 sm:py-20 relative min-h-screen">
      {/* Luz de fondo sutil */}
      <div 
        className="pointer-events-none absolute top-10 right-1/4 w-[600px] h-[350px] bg-red-600/[0.02] blur-[140px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E8E4DF]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span 
                style={glassPillStyle}
                className="glass-pill px-3 py-1 rounded-full text-xs font-mono font-bold text-[#C41E3A] uppercase border border-[#E8E4DF]"
              >
                Panel de Taller
              </span>
              <span className="text-xs text-[#5C5C5C]">Esquina Inédita Lechería</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Gestión de Cotizaciones & Producción
            </h1>
          </div>

          {/* Navegación por Pestañas */}
          <div 
            style={glassPillStyle}
            className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-pill bg-white border border-[#E8E4DF]"
          >
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#C41E3A] text-white shadow-sm'
                  : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Cotizaciones ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#C41E3A] text-white shadow-sm'
                  : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catálogo ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#C41E3A] text-white shadow-sm'
                  : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
          </div>
        </div>

        {/* ======================= PESTAÑA 1: COTIZACIONES ======================= */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl bg-white border border-[#E8E4DF]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9A9A9A]">Total Solicitudes</span>
                <div className="text-3xl font-black text-[#1A1A1A] mt-1 font-mono-numbers">{totalCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl bg-white border border-[#E8E4DF]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">Nuevas por Revisar</span>
                <div className="text-3xl font-black text-blue-700 mt-1 font-mono-numbers">{newCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl bg-white border border-[#E8E4DF]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold">En Taller</span>
                <div className="text-3xl font-black text-amber-700 mt-1 font-mono-numbers">{inProdCount}</div>
              </div>
              <div className="glass-card p-5 rounded-2xl bg-white border border-[#E8E4DF]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">Valor Referencial</span>
                <div className="text-3xl font-black text-emerald-700 mt-1 font-mono-numbers">${totalValuation} USD</div>
              </div>
            </div>

            {/* Filtros y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'Nueva', 'En Revisión', 'En Producción', 'Entregada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap border ${
                      statusFilter === st
                        ? 'glass-pill-active text-white'
                        : 'glass-pill text-[#5C5C5C] hover:text-[#1A1A1A] border-[#E8E4DF] bg-white'
                    }`}
                  >
                    {st === 'all' ? 'Todas' : st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Buscar cliente, folio..."
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <button
                  onClick={handleExportCsv}
                  className="btn-secondary-glass inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] cursor-pointer"
                  title="Descargar reporte en CSV"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Contenedor de Cotizaciones: Desktop Table + Mobile Cards */}
            <div className="glass-panel rounded-3xl overflow-hidden shadow-sm bg-white border border-[#E8E4DF]">
              
              {/* Vista Móvil (Cards) */}
              <div className="block md:hidden p-3.5 sm:p-4 space-y-4">
                {filteredQuotes.length === 0 ? (
                  <div className="py-12 text-center text-[#9A9A9A] text-xs">
                    No se encontraron cotizaciones con los criterios seleccionados.
                  </div>
                ) : (
                  filteredQuotes.map((q) => (
                    <div 
                      key={q.id} 
                      style={glassCardStyle}
                      className="p-5 rounded-2xl space-y-3.5 relative border border-[#E8E4DF] bg-white"
                    >
                      {/* Top Bar: Folio & Status Selector */}
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E8E4DF]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#C41E3A] font-mono-numbers">{q.id}</span>
                          <span className="text-[10px] text-[#9A9A9A] font-mono">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Selector directo de estado con colores claros */}
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                          className={`text-[10px] font-bold uppercase rounded-xl px-2.5 py-1.5 border transition-all cursor-pointer focus:outline-none ${
                            q.status === 'Nueva'
                              ? 'text-blue-700 border-blue-200 bg-blue-50'
                              : q.status === 'En Revisión'
                              ? 'text-amber-700 border-amber-200 bg-amber-50'
                              : q.status === 'En Producción'
                              ? 'text-red-700 border-red-200 bg-red-50'
                              : 'text-emerald-700 border-emerald-200 bg-emerald-50'
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
                          <div className="text-sm font-bold text-[#1A1A1A] tracking-tight">{q.clientName}</div>
                          <div className="text-xs text-[#5C5C5C] mt-0.5">
                            {q.clientCompany ? `${q.clientCompany} · ` : ''}{q.clientPhone}
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/${q.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hola ${q.clientName}, te escribimos de Arte Inédito respecto a tu cotización ${q.id}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 shrink-0"
                          title="Abrir WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Especificaciones Técnicas */}
                      <div className="text-xs p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1A1A] text-xs">{q.productName}</span>
                          <span 
                            style={glassPillStyle}
                            className="glass-pill px-2 py-0.5 rounded-md text-[9px] font-mono uppercase text-[#5C5C5C]"
                          >
                            {q.category}
                          </span>
                        </div>
                        <div className="text-[#5C5C5C] text-[11px] font-medium">
                          {q.material} · {q.finish}
                        </div>
                        {q.dimensions && (
                          <div className="text-[#9A9A9A] text-[10px] font-mono">
                            Medidas: {q.dimensions}
                          </div>
                        )}
                        {q.artFileName && (
                          <div className="text-[#C41E3A] text-[10px] font-mono truncate">
                            Arte: {q.artFileName}
                          </div>
                        )}
                      </div>

                      {/* Footer de Card: Precio, Cantidad y Botón Detalle */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div>
                          <span className="text-[#9A9A9A] text-[10px] uppercase font-mono block">
                            {q.quantity} uds · Total Ref:
                          </span>
                          <span className="font-mono-numbers font-black text-sm text-[#1A1A1A]">
                            ${q.estimatedTotalUsd || 0} USD
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedQuoteDetail(q);
                            setEditNotesText(q.adminNotes || '');
                          }}
                          className="btn-secondary-glass px-4 py-2 text-xs font-semibold text-[#1A1A1A] cursor-pointer"
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
                  <thead className="bg-[#FAF8F5] border-b border-[#E8E4DF] text-[#5C5C5C] uppercase font-mono tracking-wider text-[10px]">
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
                  <tbody className="divide-y divide-[#E8E4DF] text-[#1A1A1A]">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-16 text-center text-[#9A9A9A]">
                          No se encontraron cotizaciones con los criterios seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="px-5 py-4 font-mono text-[#C41E3A] font-bold whitespace-nowrap">
                            {q.id}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-[#1A1A1A]">{q.clientName}</div>
                            <div className="text-[11px] text-[#5C5C5C]">
                              {q.clientCompany || 'Particular'} · {q.clientPhone}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-[#1A1A1A]">{q.productName}</div>
                            <div className="text-[11px] text-[#5C5C5C]">
                              {q.material} · {q.finish}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center font-mono-numbers font-bold">
                            {q.quantity}
                          </td>
                          <td className="px-5 py-4 font-mono-numbers font-bold text-[#1A1A1A] whitespace-nowrap">
                            ${q.estimatedTotalUsd || 0} USD
                          </td>
                          <td className="px-5 py-4">
                            {/* Selector directo de estado en la fila */}
                            <select
                              value={q.status}
                              onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                              className={`text-[11px] font-bold uppercase rounded-xl px-3 py-1.5 border transition-all cursor-pointer focus:outline-none ${
                                q.status === 'Nueva'
                                  ? 'text-blue-700 border-blue-200 bg-blue-50'
                                  : q.status === 'En Revisión'
                                  ? 'text-amber-700 border-amber-200 bg-amber-50'
                                  : q.status === 'En Producción'
                                  ? 'text-red-700 border-red-200 bg-red-50'
                                  : 'text-emerald-700 border-emerald-200 bg-emerald-50'
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
                              className="btn-secondary-glass px-3.5 py-1.5 text-xs font-semibold text-[#1A1A1A] cursor-pointer"
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Catálogo de Productos</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C]">
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
                className="btn-primary-material inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-sm"
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
                  className={`glass-card p-6 rounded-3xl bg-white border border-[#E8E4DF] ${
                    prod.active ? '' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase text-[#C41E3A] border border-[#E8E4DF]">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-lg text-[#1A1A1A] mt-2">{prod.name}</h4>
                    </div>
                    <span className="text-sm font-mono-numbers font-black text-[#1A1A1A]">
                      ${prod.basePriceUsd} USD
                    </span>
                  </div>

                  <p className="text-xs text-[#5C5C5C] mt-2 line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E8E4DF] flex items-center justify-between text-xs">
                    <span className="text-[#5C5C5C] font-mono text-[11px]">
                      {prod.turnaroundDays}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...prod });
                          setIsNewProduct(false);
                        }}
                        className="btn-secondary-glass p-2 text-[#5C5C5C] hover:text-[#1A1A1A] rounded-xl cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="btn-secondary-glass p-2 text-[#9A9A9A] hover:text-[#C41E3A] rounded-xl cursor-pointer"
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
          <div className="max-w-2xl glass-panel rounded-3xl p-8 sm:p-10 space-y-8 bg-white border border-[#E8E4DF] shadow-md">
            <div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Datos del Taller</h3>
              <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1">
                Configura los números de contacto para la integración con WhatsApp y la sede en Lechería.
              </p>
            </div>

            {settingsSavedMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Configuración guardada exitosamente.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div>
                <label className="block text-[#1A1A1A] font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Nombre Comercial
                </label>
                <input
                  type="text"
                  value={formSettings.companyName}
                  onChange={(e) => setFormSettings({ ...formSettings, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1A1A1A] font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                    RIF
                  </label>
                  <input
                    type="text"
                    value={formSettings.rif}
                    onChange={(e) => setFormSettings({ ...formSettings, rif: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A] font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                    WhatsApp Comercial
                  </label>
                  <input
                    type="text"
                    value={formSettings.whatsappPhone}
                    onChange={(e) => setFormSettings({ ...formSettings, whatsappPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Dirección Sede (Esquina Inédita)
                </label>
                <input
                  type="text"
                  value={formSettings.address}
                  onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={formSettings.openingHours}
                  onChange={(e) => setFormSettings({ ...formSettings, openingHours: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary-material inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Modal de Detalle de Cotización */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
          <div className="glass-panel rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative max-h-[92vh] overflow-y-auto space-y-6 bg-white border border-[#E8E4DF] shadow-2xl">
            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-[#5C5C5C] hover:text-[#1A1A1A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header de la Ficha */}
            <div className="border-b border-[#E8E4DF] pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono font-bold text-[#C41E3A] font-mono-numbers border border-[#E8E4DF]">
                  {selectedQuoteDetail.id}
                </span>
                <span 
                  className={`text-[10px] font-bold uppercase rounded-full px-2.5 py-0.5 border ${
                    selectedQuoteDetail.status === 'Nueva'
                      ? 'text-blue-700 border-blue-200 bg-blue-50'
                      : selectedQuoteDetail.status === 'En Revisión'
                      ? 'text-amber-700 border-amber-200 bg-amber-50'
                      : selectedQuoteDetail.status === 'En Producción'
                      ? 'text-red-700 border-red-200 bg-red-50'
                      : 'text-emerald-700 border-emerald-200 bg-emerald-50'
                  }`}
                >
                  {selectedQuoteDetail.status}
                </span>
                <span className="text-xs text-[#5C5C5C] font-mono-numbers ml-auto pr-8 sm:pr-0">
                  Ingreso: {new Date(selectedQuoteDetail.createdAt).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A]">
                {selectedQuoteDetail.clientName}
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-0.5">
                {selectedQuoteDetail.clientCompany ? `${selectedQuoteDetail.clientCompany} · ` : 'Particular · '}
                Tel: {selectedQuoteDetail.clientPhone}
                {selectedQuoteDetail.clientEmail && ` · ${selectedQuoteDetail.clientEmail}`}
              </p>
            </div>

            {/* HISTORIAL / LÍNEA DE TIEMPO DEL ESTADO */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DF] space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] font-mono flex items-center justify-between">
                <span>Historial de Estado & Flujo de Taller</span>
                <span className="text-[10px] text-[#5C5C5C] font-normal">Toca un estado para cambiar</span>
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
                          ? 'bg-red-50 border-red-300 text-[#C41E3A] shadow-sm ring-1 ring-red-200'
                          : isPassed
                          ? 'bg-white border-[#E8E4DF] text-[#1A1A1A] hover:bg-[#FAF8F5]'
                          : 'bg-white border-[#E8E4DF] text-[#9A9A9A] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#C41E3A]' : isPassed ? 'text-emerald-600' : 'text-[#9A9A9A]'}`} />
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
                        )}
                      </div>
                      <div className="font-bold text-xs">{stepItem.key}</div>
                      <div className="text-[10px] text-[#5C5C5C] font-mono mt-0.5">{stepItem.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ESPECIFICACIONES TÉCNICAS COMPLETAS */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] font-mono">
                Especificaciones de Fabricación
              </label>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DF] text-xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#E8E4DF]">
                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Servicio / Producto:</span>
                    <span className="text-[#1A1A1A] font-bold text-sm block mt-0.5">{selectedQuoteDetail.productName}</span>
                    <span className="text-[10px] font-mono text-[#C41E3A] uppercase tracking-wider">{selectedQuoteDetail.category}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Cantidad Solicitada:</span>
                    <span className="text-[#1A1A1A] font-black font-mono-numbers text-sm block mt-0.5">
                      {selectedQuoteDetail.quantity} unidades
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Soporte / Material:</span>
                    <span className="text-[#1A1A1A] font-semibold">{selectedQuoteDetail.material}</span>
                  </div>
                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Acabado / Técnica:</span>
                    <span className="text-[#1A1A1A] font-semibold">{selectedQuoteDetail.finish}</span>
                  </div>
                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Medidas o Formato:</span>
                    <span className="text-[#1A1A1A] font-semibold">{selectedQuoteDetail.dimensions || 'A definir en taller'}</span>
                  </div>
                </div>

                {selectedQuoteDetail.artFileName && (
                  <div className="pt-2 border-t border-[#E8E4DF]">
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono">Archivo de Arte Adjunto:</span>
                    <span className="text-[#C41E3A] font-mono text-xs font-semibold">{selectedQuoteDetail.artFileName}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-[#E8E4DF] pt-3">
                  <span className="text-[#5C5C5C] font-medium">Presupuesto Referencial Estimado:</span>
                  <span className="text-xl font-black text-[#1A1A1A] font-mono-numbers">
                    ${selectedQuoteDetail.estimatedTotalUsd || 0} <span className="text-xs text-[#5C5C5C] font-normal">USD</span>
                  </span>
                </div>
              </div>
            </div>

            {/* OBSERVACIONES DEL CLIENTE */}
            {selectedQuoteDetail.notes && (
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 font-mono">
                  Indicaciones del Cliente
                </label>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DF] text-xs text-[#5C5C5C] leading-relaxed italic">
                  &ldquo;{selectedQuoteDetail.notes}&rdquo;
                </div>
              </div>
            )}

            {/* NOTAS INTERNAS DEL TALLER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">
                  Notas Internas del Taller
                </label>
                {notesSavedMsg && (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 animate-in fade-in">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Guardado en base de datos</span>
                  </span>
                )}
              </div>
              <textarea
                rows={2}
                value={editNotesText}
                onChange={(e) => setEditNotesText(e.target.value)}
                placeholder="Ej: Muestra de acrílico aprobada por WhatsApp, corte CNC programado para el jueves..."
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAdminNotes}
                  className="btn-secondary-glass inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1A1A1A] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#C41E3A]" />
                  <span>Guardar Notas Internas</span>
                </button>
              </div>
            </div>

            {/* BOTÓN WHATSAPP DIRECTO */}
            <div className="pt-2 border-t border-[#E8E4DF]">
              <a
                href={`https://wa.me/${selectedQuoteDetail.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hola ${selectedQuoteDetail.clientName}, te escribimos desde Arte Inédito (Esquina Inédita, Lechería) con respecto a tu cotización ${selectedQuoteDetail.id} para ${selectedQuoteDetail.productName} (Estado actual: ${selectedQuoteDetail.status}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl transition-all cursor-pointer shadow-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="glass-panel rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5 bg-white border border-[#E8E4DF] shadow-2xl">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-[#5C5C5C] hover:text-[#1A1A1A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1A1A1A]">
              {isNewProduct ? 'Nuevo Producto / Servicio' : 'Editar Producto'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#1A1A1A] mb-1 font-medium">Categoría</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1 font-medium">Nombre</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1 font-medium">Subtítulo / Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1 font-medium">Descripción</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-medium">Precio Base (USD)</label>
                  <input
                    type="number"
                    value={editingProduct.basePriceUsd || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePriceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-medium">Tiempo de Entrega</label>
                  <input
                    type="text"
                    value={editingProduct.turnaroundDays || '3 a 5 días'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, turnaroundDays: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DF] text-[#1A1A1A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn-secondary-glass px-5 py-2.5 text-[#5C5C5C] hover:text-[#1A1A1A] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary-material px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-sm"
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

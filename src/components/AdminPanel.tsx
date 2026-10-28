import React, { useState } from 'react';
import { 
  QuoteRecord, 
  ProductItem, 
  CompanySettings, 
  QuoteStatus,
  ProductCategory 
} from '../types';
import { CATEGORIES } from './CategoryGrid';
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
  X
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
    <div className="py-12 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-500 uppercase">Panel de Control</span>
              <span className="text-neutral-600">/</span>
              <span className="text-xs text-neutral-400">Esquina Inédita Lechería</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Gestión de Taller & Cotizaciones
            </h1>
          </div>

          {/* Navegación por Pestañas */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Cotizaciones ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catálogo ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-neutral-800 text-white shadow-sm'
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
          <div className="space-y-6">
            
            {/* KPI Cards de Cotizaciones */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-neutral-400">Total Solicitudes</span>
                <div className="text-2xl font-black text-white mt-1 font-mono-numbers">{totalCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-blue-400">Nuevas por Revisar</span>
                <div className="text-2xl font-black text-white mt-1 font-mono-numbers">{newCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-amber-400">En Taller / Producción</span>
                <div className="text-2xl font-black text-white mt-1 font-mono-numbers">{inProdCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-emerald-400">Total Referencial</span>
                <div className="text-2xl font-black text-white mt-1 font-mono-numbers">${totalValuation} USD</div>
              </div>
            </div>

            {/* Filtros y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'Nueva', 'En Revisión', 'En Producción', 'Entregada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#C41E3A] text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'Todas' : st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar cliente, folio..."
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                  title="Descargar reporte en formato CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Tabla de Cotizaciones */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase font-mono tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Folio</th>
                      <th className="px-4 py-3.5">Cliente / Empresa</th>
                      <th className="px-4 py-3.5">Servicio & Soporte</th>
                      <th className="px-4 py-3.5 text-center">Cant.</th>
                      <th className="px-4 py-3.5">Total Ref.</th>
                      <th className="px-4 py-3.5">Estado</th>
                      <th className="px-4 py-3.5 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-neutral-500">
                          No se encontraron cotizaciones con los criterios seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="px-4 py-3.5 font-mono text-white font-bold whitespace-nowrap">
                            {q.id}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-white">{q.clientName}</div>
                            <div className="text-[11px] text-neutral-400">
                              {q.clientCompany || 'Particular'} · {q.clientPhone}
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="font-medium text-white">{q.productName}</div>
                            <div className="text-[11px] text-neutral-400">
                              {q.material} · {q.finish}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-center font-mono-numbers">
                            {q.quantity}
                          </td>
                          <td className="px-4 py-3.5 font-mono-numbers font-semibold text-white">
                            ${q.estimatedTotalUsd || 0} USD
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                                q.status === 'Nueva'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : q.status === 'En Revisión'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : q.status === 'En Producción'
                                  ? 'bg-red-950 text-red-300 border border-red-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {q.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedQuoteDetail(q);
                                setEditNotesText(q.adminNotes || '');
                              }}
                              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-[#C41E3A] border border-neutral-700/80 rounded transition-colors cursor-pointer"
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
                <h3 className="text-lg font-bold text-white">Líneas y Productos de Taller</h3>
                <p className="text-xs text-neutral-400">
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
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Listado de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className={`p-4 rounded-xl border transition-all ${
                    prod.active
                      ? 'bg-neutral-900/60 border-neutral-800'
                      : 'bg-neutral-950 border-neutral-900 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-red-400 block">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-sm text-white mt-0.5">{prod.name}</h4>
                    </div>
                    <span className="text-xs font-mono-numbers font-bold text-white">
                      ${prod.basePriceUsd} USD
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                    {prod.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-mono text-[11px]">
                      {prod.turnaroundDays}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...prod });
                          setIsNewProduct(false);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 rounded hover:bg-neutral-800"
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
          <div className="max-w-2xl bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Datos de la Empresa & Taller</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Configura los números de contacto para la integración con WhatsApp y la información comercial.
              </p>
            </div>

            {settingsSavedMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Configuración guardada exitosamente en la base de datos SQLite.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={formSettings.companyName}
                  onChange={(e) => setFormSettings({ ...formSettings, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">RIF</label>
                  <input
                    type="text"
                    value={formSettings.rif}
                    onChange={(e) => setFormSettings({ ...formSettings, rif: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Teléfono WhatsApp</label>
                  <input
                    type="text"
                    value={formSettings.whatsappPhone}
                    onChange={(e) => setFormSettings({ ...formSettings, whatsappPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Dirección Sede (Esquina Inédita)</label>
                <input
                  type="text"
                  value={formSettings.address}
                  onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Horario de Atención</label>
                <input
                  type="text"
                  value={formSettings.openingHours}
                  onChange={(e) => setFormSettings({ ...formSettings, openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-500">{selectedQuoteDetail.id}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-400 font-mono-numbers">
                  {new Date(selectedQuoteDetail.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedQuoteDetail.clientName}
              </h3>
              <p className="text-xs text-neutral-400">
                {selectedQuoteDetail.clientCompany || 'Particular'} · {selectedQuoteDetail.clientPhone}
              </p>
            </div>

            {/* Ficha técnica del pedido */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Servicio Solicitado:</span>
                <span className="text-white font-bold">{selectedQuoteDetail.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Soporte / Material:</span>
                <span className="text-white font-medium">{selectedQuoteDetail.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Acabado / Técnica:</span>
                <span className="text-white font-medium">{selectedQuoteDetail.finish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Medidas:</span>
                <span className="text-white font-medium">{selectedQuoteDetail.dimensions || 'A definir'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Cantidad:</span>
                <span className="text-white font-bold font-mono-numbers">{selectedQuoteDetail.quantity}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2">
                <span className="text-neutral-400">Total Referencial:</span>
                <span className="text-red-400 font-bold font-mono-numbers">
                  ${selectedQuoteDetail.estimatedTotalUsd || 0} USD
                </span>
              </div>
            </div>

            {/* Notas del cliente */}
            {selectedQuoteDetail.notes && (
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Indicaciones del Cliente / Arte
                </label>
                <div className="p-3 bg-neutral-900 rounded-lg text-xs text-neutral-300">
                  {selectedQuoteDetail.notes}
                </div>
              </div>
            )}

            {/* Selector de Estado */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2">
                Cambiar Estado de la Cotización
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Nueva', 'En Revisión', 'En Producción', 'Entregada'] as QuoteStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedQuoteDetail.id, st)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedQuoteDetail.status === st
                        ? 'bg-[#C41E3A] text-white border-red-500 shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notas Internas de Taller */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Notas Internas de Taller (para el equipo de Arte Inédito)
              </label>
              <textarea
                rows={2}
                value={editNotesText}
                onChange={(e) => setEditNotesText(e.target.value)}
                placeholder="Ej: Cliente solicitó prueba de color antes del viernes..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSaveAdminNotes}
                className="mt-2 px-3 py-1.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded cursor-pointer"
              >
                Guardar Notas Internas
              </button>
            </div>

            {/* Botón WhatsApp directo */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${selectedQuoteDetail.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hola ${selectedQuoteDetail.clientName}, te escribimos desde Arte Inédito (Esquina Inédita, Lechería) con respecto a tu cotización ${selectedQuoteDetail.id} para ${selectedQuoteDetail.productName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">
              {isNewProduct ? 'Nuevo Producto / Servicio' : 'Editar Producto'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Categoría</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Subtítulo / Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Precio Base (USD)</label>
                  <input
                    type="number"
                    value={editingProduct.basePriceUsd || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePriceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Tiempo de Entrega</label>
                  <input
                    type="text"
                    value={editingProduct.turnaroundDays || '3 a 5 días'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, turnaroundDays: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] rounded-lg"
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

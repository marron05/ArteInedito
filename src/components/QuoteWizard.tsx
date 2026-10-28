import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Upload, 
  FileText, 
  Layers, 
  Clock, 
  Building2, 
  Phone, 
  User, 
  Mail, 
  MessageCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ProductCategory, ProductItem, CompanySettings } from '../types';
import { CATEGORIES } from './CategoryGrid';

interface QuoteWizardProps {
  products: ProductItem[];
  companySettings: CompanySettings;
  initialCategory?: ProductCategory | null;
  onQuoteSubmitted?: (folio: string) => void;
  onSubmitQuote: (data: any) => Promise<{ id: string; success: boolean }>;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  products,
  companySettings,
  initialCategory,
  onQuoteSubmitted,
  onSubmitQuote
}) => {
  // Estado de los 4 pasos
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Paso 1: Selección
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory || 'corporeos');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  // Paso 2: Especificaciones
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [dimensions, setDimensions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Paso 3: Diseño y Archivo
  const [artFileName, setArtFileName] = useState<string>('');
  const [artDescription, setArtDescription] = useState<string>('');
  const [hasVector, setHasVector] = useState<boolean>(true);

  // Paso 4: Datos del Cliente
  const [clientName, setClientName] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedFolio, setGeneratedFolio] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sincronizar producto predeterminado al cambiar categoría
  useEffect(() => {
    const categoryProducts = products.filter(p => p.category === selectedCategory && p.active);
    if (categoryProducts.length > 0) {
      const first = categoryProducts[0];
      setSelectedProductId(first.id);
      setSelectedMaterial(first.availableMaterials[0] || 'Material Estándar');
      setSelectedFinish(first.availableFinishes[0] || 'Acabado Estándar');
    }
  }, [selectedCategory, products]);

  // Si viene con categoría inicial
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const currentProduct = products.find(p => p.id === selectedProductId) || products.find(p => p.category === selectedCategory);

  // Cálculo referencial estimado
  const basePrice = currentProduct?.basePriceUsd || 50;
  const estimatedTotal = Math.round(basePrice * quantity * (selectedFinish.toLowerCase().includes('led') ? 1.4 : 1));

  // Manejador de archivo simulado
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtFileName(e.target.files[0].name);
    }
  };

  // Validación por paso
  const canProceedStep1 = Boolean(selectedCategory && selectedProductId);
  const canProceedStep2 = Boolean(selectedMaterial && selectedFinish && quantity > 0);
  const canProceedStep3 = Boolean(artDescription.trim().length > 3 || artFileName);
  const canProceedStep4 = Boolean(clientName.trim() && clientPhone.trim());

  // Generar mensaje estructurado para WhatsApp
  const generateWhatsAppMessage = (folio: string) => {
    const text = `*SOLICITUD DE COTIZACIÓN — ARTE INÉDITO*
*Folio:* ${folio}
📍 *Sede:* Esquina Inédita, Av. Principal de Lechería
---------------------------------------------
👤 *Cliente:* ${clientName}
🏢 *Empresa:* ${clientCompany || 'Particular'}
📱 *Teléfono:* ${clientPhone}
${clientEmail ? `📧 *Email:* ${clientEmail}\n` : ''}
📦 *Servicio:* ${currentProduct?.name || selectedCategory.toUpperCase()}
🪵 *Material / Soporte:* ${selectedMaterial}
✨ *Acabado:* ${selectedFinish}
📐 *Medidas / Especificaciones:* ${dimensions || 'A convenir con taller'}
🔢 *Cantidad:* ${quantity} ${currentProduct?.unit || 'unidades'}
⏱️ *Tiempo estimado:* ${currentProduct?.turnaroundDays || '3 a 5 días hábiles'}
💵 *Total Ref. Estimado:* ~$${estimatedTotal} USD

🎨 *Arte / Logo:* ${artFileName ? `Archivo adjunto (${artFileName})` : 'Pendiente por coordinar'}
💡 *Notas del proyecto:* ${notes || artDescription || 'Sin observaciones adicionales'}
---------------------------------------------
*Mensaje generado desde arteinedito.com*`;
    return encodeURIComponent(text);
  };

  // Enviar a base de datos y abrir WhatsApp
  const handleFinalSubmit = async () => {
    if (!canProceedStep4) {
      setErrorMsg('Por favor completa tu nombre y número de teléfono.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const quotePayload = {
        clientName,
        clientCompany: clientCompany || undefined,
        clientPhone,
        clientEmail: clientEmail || undefined,
        category: selectedCategory,
        productId: currentProduct?.id || selectedProductId,
        productName: currentProduct?.name || 'Servicio Publicitario',
        material: selectedMaterial,
        finish: selectedFinish,
        dimensions: dimensions || undefined,
        quantity,
        notes: `${artDescription ? `[Arte]: ${artDescription}. ` : ''}${notes || ''}`,
        artFileName: artFileName || undefined,
        estimatedTotalUsd: estimatedTotal
      };

      const result = await onSubmitQuote(quotePayload);
      setGeneratedFolio(result.id);
      setIsSubmitting(false);

      if (onQuoteSubmitted) {
        onQuoteSubmitted(result.id);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg('No se pudo guardar la cotización. Puedes enviarla directamente por WhatsApp.');
      const backupFolio = `AI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedFolio(backupFolio);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!generatedFolio) return;
    const cleanPhone = companySettings.whatsappPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${generateWhatsAppMessage(generatedFolio)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 relative">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/[0.06] blur-[130px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      {/* Encabezado del cotizador */}
      <div className="text-center mb-12 space-y-3">
        <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(229,57,53,0.8)]" />
          <span>De la Idea al Objeto</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em]">
          Cotizador Guiado
        </h2>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
          Configura materiales, acabados y medidas para generar una proforma oficial lista para el taller y WhatsApp.
        </p>
      </div>

      {/* Stepper de 4 pasos estilo Liquid Glass */}
      <div className="mb-10 p-1.5 rounded-2xl glass-pill max-w-xl mx-auto">
        <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-bold">
          {[
            { stepNum: 1, title: '1. Servicio' },
            { stepNum: 2, title: '2. Técnica' },
            { stepNum: 3, title: '3. Diseño' },
            { stepNum: 4, title: '4. Resumen' }
          ].map((s) => (
            <div 
              key={s.stepNum} 
              className={`py-2 px-2 rounded-xl transition-all ${
                step === s.stepNum 
                  ? 'bg-gradient-to-r from-red-600 to-[#C41E3A] text-white shadow-md' 
                  : step > s.stepNum 
                    ? 'text-neutral-300 bg-white/[0.04]' 
                    : 'text-neutral-500'
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>
      </div>

      {/* Tarjeta contenedora de pasos (Frosted Glass Panel) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 relative">
        
        {/* ===================== PASO 1: SELECCIÓN DE PRODUCTO/SERVICIO ===================== */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">¿Qué deseas materializar?</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Selecciona la categoría principal y el producto base de nuestro taller.
              </p>
            </div>

            {/* Categorías en Frosted Glass */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 text-left rounded-2xl text-xs transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'glass-pill-active text-white'
                      : 'glass-card text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 text-white">{cat.title}</div>
                  <div className="text-[11px] text-neutral-400/80 line-clamp-1">{cat.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Selector de Producto específico */}
            <div className="pt-6 border-t border-white/[0.08]">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4 font-mono">
                Variante o Producto Específico
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {products
                  .filter(p => p.category === selectedCategory && p.active)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
                        selectedProductId === p.id
                          ? 'glass-pill-active text-white ring-1 ring-red-500/40'
                          : 'glass-card text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-white">{p.name}</span>
                        {p.badge && (
                          <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] text-red-400 font-mono-numbers">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {p.tagline}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                        <span className="text-neutral-300 font-semibold">Desde ${p.basePriceUsd} USD</span>
                        <span className="font-mono text-[11px]">{p.turnaroundDays}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Botón Siguiente */}
            <div className="pt-6 flex justify-end">
              <button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className="btn-primary-material inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Continuar a Especificaciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 2: TÉCNICA Y ESPECIFICACIONES ===================== */}
        {step === 2 && currentProduct && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Especificaciones de Taller</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Configurando para: <strong className="text-white">{currentProduct.name}</strong>
              </p>
            </div>

            {/* Selección de Material / Soporte */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3 font-mono">
                1. Material o Soporte de Fabricación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.availableMaterials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-4 text-left rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedMaterial === mat
                        ? 'glass-pill-active text-white'
                        : 'glass-card text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{mat}</span>
                      {selectedMaterial === mat && <Check className="w-4 h-4 text-red-500" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de Acabado / Iluminación */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3 font-mono">
                2. Acabado o Técnica de Personalización
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.availableFinishes.map((fin) => (
                  <button
                    key={fin}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-4 text-left rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedFinish === fin
                        ? 'glass-pill-active text-white'
                        : 'glass-card text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{fin}</span>
                      {selectedFinish === fin && <Check className="w-4 h-4 text-red-500" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Medidas y Cantidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
                  3. Medidas Estimadas
                </label>
                <input
                  type="text"
                  placeholder="Ej: 120 x 60 cm o modelo de vehículo"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                />
                <span className="text-[11px] text-neutral-500 mt-1.5 block">
                  Si no tienes medidas exactas, nuestro equipo puede medirlas en sitio.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
                  4. Cantidad Requerida ({currentProduct.unit})
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-32 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm font-bold font-mono-numbers focus:outline-none focus:border-red-500/60 text-center"
                  />
                  <span className="text-xs text-neutral-400">
                    Tiempo de taller: <strong className="text-neutral-200">{currentProduct.turnaroundDays}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary-glass inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-neutral-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Servicios</span>
              </button>

              <button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                className="btn-primary-material inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Continuar a Diseño</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: DISEÑO Y ARCHIVOS ===================== */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Diseño, Arte y Archivos</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Sube tu logo vectorial o cuéntanos la idea para que el taller prepare la muestra digital.
              </p>
            </div>

            {/* Dropzone de Carga de Arte en Glass */}
            <div className="border-2 border-dashed border-white/15 hover:border-red-500/40 rounded-3xl p-8 sm:p-10 text-center bg-white/[0.02] hover:bg-red-950/[0.08] transition-all relative">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.ai,.pdf,.svg,.eps,.psd"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-red-500 mx-auto mb-3 shadow-inner">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-white">
                {artFileName ? (
                  <span className="text-red-400 font-bold">{artFileName}</span>
                ) : (
                  <span>Arrastra tu logotipo o haz clic para cargar archivo</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">
                Formatos: .AI, .PDF, .SVG, .EPS o imágenes en alta resolución .PNG/.JPG
              </p>
            </div>

            {/* Check de vector */}
            <div className="glass-pill p-4 rounded-2xl flex items-center gap-3 text-xs">
              <input
                type="checkbox"
                id="vectorCheck"
                checked={hasVector}
                onChange={(e) => setHasVector(e.target.checked)}
                className="rounded accent-red-600 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="vectorCheck" className="text-neutral-300 cursor-pointer font-medium">
                Cuento con el logo en vector editable (AI, PDF o SVG). Si no lo tienes, nuestro equipo de diseño gráfico puede adaptarlo.
              </label>
            </div>

            {/* Observaciones de color */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
                Indicaciones de Color, Posición o Especificaciones
              </label>
              <textarea
                rows={4}
                placeholder="Indica colores Pantone corporativos, posición del logotipo, tipografías deseadas o detalles del montaje..."
                value={artDescription}
                onChange={(e) => setArtDescription(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60 leading-relaxed"
              />
            </div>

            {/* Botones de navegación */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary-glass inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-neutral-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Especificaciones</span>
              </button>

              <button
                disabled={!canProceedStep3}
                onClick={() => setStep(4)}
                className="btn-primary-material inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Ver Resumen & Proforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 4: RESUMEN Y GENERACIÓN DE PROFORMA ===================== */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Resumen de Proforma</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Revisa los datos de tu cotización antes de archivarla en sistema y enviarla a WhatsApp.
              </p>
            </div>

            {/* Desglose de Cotización en formato Proforma Glass */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Ítem Configurado</div>
                  <div className="text-lg font-bold text-white mt-0.5">{currentProduct?.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Estimado Ref.</div>
                  <div className="text-xl font-black text-red-400 font-mono-numbers">~${estimatedTotal} USD</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono">Soporte:</span>
                  <span className="text-neutral-200 font-semibold">{selectedMaterial}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono">Acabado:</span>
                  <span className="text-neutral-200 font-semibold">{selectedFinish}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono">Medidas:</span>
                  <span className="text-neutral-200 font-semibold">{dimensions || 'A convenir'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono">Cantidad:</span>
                  <span className="text-neutral-200 font-bold font-mono-numbers">{quantity} {currentProduct?.unit}</span>
                </div>
              </div>

              {artFileName && (
                <div className="pt-3 text-xs border-t border-white/[0.06] flex items-center gap-2">
                  <span className="text-neutral-500">Arte adjunto:</span> 
                  <span className="text-red-400 font-mono font-medium">{artFileName}</span>
                </div>
              )}
            </div>

            {/* Formulario de Datos de Contacto */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Datos de Contacto para la Proforma
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ej: Carlos Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Empresa o Marca (Opcional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ej: Restaurante Sol & Mar"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Número de WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Ej: +58 414-1234567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Correo Electrónico (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      placeholder="contacto@tuempresa.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Notas adicionales para el taller
                </label>
                <input
                  type="text"
                  placeholder="Ej: Requerimos factura fiscal o entrega antes del viernes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-2xl text-xs text-red-300 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Éxito: Proforma Generada */}
            {generatedFolio ? (
              <div className="p-8 rounded-3xl bg-red-950/30 border border-red-800/60 space-y-5 animate-in fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-950/60">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      ¡Cotización Registrada con Éxito!
                    </h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Folio oficial asignado: <strong className="text-red-400 font-mono-numbers">{generatedFolio}</strong>. Ha quedado archivada en el sistema del taller.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  Para coordinar la fabricación o recibir render 3D preliminar, envía la proforma estructurada directamente al WhatsApp oficial de Arte Inédito en Lechería.
                </p>

                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-2xl shadow-xl shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar Proforma a WhatsApp (wa.link/alpo7z)</span>
                </button>
              </div>
            ) : (
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-secondary-glass inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-neutral-300 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Diseño</span>
                </button>

                <button
                  disabled={!canProceedStep4 || isSubmitting}
                  onClick={handleFinalSubmit}
                  className="btn-primary-material inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registrando en Sistema...</span>
                  ) : (
                    <>
                      <span>Generar Proforma Oficial</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

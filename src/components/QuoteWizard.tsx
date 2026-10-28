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
      // Generar folio de respaldo local
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Encabezado del cotizador */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E53935]">
          Cotizador Guiado · De la Idea al Objeto
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
          Configura tu propuesta de valor
        </h2>
        <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
          Genera una proforma detallada con materiales de taller, medidas y acabados lista para revisión técnica y WhatsApp.
        </p>
      </div>

      {/* Stepper de 4 pasos */}
      <div className="mb-10">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          {[
            { stepNum: 1, title: '1. Servicio' },
            { stepNum: 2, title: '2. Técnica' },
            { stepNum: 3, title: '3. Diseño' },
            { stepNum: 4, title: '4. Resumen' }
          ].map((s) => (
            <div 
              key={s.stepNum} 
              className={`pb-2 border-b-2 transition-all ${
                step === s.stepNum 
                  ? 'border-[#C41E3A] text-white font-bold' 
                  : step > s.stepNum 
                    ? 'border-neutral-700 text-neutral-400' 
                    : 'border-neutral-900 text-neutral-600'
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>
      </div>

      {/* Tarjeta contenedora de pasos */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* ===================== PASO 1: SELECCIÓN DE PRODUCTO/SERVICIO ===================== */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">¿Qué idea deseas materializar?</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Selecciona la categoría principal y el producto base para tu proyecto.
              </p>
            </div>

            {/* Categorías en pill-free segmented grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-[#C41E3A] bg-red-950/20 text-white shadow-sm'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 text-white">{cat.title}</div>
                  <div className="text-[11px] text-neutral-400 line-clamp-1">{cat.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Selector de Producto específico dentro de la categoría */}
            <div className="pt-4 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
                Producto o Variante Específica
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products
                  .filter(p => p.category === selectedCategory && p.active)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedProductId === p.id
                          ? 'border-[#C41E3A] bg-neutral-900 text-white ring-1 ring-[#C41E3A]'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{p.name}</span>
                        {p.badge && (
                          <span className="text-[10px] text-red-400 font-mono-numbers">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                        {p.tagline}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                        <span>Desde ${p.basePriceUsd} USD</span>
                        <span>{p.turnaroundDays}</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
              >
                <span>Continuar a Especificaciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 2: TÉCNICA Y ESPECIFICACIONES ===================== */}
        {step === 2 && currentProduct && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Especificaciones de Taller</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Configurando para: <strong className="text-white">{currentProduct.name}</strong>
              </p>
            </div>

            {/* Selección de Material / Soporte */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                1. Material o Soporte de Fabricación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentProduct.availableMaterials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-3 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      selectedMaterial === mat
                        ? 'border-[#C41E3A] bg-red-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
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
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                2. Acabado o Técnica de Personalización
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentProduct.availableFinishes.map((fin) => (
                  <button
                    key={fin}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-3 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      selectedFinish === fin
                        ? 'border-[#C41E3A] bg-red-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  3. Medidas Estimadas (Alto x Ancho)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 120 x 60 cm o modelo de vehículo"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Si no estás seguro de las medidas, el equipo puede realizar el levantamiento en tu local.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  4. Cantidad Requerida ({currentProduct.unit})
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-32 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm font-bold font-mono-numbers focus:outline-none focus:border-red-500 text-center"
                  />
                  <span className="text-xs text-neutral-400">
                    Tiempo de taller: <strong className="text-neutral-300">{currentProduct.turnaroundDays}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Servicios</span>
              </button>

              <button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
              >
                <span>Continuar a Diseño</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: DISEÑO Y ARCHIVOS ===================== */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Diseño, Arte y Archivos</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Cuéntanos cómo imaginas el arte o adjunta tu archivo vectorial / boceto para que el taller prepare el render.
              </p>
            </div>

            {/* Dropzone de Carga de Arte */}
            <div className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl p-8 text-center bg-neutral-900/40 relative">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.ai,.pdf,.svg,.eps,.psd"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-white">
                {artFileName ? (
                  <span className="text-red-400 font-semibold">{artFileName}</span>
                ) : (
                  <span>Arrastra tu logotipo o haz clic para subir</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Formatos aceptados: .AI, .PDF, .SVG, .EPS o imágenes en alta resolución .PNG/.JPG
              </p>
            </div>

            {/* Estado de vector */}
            <div className="flex items-center gap-3 p-3 bg-neutral-900/60 border border-neutral-800 rounded-lg text-xs">
              <input
                type="checkbox"
                id="vectorCheck"
                checked={hasVector}
                onChange={(e) => setHasVector(e.target.checked)}
                className="rounded accent-red-600 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="vectorCheck" className="text-neutral-300 cursor-pointer">
                Ya cuento con el logo en formato editable/vectorial (AI, PDF o SVG). Si no lo tienes, nuestro equipo de diseño gráfico puede vectorizarlo.
              </label>
            </div>

            {/* Descripción / Requerimientos de color */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Indicaciones de Colores, Ubicación o Observaciones
              </label>
              <textarea
                rows={4}
                placeholder="Indica colores corporativos Pantone, posición del logo, tipografía deseada o detalles especiales para el taller..."
                value={artDescription}
                onChange={(e) => setArtDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Botones de navegación */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Especificaciones</span>
              </button>

              <button
                disabled={!canProceedStep3}
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
              >
                <span>Ver Resumen & Proforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 4: RESUMEN Y GENERACIÓN DE PROFORMA ===================== */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Resumen de Proforma & Envío</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Revisa los datos de tu cotización antes de enviarla al equipo técnico de Arte Inédito en Lechería.
              </p>
            </div>

            {/* Desglose de Cotización en formato Proforma */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Ítem Configurado</div>
                  <div className="text-base font-bold text-white">{currentProduct?.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Estimado Ref.</div>
                  <div className="text-lg font-black text-red-400 font-mono-numbers">~${estimatedTotal} USD</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">Soporte:</span>
                  <span className="text-neutral-200 font-medium">{selectedMaterial}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Acabado:</span>
                  <span className="text-neutral-200 font-medium">{selectedFinish}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Medidas:</span>
                  <span className="text-neutral-200 font-medium">{dimensions || 'A convenir'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Cantidad:</span>
                  <span className="text-neutral-200 font-medium font-mono-numbers">{quantity} {currentProduct?.unit}</span>
                </div>
              </div>

              {artFileName && (
                <div className="pt-2 text-xs text-neutral-400 border-t border-neutral-800/60">
                  <span className="text-neutral-500">Arte adjunto:</span> <span className="text-neutral-300 font-mono">{artFileName}</span>
                </div>
              )}
            </div>

            {/* Formulario de Datos de Contacto */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Datos de Contacto para la Proforma
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Ej: Carlos Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Empresa o Marca (Opcional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Ej: Restaurante Sol & Mar"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Número de WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="Ej: +58 414-1234567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Correo Electrónico (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="contacto@tuempresa.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Notas adicionales para el taller
                </label>
                <input
                  type="text"
                  placeholder="Ej: Requerimos factura fiscal o entrega antes del viernes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Error si falta algún dato */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Estado una vez enviado con folio generado */}
            {generatedFolio ? (
              <div className="p-6 bg-red-950/20 border border-red-800/60 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C41E3A] flex items-center justify-center text-white shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      ¡Cotización Registrada con Éxito!
                    </h4>
                    <p className="text-xs text-neutral-300">
                      Folio oficial asignado: <strong className="text-red-400 font-mono-numbers">{generatedFolio}</strong>. Ha quedado archivada en el sistema del taller.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400">
                  Para agilizar la producción y coordinar la entrega o prueba de color, haz clic en el botón a continuación para enviar la proforma estructurada directamente al WhatsApp oficial de Arte Inédito.
                </p>

                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-lg shadow-emerald-950/40 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Proforma a WhatsApp (wa.link/alpo7z)</span>
                </button>
              </div>
            ) : (
              /* Botón de Enviar Cotización Inicial */
              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Diseño</span>
                </button>

                <button
                  disabled={!canProceedStep4 || isSubmitting}
                  onClick={handleFinalSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C41E3A] hover:bg-[#a6172f] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-red-950/40 transition-colors cursor-pointer"
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

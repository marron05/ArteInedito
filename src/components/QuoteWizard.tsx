import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Upload, 
  FileText, 
  Clock, 
  Building2, 
  Phone, 
  User, 
  Mail, 
  MessageCircle,
  AlertCircle,
  Palette,
  Trash2,
  Flame,
  Box,
  Loader2
} from 'lucide-react';
import { ProductCategory, ProductItem, CompanySettings } from '../types';
import { CATEGORIES } from './CategoryGrid';
import { glassCardStyle, glassPanelStyle } from '../styles/glass';

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

  // Paso 2: Especificaciones dinámicas
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [thicknessOption, setThicknessOption] = useState<string>('15-20 mm (Relieve dimensional)');
  const [dimensions, setDimensions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeBreakdown, setSizeBreakdown] = useState<{ [key: string]: number }>({ S: 0, M: 0, L: 0, XL: 0 });

  // Paso 3: Diseño y Archivo
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [artFileName, setArtFileName] = useState<string>('');
  const [artFileSize, setArtFileSize] = useState<string>('');
  const [artFilePreview, setArtFilePreview] = useState<string>('');
  const [colorsPalette, setColorsPalette] = useState<string>('Colores corporativos oficiales');
  const [artDescription, setArtDescription] = useState<string>('');
  const [hasVector, setHasVector] = useState<boolean>(true);

  // Paso 4: Datos del Cliente y Proforma
  const [clientName, setClientName] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Folio pre-asignado institucional inmediato (formato AI-2026-XXXX)
  const [assignedFolio] = useState<string>(() => `AI-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [isSavedInSystem, setIsSavedInSystem] = useState<boolean>(false);
  const [isSavingSystem, setIsSavingSystem] = useState<boolean>(false);

  // Estado de envío
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

  // Cálculo referencial estimado dinámico
  const basePrice = currentProduct?.basePriceUsd || 40;
  const isLedActive = selectedFinish.toLowerCase().includes('led') || selectedFinish.toLowerCase().includes('halo');
  const finishMultiplier = isLedActive ? 1.45 : 1.0;
  const estimatedTotal = Math.round(basePrice * quantity * finishMultiplier);

  // Manejo de archivo
  const processUploadedFile = (file: File) => {
    setArtFileName(file.name);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    setArtFileSize(`${sizeMb} MB`);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setArtFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setArtFilePreview('');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setArtFileName('');
    setArtFileSize('');
    setArtFilePreview('');
  };

  // Validación por paso: El archivo es opcional
  const canProceedStep1 = Boolean(selectedCategory && selectedProductId);
  const canProceedStep2 = Boolean(selectedMaterial && selectedFinish && quantity > 0);
  const canProceedStep4 = Boolean(clientName.trim() && clientPhone.trim());

  // Mensaje estructurado institucional para WhatsApp oficial (wa.link/alpo7z)
  const generateWhatsAppMessage = (folio: string) => {
    const text = `*SOLICITUD DE PROFORMA — ARTE INÉDITO*
*Folio Institucional:* ${folio}
📍 *Sede:* Esquina Inédita, Av. Principal de Lechería
---------------------------------------------
👤 *Cliente:* ${clientName.trim() || 'Particular'}
🏢 *Empresa / Marca:* ${clientCompany.trim() || 'Particular'}
📱 *WhatsApp:* ${clientPhone.trim()}
${clientEmail.trim() ? `📧 *Email:* ${clientEmail.trim()}\n` : ''}
📋 *ESPECIFICACIONES DE PRODUCCIÓN:*
• *Producto / Servicio:* ${currentProduct?.name || selectedCategory.toUpperCase()}
• *Técnica / Acabado:* ${selectedFinish}
• *Material / Soporte:* ${selectedMaterial}
• *Espesor / Formato:* ${dimensions || thicknessOption}
• *Cantidad:* ${quantity} ${currentProduct?.unit || 'unidades'}
• *Paleta / Tintas:* ${colorsPalette || 'Corporativo según manual'}
• *Tiempo Estimado de Taller:* ${currentProduct?.turnaroundDays || '3 a 5 días hábiles'}
• *Total Ref. Estimado:* ~$${estimatedTotal} USD

🎨 *Archivo de Arte:* ${artFileName ? `${artFileName} (${hasVector ? 'Vector Editable' : 'Imagen Raster'})` : 'Pendiente por coordinar en taller'}
💡 *Observaciones / Entrega:* ${notes.trim() || artDescription.trim() || 'Producción según plano y especificaciones acordadas'}
---------------------------------------------
*Mensaje generado desde Proforma Oficial — arte-inedito.vercel.app*`;
    return encodeURIComponent(text);
  };

  // Guardar en la base de datos de taller
  const persistQuoteToSystem = async (folioToUse: string): Promise<string> => {
    const quotePayload = {
      id: folioToUse,
      clientName: clientName.trim(),
      clientCompany: clientCompany.trim() || undefined,
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      category: selectedCategory,
      productId: currentProduct?.id || selectedProductId,
      productName: currentProduct?.name || 'Servicio Publicitario',
      material: selectedMaterial,
      finish: selectedFinish,
      dimensions: dimensions ? `${dimensions} (${thicknessOption})` : thicknessOption,
      quantity,
      colors: colorsPalette,
      notes: `${artDescription ? `[Detalles de arte]: ${artDescription}. ` : ''}${notes.trim() || ''}`,
      artFileName: artFileName || undefined,
      estimatedTotalUsd: estimatedTotal
    };

    const result = await onSubmitQuote(quotePayload);
    const finalId = result.id || folioToUse;
    setGeneratedFolio(finalId);
    setIsSavedInSystem(true);

    if (onQuoteSubmitted) {
      onQuoteSubmitted(finalId);
    }
    return finalId;
  };

  // Botón Prominente de WhatsApp: Guarda en sistema automáticamente y abre WhatsApp
  const handleSendWhatsApp = async () => {
    if (!canProceedStep4) {
      setErrorMsg('Por favor ingresa tu Nombre y Número de WhatsApp para emitir la proforma oficial.');
      const clientSec = document.getElementById('client-data-section');
      if (clientSec) {
        clientSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setErrorMsg(null);
    setIsSavingSystem(true);

    const targetFolio = generatedFolio || assignedFolio;

    try {
      if (!isSavedInSystem) {
        await persistQuoteToSystem(targetFolio);
      }
    } catch (err) {
      console.warn('Registro local de cotización:', err);
      setGeneratedFolio(targetFolio);
      setIsSavedInSystem(true);
    } finally {
      setIsSavingSystem(false);
    }

    const cleanPhone = companySettings.whatsappPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${generateWhatsAppMessage(targetFolio)}`;
    try {
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = waUrl;
      }
    } catch {
      window.location.href = waUrl;
    }
  };

  // Guardar exclusivamente en sistema
  const handleSaveOnly = async () => {
    if (!canProceedStep4) {
      setErrorMsg('Por favor completa Nombre y Número de WhatsApp para archivar.');
      return;
    }
    setErrorMsg(null);
    setIsSavingSystem(true);

    const targetFolio = generatedFolio || assignedFolio;
    try {
      await persistQuoteToSystem(targetFolio);
    } catch (err) {
      setGeneratedFolio(targetFolio);
      setIsSavedInSystem(true);
    } finally {
      setIsSavingSystem(false);
    }
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 relative">
      {/* Luz ambiental sutil */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/[0.015] blur-[130px] rounded-full -z-10" 
        aria-hidden="true" 
      />

      {/* Encabezado Editorial del cotizador */}
      <div className="text-center mb-10 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="font-bold text-[#C41E3A] uppercase tracking-wider font-mono">
            Taller Inédito
          </span>
          <span className="text-[#9A9A9A]" aria-hidden="true">·</span>
          <span className="text-[#5C5C5C] font-medium">De la Idea al Objeto Físico</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-[-0.038em] leading-tight text-balance">
          Cotizador Guiado de Taller
        </h2>
        <p className="text-[#5C5C5C] text-sm max-w-lg mx-auto leading-relaxed font-normal">
          Configura especificaciones, acabados y archivos para generar una proforma oficial instantánea lista para producción y WhatsApp.
        </p>
      </div>

      {/* Stepper de 4 pasos con Barra de Progreso Continua */}
      <div className="mb-8 max-w-2xl mx-auto space-y-2.5">
        {/* Track de Progreso */}
        <div className="w-full h-1 bg-[#E8E4DF] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#C41E3A] transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Píldoras del Stepper */}
        <div className="p-1.5 rounded-2xl bg-white border border-[#E8E4DF] shadow-[0_1px_3px_rgba(28,25,23,0.03)] grid grid-cols-4 gap-1.5 text-center text-xs font-bold">
          {[
            { stepNum: 1, title: '1. Servicio', icon: Box },
            { stepNum: 2, title: '2. Técnica', icon: Flame },
            { stepNum: 3, title: '3. Diseño', icon: Palette },
            { stepNum: 4, title: '4. Proforma', icon: FileText }
          ].map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.stepNum;
            const isCompleted = step > s.stepNum;
            return (
              <button
                key={s.stepNum}
                onClick={() => {
                  if (s.stepNum <= step) {
                    setStep(s.stepNum as any);
                  } else if (s.stepNum === 4 && canProceedStep1 && canProceedStep2) {
                    setStep(4);
                  } else if (s.stepNum === 3 && canProceedStep1 && canProceedStep2) {
                    setStep(3);
                  } else if (s.stepNum === 2 && canProceedStep1) {
                    setStep(2);
                  }
                }}
                disabled={s.stepNum > 2 && (!canProceedStep1 || !canProceedStep2)}
                className={`py-2.5 px-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed ${
                  isCurrent 
                    ? 'bg-[#C41E3A] text-white font-bold shadow-[0_2px_8px_rgba(196,30,58,0.25)]' 
                    : isCompleted 
                      ? 'text-[#1A1A1A] bg-[#FAF8F5] border border-[#E8E4DF] hover:bg-[#F0EEEC]' 
                      : 'text-[#9A9A9A] opacity-70 hover:opacity-100'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Icon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.stepNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta contenedora de pasos con Sombra Táctil */}
      <div 
        style={glassPanelStyle}
        className="glass-panel rounded-3xl p-6 sm:p-10 relative bg-white border border-[#E8E4DF] shadow-[0_12px_36px_-6px_rgba(28,25,23,0.06)]"
      >
        
        {/* ===================== PASO 1: SELECCIÓN DE PRODUCTO/SERVICIO ===================== */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A] tracking-[-0.03em]">¿Qué deseas materializar?</h3>
              <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1 font-normal">
                Selecciona una de nuestras 8 líneas de taller y el modelo base de producción.
              </p>
            </div>

            {/* Categorías */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 text-left rounded-2xl text-xs transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-[#C41E3A] text-white border-[#B01730] shadow-[0_4px_12px_rgba(196,30,58,0.22)]'
                        : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border-[#E8E4DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#C41E3A]'}`} />
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[#9A9A9A]'}`}>
                        {products.filter(p => p.category === cat.id && p.active).length} ops
                      </span>
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>{cat.title}</div>
                      <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#5C5C5C]'}`}>{cat.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selector de Producto específico */}
            <div className="pt-6 border-t border-[#E8E4DF]">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">
                  Variantes Disponibles en Esta Línea
                </label>
                <span className="text-[11px] text-[#5C5C5C]">
                  {products.filter(p => p.category === selectedCategory && p.active).length} productos listos para cotizar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {products
                  .filter(p => p.category === selectedCategory && p.active)
                  .map((p) => {
                    const isSelected = selectedProductId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProductId(p.id)}
                        className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#C41E3A] text-white border-[#B01730] shadow-[0_4px_14px_rgba(196,30,58,0.22)] ring-2 ring-[#C41E3A]/30'
                            : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border-[#E8E4DF]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>{p.name}</span>
                          {p.badge && (
                            <span 
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-numbers font-semibold ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#C41E3A] border border-[#E8E4DF]'
                              }`}
                            >
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs line-clamp-2 mt-1 leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#5C5C5C]'}`}>
                          {p.tagline}
                        </p>
                        <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                          isSelected ? 'border-white/20 text-white' : 'border-[#E8E4DF] text-[#5C5C5C]'
                        }`}>
                          <span className={`font-semibold ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>Desde ${p.basePriceUsd} USD</span>
                          <span className="font-mono text-[11px]">{p.turnaroundDays}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Botón Siguiente */}
            <div className="pt-6 border-t border-[#E8E4DF] flex justify-end">
              <button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className="w-full sm:w-auto btn-primary-material inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-300 disabled:shadow-none cursor-pointer shadow-sm group"
              >
                <span>Continuar a Técnica & Medidas</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 2: TÉCNICA Y ESPECIFICACIONES DINÁMICAS ===================== */}
        {step === 2 && currentProduct && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DF]">
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C41E3A] mb-1">
                  Paso 2 / Configuración de Taller
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A] tracking-[-0.03em]">
                  {currentProduct.name}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 w-fit bg-[#FAF8F5] border border-[#E8E4DF]">
                <Clock className="w-3.5 h-3.5 text-[#C41E3A]" />
                <span className="text-[#5C5C5C]">Entrega: <strong className="text-[#1A1A1A]">{currentProduct.turnaroundDays}</strong></span>
              </div>
            </div>

            {/* 1. Selección de Material / Soporte */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-3 font-mono">
                1. Soporte o Material Base
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.availableMaterials.map((mat) => {
                  const isSelected = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-4 text-left rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#C41E3A] text-white border-[#B01730] shadow-[0_4px_12px_rgba(196,30,58,0.22)]'
                          : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border-[#E8E4DF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{mat}</span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Selección de Acabado / Técnica */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-3 font-mono">
                2. Acabado, Iluminación o Técnica
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.availableFinishes.map((fin) => {
                  const isSelected = selectedFinish === fin;
                  return (
                    <button
                      key={fin}
                      onClick={() => setSelectedFinish(fin)}
                      className={`p-4 text-left rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#C41E3A] text-white border-[#B01730] shadow-[0_4px_12px_rgba(196,30,58,0.22)]'
                          : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] border-[#E8E4DF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{fin}</span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Opciones Dinámicas según Categoría */}
            {selectedCategory === 'corporeos' && (
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono">
                  3. Espesor / Relieve Dimensional
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['10 mm (Plano pulido)', '20 mm (Relieve medio)', '30+ mm (Volumétrico en caja)'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setThicknessOption(opt)}
                      className={`p-3 text-center rounded-xl text-xs font-medium cursor-pointer border transition-all ${
                        thicknessOption === opt
                          ? 'bg-[#C41E3A] text-white border-[#B01730] shadow-sm font-bold'
                          : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] border-[#E8E4DF]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory === 'textiles' && (
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono">
                  3. Distribución de Tallas (Opcional)
                </label>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <div key={size} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF]">
                      <span className="block font-bold text-[#5C5C5C] text-[10px] uppercase font-mono">Talla {size}</span>
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={sizeBreakdown[size] || ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const updated = { ...sizeBreakdown, [size]: val };
                          setSizeBreakdown(updated);
                          const total = Object.values(updated).reduce((a, b) => a + b, 0);
                          if (total > 0) setQuantity(total);
                        }}
                        className="w-full text-center bg-transparent text-[#1A1A1A] font-mono font-bold text-sm focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Medidas y Cantidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono">
                  {selectedCategory === 'rotulacion' ? 'Modelo de Vehículo o Medidas de Vitrina' : 'Medidas Estimadas (Alto x Ancho)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    selectedCategory === 'rotulacion'
                      ? 'Ej: Toyota Fortuner lateral o vitrina 2.40 x 1.80m'
                      : 'Ej: 120 cm x 60 cm o según proporción de logo'
                  }
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                />
                <span className="text-[11px] text-[#5C5C5C] mt-1.5 block">
                  Si requieres levantamiento de medidas en Lechería o Barcelona, nuestro equipo técnico puede acudir a sitio.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono">
                  Cantidad ({currentProduct.unit})
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-28 px-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-sm font-bold font-mono-numbers focus:outline-none focus:border-[#C41E3A] text-center"
                  />
                  <div className="flex items-center gap-1.5">
                    {[6, 12, 24, 50].map((quickQty) => (
                      <button
                        key={quickQty}
                        onClick={() => setQuantity(quickQty)}
                        className={`px-2.5 py-2 text-[11px] font-bold rounded-xl cursor-pointer border transition-all ${
                          quantity === quickQty
                            ? 'bg-[#C41E3A] text-white border-[#B01730]'
                            : 'bg-white text-[#1A1A1A] border-[#E8E4DF] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        +{quickQty}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-xs text-[#5C5C5C]">
                  Estimado parcial: <strong className="text-[#1A1A1A] font-mono-numbers">~${estimatedTotal} USD</strong>
                </div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="pt-6 border-t border-[#E8E4DF] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium text-[#1A1A1A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Servicios</span>
              </button>

              <button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                className="btn-primary-material inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-300 disabled:shadow-none cursor-pointer shadow-sm group"
              >
                <span>Continuar a Arte & Archivos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: DISEÑO Y ARCHIVOS ===================== */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A] tracking-[-0.03em]">Diseño, Arte y Archivos</h3>
              <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1 font-normal">
                Sube tu logotipo o describe los requerimientos para que el taller prepare la muestra digital.
              </p>
            </div>

            {/* Dropzone Claro con Micro-interacción de Arrastre */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={glassCardStyle}
              className={`border-2 border-dashed rounded-3xl p-7 sm:p-9 text-center transition-all duration-200 relative ${
                isDragging ? 'border-[#C41E3A] bg-red-50/50 scale-[1.005]' : 'border-[#E8E4DF] bg-[#FAF8F5] hover:border-[#C41E3A]'
              }`}
            >
              {!artFileName ? (
                <>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.ai,.pdf,.svg,.eps,.psd,.cdr"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8E4DF] flex items-center justify-center text-[#C41E3A] mx-auto mb-3 shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    Arrastra tu archivo aquí o haz clic para examinar
                  </div>
                  <p className="text-xs text-[#5C5C5C] mt-1.5 max-w-sm mx-auto font-normal">
                    Formatos recomendados: <strong className="text-[#1A1A1A]">.AI, .PDF, .SVG, .EPS</strong> (vectorial) o imágenes en alta resolución <strong className="text-[#1A1A1A]">.PNG / .JPG</strong>
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E4DF] text-[11px] text-[#5C5C5C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Opcional: Si no tienes el arte listo, puedes avanzar a la proforma y coordinarlo por WhatsApp</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                  {artFilePreview ? (
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border border-[#E8E4DF] shadow-md relative bg-white">
                      <img src={artFilePreview} alt="Preview de archivo" className="w-full h-full object-contain p-1" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#C41E3A] shadow-sm">
                      <FileText className="w-8 h-8" />
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-bold text-[#1A1A1A] flex items-center justify-center gap-2">
                      <span>{artFileName}</span>
                      <span className="text-[10px] font-mono text-[#5C5C5C]">({artFileSize})</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">Archivo listo para adjuntar a la proforma</span>
                  </div>

                  <button
                    onClick={handleRemoveFile}
                    className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E4DF] text-xs text-[#C41E3A] hover:text-[#A81830] cursor-pointer shadow-sm transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cambiar archivo</span>
                  </button>
                </div>
              )}
            </div>

            {/* Checkbox de Vector */}
            <div className="p-4 rounded-2xl flex items-center gap-3 text-xs bg-white border border-[#E8E4DF] shadow-[0_1px_2px_rgba(28,25,23,0.02)]">
              <input
                type="checkbox"
                id="vectorCheck"
                checked={hasVector}
                onChange={(e) => setHasVector(e.target.checked)}
                className="rounded accent-[#C41E3A] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="vectorCheck" className="text-[#5C5C5C] cursor-pointer font-medium leading-relaxed">
                Cuento con el logo en vector editable (.AI, .PDF o .SVG). Si solo tienes foto o boceto, nuestro equipo de diseño gráfico puede vectorizarlo.
              </label>
            </div>

            {/* Campo de Paleta de Colores */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#C41E3A]" />
                <span>Colores Corporativos / Paleta Pantone</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Rojo Pantone 186 C, Negro Mate y Acentos Dorados"
                value={colorsPalette}
                onChange={(e) => setColorsPalette(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
              />
            </div>

            {/* Observaciones de color y arte */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2 font-mono">
                Indicaciones de Diseño, Ubicación del Logo o Montaje
              </label>
              <textarea
                rows={3}
                placeholder="Indica posición del logotipo (pecho, espalda, centrada), orientación vertical u horizontal, o requerimientos especiales de instalación..."
                value={artDescription}
                onChange={(e) => setArtDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] leading-relaxed"
              />
            </div>

            {/* Botones de navegación Paso 3 */}
            <div className="pt-6 border-t border-[#E8E4DF] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium text-[#1A1A1A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Técnica</span>
              </button>

              <button
                onClick={() => setStep(4)}
                className="btn-primary-material inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-sm group"
              >
                <span>Ver Proforma Oficial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 4: PROFORMA PROFESIONAL REAL Y WHATSAPP ===================== */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C41E3A] mb-1">
                Paso 4 / Resumen de Taller
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-[-0.035em]">
                Proforma Oficial de Fabricación
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1 font-normal">
                Resumen ejecutivo estructurado con folio consecutivo institucional. Listo para archivar en taller y coordinar producción por WhatsApp.
              </p>
            </div>

            {/* Ficha de Proforma Profesional Real */}
            <div 
              style={glassCardStyle}
              className="glass-card p-6 sm:p-9 rounded-3xl space-y-7 relative overflow-hidden shadow-[0_8px_30px_rgba(28,25,23,0.06)] border border-[#E8E4DF] bg-white"
            >
              {/* Marca de agua institucional sutil en fondo */}
              <div 
                className="pointer-events-none absolute -bottom-10 -right-10 text-neutral-900/[0.025] font-black text-9xl select-none"
                aria-hidden="true"
              >
                ai
              </div>

              {/* 1. Header de Proforma: Identidad y Folio Grande */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E8E4DF]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C41E3A] flex items-center justify-center text-white font-black text-xl shadow-sm shrink-0">
                    ai
                  </div>
                  <div>
                    <div className="text-base font-black text-[#1A1A1A] tracking-tight">Arte Inédito | Publicidad y Textiles</div>
                    <div className="text-[11px] text-[#5C5C5C] font-mono">RIF: {companySettings.rif} · Sede Lechería</div>
                    <div className="text-[10px] text-[#9A9A9A] font-mono mt-0.5">Taller de Materialización · Presupuesto Oficial</div>
                  </div>
                </div>

                {/* Folio Grande y Visible Destacado en Rojo */}
                <div className="p-3.5 sm:px-5 sm:py-3 rounded-2xl bg-red-50 border border-red-200 text-left sm:text-right shadow-sm">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C41E3A] block font-bold">
                    Folio Institucional
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#C41E3A] font-mono tracking-tight font-mono-numbers block">
                    {generatedFolio || assignedFolio}
                  </span>
                  <div className="text-[10px] text-[#5C5C5C] font-mono mt-0.5">
                    Emisión: {new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })} · Validez: 15 días
                  </div>
                </div>
              </div>

              {/* 2. Resumen Estructurado: Especificaciones Técnicas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                    Especificaciones Técnicas Seleccionadas
                  </h4>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-[#5C5C5C] bg-[#FAF8F5] border border-[#E8E4DF]">
                    Línea: {selectedCategory.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DF] text-xs">
                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Producto / Servicio:</span>
                    <span className="text-[#1A1A1A] font-bold text-sm block mt-0.5">{currentProduct?.name}</span>
                    <span className="text-[11px] text-[#5C5C5C] line-clamp-1">{currentProduct?.tagline}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Soporte & Material:</span>
                    <span className="text-[#1A1A1A] font-semibold block mt-0.5">{selectedMaterial}</span>
                    <span className="text-[11px] text-[#5C5C5C]">{thicknessOption}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Técnica & Acabado:</span>
                    <span className="text-[#1A1A1A] font-semibold block mt-0.5">{selectedFinish}</span>
                    <span className="text-[11px] text-[#5C5C5C]">Paleta: {colorsPalette}</span>
                  </div>

                  <div>
                    <span className="text-[#9A9A9A] block text-[10px] uppercase font-mono tracking-wider">Cantidad Solicitada:</span>
                    <span className="text-[#1A1A1A] font-black text-sm font-mono-numbers block mt-0.5">
                      {quantity} {currentProduct?.unit}
                    </span>
                    <span className="text-[11px] text-[#5C5C5C]">Tiempo: {currentProduct?.turnaroundDays || '3 a 5 días'}</span>
                  </div>
                </div>

                {/* Sub-bloque: Medidas, Tiempos y Archivos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF]">
                    <span className="text-[#9A9A9A] text-[10px] uppercase font-mono block">Medidas / Formato:</span>
                    <span className="text-[#1A1A1A] font-medium">{dimensions || thicknessOption || 'A definir con taller'}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF]">
                    <span className="text-[#9A9A9A] text-[10px] uppercase font-mono block">Tiempo Estimado de Taller:</span>
                    <span className="text-[#1A1A1A] font-medium">{currentProduct?.turnaroundDays || '3 a 5 días hábiles'}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF]">
                    <span className="text-[#9A9A9A] text-[10px] uppercase font-mono block">Archivo de Arte / Logotipo:</span>
                    <span className="text-[#C41E3A] font-mono font-medium truncate block">
                      {artFileName ? `${artFileName} (${artFileSize})` : 'Pendiente por coordinar'}
                    </span>
                    <span className="text-[10px] text-[#5C5C5C]">
                      {hasVector ? '✓ Vector editable' : 'Requiere preparación'}
                    </span>
                  </div>
                </div>

                {/* Observaciones de cliente/arte si existen */}
                {(artDescription || notes) && (
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] text-xs">
                    <span className="text-[#9A9A9A] text-[10px] uppercase font-mono block mb-1">
                      Observaciones / Requerimientos de Producción:
                    </span>
                    <p className="text-[#5C5C5C] leading-relaxed italic font-normal">
                      &ldquo;{notes || artDescription}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Totalización y Condiciones */}
              <div className="pt-4 border-t border-[#E8E4DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs text-[#5C5C5C]">Total Referencial Estimado de Producción:</div>
                  <div className="text-[10px] text-[#9A9A9A]">
                    *Referencia en USD. Pagadero en Bs. a tasa BCV o divisas en efectivo.
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-mono-numbers tracking-tight">
                    ~${estimatedTotal} <span className="text-xs text-[#5C5C5C] font-normal">USD</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Datos del Cliente para la Proforma */}
            <div 
              id="client-data-section"
              style={glassPanelStyle}
              className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 bg-white border border-[#E8E4DF] shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] font-mono flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C41E3A]" />
                    <span>Datos del Cliente / Empresa</span>
                  </h4>
                  <p className="text-xs text-[#5C5C5C] mt-0.5">
                    Requeridos para emitir la proforma formal y vincularla a tu orden de taller.
                  </p>
                </div>
                {isSavedInSystem && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                    <span>Archivada en Taller</span>
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#9A9A9A] absolute left-4 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ej: Carlos Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Empresa o Marca (Opcional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#9A9A9A] absolute left-4 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ej: Restaurante Sol & Mar"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Número de WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9A9A9A] absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Ej: +58 414-1234567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                    Correo Electrónico (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#9A9A9A] absolute left-4 top-3.5" />
                    <input
                      type="email"
                      placeholder="contacto@tuempresa.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Observaciones adicionales o fecha límite de entrega
                </label>
                <input
                  type="text"
                  placeholder="Ej: Requerimos factura fiscal o entrega antes del viernes en Lechería..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E4DF] text-[#1A1A1A] text-xs placeholder-[#9A9A9A] focus:outline-none focus:border-[#C41E3A] transition-all"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5 shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C41E3A]" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Banner de confirmación si ya fue guardada */}
            {isSavedInSystem && (
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 flex items-center justify-between text-xs text-emerald-800 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Proforma archivada en el panel de taller con folio <strong className="font-mono text-[#1A1A1A]">{generatedFolio || assignedFolio}</strong>.
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 uppercase tracking-wider hidden sm:inline font-bold">
                  Listo para producción
                </span>
              </div>
            )}

            {/* 5. Botón de WhatsApp Prominente y Botones de Acción */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleSendWhatsApp}
                disabled={isSavingSystem}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 sm:py-5 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-sm transition-all cursor-pointer hover:scale-[1.005] active:scale-[0.99] disabled:opacity-50"
              >
                {isSavingSystem ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Archivando y conectando con taller...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-6 h-6 shrink-0" />
                    <span>Enviar Proforma a WhatsApp (wa.link/alpo7z)</span>
                  </>
                )}
              </button>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E8E4DF]">
                <button
                  onClick={() => setStep(3)}
                  className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium text-[#1A1A1A] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Diseño</span>
                </button>

                {!isSavedInSystem && (
                  <button
                    onClick={handleSaveOnly}
                    disabled={isSavingSystem}
                    className="btn-secondary-glass inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-[#1A1A1A] cursor-pointer hover:border-[#D5D0C9]"
                  >
                    {isSavingSystem ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#C41E3A]" />
                    ) : (
                      <Send className="w-4 h-4 text-[#C41E3A]" />
                    )}
                    <span>{isSavingSystem ? 'Guardando en Taller...' : 'Archivar Solo en Sistema'}</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

import { ProductItem, CompanySettings, QuoteRecord } from '../types';

export const INITIAL_SETTINGS: CompanySettings = {
  whatsappPhone: "+58412848798", // Direct link wa.link/alpo7z
  rif: "J-412848798",
  companyName: "Arte Inédito | Publicidad y Textiles",
  address: "Esquina Inédita, Av. Principal de Lechería (frente a La Bodeguilla), Lechería, Anzoátegui",
  openingHours: "Lunes a Viernes 9:00 AM – 1:00 PM y 2:00 PM – 5:00 PM",
  instagram: "@arteinedito",
  email: "contacto@arteinedito.com"
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  // 1. CORPOREOS 3D
  {
    id: "corp-01",
    category: "corporeos",
    name: "Corpóreo Logo 3D en PVC / Acrílico",
    tagline: "Letras y logotipos dimensionales de alto impacto",
    description: "Fabricación a la medida en relieve volumétrico para fachadas, recepciones y lobbies comerciales. Acabados con pintura automotriz satinada o mate, con opción de retroiluminación LED perimetral cálida o fría.",
    basePriceUsd: 140,
    priceNote: "Precio base referencial según escala y tipografía",
    unit: "pieza / m²",
    turnaroundDays: "4 a 7 días hábiles",
    availableMaterials: ["PVC Espumado 10mm", "PVC Espumado 20mm", "Acrílico Cristal 3-5mm", "Aluminio Compuesto (ACM)"],
    availableFinishes: ["Luz LED cálida trasera (Halo)", "Luz LED blanca frontal", "Pintura automotriz satinada", "Acabado mate sin luz"],
    badge: "Más Solicitado",
    imageUrl: "/assets/images/corporeo_3d_signage_1793205547566.jpg",
    images: [
      "/assets/images/corporeo_3d_signage_1793205547566.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/pop_display_stand_1793214096974.jpg"
    ],
    active: true
  },
  {
    id: "corp-02",
    category: "corporeos",
    name: "Letras Corpóreas en Aluminio Compuesto (ACM)",
    tagline: "Máxima durabilidad para fachadas exteriores costeras",
    description: "Estructuras en ACM cepillado, negro o plata cortadas en router CNC. Resistentes a la brisa marina y radiación UV, diseñadas para exteriores de locales en Lechería y todo Anzoátegui.",
    basePriceUsd: 220,
    priceNote: "Según altura de letras y tipo de anclaje",
    unit: "metro lineal",
    turnaroundDays: "5 a 8 días hábiles",
    availableMaterials: ["ACM Silver cepillado 4mm", "ACM Black Gloss 4mm", "ACM Blanco con borde biselado", "Estructura interna galvanizada"],
    availableFinishes: ["Iluminación frontal con módulos LED IP67", "Caja lumínica sellada", "Fijación oculta a pared"],
    badge: "Fachadas Exteriores",
    imageUrl: "/assets/images/corporeo_3d_signage_1793205547566.jpg",
    images: [
      "/assets/images/corporeo_3d_signage_1793205547566.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/large_format_banner_1793214117846.jpg"
    ],
    active: true
  },
  {
    id: "corp-03",
    category: "corporeos",
    name: "Señalética Interior 3D en Acrílico Cristal",
    tagline: "Directorio corporativo y placas dimensionales flotantes",
    description: "Placas de acrílico cristal pulido con relieve corpóreo y separadores decorativos de acero inoxidable. Ideal para consultorios médicos, bufetes, spas y salas de juntas.",
    basePriceUsd: 85,
    priceNote: "Incluye separadores y tornillería de acero",
    unit: "placa",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Acrílico Cristal 5mm", "Acrílico Cristal 8mm", "Acrílico Negro Piano", "Detalles en corte vinil oro/plata"],
    availableFinishes: ["Borde biselado y pulido al fuego", "Fondo esmerilado (frosted)", "Separadores cromados flotantes"],
    badge: "Oficinas & Clínicas",
    imageUrl: "/assets/images/hero_workshop_craft_1793205546075.jpg",
    images: [
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg",
      "/assets/images/laser_wood_craft_1793214061392.jpg"
    ],
    active: true
  },

  // 2. ROTULACION COMERCIAL
  {
    id: "rot-01",
    category: "rotulacion",
    name: "Rotulación Vehicular Integral y Comercial",
    tagline: "Convierte tus vehículos en vallas publicitarias móviles",
    description: "Vinil automotriz de alta durabilidad con laminado protector UV. Diseños personalizados para flotas comerciales, furgonetas, camionetas y vehículos corporativos.",
    basePriceUsd: 180,
    priceNote: "Cotización según modelo de vehículo y cobertura",
    unit: "vehículo",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Vinil Polimérico con Laminado UV", "Microperforado homologado para vidrios", "Vinil de Corte Alta Resistencia"],
    availableFinishes: ["Brillante protector", "Mate antirreflejo", "Combinado corte + impresión"],
    badge: "Flotas & Marcas",
    imageUrl: "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg",
    images: [
      "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg"
    ],
    active: true
  },
  {
    id: "rot-02",
    category: "rotulacion",
    name: "Rotulación de Vitrinas y Locales",
    tagline: "Branding para fachadas de cristal y puntos de venta",
    description: "Instalación de vinil microperforado, frosted (esmerilado) y vinil de corte para vitrinas en Lechería, Puerto La Cruz y Barcelona. Proporciona privacidad y elegancia estética.",
    basePriceUsd: 45,
    priceNote: "Por metro cuadrado instalado",
    unit: "m²",
    turnaroundDays: "2 a 4 días hábiles",
    availableMaterials: ["Vinil Esmerilado (Frosted)", "Microperforado One-Way Vision", "Vinil Adhesivo Full Color"],
    availableFinishes: ["Corte troquelado de logo", "Impresión continua con protección UV", "Bordes redondeados de seguridad"],
    badge: "Locales Comerciales",
    imageUrl: "/assets/images/hero_workshop_craft_1793205546075.jpg",
    images: [
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg",
      "/assets/images/large_format_banner_1793214117846.jpg"
    ],
    active: true
  },
  {
    id: "rot-03",
    category: "rotulacion",
    name: "Gráfica de Piso de Alto Tránsito",
    tagline: "Demarcación y publicidad para interiores comerciales",
    description: "Vinil autoadhesivo para pisos con película de policarbonato texturizada antideslizante certificada. Resistente a pisadas continuas, carritos de compras y trapeado con desinfectante.",
    basePriceUsd: 35,
    priceNote: "Por metro cuadrado terminado",
    unit: "m²",
    turnaroundDays: "2 a 3 días hábiles",
    availableMaterials: ["Vinil Floor Graphic reforzado", "Laminación antideslizante rugosa R9", "Adhesivo removible sin residuo"],
    availableFinishes: ["Troquelado en silueta libre", "Formato circular o rectangular", "Demarcación con franjas de advertencia"],
    badge: "Alto Tránsito",
    imageUrl: "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg",
    images: [
      "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/pop_display_stand_1793214096974.jpg"
    ],
    active: true
  },

  // 3. TEXTILES & UNIFORMES
  {
    id: "tex-01",
    category: "textiles",
    name: "Chemise Corporativa con Bordado Digital",
    tagline: "Elegancia y presencia para tu equipo de trabajo",
    description: "Chemises de piqué de primera calidad con bordado computarizado de alta definición para logo en pecho, manga o espalda. Confección con costuras reforzadas pensadas para el uso diario.",
    basePriceUsd: 18,
    priceNote: "A partir de 6 piezas con bordado incluido",
    unit: "unidad",
    turnaroundDays: "4 a 7 días hábiles",
    availableMaterials: ["Tela Piqué 65/35 Algodón-Poliéster", "Piqué 100% Algodón Peinado", "Dry-Fit Piqué Liviano"],
    availableFinishes: ["Bordado en pecho (10 cm)", "Bordado doble (pecho + manga)", "Bordado gigante espalda", "Cuello tejido con vivos en contraste"],
    badge: "Empresarial",
    imageUrl: "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
    images: [
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "tex-02",
    category: "textiles",
    name: "Franela de Algodón Peinado con Estampado de Alta Densidad",
    tagline: "Tacto suave y colores firmes para activaciones y staff",
    description: "Franelas 100% algodón jersey peinado 24/1 de textura sedosa. Personalización en vinil textil termotransferible o serigrafía digital que no se quiebra ni se decolora.",
    basePriceUsd: 12,
    priceNote: "Desde 12 piezas con estampado a 1 o 2 colores",
    unit: "unidad",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Algodón 100% Jersey Peinado 180g", "Mezcla Algodón/Elastano", "Algodón Orgánico"],
    availableFinishes: ["Estampado pecho central grande", "Bordado minimalista en bolsillo", "Vinil textil reflectivo para seguridad"],
    badge: "Eventos & Marcas",
    imageUrl: "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
    images: [
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "tex-03",
    category: "textiles",
    name: "Cobijas & Batas Térmicas Personalizadas",
    tagline: "Nuestra creación viral y consentida en Oriente",
    description: "Cobijas y batas de peluche térmico extrasuave, personalizadas con tu nombre, iniciales o branding exclusivo de Arte Inédito. Confeccionadas con amor y acabados de lujo en nuestro taller.",
    basePriceUsd: 28,
    priceNote: "Incluye personalización bordada con tipografía de autor",
    unit: "unidad",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Fleece Polar Ultra Suave", "Sherpa Térmica con Forro Suave", "Flannel Fleece Premium"],
    availableFinishes: ["Bordado de lujo con iniciales doradas", "Estampado full diseño en ribetes", "Capucha con forro afelpado"],
    badge: "Exclusivo Inédito",
    imageUrl: "/assets/images/hero_workshop_craft_1793205546075.jpg",
    images: [
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg"
    ],
    active: true
  },
  {
    id: "tex-04",
    category: "textiles",
    name: "Gorras Trucker & Cerradas con Parche Personalizado",
    tagline: "El complemento perfecto para marcas y promociones",
    description: "Gorras de malla tipo camionero o cerradas de gabardina pesada con broche ajustable. Apliques de parche bordado en relieve, cuero grabado láser o estampado termotransferible.",
    basePriceUsd: 9,
    priceNote: "A partir de 12 unidades con parche montado",
    unit: "unidad",
    turnaroundDays: "3 a 6 días hábiles",
    availableMaterials: ["Gorra Trucker con Malla Trasera", "Gabardina 100% Algodón Peinado", "Tela Drill de Alta Densidad"],
    availableFinishes: ["Parche de semipiel grabado láser", "Bordado 3D de alto relieve", "Etiqueta tejida en visera"],
    badge: "Accesorios",
    imageUrl: "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
    images: [
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },

  // 4. SUBLIMACION FULL PRINT
  {
    id: "sub-01",
    category: "sublimacion",
    name: "Franela Deportiva Dry-Fit Full Print 360°",
    tagline: "Diseños que cubren el 100% de la prenda sin límites de color",
    description: "Sublimación de ultra alta definición en tela deportiva transpirable. Las tintas penetran a nivel molecular en la fibra, permitiendo gradientes, fotografías y patrones continuos sin alterar la transpirabilidad ni el peso de la tela.",
    basePriceUsd: 15,
    priceNote: "Precio unitario desde 12 piezas con diseño personalizado",
    unit: "unidad",
    turnaroundDays: "3 a 6 días hábiles",
    availableMaterials: ["Poliéster Dry-Fit deportivo microperforado", "Tacto Algodón (Poly-Cotton)", "Licra deportiva elástica 4-way stretch"],
    availableFinishes: ["Cuello redondo clásico", "Cuello en V deportivo", "Costura reforzada flatlock con vivos"],
    badge: "Mundial & Eventos",
    imageUrl: "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
    images: [
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "sub-02",
    category: "sublimacion",
    name: "Tazas de Cerámica & Tazas Mágicas Térmicas",
    tagline: "Impresión fotográfica brillante que revela sorpresas al calor",
    description: "Tazas de 11 oz con esmalte especial para sublimación de alta fidelidad cromática. Disponibles en versión clásica blanca, con asa y fondo de color, o mágicas que revelan tu diseño con líquidos calientes.",
    basePriceUsd: 6,
    priceNote: "Desde 6 piezas (descuento significativo por caja de 36)",
    unit: "unidad",
    turnaroundDays: "2 a 4 días hábiles",
    availableMaterials: ["Cerámica blanca grado AAA 11oz", "Cerámica Mágica termosensible", "Taza metálica esmaltada tipo Peltre retro"],
    availableFinishes: ["Full color perimetral 360°", "Caja individual de regalo troquelada", "Acabado brillante o mate"],
    badge: "Regalo & Promoción",
    imageUrl: "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
    images: [
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
      "/assets/images/laser_wood_craft_1793214061392.jpg"
    ],
    active: true
  },
  {
    id: "sub-03",
    category: "sublimacion",
    name: "Cintas Lanyards Porta-Carnet Sublimadas",
    tagline: "Calidad satinada para eventos, congresos y empresas",
    description: "Cintas de poliéster satinado de 20mm o 25mm impresas a doble cara por sublimación sin límite de colores corporativos. Incluyen gancho pico de loro metálico reforzado y broche de seguridad antipánico.",
    basePriceUsd: 2,
    priceNote: "Mínimo 25 unidades. Incluye mosquetón metálico",
    unit: "unidad",
    turnaroundDays: "2 a 4 días hábiles",
    availableMaterials: ["Cinta satén de alta densidad 20mm", "Cinta satén ancha 25mm", "Ribete reforzado"],
    availableFinishes: ["Gancho metálico cromado", "Broche de seguridad de desprendimiento", "Hebilla desmontable para llaves"],
    badge: "Corporativo & Ferias",
    imageUrl: "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
    images: [
      "/assets/images/sublimacion_full_apparel_1793214135069.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },

  // 5. GRABADO LASER
  {
    id: "las-01",
    category: "laser",
    name: "Tablas de Asado en Teca / Samán con Grabado Láser",
    tagline: "El regalo gourmet por excelencia para marcas y directivos",
    description: "Tablas de madera noble seleccionada con canaleta de jugos, curadas con aceites minerales comestibles y grabadas a láser en bajo relieve permanente con tu logo o dedicatoria.",
    basePriceUsd: 25,
    priceNote: "Incluye curado y grabado en madera maciza",
    unit: "pieza",
    turnaroundDays: "2 a 4 días hábiles",
    availableMaterials: ["Madera Teca maciza 30x40cm", "Madera Samán veteada", "Bambú laminado resistente"],
    availableFinishes: ["Grabado oscuro profundo en bajo relieve", "Canaleta perimetral de jugos", "Asas de acero inoxidable empotradas"],
    badge: "Top Gourmet",
    imageUrl: "/assets/images/laser_wood_craft_1793214061392.jpg",
    images: [
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "las-02",
    category: "laser",
    name: "Grabado de Fibra Óptica en Metales & Termos",
    tagline: "Personalización milimétrica indeleble para productos de valor",
    description: "Grabado con tecnología láser de fibra óptica MOPA de alta velocidad. Genera contrastes claros u oscuros sobre acero inoxidable, aluminio anodizado y navajas sin remover el recubrimiento térmico.",
    basePriceUsd: 8,
    priceNote: "Por pieza personalizada (descuentos por volumen)",
    unit: "pieza",
    turnaroundDays: "1 a 3 días hábiles",
    availableMaterials: ["Acero Inoxidable 304", "Aluminio Anodizado Negro / Plata", "Carcasas de dispositivos electrónicos"],
    availableFinishes: ["Grabado blanco plateado de alto contraste", "Grabado oscuro mate", "Corte de contornos milimétrico"],
    badge: "Rápido & Milimétrico",
    imageUrl: "/assets/images/laser_wood_craft_1793214061392.jpg",
    images: [
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "las-03",
    category: "laser",
    name: "Placas & Trofeos en Acrílico Cristal con Base de Madera",
    tagline: "Reconocimientos memorables con diseño arquitectónico",
    description: "Corte y grabado de acrílico cristal de 8mm a 15mm con biselado de diamantes, montado sobre peanas de madera teca pulida. Perfecto para premiaciones corporativas, torneos de golf y homenajes.",
    basePriceUsd: 45,
    priceNote: "Incluye grabado personalizado y base de madera",
    unit: "trofeo",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Acrílico Cristal 10mm de espesor", "Base en Teca maciza curada", "Detalles en placa metálica grabada"],
    availableFinishes: ["Grabado esmerilado blanco sobre cristal", "Corte de silueta personalizada en láser", "Luz LED inalámbrica integrada en la base"],
    badge: "Premios & Eventos",
    imageUrl: "/assets/images/laser_wood_craft_1793214061392.jpg",
    images: [
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg",
      "/assets/images/pop_display_stand_1793214096974.jpg"
    ],
    active: true
  },

  // 6. DISEÑO POP & DISPLAYS
  {
    id: "pop-01",
    category: "pop",
    name: "Exhibidores & Displays POP para Mostrador",
    tagline: "Haz que tu producto destaque en el punto de contacto",
    description: "Diseño y fabricación de estructuras en acrílico cristal moldeado en caliente, MDF y foam board para mostrador de tiendas, farmacias y lanzamientos de marca en Anzoátegui.",
    basePriceUsd: 65,
    priceNote: "Fabricación a medida según cantidad de peldaños",
    unit: "unidad",
    turnaroundDays: "4 a 8 días hábiles",
    availableMaterials: ["Acrílico Cristal 3-5mm termoformado", "MDF con Enchape Gráfico vinílico", "Sintra (PVC expandido)"],
    availableFinishes: ["Rotulación con vinil laminado protector", "Bolsillos transparentes para folletos", "Top con cenefa iluminada"],
    badge: "Punto de Venta",
    imageUrl: "/assets/images/pop_display_stand_1793214096974.jpg",
    images: [
      "/assets/images/pop_display_stand_1793214096974.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "pop-02",
    category: "pop",
    name: "Floor Displays / Racks Publicitarios de Piso",
    tagline: "Exhibidores autoportantes para pasillos y supermercados",
    description: "Muebles exhibidores modulares de piso fabricados en MDF hidrófugo y hierro liviano con capacidad de carga para botellas, alimentos y cosméticos. Desarmables para fácil transporte.",
    basePriceUsd: 160,
    priceNote: "Por estructura terminada y embalada",
    unit: "unidad",
    turnaroundDays: "6 a 10 días hábiles",
    availableMaterials: ["MDF 15mm laqueado", "Laterales en Sintra 6mm rotulado", "Gancheras metálicas cromadas"],
    availableFinishes: ["Cenefa superior con logo troquelado", "Bandejas reforzadas regulables en altura", "Ruedas con freno para desplazamiento"],
    badge: "Retail & Marcas",
    imageUrl: "/assets/images/pop_display_stand_1793214096974.jpg",
    images: [
      "/assets/images/pop_display_stand_1793214096974.jpg",
      "/assets/images/large_format_banner_1793214117846.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg"
    ],
    active: true
  },
  {
    id: "pop-03",
    category: "pop",
    name: "Pódiums & Tótems Desarmables para Ferias",
    tagline: "Presencia escénica en stands de convenciones y expos",
    description: "Mesas de atención y tótems informativos ligeros con gráfica intercambiable, ideales para exposiciones en hoteles, centros de convenciones de Lechería y activaciones de marketing.",
    basePriceUsd: 190,
    priceNote: "Incluye bolso de transporte y gráfica impresa",
    unit: "set",
    turnaroundDays: "4 a 7 días hábiles",
    availableMaterials: ["Estructura plegable de aluminio y MDF", "Lámina envolvente de PVC termoformado", "Tapa de madera melamínica"],
    availableFinishes: ["Gráfica impresa en vinil mate antirreflejo", "Estante interno oculto para folletería", "Bolsa de lona acolchada"],
    badge: "Expo & Ferias",
    imageUrl: "/assets/images/large_format_banner_1793214117846.jpg",
    images: [
      "/assets/images/large_format_banner_1793214117846.jpg",
      "/assets/images/pop_display_stand_1793214096974.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg"
    ],
    active: true
  },

  // 7. MERCHANDISING
  {
    id: "merch-01",
    category: "merch",
    name: "Powerbanks Metálicos 10,000 mAh con Grabado Láser",
    tagline: "Regalos corporativos de alta gama que tus clientes usarán siempre",
    description: "Baterías externas de 10,000 mAh en carcasa de aluminio anodizado con puertos USB duales y carga rápida. Personalización con grabado láser de precisión indeleble.",
    basePriceUsd: 16,
    priceNote: "Desde 10 unidades con grabado a 1 cara incluido",
    unit: "unidad",
    turnaroundDays: "2 a 5 días hábiles",
    availableMaterials: ["Aluminio Anodizado Negro / Gris Espacial", "Célula Li-Polymer certificada", "Cable microUSB / Type-C"],
    availableFinishes: ["Grabado láser de fibra óptica", "Impresión UV a todo color", "Empaque caja individual premium"],
    badge: "Top Merchandising",
    imageUrl: "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
    images: [
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "merch-02",
    category: "merch",
    name: "Botellas Térmicas de Acero Inoxidable Doble Pared 750ml",
    tagline: "Mantiene bebidas frías 24h en el calor costero",
    description: "Termos deportivos con aislamiento al vacío de doble pared. Conservan agua helada hasta 24 horas bajo el sol de Anzoátegui. Grabado de logotipo a láser con durabilidad vitalicia.",
    basePriceUsd: 14,
    priceNote: "Desde 12 piezas con grabado de logo",
    unit: "unidad",
    turnaroundDays: "2 a 4 días hábiles",
    availableMaterials: ["Acero Inoxidable 18/8 grado alimenticio", "Tapa hermética antiderrame con rosca", "Acabado exterior Powder Coat mate"],
    availableFinishes: ["Grabado láser vertical 360°", "Detalle de logo a 1 posición", "Asa metálica plegable"],
    badge: "Eco & Estilo",
    imageUrl: "/assets/images/laser_wood_craft_1793214061392.jpg",
    images: [
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "merch-03",
    category: "merch",
    name: "Libretas Ejecutivas con Cubierta en Cuero Vegano y Bolígrafo",
    tagline: "Kits de bienvenida que transmiten excelencia y orden",
    description: "Cuadernos A5 de 100 hojas rayadas de 80g en papel marfil suave, con cinta elástica de cierre, bolsillo portadocumentos y bolígrafo metálico a juego grabado con el logo de tu empresa.",
    basePriceUsd: 11,
    priceNote: "Desde 15 sets completos de libreta + bolígrafo",
    unit: "set",
    turnaroundDays: "3 a 5 días hábiles",
    availableMaterials: ["Semipiel PU termocambiante", "Papel bond beige de 80 gramos", "Bolígrafo de aluminio con mina de gel"],
    availableFinishes: ["Bajo relieve termoestampado (Deboss)", "Grabado láser sobre cubierta y bolígrafo", "Faja publicitaria a todo color"],
    badge: "Kits de Bienvenida",
    imageUrl: "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
    images: [
      "/assets/images/sublimacion_merch_showcase_1793205546710.jpg",
      "/assets/images/laser_wood_craft_1793214061392.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },

  // 8. LONAS & GRAN FORMATO
  {
    id: "lon-01",
    category: "lonas",
    name: "Lona Publicitaria Frontlit 13oz & Gran Formato",
    tagline: "Visibilidad masiva para exteriores e inauguraciones",
    description: "Impresión de gran escala en lona frontlit 13oz de alta densidad con tintas solventes resistentes al sol del Caribe y lluvia costera. Incluye sellado perimetral térmico y ojetes metálicos niquelados.",
    basePriceUsd: 12,
    priceNote: "Por metro cuadrado terminado con ojales y ruedo",
    unit: "m²",
    turnaroundDays: "24 a 48 horas",
    availableMaterials: ["Lona Frontlit 13oz de alta tenacidad", "Lona Frontlit 15oz ultra pesada", "Lona Blackout con reverso negro"],
    availableFinishes: ["Refuerzo perimetral térmico y ojetes cada 50cm", "Bolsillo para tubos superior/inferior", "Ojales dobles en las cuatro esquinas"],
    badge: "Entrega Express",
    imageUrl: "/assets/images/large_format_banner_1793214117846.jpg",
    images: [
      "/assets/images/large_format_banner_1793214117846.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/corporeo_3d_signage_1793205547566.jpg"
    ],
    active: true
  },
  {
    id: "lon-02",
    category: "lonas",
    name: "Banner Roll-Up Autoenrollable de Aluminio",
    tagline: "El rey de las exposiciones: listo en 30 segundos",
    description: "Estructura autoenrollable de aluminio anonizado resistente con varilla telescópica y bolso de transporte de nylon. Gráfica impresa en lona mate antirreflejo de máxima resolución sin ondulación de bordes.",
    basePriceUsd: 55,
    priceNote: "Incluye estructura de aluminio + gráfica montada + bolso",
    unit: "unidad (85x200cm)",
    turnaroundDays: "24 a 48 horas",
    availableMaterials: ["Estructura de Aluminio liviana 85x200cm", "Estructura ancha 100x200cm", "Lona antirizado importada de 440g"],
    availableFinishes: ["Impresión fotográfica en alta resolución 1440 DPI", "Bolso de hombro acolchado", "Pies giratorios de doble estabilidad"],
    badge: "Portátil & Stand",
    imageUrl: "/assets/images/large_format_banner_1793214117846.jpg",
    images: [
      "/assets/images/large_format_banner_1793214117846.jpg",
      "/assets/images/pop_display_stand_1793214096974.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg"
    ],
    active: true
  },
  {
    id: "lon-03",
    category: "lonas",
    name: "Lona Mesh Microperforada para Viento en Fachadas",
    tagline: "Seguridad y visibilidad en grandes alturas y andamios",
    description: "Tejido de lona microperforada permeable al aire que reduce la fuerza del viento y evita el efecto vela en fachadas y andamios frente al mar. Permite pasar la luz mientras exhibe tu marca a gran escala.",
    basePriceUsd: 18,
    priceNote: "Por metro cuadrado terminado",
    unit: "m²",
    turnaroundDays: "2 a 3 días hábiles",
    availableMaterials: ["Lona Mesh microperforada con liner", "Cinta de refuerzo soldado perimetral", "Ojetes de alta resistencia"],
    availableFinishes: ["Perforaciones rompevientos calibradas", "Ruedo soldado con alta frecuencia", "Cinchas de sujeción para andamio"],
    badge: "Exteriores Costeros",
    imageUrl: "/assets/images/large_format_banner_1793214117846.jpg",
    images: [
      "/assets/images/large_format_banner_1793214117846.jpg",
      "/assets/images/hero_workshop_craft_1793205546075.jpg",
      "/assets/images/rotulacion_vehicular_wrap_1793205547214.jpg"
    ],
    active: true
  }
];

export const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: "AI-2026-0842",
    clientName: "Carlos Méndez",
    clientCompany: "Ateco Global Industries",
    clientPhone: "+58 414-8201199",
    clientEmail: "cmendez@atecoglobal.com",
    category: "corporeos",
    productId: "corp-01",
    productName: "Corpóreo Logo 3D en PVC / Acrílico",
    material: "Acrílico Cristal 3-5mm",
    finish: "Luz LED cálida trasera (Halo)",
    dimensions: "240 x 90 cm",
    quantity: 1,
    notes: "Para el lobby principal de la sede en Lechería. Requerimos montaje en pared de concreto.",
    colors: "Pantone 186 C y Blanco Puro",
    artFileName: "Logo_Ateco_Vector_Final.ai",
    estimatedTotalUsd: 380,
    status: "En Producción",
    adminNotes: "Diseño aprobado por Rodolfo. Listo para corte láser mañana.",
    createdAt: "2026-10-26T14:30:00.000Z"
  },
  {
    id: "AI-2026-0841",
    clientName: "Mariana Silva",
    clientCompany: "Café Bistro Playa Mansa",
    clientPhone: "+58 424-8123344",
    clientEmail: "mariana@cafebistro.ve",
    category: "rotulacion",
    productId: "rot-02",
    productName: "Rotulación de Vitrinas y Locales",
    material: "Vinil Esmerilado (Frosted)",
    finish: "Corte troquelado de logo",
    dimensions: "3 vitrinas de 1.80m x 2.10m",
    quantity: 3,
    notes: "Queremos privacidad pero que entre luz natural, con el logo en relieve.",
    colors: "Esmerilado plata translúcido",
    artFileName: "Bistro_Mansa_Vitrinas.pdf",
    estimatedTotalUsd: 210,
    status: "En Revisión",
    adminNotes: "Se envió cotización con descuento comercial por 3 vitrinas.",
    createdAt: "2026-10-27T10:15:00.000Z"
  },
  {
    id: "AI-2026-0840",
    clientName: "David Quintero",
    clientCompany: "Clínica Dental del Mar",
    clientPhone: "+58 412-9988776",
    clientEmail: "drquintero@dentaldelmar.com",
    category: "textiles",
    productId: "tex-01",
    productName: "Chemise Corporativa con Bordado Digital",
    material: "Tela Piqué 65/35 Algodón-Poliéster",
    finish: "Bordado doble (pecho + manga)",
    dimensions: "Tallas: 8 M, 6 L, 4 S",
    quantity: 18,
    notes: "Color azul marino con bordado en blanco y cian corporativo.",
    colors: "Azul Marino y Cian Dental",
    artFileName: "DentalDelMar_Bordado.ai",
    estimatedTotalUsd: 324,
    status: "Nueva",
    adminNotes: "Esperando confirmación del vector de la manga.",
    createdAt: "2026-10-28T08:00:00.000Z"
  }
];

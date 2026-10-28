# CONTEXT.md — Arte Inédito  
## Prompt base para adaptar el prototipo Textiles NC → Sistema Web Arte Inédito

**Versión:** 1.0  
**Fecha:** 28 de Octubre 2026  
**Cliente objetivo:** Arte Inédito | Publicidad y Textiles  
**Instagram:** @arteinedito (~39.2K seguidores)  
**RIF:** J-412848798  
**Sede:** Esquina Inédita, Avenida Principal de Lechería, Anzoátegui, Venezuela  
**Referencia de prototipo a adaptar:** Textiles NC (nctextiles.vercel.app / textiles-nc.ai.studio)

---

## 1. Quiénes son

Arte Inédito es una empresa de **publicidad y textiles** con sede en Lechería.  
Se posicionan como:

> “La empresa de publicidad que imprime, viste, diseña y construye ideas que se hacen realidad.”  
> “Creamos propuestas de valor.”  
> “Si lo puedes imaginar, lo podemos hacer inédito.”

No son solo una imprenta ni solo una confección: **materializan marcas** (de la idea al objeto físico).

Director mencionado en prensa: Rodolfo Gil.  
Sede física inaugurada como “Esquina Inédita” (Av. Principal de Lechería, frente a La Bodeguilla).  
Horario típico referido: Lunes a Viernes 9:00 am – 1:00 pm y 2:00 pm – 5:00 pm.

Identidad visual fuerte:
- Rojo corporativo dominante (#C41E3A / rojo intenso)
- Logo monograma “a” en blanco sobre fondo rojo
- Estética creativa, moderna, con energía de taller + showroom

---

## 2. Qué ofrecen (catálogo real según su comunicación)

### Líneas principales

| Categoría | Productos / Servicios |
|-----------|------------------------|
| **Corpóreos** | Letras y logos en 3D, displays, señalética dimensional |
| **Rotulación** | Vehículos, locales, vitrinas, vinilos, microperforado |
| **Sublimación** | Textil full print, tazas, productos promocionales |
| **Diseño POP** | Material punto de venta, displays, exhibidores |
| **Grabado Láser** | Personalización en madera, acrílico, metal, etc. |
| **Textiles / Uniformes** | Franelas, chemises, uniformes personalizados, cobijas/bata |
| **Merchandising** | Tazas, powerbanks, artículos promocionales |
| **Impresión publicitaria** | Lonas, banners, afiches, gran formato |

Frase clave de su contenido:
> “Cada lona, cada corpóreo, cada taza o uniforme sale de nuestras manos… porque aquí, las ideas no se quedan en pantalla: se materializan.”

---

## 3. Diferencia clave vs Textiles NC

| Aspecto | Textiles NC | Arte Inédito |
|---------|------------|--------------|
| Foco | Fábrica de uniformes y gorras B2B | Publicidad integral + textiles |
| Producto estrella | Prendas (camisas, chaquetas, gorras, overoles) | Ideas materializadas (corpóreos, rotulación, POP, textil, láser) |
| Personalización | Bordado / sublimado en prendas | Múltiples técnicas + múltiples soportes |
| Cliente típico | Empresas que uniforman personal | Empresas que construyen su imagen de marca |
| Tono | Industrial / confección seria | Creativo / “propuestas de valor” / artístico |

El sistema debe sentirse **más creativo, visual y de taller publicitario**, no de fábrica industrial de uniformes.

---

## 4. Objetivo del sistema web a prototipar

Convertir el prototipo de Textiles NC en un **sistema web de cotización y catálogo para Arte Inédito** donde:

1. El cliente vea el catálogo de servicios/productos de forma clara y premium.
2. Pueda cotizar de forma guiada (producto → técnica/soporte → cantidad → diseño).
3. Arte Inédito cargue y administre su catálogo desde un panel.
4. Se genere una proforma / mensaje estructurado para WhatsApp.
5. La experiencia transmita la identidad de Arte Inédito (rojo, creatividad, materialización de ideas).

---

## 5. Estructura de páginas / módulos a adaptar

### 5.1 Sitio público

- **Home**  
  Hero con mensaje tipo: “Imprimimos, vestimos, diseñamos y construimos ideas.”  
  Bloques de servicios estrella (Corpóreos, Rotulación, Sublimación, POP, Láser, Textil).  
  Casos / trabajos recientes (placeholders).  
  CTA fuerte a cotizar / WhatsApp.  
  Ubicación: Esquina Inédita, Av. Principal de Lechería.

- **Catálogo / Servicios**  
  Grid de categorías (no solo “prendas”).  
  Cada categoría abre ficha con variantes, técnicas y CTA de cotización.

- **Ficha de producto/servicio**  
  Galería, descripción, técnicas disponibles, tiempos estimados, botón “Cotizar / Personalizar”.

- **Motor de cotización / personalización** (adaptado de los 4 pasos de NC)  
  1. Elige el producto o servicio  
  2. Elige técnica / soporte / acabado  
  3. Sube arte / indica medidas / ubicación  
  4. Cantidad + resumen + envío a WhatsApp

- **Nosotros / Taller**  
  Historia corta, sede física, “propuestas de valor”.

- **Contacto**  
  Mapa, horarios, WhatsApp, RIF.

### 5.2 Panel admin (igual lógica que NC)

- Login + roles (Admin / Editor)
- CRUD de productos/servicios
- Categorías y técnicas
- Cotizaciones recibidas
- Configuración (WhatsApp, datos de la empresa)

---

## 6. Flujo de cotización adaptado (4 pasos)

```
PASO 1 – Elige qué necesitas
  • Corpóreos
  • Rotulación (vehicular / local)
  • Sublimación textil
  • Diseño POP / displays
  • Grabado láser
  • Uniformes / textiles
  • Merchandising (tazas, powerbanks, etc.)
  • Lonas / gran formato

PASO 2 – Técnica y especificaciones
  • Según categoría: materiales, tamaños, acabados
  • Ejemplo textil: sublimación / vinil / bordado
  • Ejemplo corpóreo: PVC, acrílico, espesor, iluminación
  • Ejemplo rotulación: tipo de vinilo, superficie

PASO 3 – Diseño y archivos
  • Dropzone para subir logo / arte (.PNG, .AI, .PDF, .SVG)
  • Campos: medidas, cantidad de colores, observaciones
  • Vista previa simple cuando aplique

PASO 4 – Resumen y cotización
  • Cantidad
  • Tiempo estimado de producción
  • Notas
  • Botón: Generar proforma → WhatsApp
```

El mensaje de WhatsApp debe salir estructurado (folio, ítem, técnica, cantidad, observaciones, datos del cliente).

---

## 7. Identidad visual para el prototipo

| Elemento | Valor recomendado |
|----------|-------------------|
| Color primario | Rojo Arte Inédito (#C41E3A o #E53935 cercano) |
| Fondo | Oscuro premium o blanco limpio con acentos rojos (elegir una línea y mantenerla) |
| Logo | Monograma “a” blanco sobre rojo |
| Tipografía | Moderna, bold en títulos; legible en cuerpo |
| Tono visual | Creativo, taller, showroom — no industrial navy como NC |
| CTAs | Rojo intenso, texto claro (“Cotizar ahora”, “Materializa tu idea”) |

Evitar copiar la paleta Night Navy de Textiles NC.  
Arte Inédito debe sentirse **rojo + creativo + material**.

---

## 8. Placeholders realistas de productos

Usar nombres y descripciones coherentes con lo que publican:

- Corpóreo logo 3D PVC 10 mm
- Rotulación vehicular full
- Franela sublimada full print
- Chemise bordada logo pecho
- Taza mágica sublimada
- Display POP mostrador
- Lona front 3×2 m
- Powerbank personalizado grabado láser
- Señalética interior acrílico
- Cobija / bata personalizada

Precios: placeholders en USD o “Cotizar” (muchas veces en este rubro el precio depende de medidas y arte).

---

## 9. Diferenciadores a resaltar en la UI

- “De la idea al objeto”
- “Propuestas de valor”
- “Si lo puedes imaginar, lo hacemos inédito”
- Sede física: Esquina Inédita, Av. Principal de Lechería
- Capacidad multi-técnica (no solo textil)
- Atención a empresas y marcas locales / regionales

---

## 10. Instrucciones para AI Studio (prompt operativo)

Usa este bloque como instrucción principal:

```
Adapta el prototipo actual de Textiles NC a un sistema web completo para Arte Inédito (publicidad y textiles, Lechería, Anzoátegui).

IDENTIDAD:
- Marca: Arte Inédito | Publicidad y Textiles
- Instagram: @arteinedito
- RIF: J-412848798
- Sede: Esquina Inédita, Av. Principal de Lechería
- Colores: rojo corporativo dominante (#C41E3A), blanco, negro/gris oscuro
- Tono: creativo, moderno, “materializamos ideas”, propuestas de valor

QUÉ OFRECEN (catálogo a reflejar):
Corpóreos, Rotulación, Sublimación, Diseño POP, Grabado Láser, Textiles/Uniformes, Merchandising, Lonas/gran formato.

ESTRUCTURA:
- Home con hero de marca + grid de servicios
- Catálogo por categorías (no solo prendas)
- Ficha de producto/servicio
- Flujo de cotización en 4 pasos adaptado a publicidad/textil
- Panel admin (productos, categorías, cotizaciones, roles)
- Generación de proforma → WhatsApp
- Página de sede / contacto

MANTENER DEL PROTOTIPO NC:
- Lógica de panel admin + roles
- Cotizador con resumen y WhatsApp
- Mobile-first y componentes limpios
- Experiencia premium

CAMBIAR:
- Toda la identidad visual a Arte Inédito (rojo, logo, copy)
- Catálogo de productos/servicios al listado real de Arte Inédito
- Flujo de personalización orientado a corpóreos, rotulación, sublimación, POP, láser y textil
- Textos y CTAs al tono “propuestas de valor / materializar ideas”

Genera placeholders realistas de productos y un mensaje de WhatsApp estructurado para cotizaciones.
```

---

## 11. Resumen ejecutivo para el prompt

**Arte Inédito** = publicidad + textiles en Lechería.  
Imprimen, visten, diseñan y construyen (corpóreos, rotulación, sublimación, POP, láser, uniformes, merchandising).  
El prototipo debe dejar de ser “fábrica de uniformes” y pasar a ser **“taller de materialización de marcas”**, con catálogo multi-servicio, cotizador guiado y la identidad roja/creativa de @arteinedito.

---

*Documento listo para pegar / adjuntar como context en Google AI Studio al adaptar el prototipo de Textiles NC.*

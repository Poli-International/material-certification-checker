# Decodificador de Certificación de Materiales: Arquitectura Técnica (Español)

## Índice de Contenidos

1. [Resumen de la Arquitectura](#resumen-de-la-arquitectura)
2. [Organización del Sistema de Archivos](#organización-del-sistema-de-archivos)
3. [Subsistemas y Componentes](#subsistemas-y-componentes)
   - [Lector de Certificados y Analizador de Texto](#1-lector-de-certificados-y-analizador-de-texto)
   - [Generador de Cuestionarios Técnicos para Proveedores](#2-generador-de-cuestionarios-técnicos-para-proveedores)
   - [Matriz Declaraciones / Evidencias](#3-matriz-declaraciones--evidencias)
   - [Comparador Cara a Cara de Materiales Certificados](#4-comparador-cara-a-cara-de-materiales-certificados)
   - [Bóveda de Recepción y Cumplimiento del Estudio](#5-bóveda-de-recepción-y-cumplimiento-del-estudio)
   - [Biblioteca de Estándares Normativos](#6-biblioteca-de-estándares-normativos)
   - [Mezclador de Compatibilidad Galvánica y Química](#7-mezclador-de-compatibilidad-galvánica-y-química)
   - [Manual de Asepsia y Esterilización en Estudio](#8-manual-de-asepsia-y-esterilización-en-estudio)
4. [Esquemas y Estructuras de Datos](#esquemas-y-estructuras-de-datos)
5. [Lógica Clínica de Evaluación de Biocompatibilidad](#lógica-clínica-de-evaluación-de-biocompatibilidad)
6. [Motor de Internacionalización (I18N)](#motor-de-internacionalización-i18n)
7. [Accesibilidad, Diseño Adaptativo y Motor de Impresión](#accesibilidad-diseño-adaptativo-y-motor-de-impresión)
8. [Verificación Automatizada y Control de Calidad](#verificación-automatizada-y-control-de-calidad)

---

## Resumen de la Arquitectura

El **Decodificador de Certificación de Materiales** está concebido como una aplicación web estática de alto rendimiento, carente de dependencias externas y ejecutada por entero en el navegador del usuario. No requiere servidores de procesamiento intermedio, bases de datos externas ni redes de distribución de contenido (CDN). Toda la lógica de análisis léxico, evaluación clínica y generación de interfaz tiene lugar a nivel de cliente.

### Principios Arquitectónicos Fundamentales
- **Privacidad Total de Datos**: Facturas comerciales, certificados de colada y registros de control de calidad se almacenan de forma exclusiva en el `localStorage` local.
- **Cero Dependencias Externas**: Tipografías, hojas de estilo, scripts y elementos gráficos se sirven mediante rutas locales relativas.
- **Carga Inmediata**: Despliegue visual instantáneo sin bloqueos de red hacia servidores externos.
- **Operatividad Fuera de Línea**: Uso fiable en cabinas de piercing sin necesidad de conexión activa a internet.

### Tecnologías Clave
- **HTML5**: Estructura semántica con puntos de referencia ARIA, roles de accesibilidad, regiones de estado y control del foco.
- **CSS3**: Variables de diseño estructuradas, retículas adaptativas con CSS Grid y Flexbox, y reglas optimizadas para la impresión en papel.
- **JavaScript Moderno (ES6+)**: Módulos IIFE (Immediately Invoked Function Expressions) aislados y vinculados al objeto global `window`.
- **Almacenamiento Local**: Serialización JSON en la API `localStorage` del navegador para el registro de inspecciones y auditorías.

---

## Organización del Sistema de Archivos

```
material-certification-checker/
├── index.html                     # Punto de entrada principal a la aplicación
├── documentation.html             # Documentación técnica y glosario interactivo
├── embed.html                     # Generador de código iframe para inserción
├── css/
│   └── style.css                  # Hojas de estilo unificadas, diseño adaptativo e impresión
├── images/
│   └── Poli-International-Co.webp # Logotipo institucional de la marca
├── js/
│   ├── i18n.js                    # Administrador I18N central y diccionario base en inglés
│   ├── i18n/                      # Diccionarios traducidos (paridad total de claves)
│   │   ├── fr.js                  # Francés
│   │   ├── de.js                  # Alemán
│   │   ├── it.js                  # Italiano
│   │   ├── es.js                  # Español
│   │   ├── pt.js                  # Portugués
│   │   └── nl.js                  # Neerlandés
│   ├── certification-data.js      # Base de normativas oficiales (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Perfiles físicos, químicos y de biocompatibilidad
│   ├── v2-data.js                 # Textos de prueba, cuestionarios y matriz de evidencias
│   ├── v2-features.js             # Lector de certificados, hojas técnicas, comparador
│   ├── library.js                 # Buscador de catálogo de estándares
│   ├── mixer.js                   # Evaluador de corrosión galvánica y reactividad
│   ├── reference-studio.js        # Protocolos de esterilización en autoclave y asepsia
│   ├── studio-vault.js            # Registro local de inspecciones de entrada
│   ├── decoder.js                 # Controladores de búsqueda y glosario
│   └── common.js                  # Selector de tema visual, modales y mensajes iframe
└── docs/                          # Documentación multilingüe en 7 idiomas
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Subsistemas y Componentes

### 1. Lector de Certificados y Analizador de Texto
**Archivo:** `js/v2-features.js`
Examina el texto libre procedente de facturas comerciales, etiquetas de empaque y certificados de análisis de fábrica (MTC):
- **Reconocimiento de Patrones**: Detección mediante expresiones regulares de códigos normativos (ASTM F136, ASTM F138, ISO 5832-3, USP Clase VI), especificaciones de fundición (ELI / Extra Low Interstitial, VAR), símbolos químicos y lemas publicitarios genéricos.
- **Clasificación por Grado de Biocompatibilidad**:
  - `tier-compliant`: Certificación válida de grado implante quirúrgico (ej. Titanio ASTM F136, Acero ASTM F138, polímero médico biocompatible BioFlex).
  - `tier-caution`: Metales comerciales o no aptos para implantes (ej. 316L estándar sin refundición por arco en vacío, G23 sin referencia formal a ASTM F136, acrílicos PMMA).
  - `tier-unverified`: Frases publicitarias carentes de respaldo documental ("hipoalergénico", "acero quirúrgico", "metal de alta pureza").
- **Selector de Frases de Ejemplo**: Opciones interactivas con textos habituales del sector para observar al instante la respuesta técnica del sistema.

### 2. Generador de Cuestionarios Técnicos para Proveedores
**Archivo:** `js/v2-features.js`
Genera un formulario de auditoría técnica basado en el material examinado y el tejido corporal de destino:
- **Contexto de Tejido**: Diferencia la perforación inicial (herida activa que exige materiales biológicamente inertes e incapaces de liberar toxinas) del uso en perforaciones ya cicatrizadas y cavidad oral.
- **Criterios de Recepción en Estudio**: Especifica el requerimiento de trazabilidad de colada, límites de rugosidad superficial (Ra <= 0,05 µm / pulido espejo) y pruebas de pasivación.
- **Preguntas Técnicas Concretas**: Compila entre 4 y 6 preguntas dirigidas, acompañadas de la respuesta satisfactoria admisible frente a las respuestas de alarma o rechazo.
- **Impresión y Archivo**: Formato optimizado para impresión física con espacios de firma manual y fecha para el expediente de calidad del estudio.

### 3. Matriz Declaraciones / Evidencias
**Archivo:** `js/v2-features.js` y `js/v2-data.js`
Tabla de referencia interactiva que vincula 12 afirmaciones comerciales comunes con la documentación probatoria requerida:
- **Categorías**: Metales, Polímeros y Afirmaciones Generales de calidad.
- **Documentos Necesarios**: Precisa si se exige un certificado de colada MTC, espectrometría de emisión óptica, ensayo de citotoxicidad ISO 10993-5 o ensayo biológico USP Clase VI.
- **Evaluación del Riesgo ante Falta de Pruebas**: Explica el peligro clínico que supone la ausencia de evidencias comprobables.
- **Búsqueda y Filtros Rápidos**: Filtrado instantáneo por categoría y coincidencia de términos en cualquiera de los idiomas integrados.

### 4. Comparador Cara a Cara de Materiales Certificados
**Archivo:** `js/v2-features.js`
Herramienta técnica para la comparación simultánea de dos o tres materiales de joyería:
- **Parámetros Evaluados**: Composición química declarada, normas de biocompatibilidad, tasa límite de liberación de níquel (EN 1811), tolerancia térmica en autoclave, acabado de superficie y dictamen clínico.
- **Advertencias Intercategoría**: Alerta sobre diferencias estructurales y microbiológicas al contrastar metales de grado quirúrgico con polímeros biocompatibles.

### 5. Bóveda de Recepción y Cumplimiento del Estudio
**Archivo:** `js/studio-vault.js`
Registro informático local para el control de lotes de joyería entrantes:
- **Datos Registrados**: Nombre del proveedor, número de albarán o lote, clasificación de material, dictamen técnico y notas del inspector.
- **Persistencia**: Memoria `localStorage` del navegador, con tolerancia a fallos y sin rastreo externo.
- **Opciones de Gestión**: Consulta histórica, supresión de partidas, impresión formal y copia de seguridad en JSON.

### 6. Biblioteca de Estándares Normativos
**Archivo:** `js/library.js` y `js/certification-data.js`
Catálogo estructurado con resúmenes y requisitos esenciales de normativas ASTM International, ISO, USP y normas europeas (EN).

### 7. Mezclador de Compatibilidad Galvánica y Química
**Archivo:** `js/mixer.js`
Examina las diferencias de potencial electroquímico en joyas compuestas (barras, extremos roscados, bolas) expuestas a fluidos corporales humanos (saliva, sudor, suero).

### 8. Manual de Asepsia y Esterilización en Estudio
**Archivo:** `js/reference-studio.js`
Protocolos clínicos sobre ciclos de autoclave a vapor saturado (121°C a 134°C), ultrasonidos, cubetas desinfectantes y límites térmicos admisibles por material.

---

## Esquemas y Estructuras de Datos

### Modelo de Estándar Normativo (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Especificación estándar para titanio-6aluminio-4vanadio ELI forjado para aplicaciones de implantes quirúrgicos",
  scope: "Perforación inicial, contacto prolongado con tejidos humanos, implantes médicos",
  implant_certified: true,
  nickel_content: "< 0,01% (No detectable)",
  autoclave_compatible: true,
  key_requirements: [
    "Grado ELI (Extra Low Interstitial)",
    "Resistencia a la tracción >= 860 MPa",
    "Biocompatibilidad probada tras pasivación ASTM F86"
  ]
}
```

### Modelo de Ficha de Material (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Titanio de grado implante (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Biocompatibilidad excepcional, osteointegración, amagnético",
  nickel_release: "Nula (< 0,01 ug/cm2/semana)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Lógica Clínica de Evaluación de Biocompatibilidad

1. **Requisitos para Perforación Inicial**:
   - La perforación inicial representa una herida epitelial abierta.
   - La joyería de primera puesta debe ser biológicamente inerte, químicamente estable, inmune a la corrosión y compatible con ciclos repetidos de esterilización a vapor.
   - Los materiales conformes comprenden el Titanio ASTM F136, el Acero de implante ASTM F138, el Titanio ISO 5832-3 y el polímero BioFlex certificado bajo USP Clase VI.
   - Los aceros comerciales estándar (316L sin refinar) y las aleaciones industriales de titanio (Ti-64 genérico o G23 sin certificado ASTM F136) reciben aviso de precaución por presencia potencial de impurezas de hierro y oxígeno intersticial.

2. **Control de Liberación de Níquel**:
   - Conforme a la entrada 27 del anexo XVII del reglamento europeo REACH, la tasa de liberación de níquel en piezas insertadas en zonas perforadas durante la epitelización no debe superar los 0,2 µg/cm²/semana.
   - Los estándares para implantes (ASTM F138, ISO 5832-1) exigen refundición al vacío (VIM-VAR) para fijar el níquel en la red austenítica y prevenir la lixiviación de iones.

---

## Motor de Internacionalización (I18N)

- **Idiomas Integrados**: Inglés (`en`), Francés (`fr`), Alemán (`de`), Italiano (`it`), Español (`es`), Portugués (`pt`) y Neerlandés (`nl`).
- **Arquitectura del Sistema**:
  - `window.i18n`: Administrador principal cargado en `js/i18n.js`.
  - Archivos independientes en `js/i18n/*.js` que registran sus vocabularios al cargar.
  - Vinculación reactiva con el DOM mediante `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` y `data-i18n-title`.
  - Reacción inmediata al cambio de idioma: El evento `languageChanged` desencadena el redibujado de las vistas generadas dinámicamente.
- **Paridad Verificada**: La prueba `audit_i18n.cjs` comprueba la existencia de las 951 claves de traducción en los 7 idiomas sin exclusiones.

---

## Accesibilidad, Diseño Adaptativo y Motor de Impresión

- **Accesibilidad (WCAG 2.1 AA)**:
  - Contrastes superiores a 4,5:1 para el cuerpo de texto en modos claro y oscuro.
  - Zonas de pulsación táctil con medidas mínimas de 44x44px.
  - Control completo mediante teclado con indicadores de foco activos.
  - Implementación minuciosa de atributos ARIA en pestañas, ventanas modales y paneles desplegables.
- **Diseño Adaptativo**:
  - Combinación de CSS Grid y Flexbox que asegura una experiencia óptima desde pantallas de 360px de ancho hasta monitores 4K.
  - Presentación modular en tarjetas para pantallas pequeñas en sustitución de tablas horizontales.
- **Optimización de Impresión**:
  - Instrucciones `@media print` que aíslan la ficha técnica o el cuestionario en curso.
  - Ocultación de barras de navegación, botones interactivos y formularios de búsqueda.
  - Contraste monocromático de alta legibilidad para su incorporación al archivo documental físico del estudio.

---

## Verificación Automatizada y Control de Calidad

El proyecto dispone de un conjunto riguroso de pruebas automáticas:
- `node audit_i18n.cjs`: Audita el recuento de claves, interpolación de variables y corrección ortográfica de signos tipográficos.
- `node verify_all_constraints.cjs`: Supervisa el peso máximo de los archivos (< 512 KiB cada uno), la ausencia total de CDNs externas, la integridad de recursos gráficos y la exactitud de términos clínicos.
- `npm run lint`: Verificación estática con TypeScript sin errores.
- `npm run build`: Validación del empaquetado y compilación para producción.

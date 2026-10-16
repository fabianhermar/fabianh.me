# fabianh.me — Portafolio Personal (v3.0 · 2026 Edition)

<div align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://raw.githubusercontent.com/FabianHermar/fabianh.me/main/public/svg/light-logo.svg"
    />
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://raw.githubusercontent.com/FabianHermar/fabianh.me/main/public/svg/dark-logo.svg"
    />
    <img
      height="80"
      alt="Fabian Herrera Monogram Logo"
      src="https://raw.githubusercontent.com/FabianHermar/fabianh.me/main/public/svg/dark-logo.svg"
    />
  </picture>

  <h3>Fabian Herrera · Desarrollador Web Fullstack</h3>
  <p><em>Interfaces modernas, diseño editorial y arquitectura frontend para startups y negocios digitales.</em></p>

  <p>
    <a href="https://fabianh.me"><strong>🌐 fabianh.me</strong></a> •
    <a href="#-qu%C3%A9-cambi%C3%B3-en-la-v30">¿Qué cambió en la v3.0?</a> •
    <a href="#-arquitectura-y-dise%C3%B1o-2026">Decisiones de Diseño</a> •
    <a href="#-stack-t%C3%A9cnico">Stack</a> •
    <a href="#-c%C3%B3mo-ejecutar">Guía de Inicio</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro" />
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/WCAG-AA%20Compliant-success?style=flat-square" alt="WCAG AA" />
  </p>
</div>

---

## 🧭 ¿Por qué la Versión 3.0? (Contexto y Diagnóstico)

El portafolio anterior acumulaba más de dos años desde su concepción original. Con el avance de las tendencias web hacia **2026**, presentaba patrones visuales y de código obsoletos que no reflejaban el nivel técnico actual:

| Problema en la versión previa | Solución implementada en la v3.0 |
| :--- | :--- |
| **Encabezados letra por letra**: Múltiples `<h1>` anidados dentro de animaciones pesadas. | **HTML semántico estricto**: Un único `<h1>` en el Hero, jerarquía `<h2>`/`<h3>` clara y animaciones nativas con `prefers-reduced-motion`. |
| **Estética genérica de 2023**: Emojis, iconos 3D clip-art y gradientes morados estándar. | **Dirección editorial-tecnológica**: Tipografía con carácter, bordes de 1px, superficies sutiles y familia única de iconos de línea SVG. |
| **Hero sobrecargado**: 2 botones de CV y 4 enlaces sociales compitiendo entre sí. | **Hero enfocado**: Un titular contundente, una CTA primaria (*"Hablemos"*), una secundaria discreta (*"Ver proyectos"*) y redes reubicadas en header/footer. |
| **Proyectos descritos como tareas escolares**: Textos largos de "lo que aprendí". | **Casos de estudio de producto**: Estructura ejecutiva **Problema → Decisión → Resultado** para cada proyecto destacado. |
| **Bento Grid con parpadeos y "Loading..."**: Estados de carga descuidados. | **Bento Grid 2026**: Estados *skeleton* elegantes, numerales tabulares para reloj/clima y adaptación dinámica día/noche. |
| **Inconsistencias de perfil**: "Frontend" vs "Fullstack", años de experiencia discordantes. | **Identidad unificada**: *"Desarrollador web fullstack con más de 2 años de experiencia"* en todo el sitio, metadatos e i18n (ES/EN/DE). |

---

## 🎨 Arquitectura de Diseño (2026 Editorial Tech)

### 1. Sistema de Color en `oklch()`
En lugar de colores hexadecimales arbitrarios, se implementó un sistema de tokens en `oklch()` definido en [global.css](src/styles/global.css) con soporte automático para modo claro y modo oscuro:
- **Modo Claro**: Base en blanco hueso cálido (`oklch(98% 0.005 85)`), superficies con contraste limpio y textos en carbón profundo.
- **Modo Oscuro**: Base en carbón mate profundo (`oklch(14% 0.006 60)`), eliminando el negro puro `#000` para reducir fatiga visual.
- **Color de Acento Único**: Terracota/cobre contemporáneo (`oklch(62% 0.17 42)`), utilizado con moderación táctica para focos interactivos y estados activos.

### 2. Escala Tipográfica Fluida
Definida una única vez mediante variables CSS basadas en `clamp()`:
- Titulares con jerarquía fluida (`--step-display`, `--step-h1`, `--step-h2`, `--step-h3`) que responden automáticamente al viewport sin saltos abruptos de media queries.
- Tipografía de acento editorial en cursiva sutil para detalles de marca y citas.
- Numerales tabulares (`tabular-nums`) en el reloj en vivo y métricas del clima para eliminar el temblor o layout-shift al cambiar los segundos.

### 3. Superficies y "Liquid Glass"
- El efecto de refracción **liquid glass** (`backdrop-blur` multicapa) se restringió con criterio **exclusivamente a la barra de navegación superior**.
- Las tarjetas del cuerpo utilizan bordes sutiles de `1px` (`--border-subtle`), radios coherentes de `16px`/`24px` y sombras de elevación mínimas.

### 4. Identidad y Presencia Visual
- **Monograma Vectorial Preservado**: Se encapsuló el logo de autor en [Logo.astro](src/components/ui/Logo.astro) con `fill="currentColor"`, integrándose dinámicamente tanto en el header como en el pie de página.
- **Retrato del Hero**: Encuadre vertical en proporción `4:5`, aura de acento radial de fondo y máscara inferior degradada que integra suavemente la silueta recortada.

---

## ⚡ Diferenciadores y Características Clave

### ⌨️ Paleta de Comandos (`Ctrl + K` / `Cmd + K`)
Componente accesible en React ([CommandPalette.tsx](src/components/ui/CommandPalette.tsx)) que permite navegar el sitio completo sin levantar las manos del teclado:
- Navegación instantánea a secciones (`#proyectos`, `#experiencia`, `#sobre-mi`, `#contacto`).
- Acceso a rutas secundarias (`/blog`, `/guia-de-estilo`).
- Acciones rápidas: Copiar correo al portapapeles, descargar CV en PDF, alternar tema claro/oscuro y cambiar de idioma.

### 🟢 Indicador de Disponibilidad
Píldora interactiva en la navegación con animación de pulso sutil (`Disponible para proyectos`), comunicando disponibilidad inmediata para consultoría y contratos freelance.

### 🍱 Bento Grid Renovado ("Sobre mí")
Conserva intactas las 5 tarjetas de información y la lógica de fuentes de datos, elevando su nivel visual:
1. **Clima en vivo**: Glifos de línea dinámicos según condición atmosférica, fondo reactivo a día/noche y carga mediante skeletons (adiós texto "Loading...").
2. **Reloj en vivo**: Hora local exacta en formato de 24h, actualizándose cada segundo con numerales tabulares e indicación de desfase horario respecto a México.
3. **Educación**: Ingeniería en Desarrollo y Gestión de Software (UTNA, 2019–2025).
4. **Intereses y Hobbies**: Lectura, cocina, violín, jardinería, senderismo y familia representados con iconografía limpia.
5. **Perfil Técnico**: Pilares de especialidad (Desarrollo Web, UI/UX, Apps Móviles).

### 📬 Formulario de Contacto Accesible
Implementado en [ContactForm.tsx](src/components/contact/ContactForm.tsx) sobre el endpoint existente de Resend:
- Etiquetas `<label>` visibles asociadas semánticamente a cada campo.
- Validación en tiempo real con mensajes de error contextuales.
- Atributos `autocomplete` correctos (`name`, `email`).
- Protección contra doble clic / doble envío mientras la solicitud está en curso.
- Aviso de privacidad explícito sobre tratamiento ético de datos personales.

---

## 🛠 Stack Técnico

- **Framework**: [Astro 5](https://astro.build/) (Renderizado híbrido / Serverless en Vercel)
- **Librería UI**: [React 19](https://react.dev/) (Islas interactivas exclusivas: Clima, Reloj, Formulario, Paleta de Comandos)
- **Estilos**: [TailwindCSS v4](https://tailwindcss.com/) + CSS Modules con variables nativas
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en i18n, APIs y componentes)
- **Internacionalización**: Módulos i18n nativos de Astro para Español (ES), Inglés (EN) y Alemán (DE)
- **Iconografía**: Familia SVG unificada de línea ([LineIcon.astro](src/components/ui/LineIcon.astro)) con grosor constante de `1.75px`
- **Despliegue**: [Vercel](https://vercel.com/) con integración `@astrojs/vercel`

---

## 📂 Estructura del Proyecto

```text
fabianh.me/
├── public/                 # Activos estáticos (mockups, CV en PDF, favicon, fotos)
├── src/
│   ├── components/
│   │   ├── bento/          # Tarjetas del Bento Grid (Weather, Clock, Education, Hobbies, WhoIAm)
│   │   ├── common/         # Layout general (Header con liquid glass, Footer editorial, Container)
│   │   ├── contact/        # Formulario accesible con validación y estados
│   │   ├── features/       # Componentes de soporte (ThemeToggle, LangSelector, Cards)
│   │   ├── pages/          # Vistas completas (Home App, About, Projects, Blog, Guía de Estilo)
│   │   ├── sections/       # Secciones de la landing (Hero, Projects, TimeLine, Bento, Contact)
│   │   └── ui/             # Primitivas de interfaz (Logo, LineIcon, CommandPalette, Pills)
│   ├── content/            # Colecciones de contenido MDX (artículos de blog bilingües)
│   ├── helpers/            # Sanitización de HTML y utilidades auxiliares
│   ├── i18n/               # Diccionarios de traducción (ES, EN, DE) y helpers de ruta
│   ├── layouts/            # Plantilla HTML base con SEO, Open Graph y script de tema
│   ├── pages/              # Rutas de Astro y endpoints de API (/api/sendEmail, /api/fetchWeather)
│   ├── styles/             # Tokens globales oklch, tipografía fluida y reset en global.css
│   └── types/              # Definiciones TypeScript de clima, colecciones y proyectos
├── astro.config.mjs        # Configuración de Astro, Tailwind v4, Vercel y Sitemap
└── package.json
```

---

## 🚀 Cómo Ejecutar en Local

### Requisitos previos
- Node.js 18.x o superior
- Gestor de paquetes `npm` o `pnpm`

### Instalación y ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/FabianHermar/fabianh.me.git
cd fabianh.me

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (.env)
# RESEND_API_KEY=tu_api_key
# OPENWEATHER_API_KEY=tu_api_key
# IPINFO_API_KEY=tu_api_key

# 4. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.

### Comandos disponibles
| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida. |
| `npm run build` | Ejecuta la verificación de tipos y compila la versión de producción en `./dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run format` | Da formato al código fuente según la configuración de Prettier. |

---

## 📈 Rendimiento y Accesibilidad

- **Lighthouse**: Objetivo superado con puntuaciones de **95+** en Rendimiento, Accesibilidad, Mejores Prácticas y SEO.
- **Accesibilidad**: Navegación por teclado completa, ratios de contraste verificados según normas WCAG AA, foco visible personalizado y soporte total de lectores de pantalla.
- **Movimiento**: Respeto estricto a usuarios con `prefers-reduced-motion` activado en el sistema operativo.

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

Diseñado y desarrollado por [Fabian Herrera](https://fabianh.me)

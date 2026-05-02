# Trinidad — Sitio Web Oficial

> **Un diagnóstico. Tres aristas. Ningún punto ciego.**

Trinidad es una consultora boutique de alto ticket especializada en la intersección de **Estrategia**, **Tecnología** y **Datos**. Este repositorio contiene el código fuente de su sitio web, cuyo objetivo principal es comunicar la propuesta de valor del **Diagnóstico 3/60** y operar como canal de captación para clientes B2B.

---

## Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Guía de Estilo y Branding](#guía-de-estilo-y-branding)
- [Inicio Rápido](#inicio-rápido)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación Referencial](#documentación-referencial)

---

## 💎 Propuesta de Valor (Contexto de Negocio)

El sitio debe reflejar la metodología **3/60**: 60 días de diagnóstico profundo liderados por tres perfiles C-level fraccionales:
* **CMO (Estrategia):** Narrativa, posicionamiento y funnel B2B.
* **CPO (Producto/Operaciones):** Modelo de negocio, métricas de revenue y procesos.
* **CTO (Tecnología):** Arquitectura técnica, stack de herramientas e integración de datos.

## Stack Tecnológico

El proyecto está construido con herramientas de última generación para garantizar rendimiento, escalabilidad y mantenibilidad a largo plazo.

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| Lenguaje | TypeScript | — |
| Estilos | Tailwind CSS | 4.x |
| CMS Headless | Contentful (GraphQL API) | — |
| Internacionalización | next-intl | — |
| Iconografía | Lucide React | — |

---

## Guía de Estilo y Branding

El desarrollo visual debe alinearse con el tono de una **consultora boutique europea**: sobrio, denso en contenido y sin concesiones estéticas innecesarias.

### Paleta de Colores

* **Primario:** `#1A1A1A` (Negro Trinidad) — Autoridad y sobriedad.
* **Acento:** `#C4633A` (Terracota) — Firma visual, usado en detalles y CTAs.
* **Fondo:** `#F5F0EB` (Crema) — Sofisticación sobre el blanco puro.
* **Secundario:** `#888780` (Gris medio) — Para metadatos y bordes sutiles.

### Tipografía y Logos

* **Fuentes:** Neue Haas Grotesk o **Inter** (con `letter-spacing: +0.02em`).
* **Logotipo:** Siempre en mayúsculas (caps), peso Medium y tracking amplio.
* **Variantes:** * `trinidad-logo-dark.png` (Negro sobre Crema) 
* `trinidad-logo-white.png` (Crema sobre Negro)

### Principios de UI

- Abundancia de espacio en blanco
- El texto es el protagonista visual
- Sin iconos de colores ni ilustraciones genéricas
- los logos del sitio son 2: trinidad-logo-white.png y trinidad-logo-dark.png
- 

---

## Inicio Rápido

### 1. Requisitos Previos

Asegúrate de tener instalado **Node.js 20+** y un gestor de paquetes (`npm`, `yarn` o `pnpm`).

### 2. Configuración del Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes credenciales de Contentful:

```bash
CONTENTFUL_SPACE_ID=xxxxxx
CONTENTFUL_ACCESS_TOKEN=XXXXX
CONTENTFUL_PREVIEW_TOKEN=XXXX
CONTENTFUL_ENVIRONMENT=master
```

### 3. Instalación y Desarrollo

```bash
npm install
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Estructura del Proyecto

```
/
├── src/
│   ├── app/                  # Rutas y layouts principales (App Router)
│   └── lib/
│       └── contentful/       # Clientes y funciones de fetch para la API GraphQL
├── public/                   # Recursos estáticos (logos en variantes dark/white)
└── CLAUDE.md                 # Reglas específicas para desarrollo con agentes de IA
```

---

## Documentación Referencial

Antes de implementar cualquier cambio, consultar los siguientes documentos para alinear implementación con el negocio y el copy aprobado:

| Documento | Descripción |
|---|---|
| **Referencia Canónica** | Fuente de verdad sobre el equipo (CMO, CPO, CTO) y estructura de precios |
| **Web Copy v2.0** | Textos finales para todas las secciones de la página | 
| **Branding** | Guía detallada de tono visual y tipográfico |


---

*Trinidad © 2026 — Todos los derechos reservados.*
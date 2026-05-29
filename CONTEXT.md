# CONTEXT.md


## Resumen del Proyecto

Este proyecto es un dashboard financiero integral que permite visualizar, analizar y comparar métricas clave de desempeño (KPI), ingresos, egresos y rentabilidad de una organización. Está compuesto por:

- **Backend**: API REST desarrollada en Python usando FastAPI, que genera, filtra y resume datos financieros simulados, expone múltiples endpoints para métricas, comparativas, alertas y categorías, y está preparada para pruebas automatizadas.
- **Frontend**: Aplicación React (TypeScript, Vite) que consume la API, presenta los datos en componentes visuales modernos (tarjetas KPI, gráficos de líneas, tablas) y permite una experiencia interactiva y responsiva.

---


## Estructura y Detalle de Componentes

- **backend/**
  - **Lenguaje:** Python 3.13
  - **Framework:** FastAPI
  - **Estructura:**
    - `app/main.py`: Inicializa la app FastAPI, configura CORS y monta el router principal.
    - `app/routes.py`: Define los modelos de datos (Pydantic), genera datos simulados, implementa la lógica de filtrado, agrupamiento y cálculo de métricas. Expone endpoints REST:
      - `/api/metrics`: Lista movimientos financieros, permite filtrar por fecha, categoría y tipo de operación.
      - `/api/metrics/facets`: Devuelve opciones de filtrado y rango de fechas.
      - `/api/metrics/summary`: Resumen de ingresos, egresos y neto agrupado por mes, semana o día.
      - `/api/metrics/categories/top`: Categorías principales por monto.
      - `/api/metrics/comparison`: Compara periodos y calcula variaciones absolutas y porcentuales.
      - `/api/metrics/alerts`: Detecta anomalías en egresos.
      - `/health`: Endpoint de salud.
    - `tests/`: Pruebas unitarias con pytest y httpx, cubren generación de datos, filtrado, endpoints y lógica de negocio.
    - `Dockerfile`, `requirements.txt`: Imagen lista para desarrollo y producción, dependencias mínimas y herramientas de test.

- **frontend/**
  - **Lenguaje:** TypeScript
  - **Framework:** React (Vite)
  - **Estructura:**
    - `src/`
      - `components/dashboard/`: Componentes visuales reutilizables:
        - `dashboard-header.tsx`: Cabecera con título y periodo.
        - `kpi-row.tsx` y `kpi-card.tsx`: Tarjetas de indicadores clave (ingresos, egresos, beneficio, margen).
        - `income-outcome-chart.tsx`: Gráfico de líneas de ingresos/egresos mensuales.
        - `profit-percent-chart.tsx`: Gráfico de margen de beneficio.
      - `lib/`: Lógica de negocio y utilidades:
        - `financial-types.ts`: Tipos y contratos de datos (movimientos, métricas, puntos mensuales).
        - `financial-utils.ts`: Funciones para calcular KPIs, agrupar datos, formatear moneda y porcentaje.
        - `mock-data.ts`: Datos de ejemplo para pruebas visuales.
      - `ui/`: Componentes base de UI (card, skeleton).
    - `public/`: Recursos estáticos y HTML base.
    - `Dockerfile`, `package.json`, `tsconfig*.json`, `vite.config.ts`: Configuración de build, dependencias, alias y proxy para desarrollo.
    - Pruebas listas con Vitest (`*.test.ts`).

---


## Objetivo

Proveer una plataforma robusta y visualmente atractiva para la toma de decisiones financieras, permitiendo:
- Visualizar KPIs (ingresos, egresos, beneficio, margen) en tiempo real.
- Analizar tendencias mensuales, semanales o diarias mediante gráficos.
- Detectar anomalías y comparar periodos.
- Filtrar por tipo de operación, categoría, fechas y segmento de negocio (B2B/B2C).

---


## Tecnologías Clave

- **Backend:** Python, FastAPI, Pydantic, Pytest, Docker
- **Frontend:** React, TypeScript, Vite, Recharts, TailwindCSS, ESLint, Docker

---


## Despliegue

- Uso de Docker y docker-compose para levantar ambos servicios con un solo comando (`docker compose up --build`).
- Proxy automático en desarrollo para conectar frontend y backend sin configuración adicional.
- Listo para despliegue en local, Codespaces o producción.

---


## Pruebas

- **Backend:** Pruebas unitarias exhaustivas con pytest y httpx, cubriendo generación de datos, filtrado, endpoints y lógica de negocio.
- **Frontend:** Estructura preparada para pruebas unitarias con Vitest, ejemplos de test para utilidades de KPIs y agrupamiento.

---


## Notas

- Arquitectura limpia y modular, separación clara de responsabilidades.
- Uso de tipado estricto y validación de datos en ambos extremos.
- Componentes visuales desacoplados y reutilizables.
- Listo para desarrollo local, pruebas y despliegue en producción.

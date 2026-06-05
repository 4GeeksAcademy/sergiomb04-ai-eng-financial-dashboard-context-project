---
name: financial-dashboard-playbook
description: Skill operativo para construir, refactorizar y validar cambios en este dashboard financiero React + FastAPI, respetando arquitectura modular, contratos de datos y testing por riesgo.
license: MIT
metadata:
  author: custom
  version: "1.0.0"
  project: ai-eng-financial-dashboard-context-project
---

# Financial Dashboard Playbook

Guia practica para trabajar en este repositorio con cambios seguros en frontend y backend.

## Cuando aplicar este skill

Usa este skill cuando la tarea incluya al menos uno de estos casos:
- Cambios en KPIs, graficas o calculos financieros.
- Nuevos endpoints de metricas o filtros.
- Ajustes de contratos de datos entre FastAPI y React.
- Refactors de utilidades de dominio financiero.
- Correcciones de errores en el flujo de carga de datos del dashboard.

## Contexto del proyecto

### Capas y responsabilidades
- Backend API: `backend/app/main.py` y `backend/app/routes.py`
- Tests backend: `backend/tests/test_routes.py`
- Frontend app shell: `frontend/src/App.tsx`
- Componentes de negocio dashboard: `frontend/src/components/dashboard/`
- UI base reutilizable: `frontend/src/components/ui/`
- Tipos y calculos financieros: `frontend/src/lib/financial-types.ts` y `frontend/src/lib/financial-utils.ts`
- Tests frontend de utilidades: `frontend/src/lib/financial-utils.test.ts`

### Endpoints relevantes
- `GET /health`
- `GET /api/metrics`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`
- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`

## Reglas obligatorias del repo (resumen operativo)

- Arquitectura:
  - Logica financiera fuera de componentes UI complejos.
  - Endpoints delegan calculo a funciones reutilizables.
  - `components/ui` no debe contener logica de dominio.
- Naming:
  - Simbolos y estructura tecnica en ingles.
  - Python en snake_case, componentes React en PascalCase.
- Documentacion y tipado:
  - Tipos explicitos en TypeScript y Pydantic.
  - Si cambia comportamiento de producto/API, actualizar README.es.md y README.md cuando aplique.
- Testing por riesgo:
  - Cambio funcional en backend requiere tests nuevos o actualizados.
  - Cambio en calculos frontend requiere test unitario en `financial-utils.test.ts` o tests equivalentes.
- DX:
  - Mantener alias `@` en frontend.
  - Evitar URLs hardcodeadas; usar proxy de Vite o variables de entorno.

## Flujo recomendado por tipo de tarea

### 1) Cambio en backend (endpoint, filtro, agregacion)
1. Ajustar o extraer logica pura en `backend/app/routes.py`.
2. Mantener respuestas tipadas con modelos Pydantic.
3. Verificar orden cronologico y redondeos consistentes cuando aplique.
4. Agregar/actualizar pruebas en `backend/tests/test_routes.py`.
5. Validar que el contrato siga siendo compatible con frontend.

### 2) Cambio en frontend (KPI, chart, vista)
1. Mantener presentacion en `components/dashboard` y calculo en `lib`.
2. Reusar `financial-types.ts` para props y transformaciones.
3. Preservar estados de `loading` y `error` en flujos de datos.
4. Si el calculo cambia, agregar prueba en `financial-utils.test.ts`.
5. Revisar accesibilidad basica: roles, labels y estados vacios.

### 3) Cambio de contrato backend-frontend
1. Definir primero shape de respuesta backend.
2. Actualizar tipos frontend en `financial-types.ts`.
3. Ajustar funciones de transformacion (`financial-utils.ts`) y consumo en `App.tsx`.
4. Cubrir casos borde con tests en backend y frontend.
5. Documentar impacto en README si cambia uso externo.

## Checklist de validacion rapida

Ejecutar en entorno Docker del proyecto:

```bash
docker compose up --build
```

En otra terminal, validar calidad minima:

```bash
docker compose exec frontend npm run lint
docker compose exec frontend npm run test
docker compose exec frontend npm run build
docker compose exec backend pytest
```

Si trabajas dentro de cada carpeta localmente:

```bash
cd frontend && npm run lint && npm run test && npm run build
cd ../backend && pytest
```

## Definition of Done para este dashboard

- Cambio respeta separacion por capas y no introduce logica duplicada.
- Contratos API y tipos frontend estan alineados.
- Pruebas del area afectada pasan en verde.
- Lint y build frontend sin errores.
- Documentacion actualizada cuando hay impacto funcional.

## Anti-patrones que debes evitar

- Mezclar calculo de negocio complejo dentro de JSX.
- Duplicar formulas de KPIs en varios componentes.
- Cambiar respuesta de endpoint sin actualizar tipos del frontend.
- Agregar dependencias nuevas sin necesidad clara.
- Hardcodear origen de API en frontend.

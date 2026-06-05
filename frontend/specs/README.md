# Contrato de Datos de Nuevas Funcionalidades

Este documento describe el contrato de datos para las 3 funcionalidades nuevas del dashboard financiero.

## Funcionalidad 1: Filtro de fechas y facetas

### 1) Endpoint(s) que consume
- GET /api/metrics/facets

### 2) Tipos TypeScript asociados
- Respuesta: `FacetsResponse` (definido en `frontend/specs/api-types.ts`)
- Peticion: sin parametros de entrada para este endpoint
- Tipos de UI que consumen el resultado:
  - `DateRangeFilter` (definido en `frontend/specs/param-types.ts`) para almacenar seleccion del usuario

### 3) Valores validos y restricciones de parametros
- `FacetsResponse.min_date` y `FacetsResponse.max_date` llegan como string con formato YYYY-MM-DD.
- El rango de fechas de UI debe respetar:
  - startDate >= min_date
  - endDate <= max_date
  - startDate <= endDate
- Si se aplica filtro de fechas en otras consultas, ambos extremos del rango deben ser inclusivos.

### 4) Casos edge y comportamiento exacto de UI
Caso edge A: Solo startDate informado y endDate vacio.
- UI debe mostrar mensaje inline bajo el input final: "Debes seleccionar una fecha fin para completar el rango".
- UI debe deshabilitar el boton de aplicar filtros.
- UI no debe disparar ninguna peticion de datos dependiente del rango.

Caso edge B: Solo endDate informado y startDate vacio.
- UI debe mostrar mensaje inline bajo el input inicial: "Debes seleccionar una fecha inicio para completar el rango".
- UI debe deshabilitar el boton de aplicar filtros.
- UI no debe disparar ninguna peticion de datos dependiente del rango.

Caso edge C: startDate fuera del rango permitido por facets.
- UI debe mostrar mensaje: "La fecha seleccionada esta fuera del rango disponible".
- UI debe mantener visible el valor escrito para correccion manual.
- UI debe bloquear aplicar hasta que el valor sea valido.

Caso edge D: startDate > endDate.
- UI debe mostrar mensaje: "La fecha inicial no puede ser mayor que la fecha final".
- UI debe bloquear aplicar filtros.

## Funcionalidad 2: Tabla de alertas de anomalias

### 1) Endpoint(s) que consume
- GET /api/metrics/alerts

### 2) Tipos TypeScript asociados
- Peticion: `AlertsParams` (definido en `frontend/specs/param-types.ts`)
- Respuesta: `AlertsResponse` y `AlertEntry` (definidos en `frontend/specs/api-types.ts`)

### 3) Valores validos y restricciones de parametros
- `threshold`:
  - Tipo: number
  - Rango de negocio definido para UI: 0.01 a 1.0
  - Valor por defecto recomendado: 0.3
- `startDate` y `endDate`:
  - Formato: YYYY-MM-DD
  - Deben enviarse juntos cuando hay filtro de rango
- Mapeo de nombres recomendado al enviar query params:
  - `startDate` -> `start_date`
  - `endDate` -> `end_date`

### 4) Casos edge y comportamiento exacto de UI
Caso edge A: Respuesta vacia del endpoint (`[]`).
- UI debe renderizar estado vacio explicito de tabla con mensaje: "No se detectaron anomalias para los filtros seleccionados".
- UI debe mantener visible el encabezado de la tarjeta y los filtros activos.
- UI no debe inventar filas ni mostrar ceros simulados.

Caso edge B: threshold por debajo de 0.01 o por encima de 1.0.
- UI debe marcar el campo con error de validacion y mensaje: "El umbral debe estar entre 0.01 y 1.0".
- UI debe bloquear la accion de consulta hasta corregir el valor.

Caso edge C: Error de red o backend.
- UI debe mostrar estado de error con mensaje accionable: "No fue posible cargar las alertas. Intenta nuevamente".
- UI debe renderizar boton de reintento.

Caso edge D: increase_ratio alto (por ejemplo >= 1.0).
- UI debe resaltar la fila como severidad alta.
- UI debe mostrar el ratio en porcentaje legible (ejemplo 1.25 -> 125%).

## Funcionalidad 3: Comparativa top-5 categorias B2B vs B2C

### 1) Endpoint(s) que consume
- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B
- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C

### 2) Tipos TypeScript asociados
- Peticion base: `TopCategoriesParams` (definido en `frontend/specs/param-types.ts`)
- Respuesta por panel: `TopCategoriesResponse` y `CategoryEntry` (definidos en `frontend/specs/api-types.ts`)
- Parametro adicional requerido por endpoint para la comparativa:
  - `business_type`: 'B2B' | 'B2C'

### 3) Valores validos y restricciones de parametros
- `operation_type`: debe ser `income` para esta funcionalidad.
- `limit`:
  - Tipo: number entero positivo
  - Valor objetivo de producto: 5
  - Restriccion del backend: entre 1 y 20
- `business_type`:
  - B2B para panel izquierdo (o superior en mobile)
  - B2C para panel derecho (o inferior en mobile)
- `startDate` y `endDate`:
  - Formato YYYY-MM-DD
  - Si se usan, deben mapearse a `start_date` y `end_date`

### 4) Casos edge y comportamiento exacto de UI
Caso edge A: Lista vacia en panel B2B y lista con datos en panel B2C.
- Panel B2B debe mostrar estado vacio explicito: "Sin datos de categorias para B2B en el rango seleccionado".
- Panel B2C debe mostrar su ranking normalmente.
- UI debe mantener ambos paneles visibles para preservar contexto comparativo.

Caso edge B: Lista vacia en panel B2C y lista con datos en panel B2B.
- Panel B2C debe mostrar estado vacio explicito: "Sin datos de categorias para B2C en el rango seleccionado".
- Panel B2B debe mostrar su ranking normalmente.
- UI debe mantener ambos paneles visibles para preservar contexto comparativo.

Caso edge C: Ambas listas vacias.
- UI debe mostrar estado vacio en ambos paneles, cada uno con su mensaje por segmento.
- UI debe evitar graficos vacios sin contexto.
- UI debe conservar filtros visibles para facilitar correccion del rango.

Caso edge D: limit fuera de rango backend (por ejemplo 0 o 50).
- UI debe validar antes de enviar y corregir automaticamente al limite permitido.
- Comportamiento recomendado:
  - Si limit < 1, usar 1.
  - Si limit > 20, usar 20.
- Si el caso de uso es top-5, UI debe forzar 5 por defecto.

## Resumen de mapeo de nombres (UI -> API)
- startDate -> start_date
- endDate -> end_date
- threshold -> threshold
- operation_type -> operation_type
- limit -> limit
- business_type -> business_type

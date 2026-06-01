# Especificacion de Componentes

## Funcionalidad 1: Filtros de rango de fechas y facets

### Nombre del componente
DateRangeFacetsFilter

### Props
```ts
import type { FacetsResponse } from './api-types'
import type { DateRangeFilter } from './param-types'

export interface DateRangeFacetsFilterProps {
  facets: FacetsResponse
  value: DateRangeFilter
  isLoading: boolean
  isDisabled: boolean
  onChange: (next: DateRangeFilter) => void
  onApply: (next: DateRangeFilter) => void
  onClear: () => void
}
```

### Lógica de renderizado condicional
1. Si isLoading es true, se muestran skeletons para ambos inputs de fecha y se deshabilita cualquier accion de aplicar filtros.
2. Si isDisabled es true, los inputs se renderizan deshabilitados y el boton de aplicar queda inactivo.
3. Si solo startDate esta relleno y endDate esta vacio, se debe mostrar un mensaje de validacion inline: "Selecciona una fecha final para completar el rango" y no se ejecuta onApply.
4. Si solo endDate esta relleno y startDate esta vacio, se debe mostrar un mensaje de validacion inline: "Selecciona una fecha inicial para completar el rango" y no se ejecuta onApply.
5. Si startDate y endDate existen pero startDate > endDate, se muestra error de rango invalido: "La fecha inicial no puede ser mayor que la fecha final" y no se ejecuta onApply.
6. Si el rango esta completo y valido, se habilita la accion de aplicar y se dispara onApply con ambos valores.
7. Si el usuario intenta escribir una fecha fuera de facets.min_date y facets.max_date, se mantiene el valor visual pero se muestra advertencia: "La fecha debe estar dentro del rango disponible".

## Funcionalidad 2: Tabla de anomalias de egresos

### Nombre del componente
OutcomeAlertsTable

### Props
```ts
import type { AlertEntry, AlertsResponse } from './api-types'
import type { AlertsParams } from './param-types'

export interface OutcomeAlertsTableProps {
  params: AlertsParams
  rows: AlertsResponse
  isLoading: boolean
  errorMessage: string | null
  onThresholdChange: (threshold: number) => void
  onRetry: () => void
  rowKey?: (row: AlertEntry) => string
}
```

### Lógica de renderizado condicional
1. Si isLoading es true, se renderiza el estado de carga de tabla con cabecera visible y filas placeholder.
2. Si errorMessage no es null, se renderiza un bloque de error con el texto recibido y un boton "Reintentar" que ejecuta onRetry.
3. Si rows.length es 0, se renderiza un estado vacio explicito en el cuerpo de la tabla con el mensaje: "No se detectaron anomalías para el rango y umbral seleccionados".
4. Si rows.length es 0, adicionalmente se muestra una recomendacion secundaria: "Prueba reduciendo el threshold o ampliando el rango de fechas".
5. Si rows.length es mayor que 0, se renderizan filas con period, outcome_total, baseline_average e increase_ratio formateado en porcentaje.
6. Si increase_ratio es mayor o igual a 1.0 en una fila, se renderiza badge de severidad alta con etiqueta "Crítica".
7. Si increase_ratio es menor a 1.0 y mayor al threshold activo, se renderiza badge "Moderada".

## Funcionalidad 3: Comparativa top-5 categorias B2B vs B2C

### Nombre del componente
TopCategoriesComparisonPanels

### Props
```ts
import type { TopCategoriesResponse } from './api-types'
import type { TopCategoriesParams } from './param-types'

export interface TopCategoriesComparisonPanelsProps {
  params: TopCategoriesParams
  b2bTopCategories: TopCategoriesResponse
  b2cTopCategories: TopCategoriesResponse
  isLoadingB2B: boolean
  isLoadingB2C: boolean
  errorB2B: string | null
  errorB2C: string | null
  onRetryB2B: () => void
  onRetryB2C: () => void
}
```

### Lógica de renderizado condicional
1. El componente siempre renderiza dos paneles lado a lado en desktop y apilados en mobile: panel B2B y panel B2C.
2. Si isLoadingB2B es true, el panel B2B muestra skeleton de lista top-5 y no muestra datos reales.
3. Si isLoadingB2C es true, el panel B2C muestra skeleton de lista top-5 y no muestra datos reales.
4. Si errorB2B no es null, el panel B2B muestra bloque de error con boton "Reintentar" que llama onRetryB2B.
5. Si errorB2C no es null, el panel B2C muestra bloque de error con boton "Reintentar" que llama onRetryB2C.
6. Si b2bTopCategories.length es 0, el panel B2B renderiza estado vacio explicito: "B2B sin categorías top en el periodo seleccionado" y no renderiza barras ni ranking.
7. Si b2cTopCategories.length es 0, el panel B2C renderiza estado vacio explicito: "B2C sin categorías top en el periodo seleccionado" y no renderiza barras ni ranking.
8. Si ambos arreglos tienen datos, cada panel renderiza su ranking top-5 independiente con categoria y total_amount.
9. Si un panel tiene datos y el otro esta vacio, se mantiene la altura visual equivalente para evitar saltos de layout entre paneles.

## Reglas de consistencia entre funcionalidades
1. Todos los estados vacios deben mantener encabezado y contexto de filtro visible para evitar perdida de orientacion del usuario.
2. Ninguna accion de consulta debe ejecutarse con rango de fechas parcialmente informado.
3. Los mensajes de validacion y error deben ser especificos, accionables y consistentes en tono.
# Especificacion de Componentes UI

## Funcionalidad 1: Filtros de fechas y facetas

Nombre del componente: `MetricsFiltersPanel`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| facets | `FacetsResponse` | Si | Datos de facetas para construir opciones validas de filtros y limites de fecha. |
| value | `DateRangeFilter` | Si | Estado actual del rango de fechas ingresado por la persona usuaria. |
| isLoading | `boolean` | Si | Indica si se esta cargando informacion de facetas. |
| isDisabled | `boolean` | No | Deshabilita controles cuando existe una operacion bloqueante. |
| onChange | `(nextValue: DateRangeFilter) => void` | Si | Callback al cambiar fecha inicial o final. |
| onApply | `(nextValue: DateRangeFilter) => void` | Si | Callback para confirmar y ejecutar la consulta con los filtros. |
| onClear | `() => void` | Si | Callback para limpiar filtros y volver al estado por defecto. |

Lógica de renderizado condicional detallada:

- Si `isLoading` es `true`, se renderiza estado de carga del panel de filtros y no se habilita accion de aplicar.
- Si solo `startDate` esta relleno y `endDate` esta vacio:
  - Se muestra mensaje de validacion visible bajo el input final: "Debes seleccionar una fecha fin para completar el rango".
  - El boton "Aplicar" queda deshabilitado.
  - No se dispara `onApply` automaticamente.
- Si solo `endDate` esta relleno y `startDate` esta vacio:
  - Se muestra mensaje de validacion visible bajo el input inicial: "Debes seleccionar una fecha inicio para completar el rango".
  - El boton "Aplicar" queda deshabilitado.
  - No se dispara `onApply` automaticamente.
- Si ambas fechas estan rellenas pero fuera del rango de `facets.min_date` y `facets.max_date`, se muestra error de rango y se deshabilita "Aplicar".
- Si ambas fechas estan rellenas y son validas, se habilita "Aplicar" y el panel permite ejecutar `onApply(value)`.
- Si no hay fechas (`startDate` y `endDate` indefinidas), se interpreta como consulta sin rango y se permite aplicar.

## Funcionalidad 2: Tabla de alertas de anomalias

Nombre del componente: `AlertsTableCard`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| params | `AlertsParams` | Si | Parametros activos de consulta para alertas. |
| rows | `AlertsResponse` | Si | Filas de anomalias a renderizar en la tabla. |
| isLoading | `boolean` | Si | Estado de carga de la peticion de alertas. |
| isError | `boolean` | Si | Indica si hubo error al consultar alertas. |
| errorMessage | `string | null` | Si | Mensaje de error para estado fallido. |
| onRetry | `() => void` | Si | Reintenta carga tras error de red o servidor. |

Lógica de renderizado condicional detallada:

- Si `isLoading` es `true`, se renderiza skeleton de tabla con cabecera y filas de placeholder.
- Si `isError` es `true`, se renderiza bloque de error con `errorMessage` y accion `onRetry`.
- Si `isLoading` es `false`, `isError` es `false` y `rows.length > 0`:
  - Se renderiza tabla con columnas: `period`, `outcome_total`, `baseline_average`, `increase_ratio`.
  - `increase_ratio` se muestra como porcentaje legible (ejemplo: `0.35` como `35%`).
- Estado vacio explicito (requerido):
  - Si `isLoading` es `false`, `isError` es `false` y `rows.length === 0`, se renderiza vista vacia con texto exacto recomendado: "No se detectaron anomalias para los filtros seleccionados".
  - En estado vacio no se renderizan filas, no se muestran valores `0` artificiales y no se oculta el encabezado contextual de la tarjeta.

## Funcionalidad 3: Comparativa top-5 categorias B2B vs B2C

Nombre del componente: `TopCategoriesComparisonPanels`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| b2bTitle | `string` | Si | Titulo del panel B2B. |
| b2cTitle | `string` | Si | Titulo del panel B2C. |
| b2bItems | `TopCategoriesResponse` | Si | Lista top categorias para segmento B2B. |
| b2cItems | `TopCategoriesResponse` | Si | Lista top categorias para segmento B2C. |
| params | `TopCategoriesParams` | Si | Parametros comunes de consulta (`operation_type: 'income'`, `limit`). |
| isLoadingB2B | `boolean` | Si | Estado de carga del panel B2B. |
| isLoadingB2C | `boolean` | Si | Estado de carga del panel B2C. |
| isErrorB2B | `boolean` | Si | Error de carga del panel B2B. |
| isErrorB2C | `boolean` | Si | Error de carga del panel B2C. |
| onRetryB2B | `() => void` | Si | Reintento para panel B2B. |
| onRetryB2C | `() => void` | Si | Reintento para panel B2C. |

Lógica de renderizado condicional detallada:

- El componente renderiza siempre dos paneles independientes: uno para B2B y otro para B2C.
- Cada panel evalua su estado de forma aislada para evitar bloquear la comparativa completa por fallo parcial.
- Panel B2B:
  - Si `isLoadingB2B` es `true`, renderiza skeleton de ranking.
  - Si `isErrorB2B` es `true`, renderiza estado de error con boton de reintento `onRetryB2B`.
  - Si no hay error ni carga y `b2bItems.length > 0`, renderiza listado top-N (esperado top-5).
  - Si no hay error ni carga y `b2bItems.length === 0`, renderiza estado vacio del panel B2B con texto recomendado: "Sin datos de categorias para B2B en el rango seleccionado".
- Panel B2C:
  - Si `isLoadingB2C` es `true`, renderiza skeleton de ranking.
  - Si `isErrorB2C` es `true`, renderiza estado de error con boton de reintento `onRetryB2C`.
  - Si no hay error ni carga y `b2cItems.length > 0`, renderiza listado top-N (esperado top-5).
  - Si no hay error ni carga y `b2cItems.length === 0`, renderiza estado vacio del panel B2C con texto recomendado: "Sin datos de categorias para B2C en el rango seleccionado".
- Cuando ambos paneles tienen datos, se muestran ambos rankings en paralelo para comparacion visual directa.
- Cuando uno tiene datos y el otro esta vacio, se conserva layout de dos columnas para mantener contexto comparativo.

## Referencias de tipos

- `FacetsResponse`: definido en `frontend/specs/api-types.ts`.
- `AlertsResponse`: definido en `frontend/specs/api-types.ts`.
- `TopCategoriesResponse`: definido en `frontend/specs/api-types.ts`.
- `DateRangeFilter`: definido en `frontend/specs/param-types.ts`.
- `AlertsParams`: definido en `frontend/specs/param-types.ts`.
- `TopCategoriesParams`: definido en `frontend/specs/param-types.ts`.

# Especificacion de Componentes UI

## Funcionalidad 1: Filtro de fechas y facetas

Nombre del componente: `MetricsFiltersPanel`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| facets | `FacetsResponse` | Si | Datos de facetas para opciones validas y limites de fecha. |
| value | `DateRangeFilter` | Si | Estado actual del rango de fechas en UI. |
| isLoading | `boolean` | Si | Indica si se estan cargando facetas. |
| isDisabled | `boolean` | No | Deshabilita controles por estado externo. |
| onChange | `(nextValue: DateRangeFilter) => void` | Si | Notifica cambios en fechas. |
| onApply | `(nextValue: DateRangeFilter) => void` | Si | Ejecuta consulta con filtros actuales. |
| onClear | `() => void` | Si | Limpia filtros al estado por defecto. |

Logica de renderizado condicional detallada:

1. Si `isLoading` es `true`, se renderiza estado de carga y no se habilita aplicar.
2. Si solo `startDate` esta relleno y `endDate` esta vacio:
   - Se muestra mensaje: "Debes seleccionar una fecha fin para completar el rango".
   - El boton "Aplicar" queda deshabilitado.
   - No se ejecuta `onApply`.
3. Si solo `endDate` esta relleno y `startDate` esta vacio:
   - Se muestra mensaje: "Debes seleccionar una fecha inicio para completar el rango".
   - El boton "Aplicar" queda deshabilitado.
   - No se ejecuta `onApply`.
4. Si ambas fechas existen y `startDate > endDate`, se muestra error de rango invalido y no se habilita aplicar.
5. Si ambas fechas son validas y estan en rango (`facets.min_date` a `facets.max_date`), se habilita aplicar.
6. Si ambas fechas estan vacias, el componente permite consulta sin filtro de fechas.

## Funcionalidad 2: Tabla de alertas de anomalias

Nombre del componente: `AlertsTableCard`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| params | `AlertsParams` | Si | Parametros activos usados para la consulta. |
| rows | `AlertsResponse` | Si | Filas de anomalias devueltas por API. |
| isLoading | `boolean` | Si | Estado de carga de datos de alertas. |
| isError | `boolean` | Si | Bandera de error de consulta. |
| errorMessage | `string \| null` | Si | Mensaje de error a mostrar en UI. |
| onRetry | `() => void` | Si | Reintenta la consulta en caso de error. |

Logica de renderizado condicional detallada:

1. Si `isLoading` es `true`, se renderiza skeleton de tabla.
2. Si `isError` es `true`, se renderiza bloque de error con `errorMessage` y accion `onRetry`.
3. Si no hay carga ni error y `rows.length > 0`, se renderiza tabla con columnas `period`, `outcome_total`, `baseline_average`, `increase_ratio`.
4. Estado vacio explicito requerido:
   - Si no hay carga ni error y `rows.length === 0`, se renderiza estado vacio con texto: "No se detectaron anomalias para los filtros seleccionados".
   - En este estado no se muestran filas artificiales ni valores `0` inventados.
   - Se mantiene visible el encabezado contextual del componente.

## Funcionalidad 3: Comparativa top-5 B2B vs B2C

Nombre del componente: `TopCategoriesComparisonPanels`

Props que recibe:

| Prop | Tipo | Requerido | Descripcion |
|---|---|---|---|
| b2bTitle | `string` | Si | Titulo del panel B2B. |
| b2cTitle | `string` | Si | Titulo del panel B2C. |
| b2bItems | `TopCategoriesResponse` | Si | Lista top categorias para B2B. |
| b2cItems | `TopCategoriesResponse` | Si | Lista top categorias para B2C. |
| params | `TopCategoriesParams` | Si | Parametros comunes (`operation_type: 'income'`, `limit`). |
| isLoadingB2B | `boolean` | Si | Carga del panel B2B. |
| isLoadingB2C | `boolean` | Si | Carga del panel B2C. |
| isErrorB2B | `boolean` | Si | Error del panel B2B. |
| isErrorB2C | `boolean` | Si | Error del panel B2C. |
| onRetryB2B | `() => void` | Si | Reintento de carga para B2B. |
| onRetryB2C | `() => void` | Si | Reintento de carga para B2C. |

Logica de renderizado condicional detallada:

1. El componente renderiza dos paneles independientes: B2B y B2C.
2. Panel B2B:
   - Si `isLoadingB2B` es `true`, renderiza skeleton de ranking.
   - Si `isErrorB2B` es `true`, renderiza estado de error con `onRetryB2B`.
   - Si no hay error ni carga y `b2bItems.length > 0`, renderiza top-5.
   - Si no hay error ni carga y `b2bItems.length === 0`, renderiza estado vacio: "Sin datos de categorias para B2B en el rango seleccionado".
3. Panel B2C:
   - Si `isLoadingB2C` es `true`, renderiza skeleton de ranking.
   - Si `isErrorB2C` es `true`, renderiza estado de error con `onRetryB2C`.
   - Si no hay error ni carga y `b2cItems.length > 0`, renderiza top-5.
   - Si no hay error ni carga y `b2cItems.length === 0`, renderiza estado vacio: "Sin datos de categorias para B2C en el rango seleccionado".
4. Si un panel tiene datos y el otro esta vacio, se mantiene el layout comparativo de ambos paneles para preservar contexto.
5. Si ambos paneles tienen datos, se muestran ambos rankings en paralelo para comparacion directa.

## Referencias de tipos

- `FacetsResponse`: definido en `frontend/specs/api-types.ts`.
- `AlertsResponse`: definido en `frontend/specs/api-types.ts`.
- `TopCategoriesResponse`: definido en `frontend/specs/api-types.ts`.
- `DateRangeFilter`: definido en `frontend/specs/param-types.ts`.
- `AlertsParams`: definido en `frontend/specs/param-types.ts`.
- `TopCategoriesParams`: definido en `frontend/specs/param-types.ts`.

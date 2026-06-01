/**
 * Tipo de operacion financiera permitido por la API.
 * - "income": ingreso de dinero.
 * - "outcome": egreso o gasto de dinero.
 */
export type OperationType = 'income' | 'outcome'

/**
 * Categoria de movimiento financiero permitida por la API.
 */
export type Category = 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'

/**
 * Segmento de negocio permitido por la API.
 * - "B2B": operaciones entre empresas.
 * - "B2C": operaciones con consumidor final.
 */
export type BusinessType = 'B2B' | 'B2C'

/**
 * Respuesta de GET /api/metrics/facets.
 * Incluye el rango de fechas disponible y los valores de filtros aplicables.
 */
export interface FacetsResponse {
  /**
   * Tipos de operacion disponibles para filtrar metricas.
   * Valores validos: "income" y/o "outcome".
   */
  operation_types: OperationType[]

  /**
   * Segmentos de negocio disponibles para filtrar.
   * Valores validos: "B2B" y/o "B2C".
   */
  business_types: BusinessType[]

  /**
   * Categorias disponibles en el dataset de movimientos.
   * Valores validos: "suppliers", "sales", "operational", "administrative", "others".
   */
  categories: Category[]

  /**
   * Fecha minima disponible para consulta.
   * Formato: "YYYY-MM-DD" (ISO 8601 date-only).
   */
  min_date: string

  /**
   * Fecha maxima disponible para consulta.
   * Formato: "YYYY-MM-DD" (ISO 8601 date-only).
   */
  max_date: string
}

/**
 * Registro individual de anomalia detectada en egresos.
 * Proviene del endpoint GET /api/metrics/alerts.
 */
export interface AlertEntry {
  /**
   * Periodo analizado.
   * Formato segun el group_by solicitado:
   * - "month": "YYYY-MM"
   * - "week": "YYYY-Www"
   * - "day": "YYYY-MM-DD"
   */
  period: string

  /**
   * Total de egresos del periodo actual.
   * Unidad: moneda del sistema. Valor decimal mayor o igual a 0.
   */
  outcome_total: number

  /**
   * Promedio historico de egresos utilizado como baseline.
   * Unidad: moneda del sistema. Valor decimal mayor o igual a 0.
   */
  baseline_average: number

  /**
   * Ratio de incremento respecto al baseline.
   * Ejemplo: 0.25 representa un aumento de 25%.
   * Se espera que sea mayor al threshold utilizado en la consulta.
   */
  increase_ratio: number
}

/**
 * Respuesta de GET /api/metrics/alerts.
 * La API retorna un arreglo de anomalías que puede venir vacio.
 */
export interface AlertsResponse extends Array<AlertEntry> {}

/**
 * Registro individual de categoria agregada por monto total.
 * Proviene del endpoint GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
  /**
   * Categoria financiera del registro agregado.
   * Valores validos: "suppliers", "sales", "operational", "administrative", "others".
   */
  category: Category

  /**
   * Tipo de operacion asociado a la agregacion.
   * Valores validos: "income" o "outcome".
   */
  operation_type: OperationType

  /**
   * Monto total acumulado para la categoria en el rango de consulta.
   * Unidad: moneda del sistema. Valor decimal mayor o igual a 0.
   */
  total_amount: number
}

/**
 * Respuesta de GET /api/metrics/categories/top.
 * Para la comparativa B2B vs B2C normalmente se consumen dos respuestas,
 * una por cada valor de business_type.
 */
export interface TopCategoriesResponse extends Array<CategoryEntry> {}

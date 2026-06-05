/**
 * Filtro reutilizable de rango de fechas para consultas del dashboard.
 */
export interface DateRangeFilter {
  /**
   * Fecha inicial inclusiva (formato: YYYY-MM-DD).
   * Si no se envia, no hay limite inferior.
   */
  startDate?: string

  /**
   * Fecha final inclusiva (formato: YYYY-MM-DD).
   * Si no se envia, no hay limite superior.
   */
  endDate?: string
}

/**
 * Parametros de consulta para la funcionalidad de anomalias
 * (endpoint: GET /api/metrics/alerts).
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Umbral de incremento para alertas.
   * Rango: 0.01 a 1.0. Default: 0.3.
   */
  threshold: number
}

/**
 * Parametros de consulta para la comparativa top categorias B2B vs B2C
 * (endpoint: GET /api/metrics/categories/top).
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Tipo de operacion (solo 'income').
   */
  operation_type: 'income'

  /**
   * Maximo de categorias a retornar (entero positivo).
   */
  limit: number
}

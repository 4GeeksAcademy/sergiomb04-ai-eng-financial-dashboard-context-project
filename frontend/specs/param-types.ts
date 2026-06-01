/**
 * Filtro reutilizable de rango de fechas para consultas del dashboard.
 */
export interface DateRangeFilter {
  /**
   * Fecha inicial inclusiva del filtro.
   * Formato: 'YYYY-MM-DD' (ISO 8601 date-only).
   *
   * Si no se envia, la API no aplica limite inferior por fecha.
   */
  startDate?: string

  /**
   * Fecha final inclusiva del filtro.
   * Formato: 'YYYY-MM-DD' (ISO 8601 date-only).
   *
   * Si no se envia, la API no aplica limite superior por fecha.
   */
  endDate?: string
}

/**
 * Parametros de consulta para la funcionalidad de anomalias
 * (endpoint: GET /api/metrics/alerts).
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Umbral de incremento para disparar una alerta.
   *
   * Reglas de negocio para esta especificacion:
   * - Tipo: number.
   * - Rango valido: 0.01 a 1.0.
   * - Valor por defecto: 0.3.
   *
   * Ejemplo: 0.3 equivale a un aumento del 30% sobre el baseline.
   */
  threshold: number
}

/**
 * Parametros de consulta para la comparativa top categorias B2B vs B2C
 * (endpoint: GET /api/metrics/categories/top).
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Tipo de operacion a consultar.
   * Para esta funcionalidad, el valor valido es unicamente 'income'.
   */
  operation_type: 'income'

  /**
   * Numero maximo de categorias a retornar.
   * Debe ser un entero positivo (ejemplo habitual para UI: 5).
   */
  limit: number
}

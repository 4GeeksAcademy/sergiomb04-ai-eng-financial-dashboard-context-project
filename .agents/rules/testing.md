# Regla: Testing por Riesgo y Cobertura de Comportamiento

## Alcance
Backend y frontend, con foco mínimo obligatorio en backend.

## Objetivo
Prevenir regresiones funcionales, validar reglas de negocio financieras y mantener confianza en refactorizaciones.

## Criterios obligatorios
- Todo cambio en lógica de negocio del backend debe incluir o actualizar pruebas.
- Todo endpoint nuevo o modificado debe tener cobertura de caso feliz y casos de filtro clave.
- Cambios en utilidades financieras del frontend deben incluir pruebas unitarias.
- Pruebas deben ser deterministas (sin aleatoriedad no controlada).

## Prioridades de prueba
### Backend
- Lógica de filtrado por fecha, categoría, tipo de operación y business type.
- Cálculos de summary, comparación y alertas.
- Contratos básicos de respuesta de endpoints críticos.

### Frontend
- Utilidades de cálculo y formateo.
- Transformaciones de datos para gráficas y KPIs.
- Estados de error/carga en flujos de datos críticos (cuando aplique).

## Anti-patrones a evitar
- Pruebas frágiles que dependen de orden no definido.
- Pruebas que validan implementación interna en vez de comportamiento observable.
- Merge de cambios funcionales sin actualizar tests afectados.

## Lista de tareas para aplicar esta regla
- Identificar riesgo del cambio (alto/medio/bajo) antes de escribir pruebas.
- Agregar pruebas para comportamiento nuevo y regresiones esperables.
- Ejecutar suite de backend para cambios API o de negocio.
- Ejecutar pruebas de frontend al modificar utilidades o contratos de datos.
- Revisar nombres de tests para que expresen claramente el comportamiento validado.

## Definition of Done
- Cobertura adecuada al riesgo del cambio.
- Pruebas del área afectada en verde.
- Escenarios críticos de negocio validados explícitamente.

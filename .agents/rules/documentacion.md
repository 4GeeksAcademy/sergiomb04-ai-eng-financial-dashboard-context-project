# Regla: Documentación Viva y Tipado Explícito

## Alcance
Todo el proyecto.

## Objetivo
Reducir fricción de onboarding, mejorar mantenibilidad y disminuir errores por ambigüedad funcional o de tipos.

## Criterios obligatorios
- Todo cambio funcional relevante debe reflejarse en documentación.
- Mantener README en español e inglés sincronizados en estructura y contenido crítico.
- Tipos explícitos en TypeScript para datos de dominio, props y retornos de funciones relevantes.
- Modelos y respuestas del backend deben estar tipados con Pydantic y anotaciones Python.

## Qué documentar en cada cambio
- Qué se cambió.
- Por qué se cambió.
- Cómo usarlo (endpoint, script, configuración o flujo UI).
- Impacto en contratos de datos.

## Anti-patrones a evitar
- Cambios de API sin actualizar documentación.
- Tipos implícitos en utilidades financieras o estructuras de respuesta.
- README que no coincide con la ejecución real del proyecto.

## Lista de tareas para aplicar esta regla
- Revisar si el cambio altera uso de endpoints, filtros o scripts.
- Actualizar README.es.md y README.md cuando el impacto sea de producto o setup.
- Verificar que nuevas estructuras estén tipadas en backend y frontend.
- Agregar notas de migración cuando se modifiquen contratos existentes.
- Confirmar ejemplos de uso con comandos que realmente funcionen.

## Definition of Done
- Documentación alineada con el comportamiento actual.
- Tipado explícito en nuevas piezas de código.
- Sin discrepancias entre contrato backend y tipos frontend.

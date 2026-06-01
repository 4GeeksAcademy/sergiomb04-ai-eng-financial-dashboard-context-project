Actúa como un Ingeniero de Software Senior y Arquitecto Frontend. Tu objetivo es generar la especificación técnica completa para tres nuevas funcionalidades de un Dashboard Financiero, basándote estrictamente en las reglas del negocio provistas. 

No debes escribir código de componentes React ni lógica de backend, solo los entregables de especificación en la carpeta `frontend/specs/`.

Por favor, genera y escribe de forma íntegra los siguientes 3 archivos respetando el TypeScript estricto, sin resumir ni usar marcadores de posición (como "// ... resto del código").

---

### frontend/specs/api-types.ts
Genera las interfaces TypeScript para las respuestas de la API. Requisitos:
1. TypeScript estricto (SIN 'any', SIN 'object').
2. Añade comentarios JSDoc detallados a cada propiedad explicando su significado, formato y valores válidos.
3. Incluye:
   - `FacetsResponse`: Para rangos de fechas (min/max) y categorías.
   - `AlertEntry` y `AlertsResponse`: Para la tabla de anomalías.
   - `CategoryEntry` y `TopCategoriesResponse`: Para la comparativa B2B vs B2C.

---

### frontend/specs/param-types.ts
Genera los tipos TypeScript para los parámetros de consulta de las peticiones. Requisitos:
1. TypeScript estricto y comentarios JSDoc.
2. `DateRangeFilter`: Propiedades opcionales `startDate?` y `endDate?` como string con formato 'YYYY-MM-DD'.
3. `AlertsParams`: Debe extender o incluir `DateRangeFilter` e incorporar `threshold` (number, ratio de 0.01 a 1.0, por defecto 0.3).
4. `TopCategoriesParams`: Debe extender o incluir `DateRangeFilter` e incorporar `operation_type: 'income'` y `limit: number`.

---

### frontend/specs/components.md
Crea el desglose de componentes en Markdown. Para cada una de las 3 funcionalidades debe incluir de forma explícita:
- Nombre del componente.
- Props que recibe con sus tipos correspondientes.
- Lógica de renderizado condicional detallada:
  * Funcionalidad 1: Qué pasa si solo un input de fecha está relleno.
  * Funcionalidad 2: Estado vacío explícito de la tabla de alertas si no hay anomalías.
  * Funcionalidad 3: Qué se renderiza en cada panel (B2B y B2C) si su lista top-5 está vacía.

---

### frontend/specs/README.md
Crea la documentación del contrato de datos. Para cada una de las 3 funcionalidades incluye de forma estructurada:
1. Endpoint(s) exacto(s) que consume (según el enunciado del problema).
2. Tipos de TypeScript asociados (petición y respuesta).
3. Valores válidos y restricciones de parámetros.
4. Al menos 2 casos edge (casos límite) detallados por funcionalidad y qué debe mostrar exactamente la UI en cada caso para evitar errores de experiencia de usuario.

Procede a generar el contenido de estos archivos estructurándolos claramente.
# Set de Reglas: Buenas y Malas Prácticas del Proyecto

## Arquitectura

### Buenas Prácticas
- Separación clara entre backend y frontend.
- Uso de FastAPI para backend y React con Vite para frontend.
- Uso de Docker y docker-compose para despliegue y desarrollo local.
- Modularización de componentes en frontend (dashboard, ui, lib).
- Uso de Pydantic para validación de datos en backend.

### Malas Prácticas / Riesgos
1. CORS abierto a todos los orígenes (`allow_origins=["*"]`), riesgo de seguridad.
2. No hay autenticación ni autorización implementada en la API.

---

## Naming

### Buenas Prácticas
- Uso consistente de nombres en inglés para variables, funciones y componentes.
- Componentes y utilidades con nombres descriptivos (ej: `DashboardHeader`, `computeKPIs`).
- Uso de PascalCase para componentes y camelCase para funciones/variables.

### Malas Prácticas / Riesgos
1. Algunos nombres de carpetas y archivos están en español y otros en inglés (ej: `documentacion`).
2. Inconsistencia potencial en el uso de mayúsculas/minúsculas en nombres de archivos.

---

## Testing

### Buenas Prácticas
- Presencia de pruebas unitarias en backend (`tests/`).
- Uso de pytest para pruebas en Python.
- Separación de archivos de test (`*.test.ts`) en frontend.

### Malas Prácticas / Riesgos
1. No se detectan pruebas automatizadas en el frontend (solo estructura preparada).
2. No hay cobertura de pruebas reportada ni integración continua para tests.

---

## Documentación

### Buenas Prácticas
- Archivos README en español e inglés.
- Comentarios descriptivos en el código.
- Uso de tipado explícito en TypeScript y Python.

### Malas Prácticas / Riesgos
1. Falta de docstrings en funciones y clases Python.
2. Poca documentación en componentes de React.

---

## Developer Experience (DX)

### Buenas Prácticas
- Uso de ESLint y configuración de TypeScript para calidad de código.
- Separación de lógica y presentación en componentes.
- Uso de variables de entorno para configuración.
- Estructura de carpetas clara y modular.

### Malas Prácticas / Riesgos
1. Manejo de errores genérico en frontend (mensaje único para cualquier error de fetch).
2. No hay scripts de automatización para desarrollo o despliegue rápido.

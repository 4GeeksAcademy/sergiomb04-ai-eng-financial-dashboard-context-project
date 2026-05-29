# Regla: Arquitectura Modular y Límites de Responsabilidad

## Alcance
Todo el proyecto (backend y frontend).

## Objetivo
Garantizar separación de responsabilidades, facilitar cambios sin efectos colaterales y permitir escalabilidad técnica por capas.

## Criterios obligatorios
- Backend y frontend deben comunicarse solo por API HTTP.
- La lógica de negocio no debe vivir en componentes de UI.
- Las rutas del backend deben delegar cálculo y transformación a funciones reutilizables.
- El frontend debe separar presentación, composición de componentes y utilidades de dominio.
- Los contratos de datos (tipos/esquemas) deben ser explícitos en ambos lados.

## Especificidad por capa
### Backend
- `app/main.py` solo inicializa aplicación, middlewares y router.
- `app/routes.py` define endpoints, modelos y orquestación de casos de uso.
- Cualquier lógica repetida debe extraerse a funciones puras reutilizables.

### Frontend
- `components/dashboard` contiene piezas de interfaz de negocio.
- `components/ui` contiene componentes base reutilizables.
- `lib` centraliza tipos, utilidades y funciones de cálculo.

## Anti-patrones a evitar
- Mezclar renderizado y cálculo financiero en el mismo bloque complejo de UI.
- Duplicar reglas de cálculo en múltiples componentes.
- Acoplar el frontend a detalles internos del backend fuera del contrato API.

## Lista de tareas para aplicar esta regla
- Verificar que cada endpoint usa funciones de negocio reutilizables.
- Revisar componentes grandes y extraer lógica repetida a `lib`.
- Confirmar que no hay utilidades de dominio dentro de `components/ui`.
- Validar que cambios de API actualicen tipos en frontend.
- Documentar cualquier nueva carpeta con su responsabilidad.

## Definition of Done
- Cambio integrado sin romper separación de capas.
- Lógica duplicada reducida o eliminada.
- Contratos de datos actualizados y coherentes.

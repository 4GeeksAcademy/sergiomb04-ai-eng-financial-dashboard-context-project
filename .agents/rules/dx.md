# Regla: Developer Experience, Calidad Local y Entorno

## Alcance
Principalmente frontend, con impacto en flujo de trabajo general.

## Objetivo
Garantizar un ciclo de desarrollo rápido, predecible y con validaciones tempranas antes de integrar cambios.

## Criterios obligatorios
- El código frontend debe pasar lint sin errores críticos antes de merge.
- El proyecto debe ejecutarse en local con Docker sin pasos ocultos.
- Configuración de entorno debe ser explícita y basada en variables.
- Los aliases de importación deben mantenerse consistentes (`@` para `src`).

## Estándares de entorno
- Variables de entorno versionadas por ejemplo (`.env.example` cuando aplique).
- Evitar hardcodear URLs de servicios fuera de configuración.
- Mantener proxy de Vite alineado con servicios de docker-compose.

## Anti-patrones a evitar
- Cambios que compilan pero rompen lint o tipado.
- Dependencias nuevas sin justificar uso.
- Configuración local que solo funciona en una máquina.

## Lista de tareas para aplicar esta regla
- Ejecutar lint y corregir warnings importantes del cambio.
- Verificar build local para detectar errores de tipado.
- Confirmar que nuevas variables están documentadas.
- Validar que frontend consume backend por proxy/config, no por URL fija.
- Revisar scripts de `package.json` cuando se agreguen herramientas.

## Definition of Done
- Flujo local funcional (`dev`, `build`, `lint`).
- Configuración reproducible y documentada.
- Sin deuda técnica evidente de entorno en el cambio entregado.

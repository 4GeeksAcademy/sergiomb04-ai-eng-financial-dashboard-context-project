# Regla: Naming Consistente y Semántico en Inglés

## Alcance
Variables, funciones, componentes, tipos, archivos y carpetas principales.

## Objetivo
Mejorar legibilidad, reducir ambigüedad y mantener una base de código coherente entre backend y frontend.

## Convenciones obligatorias
- Idioma inglés para código y estructuras técnicas.
- Frontend:
	- Componentes en PascalCase.
	- Hooks/utilidades en camelCase.
	- Archivos de componentes en kebab-case o convención ya establecida del módulo.
- Backend:
	- Funciones y variables en snake_case.
	- Clases/modelos en PascalCase.
	- Endpoints con nombres descriptivos y consistentes.

## Reglas semánticas
- Nombres deben describir intención, no implementación temporal.
- Evitar abreviaturas opacas (`calc`, `tmp`, `val`) salvo contexto obvio.
- Booleans deben leerse como condición (`is_`, `has_`, `can_` o equivalentes claros).

## Anti-patrones a evitar
- Mezcla de español e inglés en símbolos del código.
- Nombres genéricos en lógica de negocio financiera.
- Renombrados parciales que dejen inconsistencias entre tipos y uso.

## Lista de tareas para aplicar esta regla
- Revisar nuevos nombres de funciones y componentes antes de cerrar el cambio.
- Homogeneizar idioma al tocar código legado cercano.
- Verificar coherencia entre nombre de archivo, símbolo exportado y responsabilidad.
- Evitar introducir abreviaturas no documentadas.
- Alinear naming de tipos frontend con contratos backend.

## Definition of Done
- Nuevos símbolos siguen convención por lenguaje/capa.
- Nombres son autoexplicativos para contexto financiero.
- No se introducen inconsistencias de idioma.

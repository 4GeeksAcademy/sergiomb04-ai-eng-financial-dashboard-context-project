# CONTEXT.md

## Resumen del Proyecto

Este proyecto es un dashboard financiero compuesto por un backend en Python (FastAPI) y un frontend en React (TypeScript), diseñado para mostrar y analizar datos financieros de manera visual e interactiva.

---

## Estructura del Proyecto

- **backend/**
  - **Lenguaje:** Python
  - **Framework:** FastAPI
  - **Archivos principales:**
    - `main.py`, `routes.py`, `__init__.py`: Configuración y rutas de la API.
    - `tests/`: Pruebas automatizadas con pytest.
    - `Dockerfile`, `requirements.txt`: Contenedorización y dependencias.

- **frontend/**
  - **Lenguaje:** TypeScript
  - **Framework:** React (Vite)
  - **Archivos principales:**
    - `src/`: Código fuente de la aplicación.
      - `components/dashboard/`: Componentes visuales del dashboard (KPI, gráficos, cabecera).
      - `lib/`: Utilidades y tipos financieros.
    - `public/`: Recursos estáticos.
    - `Dockerfile`, `package.json`, `tsconfig*.json`, `vite.config.ts`: Configuración y dependencias.

---

## Objetivo

Proveer una plataforma para visualizar indicadores clave de desempeño (KPI), ingresos, egresos y métricas de rentabilidad, facilitando la toma de decisiones financieras.

---

## Tecnologías Clave

- **Backend:** Python, FastAPI, Pytest, Docker
- **Frontend:** React, TypeScript, Vite, ESLint, Docker

---

## Despliegue

- Uso de Docker y docker-compose para facilitar la ejecución y despliegue de ambos servicios.

---

## Pruebas

- Pruebas unitarias en el backend (`backend/tests/`).
- Estructura preparada para pruebas en frontend.

---

## Notas

- El proyecto sigue buenas prácticas de organización y separación de responsabilidades.
- Listo para desarrollo local y despliegue en producción.

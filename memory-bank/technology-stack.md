# Repository Technology Stack

## Frontend

### Foundation
- UI framework: React 19.2.4
- Language: TypeScript 6.0.2
- Build tool and dev server: Vite 8.0.4
- Module format: ESM

### UI and visualization
- Recharts 3.8.1 for financial charts.
- Lucide React 1.8.0 for iconography.
- TailwindCSS 4.2.2 for utility-first styling.
- class-variance-authority 0.7.1 for component variants.
- clsx 2.1.1 and tailwind-merge 3.5.0 for class composition.

### Quality and testing
- ESLint 9.39.4 with:
  - @eslint/js
  - typescript-eslint
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
- Vitest 4.1.4 for unit testing.
- @vitest/coverage-v8 4.1.4 for code coverage.

### Relevant configuration
- Import alias: @ -> src.
- Vite development proxy: /api -> http://backend:8000.
- TypeScript target: ES2023.
- JSX: react-jsx.

## Backend

### Foundation
- Language: Python 3.13 (python:3.13-slim base image).
- API framework: FastAPI.
- ASGI server: Uvicorn with standard extras.

### Core libraries
- fastapi: framework for REST endpoints.
- uvicorn[standard]: ASGI server and runtime utilities.
- debugpy: remote debugging support.
- httpx: HTTP client support for tests.

### Quality and testing
- pytest for unit testing.
- pytest-cov for coverage.

### Relevant configuration
- CORS enabled for all origins in development.
- Runs with automatic reload (--reload).
- Exposes ports 8000 (API) and 5678 (debug).

## Infrastructure

### Orchestration
- docker-compose with two services:
  - frontend
  - backend

### Frontend container
- Base image: node:24-alpine.
- Exposed port: 5173.
- Volumes:
  - bind mount of frontend source code into /app.
  - anonymous volume for /app/node_modules.

### Backend container
- Base image: python:3.13-slim.
- Exposed ports:
  - 8000 for API.
  - 5678 for debugging.
- Volume:
  - bind mount of backend source code into /app.

### Network and service communication
- frontend depends on backend in docker-compose.
- Vite uses an internal proxy to route /api requests to the backend service.

## Dependencies by module

### Frontend dependencies (runtime)
- class-variance-authority ^0.7.1
- clsx ^2.1.1
- lucide-react ^1.8.0
- react ^19.2.4
- react-dom ^19.2.4
- recharts ^3.8.1
- tailwind-merge ^3.5.0

### Frontend dependencies (development)
- @eslint/js ^9.39.4
- @tailwindcss/vite ^4.2.2
- @types/node ^24.12.2
- @types/react ^19.2.14
- @types/react-dom ^19.2.3
- @vitejs/plugin-react ^6.0.1
- @vitest/coverage-v8 ^4.1.4
- autoprefixer ^10.4.27
- eslint ^9.39.4
- eslint-plugin-react-hooks ^7.0.1
- eslint-plugin-react-refresh ^0.5.2
- globals ^17.4.0
- postcss ^8.5.9
- tailwindcss ^4.2.2
- typescript ~6.0.2
- typescript-eslint ^8.58.0
- vite ^8.0.4
- vitest ^4.1.4

### Backend dependencies
- fastapi
- uvicorn[standard]
- debugpy
- pytest
- pytest-cov
- httpx

## Main scripts

### Frontend
- dev: runs Vite in development mode.
- build: compiles TypeScript and builds production assets.
- lint: runs ESLint.
- test: runs tests with Vitest.
- test:watch: runs tests in watch mode.
- test:coverage: runs tests with coverage reporting.

### Backend
- Runs through Docker with debugpy + uvicorn in reload mode.

## Current stack status
- Modern, coherent stack for an MVP-style financial dashboard.
- Ready for local containerized development.
- Solid foundation for evolving toward production with CI/CD, persistent storage, and authentication.

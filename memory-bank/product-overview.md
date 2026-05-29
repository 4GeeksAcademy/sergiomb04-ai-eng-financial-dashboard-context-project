# Product Overview

## Product Summary
This repository contains a financial dashboard product designed to help teams monitor business performance through clear KPI visualization, trend analysis, and financial anomaly detection.

The solution combines:
- A FastAPI backend that provides financial metrics and analytic endpoints.
- A React + TypeScript frontend that renders KPI cards and charts for executive decision-making.

## Problem It Solves
Small and medium teams often have fragmented financial information and limited visibility into key metrics. This product centralizes financial movements into a dashboard that makes it easier to:
- Understand income vs outcome behavior.
- Track profitability and margin over time.
- Compare periods and detect unusual spending spikes.

## Target Users
- Founders and business owners.
- Finance and operations teams.
- Product or growth managers who need business-level financial visibility.

## Core Product Capabilities
- KPI overview:
  - Total income.
  - Total outcome.
  - Net profit.
  - Profit margin.
- Time-based analysis:
  - Daily, weekly, and monthly summaries.
  - Trend visualization for income and outcome.
- Segmentation and filtering:
  - Date range.
  - Category.
  - Operation type (income/outcome).
  - Business type (B2B/B2C).
- Comparative analysis:
  - Current period vs previous period.
  - Absolute and percentage delta.
- Alerting logic:
  - Detection of outcome increases over a configurable threshold.

## Functional Scope by Layer
### Backend (FastAPI)
- Generates and serves financial movement datasets.
- Applies filters and aggregation logic.
- Exposes endpoints for:
  - Raw metrics.
  - Facets for filters.
  - Summaries.
  - Top categories.
  - Comparison.
  - Alerts.
- Includes automated tests with pytest.

### Frontend (React + TypeScript)
- Fetches metrics from backend APIs.
- Computes and renders KPI cards and line charts.
- Handles loading and API error states.
- Uses reusable UI components and strict typing.

## Data Model Snapshot
Financial movement fields:
- create_date
- amount
- operation_type
- category
- business_type

This model supports both visualization and analytics use cases.

## Non-Functional Goals
- Maintainability: modular backend/frontend architecture.
- Developer velocity: Dockerized local setup and hot reload.
- Reliability: unit tests in backend and test-ready frontend setup.
- Extensibility: easy to replace mock data with real data sources.

## Current Product Maturity
- MVP-ready for local demos and technical validation.
- Strong foundation for adding real data persistence, authentication, and role-based access.

## Recommended Next Product Iterations
1. Integrate a persistent database and real transaction ingestion.
2. Add authentication and authorization by role.
3. Implement customizable dashboard filters in UI.
4. Add automated CI checks for lint, tests, and coverage.
5. Extend alerting with configurable channels (email/Slack/webhook).

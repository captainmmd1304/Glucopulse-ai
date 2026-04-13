# GlucoPulse AI

GlucoPulse AI is an FDA-aligned clinical framework using intelligent modeling to predict diabetes and hypertension risk, providing actionable mitigation pathways through a beautiful frontend dashboard heavily powered by a robust Node.js clinical backend.

## 🏗️ Monorepo Architecture

This project is decoupled into two independent workspaces for seamless scalability:

*   **`frontend/`**: The client-side UI built with React, Vite, Tailwind CSS, and Framer Motion. Handles the Dashboard, Protocol pages, and interactive UI logic.
*   **`backend/`**: The core clinical API engine built with Node.js, Express, TypeScript, and Prisma ORM backed by PostgreSQL.

---

## 🚀 Quickstart Guide

To run the full stack locally, you need two terminal tabs open at the root of the project.

### 1. Start the React Frontend

```bash
cd frontend
npm install
npm run dev
```
*Frontend will typically launch at `http://localhost:5173`*

### 2. Start the Express Backend

Ensure you configure your PostgreSQL Database URL in `backend/.env` first (use `.env.example` as a template).

```bash
cd backend
npm install
npm run db:push     # Synchronize Prisma schema with Postgres
npm run dev         # Launches typescript watcher
```
*Backend API will run at `http://localhost:5000`*

---

## 🔌 Core API Endpoints

The backend supports full JWT-authenticated routes for rendering the AI clinical dashboards dynamically:

| Phase | Endpoint | Method | Security | Purpose |
| ---- | ---- | ---- | ---- | ---- |
| **Auth** | `/api/v1/auth/register` | `POST` | Public | Account creation (Bcrypt encryption) |
| **Auth** | `/api/v1/auth/login` | `POST` | Public | Issues secure JWT Token |
| **Dashboard** | `/api/v1/dashboard/overview` | `GET` | Bearer Token | Loads hypertension & progression bounds |
| **Dashboard** | `/api/v1/dashboard/risk-factors` | `GET` | Bearer Token | Exposes biological driver percentages |
| **Protocol** | `/api/v1/clinical/protocol` | `GET` | Bearer Token | Nutrition & Lifestyle intervention limits |
| **Protocol** | `/api/v1/clinical/adherence` | `GET` | Bearer Token | Gamified adherence tracking streaks |
| **Reports** | `/api/v1/clinical/report/share` | `POST` | Bearer Token | Institutional sharing of medical stats |

## 🛡️ Backend Technology Stack
- **TypeScript & Express**: Foundation layers
- **Prisma & PostgreSQL**: Database & typesafe queries
- **JWT & Zod**: Stateless Auth and Payload Validation
- **Helmet & CORS**: Hardened security boundaries

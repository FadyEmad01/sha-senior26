# SHA Senior Boilerplate (Next.js 16)

Production-ready frontend boilerplate built with Next.js App Router, Tailwind v4 (CSS-first), TanStack Query, Redux Toolkit, Zod, and shadcn-style UI primitives.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@theme` in `src/app/globals.css`)
- TanStack Query (server state)
- Redux Toolkit (global UI state)
- React Hook Form + Zod (form state and validation)
- Axios (API layer)
- Sonner (toasts)
- Biome (lint/format)

## Project Structure

- `src/app/`: routing only (route groups like `(auth)`, `(dashboard)`)
- `src/features/`: domain logic by feature
  - `api/`, `components/`, `hooks/`, `schemas/`, `types/`
- `src/components/ui/`: shadcn-style primitives
- `src/components/shared/`: reusable shared components
- `src/lib/`: core utilities and store
- `src/config/`: env + query client config

## Development Workflow

### 1) Adding a New Feature

Create a new folder in `features/` (example: `features/tasks/`).

- Define Types in `types/index.ts`
- Define Schemas (Zod) in `schemas/index.ts`
- Create API functions in `api/tasksApi.ts`
- Create Hooks (`useQuery`/`useMutation`) in `hooks/useTasks.ts`
- Build Components in `components/`

### 2) Adding UI Components

We use shadcn/ui patterns. With Tailwind v4, generated components may need manual adjustment for CSS variables.

- Check `src/components/ui/` for existing primitives first
- If adding a new primitive manually, use variables defined in `src/app/globals.css`

### 3) State Management Rules

- **Server Data:** ALWAYS use TanStack Query (`useQuery`, `useMutation`)
  - Do not store API data in Redux
- **Global UI State:** Use Redux Toolkit (theme, sidebar, UI/session flags)
- **Form State:** Use React Hook Form

### 4) Authentication

Authentication is not pre-configured; implement your preferred strategy.

- Login/Register UI is available in `src/features/auth/components/`
- Implement auth logic in `src/features/auth/hooks/use-auth.ts`
- Add route protection via middleware/proxy or client guards as needed

### 5) Styling (Tailwind v4)

- Uses CSS-first Tailwind v4 configuration
- Avoid `tailwind.config.js` unless absolutely required
- Define theme tokens (colors, fonts, radius, semantic tokens) in `src/app/globals.css` under `@theme`

## Environment Variables

Copy `.env.example` to `.env` and adjust values. Variables are validated at runtime in `src/config/env.ts`.

```bash
cp .env.example .env
```

Required values for your deployment target:

```env
NEXT_PUBLIC_API_BASE_URL=http://10.100.102.6:7585/api/v1

# Docker (deployment)
PORT=1350
COMPOSE_PROJECT_NAME=corelia-next-boilerplate
APP_NAME=corelia-next-boilerplate
APP_VERSION=1.0.0
HUB_URL=docker.infogerance.d-fi.fr
```

Important notes:

- `NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser
- Non-`NEXT_PUBLIC_*` variables are server-side only

## Docker Deployment

### Quick Start

```bash
# Build and run with Docker Compose
docker-compose up --build
```

App is available at `http://localhost:1350` (or your configured port).

### Architecture

Multi-stage Docker flow:

- Next.js standalone server runs internally on port `3000`
- Nginx reverse proxy receives traffic on external port and forwards to Next.js

### Production Flow

1. Set production values in `.env` (plus auth-specific secrets)
2. Build/publish your image with your CI/CD or container tooling
3. Deploy using your compose file on the target server

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run Biome checks
- `npm run format` — format with Biome

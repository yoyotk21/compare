# Compare Frontend

Next.js UI for the Compare project. Paste a prompt, fan it out across the backend `/api/compare/` endpoint, and explore clustered model responses.

## Getting Started
1. Install deps
   ```bash
   npm install
   ```
2. Configure the API base URL
   ```bash
   cp .env.local.example .env.local
   # adjust NEXT_PUBLIC_API_BASE_URL if your backend is elsewhere
   ```
3. Run the dev server
   ```bash
   npm run dev
   ```

## Project Structure
- `app/` – App Router pages (`/` prompt entry, `/results` cluster view).
- `components/` – UI building blocks (prompt form, response cards, etc.).
- `lib/` – API helpers, Zustand store, shared types, utilities.
- `hooks/` – React Query hooks for backend interactions.

## Design Notes
- Tailwind-powered indie/pro aesthetic with custom gradients.
- Word limit enforced client-side (500 words) before hitting the backend.
- Results persist through navigation using a lightweight Zustand store.

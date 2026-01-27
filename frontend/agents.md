# Agents Notes — Compare Frontend

## Tech Stack
- Next.js 14 with the App Router, TypeScript, TailwindCSS.
- State: Zustand for prompt/result persistence, TanStack Query for API mutations.
- API endpoint expected at `${NEXT_PUBLIC_API_BASE_URL}/api/compare/`.

## Dev Setup
1. `npm install`
2. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` (e.g., `http://localhost:8000`).
3. Run `npm run dev` to start the Next dev server on port 3000.

## Conventions
- Components live under `components/` and are grouped by domain (`prompt`, `response`, `ui`).
- Client-side state that must survive routing goes into `lib/stores` (Zustand).
- Shared utility functions belong in `lib/utils`.
- Styling is Tailwind-first; custom classes go into components directly.
- Avoid touching the backend—frontend fetcher handles all API comms.

## Testing + QA
- Manual test run: submit prompt under/over 500 words, verify validation.
- Confirm `/results` gracefully handles empty store (redirects message).
- Check responsive layout at 320px, 768px, 1280px widths.

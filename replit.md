# Điểm Tựa Học Đường

Website hỗ trợ học sinh, sinh viên Việt Nam trò chuyện, tìm tài liệu và chăm sóc cảm xúc.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/diem-tua-hoc-duong-web run dev` — run the website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required environment: `DATABASE_URL` and `GEMINI_API_KEY`; Clerk variables are managed by Replit.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/diem-tua-hoc-duong-web` — React website, pages, chat and theme
- `artifacts/api-server` — Express API, Gemini streaming and mood access controls
- `lib/db/src/schema` — PostgreSQL schemas
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- Mood history is private to the signed-in Clerk account; the server derives ownership from the session instead of trusting a browser-supplied ID.
- Other website pages remain usable without signing in.
- Gemini continues to use the Google API directly, as requested; credentials belong in Replit Secrets.

## Product

The site provides student support through Gemini chat, resources, study tools, community features, career guidance, hotlines, and personal mood tracking.

## User preferences

- Keep the existing colors and interface; make text noticeably larger and easy to read, especially in chat.
- Keep unrelated pages and behavior unchanged.
- Keep mood check-ins in the chat box, require sign-in to record them, and do not show a separate mood-history page.

## Gotchas

- Regenerate API clients after editing `lib/api-spec/openapi.yaml`.
- Do not change the Gemini model without verifying it is available for the Google API key configured for this app.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

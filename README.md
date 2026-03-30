# Base Next.js Frontend

Khung base chuẩn cho Next.js admin/dashboard frontend. Auth, RBAC, real-time WebSocket, data table, file upload.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI Library:** HeroUI v3 + Tailwind CSS v4
- **State Management:** Redux Toolkit + RTK Query
- **Auth:** Session cookie hoặc JWT (match với BE)
- **Real-time:** Socket.io-client — tự động sync data qua WebSocket

## Cài đặt

```bash
npm install
cp .env.example .env.local    # Chỉnh config phù hợp
```

## Lệnh thường dùng

```bash
npm run dev              # Dev (Turbopack)
npm run build            # Build production
npm run lint             # ESLint fix
```

## Cấu trúc dự án

```
├── app/
│   ├── (auth)/                       # Public routes (login)
│   └── (admin)/                      # Protected routes (dashboard)
│
├── components/
│   ├── common/                       # Reusable: AppInput, DataTable, PermissionGate...
│   ├── layouts/                      # AdminHeader, AdminNav, AuthProvider, RealtimeProvider
│   └── features/                     # Feature-specific components
│
├── stores/
│   ├── store.ts                      # Redux store config
│   ├── auth-slice.ts                 # Auth state
│   └── api/                          # RTK Query (base-api, auth-api, dashboard-api)
│
├── hooks/                            # useAuth, usePermission, useRealtimeSync, useSocket...
├── lib/                              # Utils: socket, api-error, formatters, export...
├── constants/                        # Permission keys, role constants
├── middleware.ts                     # Auth redirect
└── config/                           # Fonts, site config
```

## Path Aliases

| Alias | Trỏ đến |
|-------|---------|
| `@/*` | `./*` (project root) |

Ví dụ: `import { store } from '@/stores/store'`

## Auth

Hỗ trợ 2 mode (match với BE):

- **Session cookie** — `credentials: "include"`, cookie tự gửi
- **JWT** — Token lưu trong memory (Redux), không localStorage

## Thêm trang mới

```
1. Route:     app/(admin)/{feature}/page.tsx
2. API:       stores/api/{feature}-api.ts
3. Component: components/features/{feature}/
4. Real-time: thêm 1 dòng ENTITY_TAG_MAP trong hooks/use-realtime-sync.ts
```

## Common Components

Form: `AppInput`, `AppSelect`, `AppButton`, `AppDatePicker`, `AppPriceInput`, `AppUploadImage`...
Data: `DataTable`, `StatCard`, `StatusBadge`, `EmptyState`
Layout: `PageHeader`, `FilterPanel`, `SearchInput`, `TableToolbar`
Feedback: `AppToast`, `ConfirmModal`
Auth: `PermissionGate`

## Env Config

Xem `.env.example` để biết các biến cần thiết.

# CLAUDE.md - Paw Party App

This document provides guidance for AI assistants working with this codebase.

## Project Overview

Paw Party is a pet adoption matching application built with Next.js. It features a Tinder-like swipe interface for browsing adoptable pets and connecting potential adopters with shelters. The app pulls pet data from the Petfinder API and stores it in a PostgreSQL database.

**Current Status**: The site is in development mode with a splash screen showing "Site coming soon!" (controlled by `siteLive` flag in `app/layout.tsx`).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript / JavaScript (mixed)
- **React**: 18.2.0
- **UI Library**: Material UI (MUI) 5.x with Emotion
- **Styling**: Tailwind CSS 3.x + MUI theming
- **Database**: PostgreSQL (via Vercel Postgres)
- **ORM**: Prisma 6.x
- **External API**: Petfinder API (`@petfinder/petfinder-js`)
- **Package Manager**: pnpm (preferred)
- **Hosting**: Vercel

## Project Structure

```
pawparty-app/
├── app/                          # Next.js App Router
│   ├── (website)/               # Route group: marketing site pages
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── faq/                 # FAQ page
│   │   ├── stories/             # Success stories
│   │   └── layout.tsx           # Website layout (with Topbar)
│   ├── matchmaker/              # Route group: pet matching app
│   │   ├── browse/              # Swipe interface for pets
│   │   ├── matches/             # Saved matches page
│   │   ├── details/[id]/        # Individual pet details
│   │   ├── questionnaire/       # User preference questionnaire
│   │   └── layout.tsx           # Matchmaker layout (with BottomNav)
│   ├── api/
│   │   └── cron/route.ts        # Daily cron job for data sync
│   ├── lib/                     # Shared utilities
│   │   ├── data.ts              # Prisma database queries
│   │   ├── definitions.ts       # TypeScript type definitions
│   │   ├── loader.js            # Petfinder data loader
│   │   ├── remover.js           # Stale data cleanup
│   │   └── custom-hooks/        # React hooks (useNavigation, useLocalStorage)
│   ├── ui/                      # UI components
│   │   ├── browse/              # Matchmaker components (swipe, cards)
│   │   ├── website/             # Marketing site components
│   │   ├── theme.js             # MUI theme configuration
│   │   └── global.css           # Global styles
│   └── layout.tsx               # Root layout (includes siteLive toggle)
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── public/                      # Static assets (logos, icons)
├── scripts/                     # Seed scripts and mock data
└── vercel.json                  # Vercel cron configuration
```

## Database Schema

Key models in `prisma/schema.prisma`:

- **Animal**: Core entity with name, species, breed, age, sex, size, colors, availability
- **Photo**: Animal photos (one-to-many with Animal)
- **Attribute**: Animal attributes like "Good with dogs", "spayed/neutered" (one-to-many)
- **SpecialNeeds**: Special needs information (one-to-many)
- **Organization**: Shelter/rescue organizations
- **Location**: Physical addresses for organizations

## Development Commands

```bash
# Install dependencies
pnpm i

# Start development server (includes Prisma generate)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Format code
pnpm prettier

# Check formatting
pnpm prettier:check

# Prisma commands
pnpm prisma generate     # Generate Prisma client
pnpm prisma migrate dev  # Run migrations
pnpm prisma studio       # Open Prisma Studio GUI
```

## Environment Variables

Required in `.env` file:
- `POSTGRES_PRISMA_URL` - PostgreSQL connection string (pooled)
- `POSTGRES_URL_NON_POOLING` - PostgreSQL direct connection (for migrations)
- `APIKEY` - Petfinder API key
- `APISECRET` - Petfinder API secret

## Key Patterns & Conventions

### Component Organization
- **Server Components**: Default in `app/` directory pages
- **Client Components**: Marked with `'use client'` directive when needed (e.g., `swipe-stack.tsx`)
- Use MUI components for UI consistency (`Container`, `Typography`, `Box`, etc.)

### Data Fetching
- Server-side data fetching in page components using Prisma
- Example: `fetchAnimals()`, `fetchAnimalById()` in `app/lib/data.ts`
- Use Prisma-generated types from `@prisma/client`

### State Management
- Local state with React hooks (`useState`, `useEffect`)
- User matches stored in `localStorage` (client-side only)
- Questionnaire responses in `localStorage`

### Styling
- MUI theme defined in `app/ui/theme.js`
- Primary color: `#377dff` (blue)
- Secondary color: `#f9b934` (yellow/gold)
- Font family: Montserrat for headings, Inter for body
- Tailwind for utility classes alongside MUI

### Route Groups
- `(website)` - Marketing pages with `Topbar` navigation
- `matchmaker` - Pet matching app with `BottomNav` navigation

### API Pattern
- API routes in `app/api/` directory
- Cron job at `/api/cron` syncs Petfinder data daily (midnight)

## Important Files to Know

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, contains `siteLive` toggle |
| `app/lib/data.ts` | Database query functions |
| `app/lib/loader.js` | Petfinder API data import |
| `app/ui/browse/swipe-stack.tsx` | Main swipe interface component |
| `app/ui/theme.js` | MUI theme configuration |
| `prisma/schema.prisma` | Database schema |
| `vercel.json` | Cron job configuration |

## Testing

No test framework is currently configured. Consider adding:
- Jest + React Testing Library for components
- Playwright/Cypress for E2E tests

## Deployment

- Deployed on Vercel
- Cron job runs daily at midnight to sync pet data
- Uses Vercel Postgres for database

## Code Style

- ESLint with `next/core-web-vitals` config
- Prettier with Vercel style guide and Tailwind plugin
- TypeScript for type safety (though some files are `.js`)

## Common Tasks

### Adding a new page
1. Create directory under `app/(website)/` or `app/matchmaker/`
2. Add `page.tsx` file
3. Use appropriate layout patterns (see existing pages)

### Modifying the database schema
1. Edit `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name description-of-change`
3. Update `app/lib/definitions.ts` if needed

### Adding new pet data fields
1. Update `prisma/schema.prisma` Animal model
2. Update `app/lib/loader.js` to fetch new field from Petfinder
3. Update `app/lib/data.ts` queries
4. Update UI components to display new data

## Known Issues / Tech Debt

- Mixed TypeScript/JavaScript files (some `.js` files should be `.ts`)
- `siteLive` flag hardcoded in layout (should be environment variable)
- No automated tests
- Some legacy/commented code in `app/lib/utils.ts`
- React-router-dom is listed as dependency but Next.js handles routing

## Architecture Decisions

- **App Router**: Using Next.js 14 App Router (not Pages Router)
- **Route Groups**: Separating marketing site from app functionality
- **Local Storage**: Matches stored client-side (no user accounts yet)
- **External API**: Petfinder provides pet data, synced via cron job

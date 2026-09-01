# Paw Party — React Implementation vs. Current App: Gap Analysis

**Date:** 2026-09-01 · **Repo:** `estevanio/pawparty-app` @ `3bfd39f` (branch `dev`)
**Subjects:** `paw-party-react/` (complete React implementation, 3,265 LOC) · `paw-party/` (superseded Vite starter) · PR description for `feature/paw-party-react`
**Also in scope:** open PRs [#63](https://github.com/estevanio/pawparty-app/pull/63) (new API) and [#64](https://github.com/estevanio/pawparty-app/pull/64) (site redesign), both of which move this analysis materially.

> **Verified, not assumed.** `npm install && npm run build` passes (462 kB bundle, 144 kB gzip).
> `node smoke.mjs` → 15/15. `node smoke2.mjs` → 29/29. All 44 checks the PR description claims do pass.

---

## 1. Executive summary

1. **The stack objection is gone.** `paw-party-react` is **React 18.3 + MUI 5.16 + Emotion** — the same
   majors the repo already runs (React 18.2, MUI 5.15). Every stateful file carries `'use client'`.
   Nothing under `src/` imports Vite. This is a genuine drop-in, not a port.
2. **The earlier `paw-party` scaffold is superseded.** Both zips are byte-identical to each other, and
   `paw-party-react` completes it. Its stack (React 19 / MUI 9 / TS 6) was the *starter's*, not the
   implementation's. Analyse against `paw-party-react` only.
3. **PR #64 pre-clears three prerequisites** without knowing it: it flips `siteLive` to `true`, moves
   `ThemeProvider` from the root layout down into each route group, and adds **Fredoka + Inter** to the
   root font link — exactly the fonts `PawPartyApp` requires the host page to load.
4. **PR #63 closes most of the shelter-data gap** — it populates `Organization` and `Location`, links
   `Animal.organization_id`, and ingests the good-with / yard / experience attributes the React app needs
   for `good[]`, `nofit` and `reasons[]`. **But it will not run against the current schema** (§6).
5. **The remaining hard gap is identity and persistence.** There is no `User` model, no session, no auth
   anywhere in the repo. Every list in the React app (`likes`, `matches`, `passed`) is in-memory React
   state that dies on refresh. This is the long pole and nothing in flight touches it.
6. **The unresolved decision is duplication.** `app/matchmaker/*` and `PawPartyApp` are two complete,
   overlapping implementations of browse/matches/details. Shipping both means two swipe decks, two match
   lists and two bottom navs in one app. §8 recommends retiring `app/matchmaker/*`.
7. **The PR targets the wrong branch.** It says `Target: main`. Every other PR in this repo targets `dev`,
   `dev` is the live integration branch, and `main` is ~9 months stale. Retarget before opening.

---

## 2. Current state

**Stack:** Next.js 14 App Router · React 18.2 · MUI 5.15 + Tailwind 3 · Prisma 6 / Vercel Postgres · Vercel.

| Area | State |
|---|---|
| Marketing site `app/(website)/` | Home, About, FAQ, Stories. **Being wholly replaced by PR #64.** |
| App `app/matchmaker/` | `questionnaire`, `browse`, `matches`, `details/[id]`. |
| Swipe | `react-tinder-card` in `swipe-stack.tsx`. Real gestures, working. |
| Data in | `app/lib/loader.js` → Petfinder SDK. **Being wholly replaced by PR #63.** |
| Data out | `app/lib/data.ts` — `fetchAnimals`, `fetchAnimalById`, `fetchAnimalsByMatches`. |
| Cron | `vercel.json` → `/api/cron` daily 00:00: `loader()` then `remover()`. |
| Schema | `Animal`, `Attribute`, `Photo`, `SpecialNeeds`, `Location`, `Organization`. **No `User`.** |
| Persistence | `localStorage` only — questionnaire answers, serialised match objects. |
| Auth | None. `bcrypt` is a dependency and is never imported. |
| Live? | **No.** `app/layout.tsx` hard-codes `siteLive = false`; every route renders "Site coming soon!". PR #64 flips it. |

**What today's loader populates:** `name, sex, size, age_group, species, breed, secondary_breed,
primary_color, secondary_color, intake_date, available, last_updated` — and nothing else. No
`organization_id`, no `location`, no `public_url`. Dogs and cats only, no geographic filter.

---

## 3. The React implementation

**3,265 LOC.** 20 screens, 17 components, 3 hooks/context files, 4 data modules, 2 jsdom suites.

| Layer | Files |
|---|---|
| State | `state/AppContext.jsx` (router, account, filters, engagement, nudges, overlays) |
| | `hooks/useDeck.jsx` (filter/sort, maybe-later resurfacing, undo) |
| | `hooks/useAdoptionFlow.jsx` (the account gate, in one place) |
| Components | 17, incl. `SwipeCard` (raw pointer events, 110px threshold, rotation ×0.045), `PetImage`, `SpeciesArt` (7 illustrations), `HeartBurst`, `PawMarch` |
| Data | `pets.js` (23-pet roster + `makePet()`/`parseProfile()`/`importPet()`), `shelters.json`, `traits.js`, `onboarding.js` |
| Entry | `PawPartyApp.jsx` — one default export, fills its parent |

**Product rules encoded in code, not just prose:** the account gate fires exactly once, at adoption start
(`useAdoptionFlow.jsx`); hearts animate only at the match moment and paws only at adoption start; a real
photo or the *species* illustration, never a broken image and never a wrong animal; `type: 'other'` means
any non-dog/cat (a regression the code comments flag as "real bug once; don't reintroduce", with a test).

---

## 4. Screen-by-screen coverage

| React screen | Repo equivalent | Disposition |
|---|---|---|
| Discover + filters/sort | `matchmaker/browse` | **Overlap.** React version is richer (4 sorts, filter pills, live count, coach overlay, hint banners). Repo version has `react-tinder-card`; React version has its own pointer-event drag. Keep one. |
| Match / NoMatch | Snackbar in `swipe-stack` | New. |
| Pet profile | `matchmaker/details/[id]` | **Overlap.** Repo version has shelter lines commented out; React version has the full shelter card. |
| ReachOut (shelter handoff) | none | New. **The product's point** — everything else feeds it. |
| Onboarding (6 steps, branching) | `matchmaker/questionnaire` | **Overlap.** Repo has 5 flat radios; React has branching + resume + skip. |
| Matches / Liked / Passed | `matchmaker/matches` only | Partial overlap; Liked and Passed are new. |
| Account / AccountInfo / Settings | none | New. |
| CreateAccount / ChangePw / ResetPw / DeleteAccount | none | New — and entirely mocked (§7). |
| Terms / Privacy / Feedback | none | New. |
| Marketing site | `app/(website)/*` (PR #64) | **No React-app equivalent.** Keep the Next.js site; these are different products at different URLs. |

---

## 5. Data model gap — `makePet()` ↔ Prisma

The integration seam is explicit and well-chosen: `importPet(raw)` takes a flat record, runs
`parseProfile()` over free text, and hands `makePet()` a normalised object. A live-feed adapter only has to
produce `raw`. Below, **"#63"** marks fields that PR #63 would supply once it runs.

| Field | Source | Status |
|---|---|---|
| `id` / `first` / `breed` | `animal_id` / `name` / `breed` | ✅ direct |
| `photos[]` / `img` | `Photo.url` | ✅ direct — and **#63 finally sets `is_cover`** (today it is `false` on every row) |
| `type` | `species` | ⚠️ lowercase. React types 8 species; feed supplies 2 |
| `ageCat` | `age_group` | ⚠️ needs `puppy/young/adult/senior` mapping (React uses `puppy`, not `baby`) |
| `sizeCat` | `size` | ⚠️ `Small/Medium/Large/XL` → `small/medium/large/xl` |
| `good[]` | `Attribute` | ⚠️ **#63** — `isKidsOk` / `isDogsOk` / `isCatsOk` land as rows; needs shaping into `['user','Kids','Yes']` triples |
| `tags[]` | `Attribute` | ⚠️ **#63** — housetrained, microchipped, vaccinations, shedding, grooming, energy… |
| `shelter` | `Organization.name` | ⚠️ **#63** — populated + linked. Today: null everywhere |
| `listing` | `Animal.public_url` | ⚠️ column exists, **no loader writes it** (neither current nor #63). React falls back to `shelterListing()`, a hard-coded 6-shelter lookup |
| `about` | — | ❌ **not in the schema.** #63 doesn't add it either. Needs a migration + loader line |
| `dist` | — | ❌ **#63 gets close**: `Location.zip` + a 100-mile radius query. Still needs adopter location + zip→zip distance |
| `fee` | `Organization.adoption_fees` | ❌ unpopulated, and `String` not numeric, and per-org not per-animal. React computes it from species/age/size — a placeholder, not data |
| `badge` / `match` / `matchpills` | — | ❌ no server-side scoring exists on either side |
| `nofit` / `reasons[]` | — | ❌ **#63 supplies the raw inputs** (`isYardRequired`, `ownerExperience`, `isKidsOk`) but the rule engine that turns them into "Orion needs to be the only pet — you mentioned a cat" does not exist |
| `adopted` | inverse of `available` | ❌ **blocked** — `remover.js` hard-deletes unavailable animals (§6.3) |
| `wait` | `intake_date` | ⚠️ derivable — React fakes it as `(id*13)%92`; a real `now − intake_date` is one line |

**Placeholder photo services.** The roster pulls from `placedog.net` and `cataas.com`. Fine for a demo,
must not reach production — they are third-party endpoints with no SLA and no content guarantee.

**Geography conflict.** `shelters.json` and `shelterListing()` hard-code 6 Northern Colorado organisations.
PR #63 queries a **100-mile radius around postal code 81631 — Edwards, CO**, which is ~130 miles from Fort
Collins and will return a largely disjoint set of shelters. One of the two is wrong. Resolve before wiring.

---

## 6. Defects

### In PR #63 (`newAPI`) — will not run as written

The PR changes three files: `loader.js`, `remover.js`, `package.json`. It changes **no migration and no
schema**, but the new loader writes fields that do not exist. Verified by reading `prisma/schema.prisma`
at `dev`; not executed against a database.

1. **`Attribute.value` does not exist.** Every one of the ~19 `prisma.attribute.upsert()` calls passes
   `value:`. The model is `{ animal_id, attribute, animal }`. Needs a migration adding `value String?`.
2. **`SpecialNeeds` upsert is invalid twice over.** It passes `details:` (the field is `special_need`) and
   filters `where: { animal_id }`, which is not unique on that model (`special_needs_id` is the id).
3. **Relations are connected by assignment.** `organization: orga` and `location: templocal` pass fetched
   objects into relation fields. Prisma requires `{ connect: { … } }` — or just set the scalar
   `organization_id`. `orga` can also be `null`.
4. **`available` comparison is fragile.** `tempstatus.get(statusId) === tempstatus.get("1")` compares two
   *names* and assumes the adoptable status is always id `"1"`.
5. **Secondary fields dropped.** `secondary_breed` and `secondary_color` are no longer written.

### In current code

6. **Match logic fires on left swipes.** `app/ui/browse/swipe-stack.tsx:50`

   ```js
   if ((animal.species.toLowerCase() == localStorage.getItem('species')?.toLowerCase()) ||
         localStorage.getItem('species')?.toLowerCase() == 'both' && direction == 'right') {
   ```

   `&&` binds tighter than `||`, so this is `(species === pref) || (pref === 'both' && right)`. With
   preference `dog`, swiping a dog **left** still adds it to matches. The direction check only ever applies
   on the `both` branch. **Passing on a pet matches you with it.**

7. **Committed API credentials.** `app/lib/sources.json` holds live Petango `AuthKey` values in plaintext,
   in git history. Rotate them and move to env — PR #63 doesn't touch this file.

8. **Adopted pets are hard-deleted.** `remover.js` `deleteMany`s anything with `available` false or null,
   cascading through photos and attributes. The React app's `adopted` flag, its "Found a home" chip and its
   expired-match styling all require the row to survive. Also means a user's stored match can point at a
   deleted row. **Soft-delete is a prerequisite for adoption-status sync.**

9. **Unbounded fetch to the client.** `matchmaker/browse/page.tsx` calls `fetchAnimals()` — `findMany` with
   no `take`, no filter, every photo and attribute, serialised into the client payload.

10. **`scripts/seed.js` is broken.** Calls `prisma.shelter.create` and sets `Animal.shelter_id`; both dropped
    in `20250709000130_remove_shelters`. Also has a duplicated `location:` key. A new contributor cannot seed.

11. **Node version disagreement.** `.nvmrc` says `18`; `package.json` engines says `>=20.10.0`; README says
    18.18.0+.

### In the React implementation

12. **Auth screens are convincing mocks.** CreateAccount, ChangePassword, ResetPassword and DeleteAccount
    all render, validate and transition — with no backend. The delete-account flow makes the account
    vanish from React state only. Do not ship these to users as-is; they read as functional.

13. **`shelterListing()` is a hard-coded 6-shelter lookup** with string matching on shelter names
    (`shelter.indexOf('NOCO') === 0`). It silently returns `''` for any unknown shelter — which is every
    shelter the live feed will produce.

14. **Profile fields ship with seeded PII-shaped defaults** — "Becca Verna", an email, a phone number, in
    `AppContext.jsx`. Prototype fixture; must be emptied before real users see it.

15. **`resultCount` reads `initial.length`** — the filtered set before maybe-later re-inserts. Documented as
    intentional prototype parity, and tested. Flagging only so it isn't "fixed" later by mistake.

---

## 7. What is real vs. mocked

The React app is 1:1 with an approved prototype, which means its *behaviour* is complete and its
*substrate* is not. Explicitly still mocked, per its own README:

| Mocked | Closed by |
|---|---|
| Live pet feed | PR #63 (+ an adapter to `importPet`) |
| Real distances | PR #63 partially (`Location.zip`) + adopter location |
| Adoption-status sync | Soft-delete (§6.8) + `available` |
| Server-side match scoring | Nothing in flight |
| OAuth · email delivery · persistence | Nothing in flight — no `User` model exists |

---

## 8. Recommendation

**Take the React implementation as the app; retire `app/matchmaker/*`.** Keep Next.js, Prisma, the ingest,
the cron and the marketing site.

*Why:* it is the same React and MUI majors, `'use client'` throughout, one drop-in export, 44 passing
behavioural tests, and it implements ~16 screens that do not exist in the repo at all. The repo's
`matchmaker` is 4 partial screens with a shelter section commented out.

*Why retire rather than merge the two:* they overlap on browse, matches and details. Running both means two
decks, two match lists, two bottom navs and two sources of truth for engagement. The repo's `matchmaker`
contributes one thing the React app lacks — a proven `react-tinder-card` integration — and the React app
already ships its own drag implementation with tested physics. Salvage the Prisma query layer
(`app/lib/data.ts`), not the UI.

**Integration cost is low and mostly already paid by PR #64:**

| Step | Cost | Note |
|---|---|---|
| Copy `src/` → `features/paw-party/`, `public/img/` → `public/` | **S** | No edits |
| Route: `dynamic(..., { ssr: false })` | **S** | README documents it; deck uses pointer events, avatar uses `FileReader` |
| Fonts (Fredoka + Inter) | **—** | **Already added by PR #64** |
| ThemeProvider nesting | **—** | **PR #64 already moved theming into route groups**; `PawPartyApp` brings its own |
| `siteLive = true` | **—** | **PR #64** |
| Retire `app/matchmaker/*` + `app/ui/browse/*` | **S** | Deletion, plus nav/link cleanup |
| Feed adapter: Prisma → `importPet()` | **M** | The real work. Blocked on #63 landing correctly |
| Auth + persistence | **L** | Greenfield. `User` model, sessions, OAuth, per-user engagement |

**Merge order matters:** #64 → #63 (after fixes) → React app. Landing the React app before #64 means
resolving conflicts in `app/layout.tsx` and `app/matchmaker/layout.tsx` twice.

---

## 9. Sequenced plan

**Phase 0 — correctness, independent of everything else**
1. Fix the swipe match bug (§6.6) — one line, currently corrupting every user's match list.
2. Rotate and env-ify the Petango keys (§6.7).
3. Soft-delete in `remover.js` (§6.8) — prerequisite for adoption-status sync.
4. Paginate `fetchAnimals` (§6.9).
5. Fix or delete `scripts/seed.js` (§6.10); reconcile Node versions (§6.11).

**Phase 1 — land PR #64.** Unblocks fonts, per-route theming and the live site in one merge.

**Phase 2 — fix and land PR #63.** Add the `Attribute.value` migration, fix the `SpecialNeeds` upsert, use
`connect` for relations, restore secondary breed/colour, and **settle the postal code** (81631 vs. NoCo).
Add `Animal.description` and write `public_url` while the loader is open — both are free at this point and
close `about` and `listing`.

**Phase 3 — drop in the React app.** Mount at `/app` (or replace `/matchmaker`), retire the old screens,
keep the roster as the data source. Ships a complete, navigable product on mock data.

**Phase 4 — feed adapter.** Prisma → `importPet()`. Map `ageCat`/`sizeCat`, shape `good[]` triples from
attribute rows, derive `wait` from `intake_date`, replace `shelterListing()` with `Organization.website_url`,
drop `placedog.net`/`cataas.com`.

**Phase 5 — accounts and persistence.** `User` model, sessions, OAuth (B1/B2), email + verification (B3),
13+ age gate (B7), then move `likes`/`matches`/`passed` out of React state. Until this lands, the auth
screens should be visibly disabled rather than convincingly fake (§6.12).

**Phase 6 — scoring.** `badge`, `match`, `matchpills`, `nofit`, `reasons[]` from onboarding answers +
attribute rows. This is what makes it a matchmaking app rather than a browser.

Phases 1 and 2 are independent. Phase 3 depends on 1. Phase 4 depends on 2 and 3. Phase 5 depends on nothing
and is the long pole — start it in parallel.

---

## 10. Open questions

1. **Retire `app/matchmaker/*`, or keep both?** §8 recommends retiring. This is the biggest call and it
   blocks Phase 3.
2. **Geography — Fort Collins or Edwards?** `shelters.json` says NoCo; PR #63 says postal code 81631.
   Gates Phase 2 and every distance feature.
3. **Which API is PR #63 using?** It drops `@petfinder/petfinder-js` for a raw axios call to `APIBASE` with
   a JSON:API payload. Worth documenting — the shape (`orgs`, `pictures`, `statuses`) is not Petfinder's.
4. **Does the ingest expand past dogs and cats?** The React app ships art and copy for rabbit, bird,
   reptile, guinea pig and small mammal. The feed supplies two species.
5. **Where are the handoff docs?** `dev/paw-party-dev-action-items.md`, the prototype HTML, and the
   information-architecture doc are cited throughout both artefacts and shipped in neither. The action-item
   IDs (A1–A6, B1–B7, C1–C4, D2/D4, E1–E3) are only partly reconstructable from code comments.
6. **PR target branch** — `main` as written, or `dev` like every other PR? (Recommend `dev`.)

---

## Appendix — verification log

| Check | Result |
|---|---|
| `npm install` (paw-party-react) | 162 packages, clean |
| `npm run build` | ✅ 937 modules, 462.11 kB / 143.99 kB gzip, 3.22s |
| `node smoke.mjs` | ✅ **15 passed, 0 failed** |
| `node smoke2.mjs` | ✅ **29 passed, 0 failed** |
| `paw-party` zip #1 vs #2 | Byte-identical (`diff -rq`, no output) |
| `feature/paw-party-react` on remote | **Does not exist** — 53 branches enumerated |
| PR #63 files changed | 3 — `loader.js`, `remover.js`, `package.json`. No schema, no migration |
| PR #64 files changed | 52 — incl. `siteLive = true`, Fredoka/Inter fonts, per-route-group ThemeProvider |

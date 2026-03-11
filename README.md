# TurfEstimate-AI MVP

Production-minded MVP for a white-label **AI Turf Estimate** flow used by landscaping companies to generate, qualify, and handoff leads.

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Google Maps Places + Drawing + Geometry libraries
- Serverless API routes with mockable integration adapters

## MVP Features
- Conversion-first landing page with premium service-business messaging
- Address lookup with Google Places Autocomplete
- Satellite map estimator with polygon drawing for customer-confirmed turf measurement
- Real-time square footage and configurable pricing engine
- Lead capture and polished estimate summary with disclaimer language
- Integration abstraction layers for:
  - GoHighLevel (CRM payload handoff)
  - Assistable Voice AI (post-lead qualification trigger)
- Config-driven client profile and pricing structure for future white-label multi-tenant expansion

## Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required for full map functionality:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Browser key with Places, Maps JavaScript, Drawing, Geometry APIs enabled

Optional for live integrations (mock fallback if unset):

- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `ASSISTABLE_API_KEY`

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Architecture notes
- `lib/domain/types.ts`: Shared domain interfaces (`Lead`, `Property`, `Measurement`, `Estimate`, `PricingConfig`, `ClientProfile`, `AppointmentHandoff`)
- `lib/config/*`: Client branding, service area, legal copy, and pricing config
- `lib/services/pricingEngine.ts`: Deterministic estimate engine (min-job + tier rates + add-ons)
- `lib/repositories/leadRepository.ts`: Swappable persistence boundary (in-memory for MVP)
- `lib/integrations/*`: Mockable adapters for GoHighLevel and Assistable
- `app/api/leads/route.ts`: Lead submission orchestration + integration dispatch

## Integration TODOs
Both adapter files include TODO markers where production credential wiring and endpoint calls should be inserted once vendor API details are finalized.

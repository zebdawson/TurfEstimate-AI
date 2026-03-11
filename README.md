# TurfEstimate-AI

Demo-friendly step-based turf estimator for landscaping pilot presentations.

## Features
- Multi-step estimator flow with progress indicator
- Pilot landscaping client configuration (`lib/config/pilotClient.ts`)
- Mock data for local demos (`lib/mock/estimatorData.ts`)
- Lead submission API (`app/api/lead/route.ts`)
- Isolated integration stubs in `lib/integrations`
- Development payload logging for GoHighLevel and Assistable
- Mobile-first responsive UI

## Local run
```bash
npm install
npm run dev
```

## Environment variables
Use `.env.example` as a template.

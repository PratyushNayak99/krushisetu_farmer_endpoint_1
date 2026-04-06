# Krishi-Setu - Farmer Endpoint

**Blockchain-Enabled Agricultural Marketplace**

Krishi-Setu (Farmer's Bridge) is a mobile-first web application designed to empower small and marginal farmers in rural India by providing transparent access to agricultural markets through blockchain-backed supply chain tracking.

## Overview

This farmer-facing endpoint of the Krishi-Setu platform enables farmers to:
- List their harvests with detailed quality information
- Track produce through the entire supply chain journey
- Receive transparent, timely payments
- Access real-time market prices for informed selling decisions

## Features

### Harvest Management
- **Multi-step harvest listing flow** with intuitive visual selection
- **Voice command integration** for low-literacy users
- **Bilingual support** (Odia and English) with one-tap language switching
- **Quality self-assessment** with optional assayer request
- **Automatic QR code generation** for batch tracking

### Batch Tracking
- Complete visibility into produce journey from farm to market
- Visual timeline showing status transitions:
  - Listed → Quality Check → In Transit → At Mandi → Sold
- QR code-based batch identification

### Financial Dashboard
- Payment history with status tracking (received/pending)
- Direct earnings display
- Bank account integration ready

### Market Intelligence
- Real-time mandi (market) prices
- Price trends for major crops (rice, millet, corn, vegetables)
- Location-specific pricing (e.g., Bhubaneswar Mandi)

### User-Centric Design
- Mobile-first responsive interface (393x852px mobile frame)
- Large tap targets for ease of use
- Offline/online status indicator
- Voice assistant integration point
- Framer Motion animations for smooth UX

## Tech Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite 6.3** - Fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Recharts** - Data visualization

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "6.3.5",
  "tailwindcss": "^4.1.13",
  "@radix-ui/*": "Multiple UI primitives",
  "lucide-react": "^0.487.0",
  "framer-motion": "*",
  "recharts": "^2.15.2"
}
```

## Project Structure

```
krushisetu_farmer_endpoint_1/
├── src/
│   ├── App.tsx                 # Main application component & state
│   ├── components/
│   │   ├── HomePage.tsx        # Dashboard with quick actions
│   │   ├── AddHarvestFlow.tsx  # 5-step harvest listing wizard
│   │   ├── BatchTrackingPage.tsx
│   │   ├── MarketPricesPage.tsx
│   │   ├── PaymentsPage.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   └── figma/              # Custom components
│   ├── Attributions.md         # Third-party asset credits
│   └── Guidelines.md           # Design guidelines
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Server

The app runs on `http://localhost:5173` (Vite default) and displays in a mobile frame (393x852px) to simulate the target device experience.

## Component Architecture

### Core Components

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Root component managing global state (batches, payments, market prices) |
| `HomePage.tsx` | Dashboard with harvest quick-add, recent batches, payments, and prices |
| `AddHarvestFlow.tsx` | 5-step wizard: crop selection → quantity → date → quality → confirmation |
| `BatchTrackingPage.tsx` | Visual timeline for batch journey tracking |
| `MarketPricesPage.tsx` | Full market price listing |
| `PaymentsPage.tsx` | Payment history and status |

### State Management

The app uses React's `useState` for local state management with the following data structures:

```typescript
interface Batch {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  quality: string;
  status: "listed" | "quality-check" | "in-transit" | "at-mandi" | "sold";
  qrCode?: string;
  createdAt: string;
}

interface Payment {
  id: string;
  batchId: string;
  amount: number;
  date: string;
  status: "received" | "pending";
}
```

## Localization

The app supports bilingual operation with complete translations for:

| Feature | English | Odia |
|---------|---------|------|
| Navigation | Dashboard, Add Harvest | ଡ୍ୟାସବୋର୍ଡ, ନୂଆ ଫସଲ |
| Crops | Rice, Millet, Corn | ଧାନ, ମାଣ୍ଡିଆ, ମକା |
| Actions | Next, Back, Confirm | ପରବର୍ତ୍ତୀ, ପଛକୁ, ନିଶ୍ଚିତକରଣ |
| Status | Sold, In Transit | ବିକ୍ରି ହୋଇଛି, ପରିବହନରେ |

## Target Users

Designed for small and marginal farmers in rural India:
- **Low digital literacy**: Large UI elements, visual cues, voice input
- **Basic Android smartphones**: Lightweight, responsive design
- **Intermittent connectivity**: Offline-first architecture planned
- **Regional language preference**: Native Odia support

## Future Enhancements

- [ ] Backend API integration for real data persistence
- [ ] Blockchain smart contract integration for supply chain immutability
- [ ] Voice recognition for Odia language input
- [ ] SMS-based notifications for status updates
- [ ] Image-based crop quality assessment using AI
- [ ] Direct buyer-seller messaging
- [ ] Weather integration for harvest planning

## License

This project is part of the Krishi-Setu blockchain agriculture initiative.

---

**AnnaData** - Bringing transparency and trust to agricultural supply chains through blockchain technology.

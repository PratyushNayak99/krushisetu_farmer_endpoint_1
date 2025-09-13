import React, { useState } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import HomePage from "./components/HomePage";
import AddHarvestFlow from "./components/AddHarvestFlow";
import BatchTrackingPage from "./components/BatchTrackingPage";
import MarketPricesPage from "./components/MarketPricesPage";
import PaymentsPage from "./components/PaymentsPage";

export interface Batch {
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

export interface Payment {
  id: string;
  batchId: string;
  amount: number;
  date: string;
  status: "received" | "pending";
}

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  market: string;
  date: string;
}

type ViewMode = "home" | "add-harvest" | "batch-tracking" | "market-prices" | "payments";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [language, setLanguage] = useState<"odia" | "english">("odia");
  const [isOffline, setIsOffline] = useState(false);

  // Demo data for AnnaData prototype
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "B001",
      cropType: "rice",
      quantity: 10,
      unit: "quintals",
      harvestDate: "2024-01-15",
      quality: "good",
      status: "sold",
      qrCode: "QR_B001_2024",
      createdAt: "2024-01-10"
    },
    {
      id: "B002", 
      cropType: "millet",
      quantity: 5,
      unit: "quintals",
      harvestDate: "2024-01-20",
      quality: "average",
      status: "at-mandi",
      qrCode: "QR_B002_2024",
      createdAt: "2024-01-18"
    }
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: "P001",
      batchId: "B001", 
      amount: 18500,
      date: "2024-01-25",
      status: "received"
    }
  ]);

  const [marketPrices] = useState<MarketPrice[]>([
    {
      crop: "rice",
      price: 1850,
      unit: "quintal",
      market: "Bhubaneswar Mandi",
      date: "2024-01-26"
    },
    {
      crop: "millet",
      price: 2200,
      unit: "quintal", 
      market: "Bhubaneswar Mandi",
      date: "2024-01-26"
    },
    {
      crop: "corn",
      price: 1650,
      unit: "quintal",
      market: "Bhubaneswar Mandi", 
      date: "2024-01-26"
    }
  ]);

  const addNewBatch = (newBatch: Omit<Batch, "id" | "createdAt">) => {
    const batch: Batch = {
      ...newBatch,
      id: `B${(batches.length + 1).toString().padStart(3, "0")}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBatches(prev => [batch, ...prev]);
  };

  const handleNavigation = (view: ViewMode, batch?: Batch) => {
    setCurrentView(view);
    if (batch) {
      setSelectedBatch(batch);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomePage
            batches={batches}
            payments={payments}
            marketPrices={marketPrices}
            language={language}
            isOffline={isOffline}
            onNavigate={handleNavigation}
            onLanguageToggle={() => 
              setLanguage(lang => lang === "odia" ? "english" : "odia")
            }
          />
        );
      
      case "add-harvest":
        return (
          <AddHarvestFlow
            language={language}
            onComplete={addNewBatch}
            onBack={() => setCurrentView("home")}
          />
        );
      
      case "batch-tracking":
        return (
          <BatchTrackingPage
            batch={selectedBatch}
            language={language}
            onBack={() => setCurrentView("home")}
          />
        );
      
      case "market-prices":
        return (
          <MarketPricesPage
            prices={marketPrices}
            language={language}
            onBack={() => setCurrentView("home")}
          />
        );
      
      case "payments":
        return (
          <PaymentsPage
            payments={payments}
            batches={batches}
            language={language}
            onBack={() => setCurrentView("home")}
          />
        );
      
      default:
        return null;
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-[393px] h-[852px] bg-white relative overflow-hidden rounded-[40px] shadow-2xl border-8 border-gray-800">
        {renderCurrentView()}
      </div>
    </div>
  );
}
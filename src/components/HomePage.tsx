import React from "react";
import { Plus, Mic, Globe, Wifi, WifiOff } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Batch, Payment, MarketPrice } from "../App";

interface HomePageProps {
  batches: Batch[];
  payments: Payment[];
  marketPrices: MarketPrice[];
  language: "odia" | "english";
  isOffline: boolean;
  onNavigate: (
    view: "add-harvest" | "batch-tracking" | "market-prices" | "payments",
    batch?: Batch
  ) => void;
  onLanguageToggle: () => void;
}

const translations = {
  odia: {
    welcome: "ସ୍ୱାଗତ",
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    addNewHarvest: "ନୂଆ ଫସଲ ଯୋଗ କରନ୍ତୁ",
    myBatches: "ମୋର ବ୍ୟାଚ",
    recentPayments: "ସାମ୍ପ୍ରତିକ ପେମେଣ୍ଟ",
    marketPrices: "ବଜାର ମୂଲ୍ୟ",
    voiceAssistant: "ଆବାଜ ସହାୟକ",
    offline: "ଅଫଲାଇନ",
    online: "ଅନଲାଇନ",
    quintals: "କ୍ୱିଣ୍ଟାଲ",
    inMandi: "ମଣ୍ଡିରେ",
    sold: "ବିକ୍ରି ହୋଇଛି",
    qualityCheck: "ଗୁଣବତ୍ତା ପରୀକ୍ଷା",
    listed: "ତାଲିକାଭୁକ୍ତ",
    inTransit: "ପରିବହନରେ",
    atMandi: "ମଣ୍ଡିରେ",
    viewAll: "ସବୁ ଦେଖନ୍ତୁ",
    rupees: "₹"
  },
  english: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    addNewHarvest: "Add New Harvest",
    myBatches: "My Batches",
    recentPayments: "Recent Payments",
    marketPrices: "Market Prices",
    voiceAssistant: "Voice Assistant",
    offline: "Offline",
    online: "Online",
    quintals: "Quintals",
    inMandi: "In Mandi",
    sold: "Sold",
    qualityCheck: "Quality Check",
    listed: "Listed",
    inTransit: "In Transit",
    atMandi: "At Mandi",
    viewAll: "View All",
    rupees: "₹"
  }
};

const cropImages = {
  rice: "https://images.unsplash.com/photo-1600387845879-a4713f764110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyaWNlJTIwY3JvcCUyMGhhcnZlc3R8ZW58MXx8fHwxNzU3NzM4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  millet: "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWxsZXQlMjBncmFpbiUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzczODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  corn: "https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3JuJTIwbWFpemUlMjBjcm9wfGVufDF8fHx8MTc1NzczODMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  tomato: "https://images.unsplash.com/photo-1755123187614-3b922872bff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b21hdG8lMjB2ZWdldGFibGVzJTIwaGFydmVzdHxlbnwxfHx8fDE3NTc3MzgzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

// 🔥 Tailwind-safe mapping (no dynamic strings)
const statusColors: Record<Batch["status"], string> = {
  sold: "text-green-600 bg-green-50",
  "at-mandi": "text-blue-600 bg-blue-50",
  "in-transit": "text-yellow-600 bg-yellow-50",
  "quality-check": "text-orange-600 bg-orange-50",
  listed: "text-gray-600 bg-gray-50"
};

export default function HomePage({
  batches,
  payments,
  marketPrices,
  language,
  isOffline,
  onNavigate,
  onLanguageToggle
}: HomePageProps) {
  const t = translations[language];
  const recentBatches = batches.slice(0, 3);
  const recentPayment = payments[0];

  const getStatusText = (status: Batch["status"]) => {
    const statusMap = {
      sold: t.sold,
      "at-mandi": t.atMandi,
      "in-transit": t.inTransit,
      "quality-check": t.qualityCheck,
      listed: t.listed
    };
    return statusMap[status] || status;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium">{t.welcome}</h1>
            <p className="text-green-100 text-sm">AnnaData</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Offline/Online Indicator */}
            <div className="flex items-center gap-1">
              {isOffline ? (
                <WifiOff className="w-4 h-4" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              <span className="text-xs">{isOffline ? t.offline : t.online}</span>
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLanguageToggle}
              className="text-white hover:bg-green-500 h-8 px-2"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "odia" ? "ENG" : "ଓଡ଼ିଆ"}
            </Button>
          </div>
        </div>

        {/* Voice Assistant Button */}
        <div className="flex justify-center mb-4">
          <Button
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50 h-12 px-6"
          >
            <Mic className="w-5 h-5 mr-2" />
            {t.voiceAssistant}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Add New Harvest */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <Button
            onClick={() => onNavigate("add-harvest")}
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-6 h-6 mr-3" />
            <span className="text-lg">{t.addNewHarvest}</span>
          </Button>
        </Card>

        {/* My Batches */}
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t.myBatches}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("batch-tracking")}
            >
              {t.viewAll}
            </Button>
          </div>

          <div className="space-y-3">
            {recentBatches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => onNavigate("batch-tracking", batch)}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <ImageWithFallback
                  src={cropImages[batch.cropType as keyof typeof cropImages] || cropImages.rice}
                  alt={batch.cropType}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium capitalize">{batch.cropType}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        statusColors[batch.status] || "text-gray-600 bg-gray-50"
                      }`}
                    >
                      {getStatusText(batch.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {batch.quantity} {t.quintals} • {batch.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Payments */}
        {recentPayment && (
          <Card className="mb-6 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{t.recentPayments}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("payments")}
              >
                {t.viewAll}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">
                  {t.rupees}
                  {recentPayment.amount.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">{recentPayment.date}</p>
              </div>
              <div className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                {recentPayment.status === "received" ? "✓" : "⏳"}
              </div>
            </div>
          </Card>
        )}

        {/* Market Prices */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t.marketPrices}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("market-prices")}
            >
              {t.viewAll}
            </Button>
          </div>

          <div className="space-y-3">
            {marketPrices.slice(0, 3).map((price, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={cropImages[price.crop as keyof typeof cropImages] || cropImages.rice}
                    alt={price.crop}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium capitalize">{price.crop}</p>
                    <p className="text-sm text-gray-600">{price.market}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {t.rupees}
                    {price.price}
                  </p>
                  <p className="text-sm text-gray-600">/{price.unit}</p>
                </div>
                

              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

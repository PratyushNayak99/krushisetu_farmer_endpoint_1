import React from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { MarketPrice } from "../App";

interface MarketPricesPageProps {
  prices: MarketPrice[];
  language: "odia" | "english";
  onBack: () => void;
}

const translations = {
  odia: {
    marketPrices: "ବଜାର ମୂଲ୍ୟ",
    todaysPrices: "ଆଜିର ମୂଲ୍ୟ",
    crop: "ଫସଲ",
    price: "ମୂଲ୍ୟ",
    market: "ବଜାର",
    lastUpdated: "ଶେଷ ଅପଡେଟ",
    trend: "ଟ୍ରେଣ୍ଡ",
    up: "ବଢ଼ିଛି",
    down: "କମିଛି", 
    stable: "ସ୍ଥିର",
    quintals: "କ୍ୱିଣ୍ଟାଲ",
    rice: "ଧାନ",
    millet: "ମାଣ୍ଡିଆ",
    corn: "ମକା",
    tomato: "ଟମାଟୋ",
    potato: "ଆଳୁ",
    onion: "ପିଆଜ",
    rupees: "₹"
  },
  english: {
    marketPrices: "Market Prices",
    todaysPrices: "Today's Prices",
    crop: "Crop",
    price: "Price",
    market: "Market",
    lastUpdated: "Last Updated",
    trend: "Trend",
    up: "Up",
    down: "Down",
    stable: "Stable",
    quintals: "Quintals",
    rice: "Rice",
    millet: "Millet/Ragi",
    corn: "Corn/Maize",
    tomato: "Tomato",
    potato: "Potato",
    onion: "Onion",
    rupees: "₹"
  }
};

const cropImages = {
  rice: "https://images.unsplash.com/photo-1600387845879-a4713f764110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyaWNlJTIwY3JvcCUyMGhhcnZlc3R8ZW58MXx8fHwxNzU3NzM4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  millet: "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWxsZXQlMjBncmFpbiUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzczODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  corn: "https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3JuJTIwbWFpemUlMjBjcm9wfGVufDF8fHx8MTc1NzczODMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  tomato: "https://images.unsplash.com/photo-1755123187614-3b922872bff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b21hdG8lMjB2ZWdldGFibGVzJTIwaGFydmVzdHxlbnwxfHx8fDE3NTc3MzgzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

// Mock trend data - in real app this would come from historical price data
const priceTrends = {
  rice: { direction: "up", change: 5.2 },
  millet: { direction: "stable", change: 0 },
  corn: { direction: "down", change: -3.1 },
  tomato: { direction: "up", change: 8.5 }
};

export default function MarketPricesPage({ prices, language, onBack }: MarketPricesPageProps) {
  const t = translations[language];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 pt-12">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-green-500 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium">{t.marketPrices}</h1>
          <div className="w-9" />
        </div>
        
        <div className="text-center mt-4">
          <p className="text-green-100 text-sm">{t.lastUpdated}: {formatDate(prices[0]?.date || new Date().toISOString())}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="font-medium mb-4">{t.todaysPrices}</h2>
          
          <div className="space-y-4">
            {prices.map((priceData, index) => {
              const trend = priceTrends[priceData.crop as keyof typeof priceTrends];
              
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Crop Image */}
                    <ImageWithFallback
                      src={cropImages[priceData.crop as keyof typeof cropImages] || cropImages.rice}
                      alt={priceData.crop}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    {/* Crop Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium capitalize">
                          {t[priceData.crop as keyof typeof t] as string || priceData.crop}
                        </h3>
                        {trend && (
                          <div className="flex items-center gap-1">
                            {getTrendIcon(trend.direction)}
                            <span className={`text-sm ${getTrendColor(trend.direction)}`}>
                              {trend.change !== 0 && (trend.change > 0 ? "+" : "")}{trend.change}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-medium text-green-600">
                            {t.rupees}{priceData.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">/{priceData.unit}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{priceData.market}</p>
                          <p className="text-xs text-gray-500">{formatDate(priceData.date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Price Insights */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-800 mb-3">ମୂଲ୍ୟ ସୂଚନା (Price Insights)</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• ଧାନର ମୂଲ୍ୟ ଗତ ସପ୍ତାହ ତୁଳନାରେ ବଢ଼ିଛି</p>
            <p>• ଟମାଟୋର ଚାହିଦା ଅଧିକ ଥିବାରୁ ମୂଲ୍ୟ ବଢ଼ୁଛି</p>
            <p>• ମକା ମୂଲ୍ୟ ସ୍ଥିର ରହିବାର ସମ୍ଭାବନା</p>
          </div>
        </Card>

        {/* Market Locations */}
        <Card className="mt-4 p-4">
          <h3 className="font-medium mb-3">ନିକଟବର୍ତ୍ତୀ ମଣ୍ଡି (Nearby Markets)</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Bhubaneswar Mandi</p>
                <p className="text-sm text-gray-600">12 km away</p>
              </div>
              <Button variant="outline" size="sm">
                ମୂଲ୍ୟ ଦେଖନ୍ତୁ
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Cuttack APMC</p>
                <p className="text-sm text-gray-600">28 km away</p>
              </div>
              <Button variant="outline" size="sm">
                ମୂଲ୍ୟ ଦେଖନ୍ତୁ
              </Button>
            </div>
          </div>
        </Card>

        {/* Price Alert Setup */}
        <Card className="mt-4 p-4 bg-yellow-50 border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-3">ମୂଲ୍ୟ ସତର୍କତା (Price Alerts)</h3>
          <p className="text-sm text-yellow-700 mb-3">
            ଆପଣଙ୍କ ଫସଲର ମୂଲ୍ୟ ବଢ଼ିଲେ ସୂଚନା ପାଆନ୍ତୁ
          </p>
          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
            ମୂଲ୍ୟ ସତର୍କତା ସେଟ କରନ୍ତୁ
          </Button>
        </Card>
      </div>
    </div>
  );
}
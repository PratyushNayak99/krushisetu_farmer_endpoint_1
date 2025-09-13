import React, { useState } from "react";
import { ArrowLeft, Mic, Calendar, Star, QrCode, Share, Printer } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import type { Batch } from "../App";

interface AddHarvestFlowProps {
  language: "odia" | "english";
  onComplete: (batch: Omit<Batch, "id" | "createdAt">) => void;
  onBack: () => void;
}

type FlowStep = "crop-selection" | "quantity" | "harvest-date" | "quality" | "confirmation";

const translations = {
  odia: {
    addNewHarvest: "ନୂଆ ଫସଲ ଯୋଗ କରନ୍ତୁ",
    selectCrop: "ଫସଲ ବାଛନ୍ତୁ",
    enterQuantity: "ପରିମାଣ ଲେଖନ୍ତୁ",
    selectDate: "ତାରିଖ ବାଛନ୍ତୁ",
    assessQuality: "ଗୁଣବତ୍ତା ନିର୍ଣ୍ଣୟ କରନ୍ତୁ",
    confirmation: "ନିଶ୍ଚିତକରଣ",
    rice: "ଧାନ",
    millet: "ମାଣ୍ଡିଆ",
    corn: "ମକା",
    tomato: "ଟମାଟୋ",
    potato: "ଆଳୁ",
    onion: "ପିଆଜ",
    quantity: "ପରିମାଣ",
    quintals: "କ୍ୱିଣ୍ଟାଲ",
    bags: "ବସ୍ତା",
    harvestDate: "ଫସଲ ତାରିଖ",
    expectedPickup: "ଆଶା କରାଯାଉଥିବା ଉଠାଇବା ତାରିଖ",
    goodQuality: "ଭଲ ଗୁଣବତ୍ତା",
    averageQuality: "ସାଧାରଣ ଗୁଣବତ୍ତା", 
    needsCheck: "ପରୀକ୍ଷା ଆବଶ୍ୟକ",
    requestAssayer: "ଗୁଣବତ୍ତା ପରୀକ୍ଷକ ଡାକନ୍ତୁ",
    summary: "ସାରାଂଶ",
    confirmListing: "ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ",
    shareQR: "QR କୋଡ ସେୟାର କରନ୍ତୁ",
    printQR: "QR କୋଡ ପ୍ରିଣ୍ଟ କରନ୍ତୁ",
    next: "ପରବର୍ତ୍ତୀ",
    back: "ପଛକୁ",
    voiceInput: "ଆବାଜ ଇନପୁଟ",
    tapToSpeak: "କହିବା ପାଇଁ ଟ୍ୟାପ କରନ୍ତୁ"
  },
  english: {
    addNewHarvest: "Add New Harvest",
    selectCrop: "Select Crop",
    enterQuantity: "Enter Quantity",
    selectDate: "Select Date",
    assessQuality: "Assess Quality",
    confirmation: "Confirmation",
    rice: "Rice",
    millet: "Millet/Ragi",
    corn: "Corn/Maize",
    tomato: "Tomato",
    potato: "Potato",
    onion: "Onion",
    quantity: "Quantity",
    quintals: "Quintals",
    bags: "Bags",
    harvestDate: "Harvest Date",
    expectedPickup: "Expected Pickup Date",
    goodQuality: "Good Quality",
    averageQuality: "Average Quality",
    needsCheck: "Needs Check",
    requestAssayer: "Request Quality Assayer",
    summary: "Summary",
    confirmListing: "Confirm Listing",
    shareQR: "Share QR Code",
    printQR: "Print QR Code",
    next: "Next",
    back: "Back",
    voiceInput: "Voice Input",
    tapToSpeak: "Tap to Speak"
  }
};

const cropOptions = [
  {
    id: "rice",
    image: "https://images.unsplash.com/photo-1600387845879-a4713f764110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyaWNlJTIwY3JvcCUyMGhhcnZlc3R8ZW58MXx8fHwxNzU3NzM4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "millet",
    image: "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWxsZXQlMjBncmFpbiUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzczODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "corn",
    image: "https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3JuJTIwbWFpemUlMjBjcm9wfGVufDF8fHx8MTc1NzczODMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "tomato",
    image: "https://images.unsplash.com/photo-1755123187614-3b922872bff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b21hdG8lMjB2ZWdldGFibGVzJTIwaGFydmVzdHxlbnwxfHx8fDE3NTc3MzgzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export default function AddHarvestFlow({ language, onComplete, onBack }: AddHarvestFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("crop-selection");
  const [formData, setFormData] = useState({
    cropType: "",
    quantity: 0,
    unit: "quintals",
    harvestDate: "",
    quality: ""
  });

  const t = translations[language];

  const handleNext = () => {
    const steps: FlowStep[] = ["crop-selection", "quantity", "harvest-date", "quality", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: FlowStep[] = ["crop-selection", "quantity", "harvest-date", "quality", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    const batch: Omit<Batch, "id" | "createdAt"> = {
      cropType: formData.cropType,
      quantity: formData.quantity,
      unit: formData.unit,
      harvestDate: formData.harvestDate,
      quality: formData.quality,
      status: "listed",
      qrCode: `QR_${formData.cropType}_${Date.now()}`
    };
    onComplete(batch);
    onBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "crop-selection":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium mb-2">{t.selectCrop}</h2>
              <p className="text-gray-600">ଟ୍ୟାପ କରି ଆପଣଙ୍କ ଫସଲ ବାଛନ୍ତୁ</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cropOptions.map((crop) => (
                <Card
                  key={crop.id}
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    formData.cropType === crop.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setFormData({ ...formData, cropType: crop.id })}
                >
                  <ImageWithFallback
                    src={crop.image}
                    alt={crop.id}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <p className="text-center font-medium capitalize">
                    {t[crop.id as keyof typeof t] as string}
                  </p>
                </Card>
              ))}
            </div>

            {/* Voice Input Option */}
            <Card className="p-4 border-dashed border-2 border-gray-300">
              <div className="text-center">
                <Button variant="outline" className="w-full h-16">
                  <Mic className="w-5 h-5 mr-2" />
                  {t.tapToSpeak}
                </Button>
              </div>
            </Card>
          </div>
        );

      case "quantity":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium mb-2">{t.enterQuantity}</h2>
              <p className="text-gray-600">ଆପଣଙ୍କ ଫସଲର ପରିମାଣ ଲେଖନ୍ତୁ</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="number"
                  value={formData.quantity || ""}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  placeholder="0"
                  className="h-16 text-center text-2xl border-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={formData.unit === "quintals" ? "default" : "outline"}
                  className="flex-1 h-12"
                  onClick={() => setFormData({ ...formData, unit: "quintals" })}
                >
                  {t.quintals}
                </Button>
                <Button
                  variant={formData.unit === "bags" ? "default" : "outline"}
                  className="flex-1 h-12"
                  onClick={() => setFormData({ ...formData, unit: "bags" })}
                >
                  {t.bags}
                </Button>
              </div>
            </div>

            {/* Quick quantity buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 5, 10, 20, 50, 100].map((qty) => (
                <Button
                  key={qty}
                  variant="outline"
                  className="h-12"
                  onClick={() => setFormData({ ...formData, quantity: qty })}
                >
                  {qty}
                </Button>
              ))}
            </div>
          </div>
        );

      case "harvest-date":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium mb-2">{t.expectedPickup}</h2>
              <p className="text-gray-600">କେବେ ଉଠାଇବା ପାଇଁ ପ୍ରସ୍ତୁତ ହେବ?</p>
            </div>

            <div className="space-y-4">
              <Input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="h-16 text-center text-lg border-2"
                min={new Date().toISOString().split('T')[0]}
              />

              {/* Quick date options */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "ଆଜି", value: 0 },
                  { label: "କାଲି", value: 1 },
                  { label: "3 ଦିନ", value: 3 },
                  { label: "1 ସପ୍ତାହ", value: 7 }
                ].map((option) => {
                  const date = new Date();
                  date.setDate(date.getDate() + option.value);
                  const dateString = date.toISOString().split('T')[0];
                  
                  return (
                    <Button
                      key={option.label}
                      variant="outline"
                      className="h-12"
                      onClick={() => setFormData({ ...formData, harvestDate: dateString })}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "quality":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium mb-2">{t.assessQuality}</h2>
              <p className="text-gray-600">ଆପଣଙ୍କ ଫସଲର ଗୁଣବତ୍ତା କେମିତି?</p>
            </div>

            <div className="space-y-4">
              {[
                { id: "good", label: t.goodQuality, color: "green", icon: "😊" },
                { id: "average", label: t.averageQuality, color: "yellow", icon: "😐" },
                { id: "poor", label: t.needsCheck, color: "orange", icon: "🤔" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    formData.quality === option.id
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, quality: option.id })}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{option.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                <Star className="w-5 h-5 mr-2" />
                {t.requestAssayer}
              </Button>
            </Card>
          </div>
        );

      case "confirmation":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium mb-2">{t.confirmation}</h2>
              <p className="text-gray-600">ବିବରଣୀ ପରୀକ୍ଷା କରନ୍ତୁ</p>
            </div>

            {/* Summary */}
            <Card className="p-4 space-y-3">
              <h3 className="font-medium mb-3">{t.summary}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ଫସଲ:</span>
                  <span className="capitalize">{t[formData.cropType as keyof typeof t] as string}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.quantity}:</span>
                  <span>{formData.quantity} {t[formData.unit as keyof typeof t] as string}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ତାରିଖ:</span>
                  <span>{formData.harvestDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ଗୁଣବତ୍ତା:</span>
                  <span>{t[`${formData.quality}Quality` as keyof typeof t] as string}</span>
                </div>
              </div>
            </Card>

            {/* QR Code Display */}
            <Card className="p-6 text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">QR କୋଡ ସ୍ୱୟଂଚାଳିତ ତିଆରି ହେବ</p>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  {t.shareQR}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="w-4 h-4 mr-2" />
                  {t.printQR}
                </Button>
              </div>
            </Card>

            <Button 
              onClick={handleComplete}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              {t.confirmListing}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "crop-selection": return formData.cropType !== "";
      case "quantity": return formData.quantity > 0;
      case "harvest-date": return formData.harvestDate !== "";
      case "quality": return formData.quality !== "";
      case "confirmation": return true;
      default: return false;
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
            onClick={handleBack}
            className="text-white hover:bg-green-500 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium">{t.addNewHarvest}</h1>
          <div className="w-9" />
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mt-4 gap-2">
          {["crop-selection", "quantity", "harvest-date", "quality", "confirmation"].map((step, index) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${
                step === currentStep ? "bg-white" : 
                ["crop-selection", "quantity", "harvest-date", "quality", "confirmation"].indexOf(currentStep) > index
                  ? "bg-green-300" : "bg-green-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderStepContent()}
      </div>

      {/* Footer */}
      {currentStep !== "confirmation" && (
        <div className="p-4 border-t">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
          >
            {t.next}
          </Button>
        </div>
      )}
    </div>
  );
}
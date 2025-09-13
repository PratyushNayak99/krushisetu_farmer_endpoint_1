import React from "react";
import { ArrowLeft, CheckCircle, Clock, Truck, Home, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Batch } from "../App";

interface BatchTrackingPageProps {
  batch: Batch | null;
  language: "odia" | "english";
  onBack: () => void;
}

const translations = {
  odia: {
    batchTracking: "ବ୍ୟାଚ ଟ୍ରାକିଂ",
    batchId: "ବ୍ୟାଚ ID",
    cropType: "ଫସଲ ପ୍ରକାର",
    quantity: "ପରିମାଣ",
    harvestDate: "ଫସଲ ତାରିଖ",
    quality: "ଗୁଣବତ୍ତା",
    status: "ସ୍ଥିତି",
    timeline: "ସମୟସୀମା",
    listed: "ତାଲିକାଭୁକ୍ତ",
    qualityCheck: "ଗୁଣବତ୍ତା ପରୀକ୍ଷା",
    inTransit: "ପରିବହନରେ",
    atMandi: "ମଣ୍ଡିରେ",
    sold: "ବିକ୍ରି ହୋଇଛି",
    paymentReceived: "ପେମେଣ୍ଟ ପ୍ରାପ୍ତ",
    completed: "ସମ୍ପୂର୍ଣ୍ଣ",
    inProgress: "ଚାଲିଛି",
    pending: "ବାକି ଅଛି",
    quintals: "କ୍ୱିଣ୍ଟାଲ",
    good: "ଭଲ",
    average: "ସାଧାରଣ",
    poor: "ଖରାପ"
  },
  english: {
    batchTracking: "Batch Tracking",
    batchId: "Batch ID",
    cropType: "Crop Type",
    quantity: "Quantity",
    harvestDate: "Harvest Date",
    quality: "Quality",
    status: "Status",
    timeline: "Timeline",
    listed: "Listed",
    qualityCheck: "Quality Check",
    inTransit: "In Transit",
    atMandi: "At Mandi",
    sold: "Sold",
    paymentReceived: "Payment Received",
    completed: "Completed",
    inProgress: "In Progress",
    pending: "Pending",
    quintals: "Quintals",
    good: "Good",
    average: "Average",
    poor: "Poor"
  }
};

const timelineSteps = [
  {
    id: "listed",
    icon: Home,
    color: "green"
  },
  {
    id: "qualityCheck",
    icon: CheckCircle,
    color: "blue"
  },
  {
    id: "inTransit",
    icon: Truck,
    color: "yellow"
  },
  {
    id: "atMandi",
    icon: Home,
    color: "orange"
  },
  {
    id: "sold",
    icon: DollarSign,
    color: "green"
  }
];

export default function BatchTrackingPage({ batch, language, onBack }: BatchTrackingPageProps) {
  const t = translations[language];

  if (!batch) {
    return (
      <div className="h-full bg-white flex flex-col">
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
            <h1 className="text-lg font-medium">{t.batchTracking}</h1>
            <div className="w-9" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No batch selected</p>
        </div>
      </div>
    );
  }

  const getStepStatus = (stepId: string) => {
    const statusOrder = ["listed", "quality-check", "in-transit", "at-mandi", "sold"];
    const currentStatusIndex = statusOrder.indexOf(batch.status);
    const stepIndex = statusOrder.indexOf(stepId.replace(/([A-Z])/g, '-$1').toLowerCase());
    
    if (stepIndex < currentStatusIndex) return "completed";
    if (stepIndex === currentStatusIndex) return "inProgress";
    return "pending";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const getQualityText = (quality: string) => {
    const qualityMap = {
      good: t.good,
      average: t.average,
      poor: t.poor
    };
    return qualityMap[quality as keyof typeof qualityMap] || quality;
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      listed: t.listed,
      "quality-check": t.qualityCheck,
      "in-transit": t.inTransit,
      "at-mandi": t.atMandi,
      sold: t.sold
    };
    return statusMap[status as keyof typeof statusMap] || status;
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
          <h1 className="text-lg font-medium">{t.batchTracking}</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Batch Details */}
        <Card className="p-4">
          <h2 className="font-medium mb-4">{t.batchId}: {batch.id}</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">{t.cropType}</p>
              <p className="font-medium capitalize">{batch.cropType}</p>
            </div>
            
            <div>
              <p className="text-gray-600">{t.quantity}</p>
              <p className="font-medium">{batch.quantity} {t.quintals}</p>
            </div>
            
            <div>
              <p className="text-gray-600">{t.harvestDate}</p>
              <p className="font-medium">{formatDate(batch.harvestDate)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">{t.quality}</p>
              <p className="font-medium">{getQualityText(batch.quality)}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">{t.status}</p>
              <span className={`px-3 py-1 rounded-full text-sm ${
                batch.status === "sold" ? "bg-green-100 text-green-700" :
                batch.status === "at-mandi" ? "bg-blue-100 text-blue-700" :
                batch.status === "in-transit" ? "bg-yellow-100 text-yellow-700" :
                batch.status === "quality-check" ? "bg-orange-100 text-orange-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {getStatusText(batch.status)}
              </span>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-4">
          <h3 className="font-medium mb-6">{t.timeline}</h3>
          
          <div className="space-y-6">
            {timelineSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              const IconComponent = step.icon;
              
              return (
                <div key={step.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    status === "completed" ? `bg-${step.color}-100` :
                    status === "inProgress" ? `bg-${step.color}-100` :
                    "bg-gray-100"
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      status === "completed" ? `text-${step.color}-600` :
                      status === "inProgress" ? `text-${step.color}-600` :
                      "text-gray-400"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        status === "completed" || status === "inProgress" ? "text-gray-900" : "text-gray-400"
                      }`}>
                        {t[step.id as keyof typeof t] as string}
                      </p>
                      
                      {status === "completed" && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      
                      {status === "inProgress" && (
                        <Clock className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      {status === "completed" ? t.completed :
                       status === "inProgress" ? t.inProgress :
                       t.pending}
                    </p>
                    
                    {status === "completed" && (
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(batch.createdAt)}
                      </p>
                    )}
                  </div>
                  
                  {/* Connector Line */}
                  {index < timelineSteps.length - 1 && (
                    <div className={`absolute left-8 mt-10 w-0.5 h-6 ${
                      status === "completed" ? "bg-green-200" : "bg-gray-200"
                    }`} style={{ marginLeft: "-2px" }} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* QR Code */}
        {batch.qrCode && (
          <Card className="p-4">
            <h3 className="font-medium mb-4">QR Code</h3>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <p className="text-gray-500 text-xs">{batch.qrCode}</p>
              </div>
              <p className="text-sm text-gray-600">ଏହି QR କୋଡ ସ୍କାନ କରି ବିବରଣୀ ଦେଖନ୍ତୁ</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
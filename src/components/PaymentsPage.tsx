import React from "react";
import { ArrowLeft, CheckCircle, Clock, DollarSign, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Payment, Batch } from "../App";

interface PaymentsPageProps {
  payments: Payment[];
  batches: Batch[];
  language: "odia" | "english";
  onBack: () => void;
}

const translations = {
  odia: {
    payments: "ପେମେଣ୍ଟ",
    paymentHistory: "ପେମେଣ୍ଟ ଇତିହାସ",
    totalEarnings: "ମୋଟ ଆୟ",
    pendingPayments: "ବାକି ପେମେଣ୍ଟ",
    completedPayments: "ସମ୍ପୂର୍ଣ୍ଣ ପେମେଣ୍ଟ",
    batchId: "ବ୍ୟାଚ ID",
    amount: "ରାଶି",
    date: "ତାରିଖ",
    status: "ସ୍ଥିତି",
    received: "ପ୍ରାପ୍ତ",
    pending: "ବାକି",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    rupees: "₹",
    thisMonth: "ଏହି ମାସ",
    lastMonth: "ଗତ ମାସ",
    totalAmount: "ମୋଟ ରାଶି",
    noPayments: "କୌଣସି ପେମେଣ୍ଟ ନାହିଁ",
    bankAccount: "ବ୍ୟାଙ୍କ ଖାତା",
    accountLinked: "ଖାତା ଲିଙ୍କ ହୋଇଛି",
    linkAccount: "ଖାତା ଲିଙ୍କ କରନ୍ତୁ"
  },
  english: {
    payments: "Payments",
    paymentHistory: "Payment History",
    totalEarnings: "Total Earnings",
    pendingPayments: "Pending Payments",
    completedPayments: "Completed Payments",
    batchId: "Batch ID",
    amount: "Amount",
    date: "Date",
    status: "Status",
    received: "Received",
    pending: "Pending",
    viewDetails: "View Details",
    rupees: "₹",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    totalAmount: "Total Amount",
    noPayments: "No Payments",
    bankAccount: "Bank Account",
    accountLinked: "Account Linked",
    linkAccount: "Link Account"
  }
};

export default function PaymentsPage({ payments, batches, language, onBack }: PaymentsPageProps) {
  const t = translations[language];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const getBatchInfo = (batchId: string) => {
    return batches.find(batch => batch.id === batchId);
  };

  const totalEarnings = payments
    .filter(payment => payment.status === "received")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter(payment => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const receivedPayments = payments.filter(payment => payment.status === "received");
  const pendingPayments = payments.filter(payment => payment.status === "pending");

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
          <h1 className="text-lg font-medium">{t.payments}</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-600 mb-1">{t.totalEarnings}</p>
              <p className="text-2xl font-medium text-green-800">
                {t.rupees}{totalEarnings.toLocaleString()}
              </p>
            </div>
          </Card>
          
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="text-center">
              <p className="text-sm text-yellow-600 mb-1">{t.pendingPayments}</p>
              <p className="text-2xl font-medium text-yellow-800">
                {t.rupees}{pendingAmount.toLocaleString()}
              </p>
            </div>
          </Card>
        </div>

        {/* Bank Account Status */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">{t.bankAccount}</p>
                <p className="text-sm text-blue-600">{t.accountLinked}</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Payment History */}
        <div className="space-y-6">
          {/* Pending Payments */}
          {pendingPayments.length > 0 && (
            <div>
              <h2 className="font-medium mb-4 text-yellow-700">{t.pendingPayments}</h2>
              <div className="space-y-3">
                {pendingPayments.map((payment) => {
                  const batch = getBatchInfo(payment.batchId);
                  
                  return (
                    <Card key={payment.id} className="p-4 border-yellow-200 bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                          </div>
                          
                          <div>
                            <p className="font-medium">{t.rupees}{payment.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {t.batchId}: {payment.batchId}
                              {batch && ` • ${batch.cropType}`}
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">
                            {t.pending}
                          </span>
                          <Button variant="outline" size="sm" className="mt-2 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Payments */}
          {receivedPayments.length > 0 && (
            <div>
              <h2 className="font-medium mb-4 text-green-700">{t.completedPayments}</h2>
              <div className="space-y-3">
                {receivedPayments.map((payment) => {
                  const batch = getBatchInfo(payment.batchId);
                  
                  return (
                    <Card key={payment.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          
                          <div>
                            <p className="font-medium">{t.rupees}{payment.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {t.batchId}: {payment.batchId}
                              {batch && ` • ${batch.cropType}`}
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                            ✓ {t.received}
                          </span>
                          <Button variant="outline" size="sm" className="mt-2 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Payments State */}
          {payments.length === 0 && (
            <Card className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">{t.noPayments}</p>
              <p className="text-sm text-gray-500">ଆପଣଙ୍କ ପ୍ରଥମ ଫସଲ ବିକ୍ରି କରିବା ପରେ ପେମେଣ୍ଟ ଦେଖାଯିବ</p>
            </Card>
          )}
        </div>

        {/* Payment Summary */}
        {payments.length > 0 && (
          <Card className="mt-6 p-4 bg-gray-50">
            <h3 className="font-medium mb-3">ପେମେଣ୍ଟ ସାରାଂଶ (Payment Summary)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.totalAmount}:</span>
                <span className="font-medium">{t.rupees}{(totalEarnings + pendingAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.received}:</span>
                <span className="text-green-600">{t.rupees}{totalEarnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.pending}:</span>
                <span className="text-yellow-600">{t.rupees}{pendingAmount.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
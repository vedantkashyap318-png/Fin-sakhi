import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-xs text-rose-200 uppercase font-semibold">Store Policies</span>
            <h3 className="text-lg sm:text-xl font-bold font-devanagari mt-0.5">
              Terms & Conditions (नियम एवं शर्तें)
            </h3>
            <p className="text-xs text-rose-200 mt-0.5">
              Vedant K · Pratima · Navi Mumbai, Maharashtra
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3 p-3.5 bg-rose-50/60 rounded-xl border border-rose-100">
            <CreditCard className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900">Payment Modes & Verification</h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-slate-600 text-xs">
                <li>
                  Pay directly via GPay / PhonePe / Paytm: <span className="font-mono font-bold text-slate-800">7020378984</span>
                </li>
                <li>
                  Official UPI ID: <span className="font-mono font-bold text-slate-800">prakrish31-5@oksbi</span> (Pratima K)
                </li>
                <li>Always verify the payee name before sending funds.</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Truck className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900">Shipping & Delivery</h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-slate-600 text-xs">
                <li>Delivery Charge: Flat ₹40 across India.</li>
                <li>Orders are dispatched within 1-2 business days from Navi Mumbai, Maharashtra.</li>
                <li>Tracking details (India Post Speed Post / Reputed Courier) are shared via WhatsApp or SMS.</li>
                <li>Standard delivery window: 4-7 business days depending on delivery pincode.</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60">
            <RefreshCw className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900">Order Value & Replacement</h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-slate-600 text-xs">
                <li>Minimum Order Value: ₹230.</li>
                <li>Every book copy is inspected before packing. In the rare case of transit damage or binding defect, free replacement will be provided upon WhatsApp photo confirmation.</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900">Author Direct Dispatch Guarantee</h4>
              <p className="mt-1 text-slate-600 text-xs">
                Every copy of &ldquo;Fin सखी&rdquo; ordered through this official storefront is directly dispatched from the author&apos;s registered office in Navi Mumbai.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

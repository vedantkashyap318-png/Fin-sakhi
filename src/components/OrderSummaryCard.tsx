import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Truck, Plus, Minus, ArrowRight, QrCode, Share2 } from 'lucide-react';

interface OrderSummaryCardProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  pricePerUnit: number;
  deliveryCharge: number;
  gst: number;
  total: number;
  minOrderValue: number;
  onCheckout: () => void;
  onTermsClick: () => void;
  onContactClick: () => void;
  onQuickPayClick: () => void;
  onShareClick?: () => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  quantity,
  onQuantityChange,
  pricePerUnit,
  deliveryCharge,
  gst,
  total,
  minOrderValue,
  onCheckout,
  onTermsClick,
  onContactClick,
  onQuickPayClick,
  onShareClick,
}) => {
  const itemsSubtotal = pricePerUnit * quantity;
  const isEligible = itemsSubtotal >= minOrderValue;

  return (
    <div className="bg-white rounded-2xl border border-rose-100/90 shadow-md p-5 sm:p-6 flex flex-col gap-5">
      {/* Book Title & Price Badge */}
      <div className="border-b border-rose-100 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-rose-600 uppercase">
              Paperback Edition · ISBN: 978-93-5915-918-8
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-devanagari">
              Fin सखी
            </h1>
            <p className="text-sm font-medium text-rose-800 font-devanagari mt-0.5">
              वित्तीय साक्षरता से सशक्त नारी
            </p>
            <p className="text-xs text-slate-500 mt-1">
              लेखिका: <span className="font-semibold text-slate-700">प्रतिमा (Pratima)</span> · बैंकर एवं राष्ट्रीय बेस्टसेलर लेखिका
            </p>
          </div>

          <div className="text-right shrink-0 flex flex-col items-end">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹{pricePerUnit}
            </span>
            <span className="block text-[11px] text-emerald-700 font-medium">In Stock</span>
            {onShareClick && (
              <button
                type="button"
                onClick={onShareClick}
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                title="Share Fin सखी book"
              >
                <Share2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Share Book</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-rose-50/50 p-3 rounded-xl border border-rose-100">
        <div>
          <span className="text-xs font-semibold text-slate-800 block">प्रतियों की संख्या (Quantity)</span>
          <span className="text-[11px] text-slate-500">₹{pricePerUnit} प्रति पुस्तक</span>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-lg border border-rose-200 p-1 shadow-2xs">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded-md flex items-center justify-center text-slate-700 hover:bg-rose-50 active:bg-rose-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-8 text-center font-bold text-sm text-slate-900 font-mono tabular-nums">
            {quantity}
          </span>

          <button
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 rounded-md flex items-center justify-center text-slate-700 hover:bg-rose-50 active:bg-rose-100 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Itemized Order Breakdown */}
      <div className="space-y-2.5 text-sm">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span>Order Summary</span>
          <span className="font-mono text-slate-400 font-normal">INR ₹</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Items ({quantity})</span>
          <span className="font-mono tabular-nums font-medium text-slate-900">₹{itemsSubtotal}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-slate-400" />
            <span>Delivery Charges</span>
          </div>
          <span className="font-mono tabular-nums font-medium text-slate-900">₹{deliveryCharge}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>GST</span>
          <span className="font-mono tabular-nums font-medium text-slate-900">₹{gst}</span>
        </div>

        <div className="border-t border-slate-200 pt-2.5 flex items-center justify-between font-bold text-base sm:text-lg text-slate-900">
          <span>Order Total</span>
          <span className="font-mono tabular-nums text-rose-700">₹{total}</span>
        </div>

        <p className="text-[11px] text-slate-500 font-mono tabular-nums">
          Min. order value ₹ {minOrderValue}
        </p>
      </div>

      {/* Action Buttons: Checkout & Direct Scan */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          onClick={onCheckout}
          disabled={!isEligible}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group text-sm sm:text-base"
        >
          <span>Checkout & Enter Address · ₹{total}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={onQuickPayClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200/80 font-medium rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
        >
          <QrCode className="w-4 h-4 text-amber-700" />
          <span>Pay Directly with QR / GPay (UPI ID: prakrish31-5@oksbi)</span>
        </button>
      </div>

      {/* Store Terms and Conditions */}
      <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
        <div className="font-semibold text-slate-800">Store Terms and Conditions</div>
        <ul className="space-y-1 list-disc list-inside text-slate-600">
          <li>
            Pay directly via GPay: <span className="font-mono font-bold text-slate-800">7020378984</span>
          </li>
          <li>
            and above scanner / UPI ID: <span className="font-mono font-bold text-slate-800">prakrish31-5@oksbi</span>
          </li>
          <li>Order dispatched within 1-2 business days with India Post tracking.</li>
        </ul>
      </div>

      {/* Seller Identity & Contact info */}
      <div className="border-t border-rose-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-800 font-bold text-sm">
            VK
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Vedant K</h4>
            <p className="text-xs text-slate-500">pratima · navi mumbai Maharashtra</p>
          </div>
        </div>

        {/* Call & WhatsApp Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-3.5">
          <a
            href="tel:+917020378984"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 transition-colors shadow-2xs"
          >
            <Phone className="w-4 h-4 text-rose-600" />
            <span>Call</span>
          </a>

          <a
            href="https://wa.me/917020378984?text=Namaste!%20I%20want%20to%20order%20the%20book%20'Fin%20%E0%A4%B8%E0%A4%96%E0%A5%80'%20by%20author%20pratima%20k.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Footer Navigation Links for Terms & Contact */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
        <button
          onClick={onTermsClick}
          className="hover:text-rose-700 underline underline-offset-2 cursor-pointer transition-colors"
        >
          Terms & Conditions
        </button>

        <button
          onClick={onContactClick}
          className="hover:text-rose-700 underline underline-offset-2 cursor-pointer transition-colors"
        >
          Contact Us
        </button>
      </div>

      {/* Trust Marker */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>100% Genuine Direct Author Dispatch · Navi Mumbai</span>
      </div>
    </div>
  );
};

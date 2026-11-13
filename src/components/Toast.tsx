import React from 'react';
import { CheckCircle2, X, MessageCircle } from 'lucide-react';
import { SavedOrder } from '../types';

export interface ToastMessage {
  id: string;
  type: 'order_success' | 'info';
  title: string;
  message: string;
  order?: SavedOrder;
  actionText?: string;
  actionUrl?: string;
  timestamp?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 pointer-events-none flex flex-col gap-2.5 max-w-sm w-full">
      {toasts.map((toast) => {
        const whatsappUrl = toast.order
          ? `https://wa.me/917020378984?text=${encodeURIComponent(
              `Namaste Pratima ji / Vedant K, I have placed order ${toast.order.orderId} for ${toast.order.quantity} copies of Fin सखी (₹${toast.order.total}). Address: ${toast.order.addressLine}, ${toast.order.city}. Thank you!`
            )}`
          : 'https://wa.me/917020378984';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-rose-500/40 flex flex-col gap-2.5 animate-in slide-in-from-bottom-5 duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white font-devanagari">
                    {toast.title}
                  </h5>
                  <p className="text-xs text-rose-200 mt-0.5">{toast.message}</p>
                </div>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send to WhatsApp (+91 7020378984)</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

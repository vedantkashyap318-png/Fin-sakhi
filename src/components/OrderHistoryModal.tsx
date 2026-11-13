import React from 'react';
import { X, Package, Clock, MessageCircle, Trash2, MapPin, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { SavedOrder } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SavedOrder[];
  onClearHistory: () => void;
  onNewOrder: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onClearHistory,
  onNewOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-rose-200 uppercase font-semibold">
              <Package className="w-3.5 h-3.5" />
              <span>Purchase History</span>
            </div>
            <h3 className="text-xl font-bold font-devanagari mt-0.5">
              आपके पूर्व ऑर्डर (Order History)
            </h3>
            <p className="text-xs text-rose-200 mt-0.5">
              {orders.length} order{orders.length !== 1 ? 's' : ''} recorded on this device
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-slate-800 text-base font-devanagari">
                अभी तक कोई ऑर्डर दर्ज नहीं है (No orders yet)
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                जब आप Fin सखी पुस्तक के लिए भुगतान करेंगे, तो आपके ऑर्डर की प्रतिलिपि यहाँ स्वतः सुरक्षित हो जाएगी।
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewOrder();
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>अभी पुस्तक ऑर्डर करें (Order Now)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const whatsappStatusUrl = `https://wa.me/917020378984?text=${encodeURIComponent(
                  `Namaste Pratima ji / Vedant K, I am inquiring about the dispatch status of my order ${order.orderId} (Fin सखी - ${order.quantity} copies, ₹${order.total}). Delivery Address: ${order.addressLine}, ${order.city}. Thank you!`
                )}`;

                return (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-xl border border-rose-100/90 p-4 shadow-xs space-y-3 hover:border-rose-300 transition-colors"
                  >
                    {/* Top Row: Order ID, Date & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {order.orderId}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{order.timestamp}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{order.status}</span>
                      </span>
                    </div>

                    {/* Middle Details: Book Title, Qty & Total */}
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <h5 className="font-bold text-slate-900 font-devanagari text-sm">
                          Fin सखी - वित्तीय साक्षरता से सशक्त नारी
                        </h5>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          मात्रा (Quantity): <strong className="text-slate-700">{order.quantity} प्रति (Copies)</strong> · Paid via UPI ({order.upiId})
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-extrabold text-rose-800 font-mono tabular-nums">
                          ₹{order.total}
                        </span>
                        <span className="block text-[10px] text-slate-400">Paid in Full</span>
                      </div>
                    </div>

                    {/* Delivery Destination */}
                    <div className="bg-slate-50/80 rounded-lg p-2.5 text-xs text-slate-600 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                      <div className="flex-1 truncate">
                        <span className="font-semibold text-slate-800">{order.customerName}</span>
                        {order.phoneNumber && <span> ({order.phoneNumber})</span>}
                        <p className="text-[11px] text-slate-500 truncate">
                          {order.addressLine}, {order.city}, {order.state} - {order.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Track via WhatsApp */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        Dispatched via India Post Speed Post
                      </span>

                      <a
                        href={whatsappStatusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp पर स्टेटस पूछें</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {orders.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-100 p-4 px-6 flex items-center justify-between shrink-0">
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Order History</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

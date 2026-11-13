import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BookSlider } from './components/BookSlider';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { BookDetailsSection } from './components/BookDetailsSection';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentModal } from './components/PaymentModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { ContactModal } from './components/ContactModal';
import { TermsModal } from './components/TermsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { OrderDetails, SavedOrder, PERMANENT_SITE_URL } from './types';
import { ArrowRight, Sparkles, QrCode, History } from 'lucide-react';

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = 465;
  const deliveryCharge = 40;
  const gst = 0;
  const minOrderValue = 230;

  const orderTotal = pricePerUnit * quantity + deliveryCharge;

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    quantity,
    pricePerUnit,
    deliveryCharge,
    gst,
    total: orderTotal,
    customerName: '',
    phoneNumber: '',
    email: '',
    addressLine: '',
    landmark: '',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    pincode: '',
    notes: '',
  });

  // Order history in localStorage
  const [orders, setOrders] = useState<SavedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('finsakhi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Toast notification queue
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: ToastMessage) => {
    setToasts((prev) => [toast, ...prev.slice(0, 3)]);
    // auto-dismiss after 9 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 9000);
  };

  const handleShareClick = async () => {
    const shareUrl = PERMANENT_SITE_URL;
    const shareTitle = 'Fin सखी - वित्तीय साक्षरता से सशक्त नारी';
    const shareText = 'महिला सशक्तिकरण एवं वित्तीय साक्षरता की व्यावहारिक पुस्तक "Fin सखी" (लेखिका: प्रतिमा)। यहाँ से सीधे UPI / GPay द्वारा ऑर्डर करें:';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        let sharedFile: File | null = null;
        try {
          const response = await fetch('/og-cover.jpg');
          if (response.ok) {
            const blob = await response.blob();
            sharedFile = new File([blob], 'Fin_Sakhi_Book_Cover.jpg', { type: 'image/jpeg' });
          }
        } catch {
          sharedFile = null;
        }

        if (sharedFile && navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
          await navigator.share({
            files: [sharedFile],
            title: shareTitle,
            text: `${shareText}\n${shareUrl}`,
            url: shareUrl,
          });
          return;
        }

        await navigator.share({
          title: shareTitle,
          text: `${shareText}\n${shareUrl}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // If user cancelled, don't force modal; if blocked/unsupported, open modal
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }
    setIsShareOpen(true);
  };

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finsakhi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage:', e);
    }
  }, [orders]);

  // Update orderDetails when quantity changes
  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
    const updatedTotal = pricePerUnit * newQty + deliveryCharge;
    setOrderDetails((prev) => ({
      ...prev,
      quantity: newQty,
      total: updatedTotal,
    }));
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleProceedToPayment = (updated: OrderDetails) => {
    setOrderDetails(updated);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  const handleDirectQuickPay = () => {
    setIsPaymentOpen(true);
  };

  const handleOrderCompleted = (newOrder: SavedOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    addToast({
      id: `order-toast-${Date.now()}`,
      type: 'order_success',
      title: 'ऑर्डर सफलतापूर्वक दर्ज हुआ! (Order Placed)',
      message: `${newOrder.customerName || 'Customer'} जी, आपका ऑर्डर #${newOrder.orderId} (₹${newOrder.total}) दर्ज हो गया है।`,
      order: newOrder,
    });
  };

  const handleClearHistory = () => {
    setOrders([]);
    try {
      localStorage.removeItem('finsakhi_orders');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F9] text-slate-900 flex flex-col selection:bg-rose-200 selection:text-rose-900">
      {/* Top Author Announcement Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-rose-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-devanagari">
            आधिकारिक लेखक स्टोर · &ldquo;Fin सखी&rdquo; पुस्तक सीधे नवी मुंबई (महाराष्ट्र) से भारत भर में डिस्पैच
          </span>
          <span className="hidden md:inline-block text-rose-300">·</span>
          <span className="hidden md:inline-block">Dispatch within 1-2 business days</span>
        </div>
      </div>

      {/* Primary Top Bar */}
      <Header
        onOrderClick={handleOpenCheckout}
        onContactClick={() => setIsContactOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
        onOrderHistoryClick={() => setIsHistoryOpen(true)}
        onShareClick={handleShareClick}
        orderTotal={orderTotal}
        ordersCount={orders.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb / Kicker */}
        <div className="mb-4 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span>Books</span>
            <span aria-hidden="true">/</span>
            <span className="text-rose-900 font-semibold font-devanagari">
              Fin सखी - वित्तीय साक्षरता से सशक्त नारी
            </span>
          </div>

          {orders.length > 0 && (
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-800 font-medium hover:underline cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-rose-600" />
              <span>पूर्व ऑर्डर देखें ({orders.length})</span>
            </button>
          )}
        </div>

        {/* 2-Column Storefront Layout: Left Gallery + Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Interactive Book Slider & 3D Stage */}
          <div className="lg:col-span-7 space-y-6">
            <BookSlider onPayNowClick={handleDirectQuickPay} />
          </div>

          {/* Right Column (5 cols): Order Summary & Purchasing Card */}
          <div className="lg:col-span-5 sticky top-20">
            <OrderSummaryCard
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              pricePerUnit={pricePerUnit}
              deliveryCharge={deliveryCharge}
              gst={gst}
              total={orderTotal}
              minOrderValue={minOrderValue}
              onCheckout={handleOpenCheckout}
              onTermsClick={() => setIsTermsOpen(true)}
              onContactClick={() => setIsContactOpen(true)}
              onQuickPayClick={handleDirectQuickPay}
              onShareClick={handleShareClick}
            />
          </div>
        </div>

        {/* Bottom Detailed Sections: Hindi Blurb, Highlights, Author Profile */}
        <BookDetailsSection />

        {/* Dedicated QR Code Banner Section for Quick Pay */}
        <section className="mt-12 bg-white rounded-2xl border border-rose-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3.5 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900">
                <QrCode className="w-3.5 h-3.5 text-amber-700" />
                <span>Official UPI & GPay Payment</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-devanagari">
                QR कोड स्कैन करके ₹{orderTotal} का भुगतान करें
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-devanagari leading-relaxed max-w-xl">
                चयनित मात्रा (<strong>{quantity} प्रति</strong>) के अनुसार कुल राशि ₹{orderTotal} (₹{pricePerUnit * quantity} + ₹{deliveryCharge} डिलीवरी) सीधे Google Pay, PhonePe, Paytm अथवा किसी भी UPI ऐप से <strong>Pratima K</strong> के खाते में सुरक्षित स्थानांतरित होगी।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="font-mono text-xs bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                  UPI ID: prakrish31-5@oksbi
                </span>
                <span className="font-mono text-xs bg-rose-50 text-rose-800 font-extrabold px-3 py-1.5 rounded-lg border border-rose-200">
                  Total: ₹{orderTotal}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={handleDirectQuickPay}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-xl shadow-sm text-sm cursor-pointer transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Open Payment Terminal (₹{orderTotal})</span>
                </button>

                <button
                  onClick={handleOpenCheckout}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm cursor-pointer transition-colors"
                >
                  <span>Add Delivery Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded New Official QR Code Image Preview with Dynamic Amount Badge */}
            <div className="shrink-0 flex flex-col items-center bg-rose-50/50 p-4 rounded-2xl border border-rose-200/80 shadow-2xs max-w-[260px] w-full">
              <div className="w-full bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200">
                <img
                  src="/assets/aistudio/IMG-20261112-WA0003_2__7d87ca1b.jpg"
                  alt="Official Google Pay QR Code - Pratima K"
                  className="w-full h-auto object-contain cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={handleDirectQuickPay}
                />
              </div>
              <div className="mt-2.5 text-center">
                <span className="text-[11px] text-slate-500 block">Current Amount for {quantity} {quantity === 1 ? 'Copy' : 'Copies'}:</span>
                <span className="text-base font-extrabold text-rose-800 font-mono">
                  ₹{orderTotal}.00
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onContactClick={() => setIsContactOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
        onPayClick={handleOpenCheckout}
        onOrderHistoryClick={() => setIsHistoryOpen(true)}
      />

      {/* Sticky Mobile Checkout Bar (within 15% mobile viewport cap) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <div className="text-[11px] text-slate-500 leading-tight">Order Total</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                ₹{orderTotal}
              </span>
              <button
                onClick={handleOpenCheckout}
                className="text-[11px] text-rose-700 font-medium underline underline-offset-2 cursor-pointer"
              >
                Order Summary
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={() => setIsHistoryOpen(true)}
                aria-label="Order History"
                className="relative p-2.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
                title="View Order History"
              >
                <History className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {orders.length}
                </span>
              </button>
            )}

            <button
              onClick={handleDirectQuickPay}
              aria-label="Scan QR Code"
              className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl cursor-pointer hover:bg-rose-100 transition-colors"
              title="Open QR scanner"
            >
              <QrCode className="w-5 h-5" />
            </button>

            <button
              onClick={handleOpenCheckout}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderDetails={orderDetails}
        onProceedToPayment={handleProceedToPayment}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onBackToAddress={() => {
          setIsPaymentOpen(false);
          setIsCheckoutOpen(true);
        }}
        orderDetails={orderDetails}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onClearHistory={handleClearHistory}
        onNewOrder={handleOpenCheckout}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={PERMANENT_SITE_URL}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}

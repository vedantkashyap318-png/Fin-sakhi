import React, { useState, useEffect } from 'react';
import { X, Check, Copy, ArrowLeft, MessageCircle, CheckCircle, Shield, QrCode, Phone, AlertCircle, Lock } from 'lucide-react';
import {
  OrderDetails,
  SavedOrder,
  OFFICIAL_UPI_ID,
  OFFICIAL_PAYEE_NAME,
  OFFICIAL_GPAY_PHONE,
  OFFICIAL_BANK_NAME,
} from '../types';
import { DynamicQrCode } from './DynamicQrCode';
import { CheckoutStepIndicator } from './CheckoutStepIndicator';

const USED_UTRS_STORAGE_KEY = 'finsakhi_used_utrs';
const ORDERS_STORAGE_KEY = 'finsakhi_orders';

const loadStoredUsedUtrs = (): string[] => {
  if (typeof window === 'undefined') return [];
  const utrSet = new Set<string>();
  try {
    const rawUtrs = localStorage.getItem(USED_UTRS_STORAGE_KEY);
    if (rawUtrs) {
      const parsed = JSON.parse(rawUtrs);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (typeof item === 'string' && /^\d{12}$/.test(item)) {
            utrSet.add(item);
          }
        });
      }
    }
  } catch (e) {
    console.error('Error reading used UTRs:', e);
  }

  try {
    const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (rawOrders) {
      const parsedOrders = JSON.parse(rawOrders);
      if (Array.isArray(parsedOrders)) {
        parsedOrders.forEach((order) => {
          if (order && typeof order.utr === 'string' && /^\d{12}$/.test(order.utr)) {
            utrSet.add(order.utr);
          }
        });
      }
    }
  } catch (e) {
    console.error('Error reading order UTRs:', e);
  }

  return Array.from(utrSet);
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToAddress: () => void;
  orderDetails: OrderDetails;
  onOrderCompleted?: (order: SavedOrder) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onBackToAddress,
  orderDetails,
  onOrderCompleted,
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [utr, setUtr] = useState('');
  const [utrFormatWarning, setUtrFormatWarning] = useState('');
  const [usedUtrs, setUsedUtrs] = useState<string[]>(() => loadStoredUsedUtrs());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedUtr, setSubmittedUtr] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPaymentDone(false);
      setUtr('');
      setUtrFormatWarning('');
      setHasSubmitted(false);
      setSubmittedUtr('');
      setConfirmedOrder(null);
      setUsedUtrs(loadStoredUsedUtrs());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const upiId = OFFICIAL_UPI_ID;
  const gpayPhone = OFFICIAL_GPAY_PHONE;
  const payeeName = OFFICIAL_PAYEE_NAME;
  const amount = orderDetails.total.toFixed(2);
  const transactionNote = `Fin Sakhi Book (${orderDetails.quantity}x)`;

  // Mandatory Customer Details Check
  const cleanCustomerName = orderDetails.customerName.trim();
  const cleanPhoneDigits = orderDetails.phoneNumber.replace(/\D/g, '');
  const cleanAddressLine = orderDetails.addressLine.trim();
  const cleanCity = orderDetails.city.trim();
  const cleanPincodeDigits = orderDetails.pincode.replace(/\D/g, '');

  const hasValidName = cleanCustomerName.length > 0;
  const hasValidPhone = cleanPhoneDigits.length >= 10;
  const hasValidAddress =
    cleanAddressLine.length > 0 && cleanCity.length > 0 && cleanPincodeDigits.length === 6;
  const hasValidCustomerDetails = hasValidName && hasValidPhone && hasValidAddress;

  // UTR Validation & Duplicate Check
  const isValidUtr = /^\d{12}$/.test(utr);
  const isDuplicateUtr = isValidUtr && usedUtrs.includes(utr);
  const canSubmit = hasValidCustomerDetails && isValidUtr && !isDuplicateUtr && !hasSubmitted;

  const activeUtrForMessage = submittedUtr || utr;

  // Formatted WhatsApp confirmation message with mandatory customer details + verified 12-digit UTR
  const whatsappMessage = `*New Order: Fin सखी (वित्तीय साक्षरता से सशक्त नारी)*
------------------------------------
*Order & Payment Verification:*
${confirmedOrder ? `- Order ID: ${confirmedOrder.orderId}\n` : ''}- Quantity: ${orderDetails.quantity} copy (प्रतियां)
- Book Amount: ₹${orderDetails.pricePerUnit * orderDetails.quantity}
- Delivery Charges: ₹${orderDetails.deliveryCharge}
- Total Paid: ₹${orderDetails.total}
- UPI Payment To: ${upiId} (${payeeName})
- 12-Digit UPI UTR Ref: ${activeUtrForMessage}

*Customer Delivery Address:*
- Name: ${cleanCustomerName}
- Phone: ${orderDetails.phoneNumber.trim()}
${orderDetails.email ? `- Email: ${orderDetails.email.trim()}\n` : ''}- Address: ${cleanAddressLine}
${orderDetails.landmark ? `- Landmark: ${orderDetails.landmark.trim()}\n` : ''}- City: ${cleanCity}, ${orderDetails.state} - PIN: ${orderDetails.pincode.trim()}
${orderDetails.notes ? `- Delivery Note: ${orderDetails.notes.trim()}\n` : ''}
Namaste Pratima ji / Vedant K, I have transferred ₹${orderDetails.total} via GPay/UPI (UTR: ${activeUtrForMessage}). Please verify and dispatch my book. Thank you!`;

  const whatsappUrl = `https://wa.me/917020378984?text=${encodeURIComponent(whatsappMessage)}`;

  const handleUtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '');

    if (rawValue !== digitsOnly) {
      setUtrFormatWarning('Only numeric digits (0-9) are accepted for the 12-digit UTR.');
    } else if (digitsOnly.length > 12) {
      setUtrFormatWarning('UTR must be exactly 12 digits.');
    } else {
      setUtrFormatWarning('');
    }

    setUtr(digitsOnly.slice(0, 12));
  };

  const commitOrderOnce = (): SavedOrder | null => {
    if (!canSubmit) return null;

    setHasSubmitted(true);
    setSubmittedUtr(utr);

    const updatedUsedUtrs = Array.from(new Set([...usedUtrs, utr]));
    setUsedUtrs(updatedUsedUtrs);
    try {
      localStorage.setItem(USED_UTRS_STORAGE_KEY, JSON.stringify(updatedUsedUtrs));
    } catch (err) {
      console.error('Error saving UTR to localStorage:', err);
    }

    const newOrder: SavedOrder = {
      orderId: `FS-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      quantity: orderDetails.quantity,
      total: orderDetails.total,
      customerName: cleanCustomerName,
      phoneNumber: orderDetails.phoneNumber.trim(),
      city: cleanCity,
      state: orderDetails.state,
      addressLine: cleanAddressLine,
      pincode: orderDetails.pincode.trim(),
      upiId,
      utr,
      status: 'Payment Recorded',
    };

    setConfirmedOrder(newOrder);
    if (onOrderCompleted) {
      onOrderCompleted(newOrder);
    }
    return newOrder;
  };

  const copyText = async (value: string, onSuccess: () => void) => {
    let didCopy = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        didCopy = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        didCopy = false;
      }
    }

    if (didCopy) {
      onSuccess();
    }
  };

  const handleCopyUpi = () => {
    void copyText(upiId, () => {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    });
  };

  const handleCopyPhone = () => {
    void copyText(gpayPhone, () => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    });
  };

  const handleCopyAmount = () => {
    void copyText(amount, () => {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {!paymentDone && (
              <button
                onClick={onBackToAddress}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Back to address"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="text-xs text-rose-200 uppercase font-semibold">
                {paymentDone ? 'Step 3 of 3: Order Confirmation' : 'Step 2 of 3: Payment Settlement'}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-devanagari">
                {paymentDone ? 'ऑर्डर कन्फर्मेशन (Confirmation)' : 'सुरक्षित UPI एवं QR भुगतान'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CheckoutStepIndicator
          currentStep={paymentDone ? 3 : 2}
          onStepClick={!paymentDone ? (step) => {
            if (step === 1) onBackToAddress();
          } : undefined}
        />

        {paymentDone ? (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 font-devanagari">
                भुगतान अनुरोध दर्ज हुआ! (Order Recorded)
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                धन्यवाद {orderDetails.customerName || 'जी'}! आपका ऑर्डर पंजीकृत हो गया है।
              </p>
            </div>

            <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-100 text-left text-xs space-y-2">
              {confirmedOrder && (
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>ऑर्डर आईडी (Order ID):</span>
                  <span className="font-mono">{confirmedOrder.orderId}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-800">
                <span>पुस्तकों की संख्या:</span>
                <span>{orderDetails.quantity} प्रति (Copies)</span>
              </div>
              <div className="flex justify-between font-bold text-rose-800 text-sm">
                <span>कुल भुगतान:</span>
                <span>₹{orderDetails.total}</span>
              </div>
              {activeUtrForMessage && (
                <div className="flex justify-between font-semibold text-emerald-800">
                  <span>UPI UTR Reference:</span>
                  <span className="font-mono">{activeUtrForMessage}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>डिलीवरी का पता:</span>
                <span className="text-right truncate max-w-[200px]">
                  {orderDetails.addressLine}, {orderDetails.city}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-devanagari">
              कृपया नीचे दिए बटन पर क्लिक करके लेखक को व्हाट्सएप पर डिलीवरी पता और UTR सूचना भेजें ताकि तुरंत पार्सल भेजा जा सके:
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp पर पार्सल डिस्पैच सूचना भेजें</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 underline pt-2 cursor-pointer"
            >
              बंद करें (Close)
            </button>
          </div>
        ) : (
          /* Payment Terminal */
          <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Amount Callout */}
            <div className="bg-rose-50/70 rounded-xl p-4 border border-rose-200/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-900/80 block">
                  कुल देय राशि (Payable Amount)
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  ₹{orderDetails.total}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  ({orderDetails.quantity} प्रति × ₹{orderDetails.pricePerUnit} + ₹{orderDetails.deliveryCharge} डिलीवरी)
                </span>
              </div>

              <button
                onClick={handleCopyAmount}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors shadow-2xs cursor-pointer"
              >
                {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAmount ? 'Copied' : 'Copy ₹'}</span>
              </button>
            </div>

            {/* Method 1 (Recommended · Zero Bank Limit Error): Direct Pay via UPI ID or Number */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                    Recommended · Zero Bank Limit Error
                  </span>
                  <p className="text-xs text-slate-700 font-devanagari mt-0.5 leading-relaxed">
                    GPay / PhonePe ऐप सीधे खोलें और नीचे दिए <strong>UPI ID</strong> या <strong>मोबाइल नंबर</strong> पर{' '}
                    <strong className="font-mono text-slate-900">₹{orderDetails.total}</strong> भेजें (इसमें बैंक लिमिट एरर नहीं आता):
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-emerald-200/80 shadow-2xs">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900 select-all">
                    {upiId}
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Official UPI ID · {payeeName} ({OFFICIAL_BANK_NAME})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-emerald-200/80 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-sm text-slate-900 select-all">
                      {gpayPhone}
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      Pay Phone Number in GPay / PhonePe / Paytm
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied!' : 'Copy No.'}</span>
                </button>
              </div>
            </div>

            {/* Method 2: Dynamic QR Code Generated as per Quantity / Amount */}
            <div className="border border-rose-200/80 rounded-2xl p-4 bg-gradient-to-b from-rose-50/40 via-white to-rose-50/40 text-center space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wide px-1">
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-rose-600" />
                  <span>Scan to Pay · ₹{orderDetails.total}</span>
                </div>
                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {orderDetails.quantity} {orderDetails.quantity === 1 ? 'Copy' : 'Copies'}
                </span>
              </div>

              {/* Dynamic QR component */}
              <DynamicQrCode
                amount={orderDetails.total}
                quantity={orderDetails.quantity}
                upiId={upiId}
                payeeName={payeeName}
                note={transactionNote}
              />

              <div className="text-xs text-slate-600 font-devanagari space-y-0.5">
                <p className="font-semibold text-slate-800">
                  दूसरे फ़ोन के कैमरा / GPay स्कैनर से सीधे स्कैन करें
                </p>
                <p className="text-[11px] text-slate-500">
                  यदि एक ही फ़ोन उपयोग कर रहे हैं तो ऊपर दिए UPI ID या नंबर से भुगतान करें
                </p>
              </div>
            </div>

            {/* Mandatory 12-Digit UTR Input Directly Below QR Code */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="upi-utr-input"
                  className="block text-xs font-bold text-slate-800"
                >
                  Enter 12-digit UPI UTR Transaction Reference Number{' '}
                  <span className="text-rose-600">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-semibold tabular-nums ${
                    isValidUtr && !isDuplicateUtr ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {utr.length}/12
                </span>
              </div>

              <input
                id="upi-utr-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={12}
                autoComplete="off"
                placeholder="उदा. 431209876543 (12 numeric digits)"
                value={utr}
                onChange={handleUtrChange}
                className={`w-full px-3.5 py-2.5 text-sm font-mono tracking-wider rounded-lg border bg-white focus:outline-hidden focus:ring-2 ${
                  isDuplicateUtr || utrFormatWarning || (utr.length > 0 && !isValidUtr)
                    ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                    : isValidUtr
                      ? 'border-emerald-500 focus:ring-emerald-200 text-slate-900'
                      : 'border-slate-300 focus:ring-rose-200 focus:border-rose-600 text-slate-900'
                }`}
              />

              {/* Validation & Duplicate Feedback */}
              {isDuplicateUtr ? (
                <p className="flex items-start gap-1.5 text-xs font-medium text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>
                    This UTR number has already been used for an order. Please enter a new payment reference.
                  </span>
                </p>
              ) : utrFormatWarning ? (
                <p className="flex items-start gap-1.5 text-xs font-medium text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{utrFormatWarning}</span>
                </p>
              ) : utr.length > 0 && !isValidUtr ? (
                <p className="flex items-start gap-1.5 text-xs font-medium text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>
                    Please enter an exact 12-digit numeric UTR number ({utr.length}/12 digits entered).
                  </span>
                </p>
              ) : isValidUtr ? (
                <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Valid 12-digit UTR verified. Ready to confirm order.</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-500">
                  पेमेंट करने के बाद अपने GPay / PhonePe / Paytm ऐप से 12-अंकों का UTR / UPI Ref No. यहाँ दर्ज करें।
                </p>
              )}

              {/* Mandatory Customer Details Verification Banner */}
              {!hasValidCustomerDetails && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
                  <span>
                    Please complete your Name, 10-digit Phone, and Delivery Address before submitting.
                  </span>
                  <button
                    type="button"
                    onClick={onBackToAddress}
                    className="shrink-0 px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 font-semibold rounded-md cursor-pointer transition-colors"
                  >
                    Edit Address
                  </button>
                </div>
              )}
            </div>

            {/* Locked WhatsApp Confirmation & Order Complete Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {canSubmit ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    commitOrderOnce();
                    setPaymentDone(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-md transition-colors text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp पर भुगतान व पता भेजें (+91 7020378984)</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-200 text-slate-400 font-semibold rounded-xl cursor-not-allowed text-xs sm:text-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>WhatsApp पर भुगतान व पता भेजें (+91 7020378984)</span>
                </button>
              )}

              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => {
                  const created = commitOrderOnce();
                  if (created) {
                    setPaymentDone(true);
                  }
                }}
                className={`w-full py-2.5 px-4 font-semibold rounded-xl transition-colors text-xs sm:text-sm ${
                  canSubmit
                    ? 'bg-slate-800 hover:bg-slate-900 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                मैंने भुगतान कर दिया है (I have completed payment)
              </button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Author Dispatch · Verified {OFFICIAL_BANK_NAME} Account · Navi Mumbai</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

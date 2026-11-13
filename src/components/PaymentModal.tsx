import React, { useState } from 'react';
import { X, Check, Copy, ArrowLeft, MessageCircle, ExternalLink, CheckCircle, Shield, QrCode } from 'lucide-react';
import { OrderDetails, SavedOrder } from '../types';
import { DynamicQrCode } from './DynamicQrCode';

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
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  if (!isOpen) return null;

  const upiId = 'prakrish31-5@oksbi';
  const payeeName = 'Pratima K';
  const amount = orderDetails.total.toFixed(2);
  const transactionNote = 'Fin Sakhi Book Order';

  // Standard UPI URI and App specific URIs
  const genericUpiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const gpayUri = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const phonepeUri = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const paytmUri = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  // Formatted WhatsApp confirmation message
  const whatsappMessage = `*New Order: Fin सखी (वित्तीय साक्षरता से सशक्त नारी)*
------------------------------------
*Order Details:*
- Quantity: ${orderDetails.quantity} copy (प्रतियां)
- Book Amount: ₹${orderDetails.pricePerUnit * orderDetails.quantity}
- Delivery Charges: ₹${orderDetails.deliveryCharge}
- Total Paid: ₹${orderDetails.total}
- UPI Payment To: ${upiId} (${payeeName})

*Customer Delivery Address:*
- Name: ${orderDetails.customerName || 'Customer'}
- Phone: ${orderDetails.phoneNumber || '+91 7020378984'}
${orderDetails.email ? `- Email: ${orderDetails.email}\n` : ''}- Address: ${orderDetails.addressLine || 'Navi Mumbai'}
${orderDetails.landmark ? `- Landmark: ${orderDetails.landmark}\n` : ''}- City: ${orderDetails.city}, ${orderDetails.state} - PIN: ${orderDetails.pincode}
${orderDetails.notes ? `- Delivery Note: ${orderDetails.notes}\n` : ''}
Namaste Pratima ji / Vedant K, I have transferred ₹${orderDetails.total} via GPay/UPI. Please confirm and dispatch my book. Thank you!`;

  const whatsappUrl = `https://wa.me/917020378984?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToAddress}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Back to address"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs text-rose-200 uppercase font-semibold">
                Step 2 of 2: Payment Settlement
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-devanagari">
                सुरक्षित UPI एवं QR भुगतान
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
              <div className="flex justify-between font-semibold text-slate-800">
                <span>पुस्तकों की संख्या:</span>
                <span>{orderDetails.quantity} प्रति (Copies)</span>
              </div>
              <div className="flex justify-between font-bold text-rose-800 text-sm">
                <span>कुल भुगतान:</span>
                <span>₹{orderDetails.total}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>डिलीवरी का पता:</span>
                <span className="text-right truncate max-w-[200px]">
                  {orderDetails.addressLine}, {orderDetails.city}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-devanagari">
              कृपया नीचे दिए बटन पर क्लिक करके लेखक को व्हाट्सएप पर डिलीवरी पता और सूचना भेजें ताकि तुरंत पार्सल भेजा जा सके:
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

            {/* Direct 1-Tap UPI Apps */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Direct One-Tap UPI Payment (Mobile)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Google Pay Direct */}
                <a
                  href={gpayUri}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Google Pay (GPay)</span>
                </a>

                {/* Generic / All UPI Apps */}
                <a
                  href={genericUpiUri}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-black active:bg-slate-800 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Any UPI App (सभी UPI)</span>
                </a>

                {/* PhonePe */}
                <a
                  href={phonepeUri}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  <span>PhonePe</span>
                </a>

                {/* Paytm */}
                <a
                  href={paytmUri}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  <span>Paytm UPI</span>
                </a>
              </div>
            </div>

            {/* Copyable UPI ID Box */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Official UPI ID (प्रेस करके कॉपी करें):
              </span>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-300">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900 select-all">
                    {upiId}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Payee: Pratima K · State Bank of India
                  </span>
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="flex items-center gap-1 px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic QR Code Generated as per Quantity / Amount */}
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
                upiId={upiId}
                payeeName={payeeName}
                note={transactionNote}
              />

              <div className="text-xs text-slate-600 font-devanagari space-y-0.5">
                <p className="font-semibold text-slate-800">
                  Google Pay, PhonePe, Paytm या किसी भी UPI ऐप से स्कैन करें
                </p>
                <p className="text-[11px] text-slate-500">
                  स्कैन करने पर ऐप में स्वतः ₹{orderDetails.total} की राशि भर जाएगी
                </p>
              </div>
            </div>

            {/* WhatsApp Confirmation & Done Button */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (onOrderCompleted) {
                    onOrderCompleted({
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
                      customerName: orderDetails.customerName || 'Customer',
                      phoneNumber: orderDetails.phoneNumber || '+91 7020378984',
                      city: orderDetails.city || 'Navi Mumbai',
                      state: orderDetails.state || 'Maharashtra',
                      addressLine: orderDetails.addressLine || 'Address',
                      pincode: orderDetails.pincode || '',
                      upiId,
                      status: 'Payment Recorded',
                    });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-md transition-colors text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp पर भुगतान व पता भेजें (+91 7020378984)</span>
              </a>

              <button
                onClick={() => {
                  setPaymentDone(true);
                  if (onOrderCompleted) {
                    onOrderCompleted({
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
                      customerName: orderDetails.customerName || 'Customer',
                      phoneNumber: orderDetails.phoneNumber || '+91 7020378984',
                      city: orderDetails.city || 'Navi Mumbai',
                      state: orderDetails.state || 'Maharashtra',
                      addressLine: orderDetails.addressLine || 'Address',
                      pincode: orderDetails.pincode || '',
                      upiId,
                      status: 'Payment Recorded',
                    });
                  }
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
              >
                मैंने भुगतान कर दिया है (I have completed payment)
              </button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Author Dispatch · Verified SBI Account · Navi Mumbai</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

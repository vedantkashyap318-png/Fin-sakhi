import React, { useState } from 'react';
import { X, MapPin, User, Phone, Mail, ArrowRight, Truck } from 'lucide-react';
import { OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails;
  onProceedToPayment: (updatedDetails: OrderDetails) => void;
}

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Uttar Pradesh',
  'Gujarat',
  'Tamil Nadu',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Telangana',
  'Andhra Pradesh',
  'Bihar',
  'Punjab',
  'Haryana',
  'Kerala',
  'Odisha',
  'Jharkhand',
  'Assam',
  'Chhattisgarh',
  'Goa',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Other',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  onProceedToPayment,
}) => {
  const [formData, setFormData] = useState({
    customerName: orderDetails.customerName || '',
    phoneNumber: orderDetails.phoneNumber || '',
    email: orderDetails.email || '',
    addressLine: orderDetails.addressLine || '',
    landmark: orderDetails.landmark || '',
    city: orderDetails.city || 'Navi Mumbai',
    state: orderDetails.state || 'Maharashtra',
    pincode: orderDetails.pincode || '',
    notes: orderDetails.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'कृपया अपना पूरा नाम लिखें (Please enter full name)';
    }

    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = 'कृपया वैध 10-अंकों का मोबाइल नंबर दर्ज करें (Valid 10-digit number required)';
    }

    if (!formData.addressLine.trim()) {
      errs.addressLine = 'कृपया डिलीवरी का पूरा पता लिखें (Delivery address required)';
    }

    if (!formData.city.trim()) {
      errs.city = 'शहर का नाम दर्ज करें (City required)';
    }

    const cleanPin = formData.pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'कृपया 6-अंकों का पिनकोड दर्ज करें (6-digit PIN required)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onProceedToPayment({
      ...orderDetails,
      customerName: formData.customerName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      addressLine: formData.addressLine.trim(),
      landmark: formData.landmark.trim(),
      city: formData.city.trim(),
      state: formData.state,
      pincode: formData.pincode.trim(),
      notes: formData.notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-rose-200 uppercase font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Step 1 of 2: Shipping Address</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-1 font-devanagari">
              डिलीवरी का पता दर्ज करें
            </h3>
            <p className="text-xs text-rose-200 mt-0.5">
              Fin सखी · {orderDetails.quantity} प्रति · कुल: ₹{orderDetails.total}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              पूरा नाम (Full Name) <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="उदा. स्नेहा शर्मा (e.g. Sneha Sharma)"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-hidden focus:ring-2 ${
                  errors.customerName
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-rose-200 focus:border-rose-600'
                }`}
              />
            </div>
            {errors.customerName && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                मोबाइल नंबर (10-Digit Mobile) <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-hidden focus:ring-2 ${
                    errors.phoneNumber
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-300 focus:ring-rose-200 focus:border-rose-600'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                ईमेल (Email Address)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-200 focus:border-rose-600"
                />
              </div>
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              डिलीवरी का पूरा पता (House / Flat No, Street, Area) <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="मकान/फ्लैट सं., बिल्डिंग का नाम, गली/मोहल्ला..."
              value={formData.addressLine}
              onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
              className={`w-full p-2.5 text-sm rounded-lg border focus:outline-hidden focus:ring-2 ${
                errors.addressLine
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:ring-rose-200 focus:border-rose-600'
              }`}
            />
            {errors.addressLine && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.addressLine}</p>
            )}
          </div>

          {/* Landmark, City, State, Pincode */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                लैंडमार्क (Landmark)
              </label>
              <input
                type="text"
                placeholder="उदा. मंदिर के पास"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-200 focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                शहर (City) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Navi Mumbai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-200 focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                पिनकोड (Pincode) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="400703"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className={`w-full p-2 text-sm rounded-lg border focus:outline-hidden focus:ring-2 ${
                  errors.pincode
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-rose-200 focus:border-rose-600'
                }`}
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              राज्य (State)
            </label>
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full p-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-200 focus:border-rose-600 bg-white"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Note */}
          <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 flex items-center justify-between text-xs text-rose-900">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-600 shrink-0" />
              <span>भारत भर में स्पीड पोस्ट / कूरियर द्वारा सुरक्षित डिलीवरी (₹40)</span>
            </div>
            <span className="font-bold font-mono">₹{orderDetails.total}</span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer text-sm sm:text-base group"
            >
              <span>भुगतान करें (Proceed to Pay ₹{orderDetails.total})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              UPI · Google Pay · PhonePe · Paytm · QR Scanner
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-xs text-rose-200 uppercase font-semibold">Get in Touch</span>
            <h3 className="text-xl font-bold font-devanagari mt-0.5">Let’s Get Talking</h3>
            <p className="text-xs text-rose-200 mt-1">
              Questions, feedback, or partnership ideas? We reply within 1 business day.
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
        <div className="p-5 sm:p-6 space-y-5">
          {/* Reach us Directly */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Reach us Directly
            </h4>

            <div className="space-y-2.5">
              {/* Email */}
              <a
                href="mailto:prakrish31@gmail.com?subject=Inquiry%20regarding%20Fin%20Sakhi%20Book"
                className="flex items-center gap-3 p-3 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-rose-200 flex items-center justify-center text-rose-700 shadow-2xs group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-500 block">Email Address</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono">
                    prakrish31@gmail.com
                  </span>
                </div>
                <Send className="w-3.5 h-3.5 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Phone */}
              <a
                href="tel:+917020378984"
                className="flex items-center gap-3 p-3 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-rose-200 flex items-center justify-center text-rose-700 shadow-2xs group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-500 block">Direct Calling Line</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono">
                    +91 7020378984
                  </span>
                </div>
                <span className="text-xs text-rose-700 font-medium">Call now</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917020378984?text=Namaste!%20I%20want%20to%20order%20the%20book%20'Fin%20%E0%A4%B8%E0%A4%96%E0%A5%80'%20by%20author%20pratima%20k.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 rounded-xl transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-500 block">WhatsApp Support</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono">
                    +91 7020378984
                  </span>
                </div>
                <span className="text-xs text-emerald-700 font-medium">Chat now</span>
              </a>
            </div>
          </div>

          {/* Registered Office */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Registered Office
            </h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-700 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 text-sm">Vedant K</p>
                <p className="text-xs text-slate-600">navi mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Response Promise */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>We reply within 1 business day for all queries and bulk orders.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

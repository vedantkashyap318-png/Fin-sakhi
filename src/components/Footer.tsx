import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onContactClick: () => void;
  onTermsClick: () => void;
  onPayClick: () => void;
  onOrderHistoryClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onTermsClick,
  onPayClick,
  onOrderHistoryClick,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Synopsis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xl font-bold text-white font-devanagari">
              <span className="text-rose-400">Fin</span>
              <span>सखी</span>
            </div>
            <p className="text-xs text-rose-300/80 font-devanagari">
              वित्तीय साक्षरता से सशक्त नारी
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-devanagari">
              हर महिला के आर्थिक रूप से आत्मनिर्भर और सशक्त बनने के लिए व्यावहारिक मार्गदर्शिका। लेखिका: प्रतिमा (बैंकर एवं कवयित्री)।
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400">
                ISBN: 978-93-5915-918-8 · MRP ₹465
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links & Store Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onPayClick}
                  className="hover:text-rose-400 transition-colors cursor-pointer text-left"
                >
                  Order Book · ₹505 (Incl. Delivery)
                </button>
              </li>
              {onOrderHistoryClick && (
                <li>
                  <button
                    onClick={onOrderHistoryClick}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-left"
                  >
                    View Order History (पूर्व ऑर्डर)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onTermsClick}
                  className="hover:text-rose-400 transition-colors cursor-pointer text-left"
                >
                  Store Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-rose-400 transition-colors cursor-pointer text-left"
                >
                  Contact Us (Let’s Get Talking)
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/917020378984?text=Namaste!%20I%20want%20to%20order%20the%20book%20'Fin%20%E0%A4%B8%E0%A4%96%E0%A5%80'%20by%20author%20pratima%20k.%20Please%20guide%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Bulk Order & Workshop Inquiries</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Registered Office & Direct Reach */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Registered Office & Direct Contact
            </h4>

            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Vedant K</span>
                  <span className="text-slate-300">navi mumbai, Maharashtra</span>
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-2 space-y-1.5">
                <a
                  href="mailto:prakrish31@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">prakrish31@gmail.com</span>
                </a>

                <a
                  href="tel:+917020378984"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">+91 7020378984</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Questions, feedback, or partnership ideas? We reply within 1 business day.
            </p>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Fin सखी (वित्तीय साक्षरता से सशक्त नारी). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Direct Author Storefront</span>
            <span>·</span>
            <span>Navi Mumbai, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ShoppingBag, Phone, MessageCircle, Share2 } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
  onContactClick: () => void;
  onTermsClick: () => void;
  onOrderHistoryClick: () => void;
  onShareClick: () => void;
  orderTotal: number;
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  onContactClick,
  onTermsClick,
  onOrderHistoryClick,
  onShareClick,
  orderTotal,
  ordersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-rose-950 font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-rose-600 font-devanagari text-2xl sm:text-3xl">Fin</span>
            <span className="font-devanagari text-rose-900">सखी</span>
            <span className="hidden sm:inline-block text-xs font-normal text-rose-700/70 ml-1 border-l border-rose-200 pl-2">
              वित्तीय साक्षरता से सशक्त नारी
            </span>
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a
              href="#book-preview"
              className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
            >
              पुस्तक दर्शन (Preview)
            </a>
            <a
              href="#about-author"
              className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
            >
              लेखिका परिचय (Author)
            </a>
            <button
              onClick={onOrderHistoryClick}
              className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>ऑर्डर इतिहास (History)</span>
              {ordersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </button>
            <button
              onClick={onContactClick}
              className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              संपर्क (Contact Us)
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="tel:+917020378984"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Call seller"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span>+91 7020378984</span>
            </a>

            <a
              href="https://wa.me/917020378984?text=Namaste!%20I%20want%20to%20order%20the%20book%20'Fin%20%E0%A4%B8%E0%A4%96%E0%A5%80'%20by%20author%20pratima%20k.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onShareClick}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Share book with friends or family"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onOrderClick}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-700 hover:bg-rose-800 active:bg-rose-900 shadow-sm rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now · ₹{orderTotal}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

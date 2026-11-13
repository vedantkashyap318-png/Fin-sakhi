import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, QrCode } from 'lucide-react';

export const SLIDES = [
  {
    id: 'mockup',
    title: '3D Hardcover Edition',
    hindiTitle: 'पुस्तक का 3D स्वरूप',
    subtitle: 'Hardbound Collector Quality',
    imageUrl: '/assets/aistudio/book_3d_mockup.jpg',
    badge: 'Official Edition',
    description: 'विशेष हार्डकवर और उच्च गुणवत्ता वाले पन्नों के साथ तैयार की गई आधिकारिक प्रति।',
  },
  {
    id: 'front',
    title: 'Front Cover Artwork',
    hindiTitle: 'मुख्य आवरण पृष्ठ',
    subtitle: 'Fin सखी - वित्तीय साक्षरता से सशक्त नारी',
    imageUrl: '/assets/aistudio/InShot_20261024_114452736_5c54fa8f.jpg',
    badge: 'Front Cover',
    description: 'सोने की नक्काशी और प्रेरणादायी चित्रकारी से सुसज्जित आकर्षक कवर।',
  },
  {
    id: 'back',
    title: 'Back Cover & Author Bio',
    hindiTitle: 'पृष्ठ आवरण एवं लेखिका परिचय',
    subtitle: 'About Book & Banker Author Pratima',
    imageUrl: '/assets/aistudio/InShot_20261023_222728072_fd01513f.jpg',
    badge: 'ISBN: 978-93-5915-918-8',
    description: 'पुस्तक का विस्तृत सारांश, लेखिका प्रतिमा जी का जीवन परिचय एवं आधिकारिक ISBN बारकोड।',
  },
  {
    id: 'spread',
    title: 'Full Dust Jacket Spread',
    hindiTitle: 'सम्पूर्ण आवरण विस्तार',
    subtitle: 'Complete Front, Spine & Back Spread',
    imageUrl: '/assets/aistudio/InShot_20261023_222845668_b9d505d2.jpg',
    badge: 'Complete Jacket',
    description: 'फ्रंट कवर, स्पाइन एवं बैक कवर का सम्पूर्ण प्रिंट स्वरूप।',
  },
  {
    id: 'qr',
    title: 'Official GPay Scanner & UPI ID',
    hindiTitle: 'आधिकारिक स्कैनर एवं UPI भुगतान',
    subtitle: 'prakrish31-5@oksbi · Pratima K',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0003_2__7d87ca1b.jpg',
    badge: 'Direct UPI QR',
    description: 'सीधे बैंक खाते में सुरक्षित भुगतान के लिए आधिकारिक गूगल पे QR कोड।',
  },
];

interface BookSliderProps {
  onPayNowClick: () => void;
}

export const BookSlider: React.FC<BookSliderProps> = ({ onPayNowClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSlide = SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  // Subtle 3D tilt calculation
  const rotateY = isHovering ? mousePosition.x * 12 : 0;
  const rotateX = isHovering ? -mousePosition.y * 12 : 0;

  return (
    <div id="book-preview" className="relative flex flex-col gap-4">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between text-xs text-rose-900/80 font-medium px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>चित्र पर स्वाइप या स्लाइड करें</span>
          <span className="text-rose-300">·</span>
          <span>Slide to explore all views</span>
        </div>
        <span className="font-mono tabular-nums text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-xs border border-rose-100">
          {currentIndex + 1} / {SLIDES.length}
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        className="relative group w-full bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-rose-100/40 rounded-2xl p-4 sm:p-6 lg:p-8 border border-rose-100/80 shadow-inner overflow-hidden flex items-center justify-center min-h-[420px] sm:min-h-[500px]"
        style={{ perspective: 1200 }}
      >
        {/* Decorative background glow circle */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-300/20 blur-3xl pointer-events-none -top-12 -left-12" />
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none -bottom-12 -right-12" />

        {/* 3D Moving Canvas */}
        <div
          className="relative transition-transform duration-200 ease-out z-10 flex flex-col items-center max-w-full"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1, 1, 1)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Active Image Container */}
          <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white border border-rose-200/60 group-hover:shadow-rose-950/15 transition-shadow max-h-[380px] sm:max-h-[460px] flex items-center justify-center">
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="w-auto h-auto max-h-[380px] sm:max-h-[460px] max-w-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
              onClick={() => setLightboxOpen(true)}
              loading="eager"
            />

            {/* Quick Zoom Trigger Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-xs opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              title="Click to view full image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Slide Badge */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-rose-950/80 text-white text-xs font-medium rounded backdrop-blur-xs shadow-xs">
              {activeSlide.badge}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-rose-900 shadow-md border border-rose-100 z-20 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-rose-900 shadow-md border border-rose-100 z-20 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Caption & Description */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-rose-100/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
              {activeSlide.title}
            </h3>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-rose-700 font-devanagari font-medium">
              {activeSlide.hindiTitle}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
            {activeSlide.description}
          </p>
        </div>

        <button
          onClick={onPayNowClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5 text-rose-600" />
          <span>Pay ₹505 via QR</span>
        </button>
      </div>

      {/* Unique Slider Thumbnails Bar */}
      <div className="grid grid-cols-5 gap-2 pt-1">
        {SLIDES.map((slide, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex flex-col items-center gap-1.5 p-1 sm:p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'border-rose-600 bg-rose-50/80 shadow-xs ring-2 ring-rose-500/20'
                  : 'border-slate-200/80 bg-white hover:border-rose-200 hover:bg-rose-50/30'
              }`}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium leading-tight truncate w-full px-0.5 ${
                  isSelected ? 'text-rose-900 font-semibold' : 'text-slate-600'
                }`}
              >
                {slide.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-50"
            title="Close viewer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-center text-white">
              <p className="font-semibold text-sm sm:text-base">{activeSlide.title}</p>
              <p className="text-xs text-rose-200 mt-0.5 font-devanagari">
                {activeSlide.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, ExternalLink, Send, Image as ImageIcon } from 'lucide-react';
import { PERMANENT_SITE_URL } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title = 'Fin सखी - वित्तीय साक्षरता से सशक्त नारी',
  text = 'महिला सशक्तिकरण एवं वित्तीय साक्षरता की व्यावहारिक पुस्तक "Fin सखी" (लेखिका: प्रतिमा)। यहाँ से सीधे UPI / GPay द्वारा ऑर्डर करें:',
  url = PERMANENT_SITE_URL,
}) => {
  const [copied, setCopied] = useState(false);
  const [sharingFile, setSharingFile] = useState(false);

  if (!isOpen) return null;

  const fullShareText = `${text}\n${url}`;

  const handleCopyLink = async () => {
    let didCopy = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShareWithImage = async () => {
    setSharingFile(true);
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        let file: File | null = null;
        try {
          const response = await fetch('/og-cover.jpg');
          if (response.ok) {
            const blob = await response.blob();
            file = new File([blob], 'Fin_Sakhi_Book_Cover.jpg', { type: 'image/jpeg' });
          }
        } catch {
          file = null;
        }

        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title,
            text: `${text}\n${url}`,
            url,
          });
          setSharingFile(false);
          onClose();
          return;
        }

        await navigator.share({
          title,
          text: `${text}\n${url}`,
          url,
        });
        setSharingFile(false);
        onClose();
        return;
      }
    } catch (e) {
      console.log('Share dismissed or not supported', e);
    }
    setSharingFile(false);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      url: `https://wa.me/?text=${encodeURIComponent(fullShareText)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      name: 'X (Twitter)',
      icon: ExternalLink,
      color: 'bg-black hover:bg-slate-800 text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-rose-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-devanagari">
                पुस्तक साझा करें (Share Book)
              </h3>
              <p className="text-xs text-rose-200 mt-0.5">
                Fin सखी - वित्तीय साक्षरता से सशक्त नारी
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Visual Book Cover Link Preview Card */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-rose-600" />
                <span>WhatsApp व सोशल मीडिया प्रिव्यू (Cover Preview)</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-medium">
                Cover Attached
              </span>
            </div>

            <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-200/80 flex items-start gap-3 shadow-2xs">
              <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden shadow-md border border-rose-200 bg-white">
                <img
                  src="/og-cover.jpg"
                  alt="Fin सखी Front Book Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-rose-700 font-semibold block">
                  Official Book
                </span>
                <h4 className="font-bold text-slate-900 text-sm font-devanagari leading-snug truncate">
                  Fin सखी - वित्तीय साक्षरता से सशक्त नारी
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 font-devanagari">
                  लेखिका: प्रतिमा (बैंकर एवं कवयित्री)। महिलाओं के लिए बजट, निवेश व ऋण की व्यावहारिक मार्गदर्शिका।
                </p>
                <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-500">
                  <span className="font-mono font-bold text-slate-900">₹465</span>
                  <span>·</span>
                  <span>Direct UPI Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Direct Sharing Channels */}
          <div>
            <p className="text-xs text-slate-600 font-devanagari mb-2.5">
              WhatsApp, Telegram अथवा सोशल मीडिया पर तुरंत भेजें:
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {shareLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-all font-medium text-xs shadow-2xs ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Native Share with Image File Trigger (on mobile) */}
          {typeof navigator !== 'undefined' && !!navigator.share && (
            <button
              type="button"
              onClick={handleNativeShareWithImage}
              disabled={sharingFile}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs disabled:opacity-60"
            >
              <Share2 className="w-4 h-4 text-rose-300" />
              <span>{sharingFile ? 'Preparing Image...' : 'Share Book with Image File (फोटो सहित शेयर करें)'}</span>
            </button>
          )}

          {/* Copy URL Field */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Direct Store Link (URL)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={url}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3.5 py-2.5 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

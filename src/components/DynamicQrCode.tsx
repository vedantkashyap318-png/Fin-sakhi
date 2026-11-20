import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { RefreshCw, Download, Sparkles, Check, Copy } from 'lucide-react';
import { OFFICIAL_UPI_ID, OFFICIAL_PAYEE_NAME, OFFICIAL_GPAY_PHONE } from '../types';

interface DynamicQrCodeProps {
  amount: number;
  quantity?: number;
  upiId?: string;
  payeeName?: string;
  note?: string;
  className?: string;
}

export const DynamicQrCode: React.FC<DynamicQrCodeProps> = ({
  amount,
  quantity: explicitQuantity,
  upiId = OFFICIAL_UPI_ID,
  payeeName = OFFICIAL_PAYEE_NAME,
  note = 'Fin Sakhi Book Order',
  className = '',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrError, setQrError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 505;
  const formattedAmount = safeAmount.toFixed(2);
  const quantity = explicitQuantity ?? Math.max(1, Math.round((safeAmount - 40) / 465));

  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

  useEffect(() => {
    let isMounted = true;
    setQrError(false);

    QRCode.toDataURL(upiUri, {
      width: 340,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setQrError(false);
        }
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
        if (isMounted) {
          setQrError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  const handleCopyUpi = async () => {
    let didCopy = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(upiId);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Dynamic Auto-Amount QR Header Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50/80 rounded-lg border border-rose-200/70 text-xs font-semibold text-rose-900">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Auto-Amount QR (₹{formattedAmount})</span>
      </div>

      {/* Main Card View */}
      <div className="relative bg-white rounded-2xl shadow-md border border-slate-200/90 max-w-[300px] w-full overflow-hidden flex flex-col items-center p-3 sm:p-4">
        {/* Dynamic Amount Ribbon on Top */}
        <div className="w-full bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-200/80 rounded-xl p-2.5 mb-3 text-center">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-600 font-medium">चयनित प्रतियों की राशि:</span>
            <span className="font-semibold text-rose-800 bg-rose-100/70 px-1.5 py-0.5 rounded text-[11px]">
              {quantity} {quantity === 1 ? 'Copy' : 'Copies'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
            ₹{formattedAmount}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            GPay अथवा किसी भी पेमेंट ऐप में स्वतः ₹{formattedAmount} की राशि दिखेगी
          </p>
        </div>

        {/* Dynamic Amount-Encoded QR */}
        <div className="relative w-full aspect-square flex flex-col items-center justify-center p-2">
          {qrError ? (
            <div className="flex flex-col items-center justify-center gap-1.5 text-center text-rose-700 px-3">
              <span className="text-xs font-semibold">Unable to generate QR right now</span>
              <span className="text-[11px] text-slate-500">Please pay using UPI ID: {upiId}</span>
            </div>
          ) : qrDataUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={qrDataUrl}
                alt={`UPI QR Code for ₹${formattedAmount}`}
                className="w-full h-full object-contain rounded-lg"
              />
              {/* Central GPay icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 48 48" className="w-6 h-6">
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin text-rose-600" />
              <span className="text-xs">Generating QR with ₹{formattedAmount}...</span>
            </div>
          )}
        </div>

        {/* UPI Details Below Card */}
        <div className="mt-3 text-center w-full border-t border-slate-100 pt-2.5 space-y-1">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-mono font-bold text-slate-800 text-[11px] select-all">
              {upiId}
            </span>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy UPI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Action & Guidance */}
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="text-[11px] text-emerald-700 font-medium">
          Payable Total: ₹{formattedAmount}
        </span>
        {qrDataUrl && (
          <a
            href={qrDataUrl}
            download={`FinSakhi_UPI_QR_₹${safeAmount}.png`}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Save QR</span>
          </a>
        )}
      </div>

      {safeAmount > 2000 && (
        <p className="text-[11px] text-amber-900 bg-amber-50/80 border border-amber-200/80 rounded-lg px-3 py-1.5 max-w-[300px] leading-snug">
          For orders above ₹2,000, use live camera scan or pay via UPI ID (<span className="font-mono font-semibold">{upiId}</span>) / Number <span className="font-mono font-semibold">{OFFICIAL_GPAY_PHONE}</span> — UPI apps cap gallery QR uploads at ₹2,000.
        </p>
      )}
    </div>
  );
};

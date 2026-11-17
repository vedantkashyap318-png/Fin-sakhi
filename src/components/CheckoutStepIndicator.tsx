import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutStepIndicatorProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: 1 | 2) => void;
}

const STEPS: ReadonlyArray<{ id: 1 | 2 | 3; label: string }> = [
  { id: 1, label: 'Address' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Confirmation' },
];

export const CheckoutStepIndicator: React.FC<CheckoutStepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <nav
      aria-label="Checkout progress"
      className="bg-rose-50/70 border-b border-rose-100 px-4 sm:px-6 py-3"
    >
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = isCompleted && step.id !== 3 && Boolean(onStepClick);

          const node = (
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold tabular-nums shrink-0 transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : isCurrent
                  ? 'bg-rose-700 text-white ring-4 ring-rose-200/80'
                  : 'bg-white border border-slate-300 text-slate-400'
              }`}
            >
              {isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              ) : (
                step.id
              )}
            </span>
          );

          const label = (
            <span
              className={`text-xs sm:text-[13px] whitespace-nowrap transition-colors ${
                isCompleted
                  ? 'text-emerald-800 font-semibold'
                  : isCurrent
                  ? 'text-rose-950 font-bold'
                  : 'text-slate-400 font-medium'
              }`}
            >
              {step.label}
            </span>
          );

          return (
            <React.Fragment key={step.id}>
              <li
                className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isClickable ? (
                  <button
                    type="button"
                    onClick={() => onStepClick?.(step.id as 1 | 2)}
                    className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500 rounded-md px-1 py-0.5 -mx-1"
                    title={`Return to ${step.label}`}
                  >
                    {node}
                    <span className="text-xs sm:text-[13px] whitespace-nowrap text-emerald-800 font-semibold group-hover:underline">
                      {step.label}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {node}
                    {label}
                  </div>
                )}
              </li>

              {index < STEPS.length - 1 && (
                <li aria-hidden="true" className="flex-1 min-w-4">
                  <div
                    className={`h-0.5 w-full rounded-full transition-colors ${
                      step.id < currentStep ? 'bg-emerald-500' : 'bg-rose-200'
                    }`}
                  />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

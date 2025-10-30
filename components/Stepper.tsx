import React from 'react';
import { CheckIcon } from './Icons';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full px-4 sm:px-0">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-brand-DEFAULT text-white'
                      : isCurrent
                      ? 'border-2 border-brand-dark bg-brand-light text-brand-dark'
                      : 'border-2 border-gray-300 bg-gray-50 text-gray-500'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="h-6 w-6" /> : stepNumber}
                </div>
                <p className={`mt-2 w-24 text-xs sm:text-sm font-medium transition-colors duration-300 ${isCurrent ? 'text-brand-dark' : 'text-gray-600'}`}>
                  {step}
                </p>
              </div>
              {!isLast && (
                <div className={`flex-auto border-t-2 transition-colors duration-500 ${
                    isCompleted || isCurrent ? 'border-brand-DEFAULT' : 'border-gray-300'
                }`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

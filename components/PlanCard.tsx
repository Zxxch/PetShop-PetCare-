import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../types';
import { CheckIcon, CalendarIcon, SpinnerIcon } from './Icons';

interface PlanCardProps {
  plan: Plan;
}

type ButtonState = 'idle' | 'loading' | 'success';

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  
  const handleBookNow = () => {
    if (buttonState !== 'idle') return;

    setButtonState('loading');
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => {
        navigate(`/book/${plan.id}`);
        // Reset state in case user navigates back to the page
        setButtonState('idle'); 
      }, 1000);
    }, 1500);
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return (
          <>
            <SpinnerIcon className="h-5 w-5" />
            Procesando...
          </>
        );
      case 'success':
        return (
          <>
            <CheckIcon className="h-5 w-5" />
            ¡Listo!
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <CalendarIcon className="h-5 w-5" />
            Reservar Ahora
          </>
        );
    }
  };

  const getButtonClasses = () => {
    let baseClasses = "flex w-full items-center justify-center gap-2 rounded-lg py-3 px-4 font-semibold transition-all duration-300";
    if (buttonState === 'success') {
      return `${baseClasses} bg-green-500 text-white`;
    }
    if (buttonState === 'loading') {
      return `${baseClasses} bg-accent-dark text-white cursor-not-allowed`;
    }
    return `${baseClasses} bg-accent-DEFAULT text-black hover:bg-accent-dark`;
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-[#FFEAD5] p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
      <p className="mt-2 text-gray-600">{plan.description}</p>
      <p className="my-6">
        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
        <span className="text-lg font-medium text-gray-500">/mes</span>
      </p>
      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckIcon className="h-6 w-6 text-brand-DEFAULT flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <button
          onClick={handleBookNow}
          disabled={buttonState === 'loading'}
          className={getButtonClasses()}
        >
          {renderButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
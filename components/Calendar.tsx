

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };
  
  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, not time

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, today);
      const isPast = date < today;

      const baseClasses = 'text-center p-2 rounded-full cursor-pointer transition-all duration-200 ease-out w-9 h-9 flex items-center justify-center';
      const selectedClasses = 'bg-green-400 text-black font-bold scale-110 shadow-md';
      const todayClasses = 'border border-brand-dark';
      const pastClasses = 'text-gray-400 cursor-not-allowed';
      const defaultClasses = 'hover:bg-brand-light';

      const classes = `${baseClasses} ${
        isPast && !isToday ? pastClasses : (isSelected ? selectedClasses : (isToday ? todayClasses : defaultClasses))
      }`;

      days.push(
        <div key={day} onClick={() => !(isPast && !isToday) && onDateChange(date)} className={classes}>
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="font-semibold text-lg capitalize">
          {currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-medium text-xs text-gray-500">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
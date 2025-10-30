import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { Plan, Branch } from '../types';
import Calendar from '../components/Calendar';
import Stepper from '../components/Stepper';
import { CalendarIcon, LocationMarkerIcon } from '../components/Icons';

// Mock Data
const MOCK_PLANS: Plan[] = [
  { id: 'plan1', name: 'Aseo Básico', description: 'Cuidado esencial para una mascota feliz.', price: 45, features: ['1 Sesión de Aseo', 'Corte de Uñas', 'Limpieza de Oídos', 'Corte de Pelo'] },
  { id: 'plan2', name: 'Mimo Premium', description: 'La experiencia de spa definitiva.', price: 75, features: ['2 Sesiones de Aseo', 'Champú Premium', 'Tratamiento de Bálsamo para Patas', 'Cepillado de Dientes', 'Corte de Pelo Estilizado'] },
  { id: 'plan3', name: 'Bienestar Mensual', description: 'Cuidado constante para una salud duradera.', price: 120, features: ['4 Sesiones de Aseo', 'Paquete de Spa Completo', 'Revisión de Salud Mensual', 'Reserva Prioritaria', 'Cortes de Pelo a Demanda'] },
];
const MOCK_BRANCHES: Branch[] = [
    { id: 'b1', name: 'Sucursal Palermo', address: 'Av. Santa Fe 4567' },
    { id: 'b2', name: 'Sucursal Belgrano', address: 'Av. Cabildo 1234' },
    { id: 'b3', name: 'Sucursal Recoleta', address: 'Av. Alvear 789' },
    { id: 'b4', name: 'Sucursal Caballito', address: 'Av. Rivadavia 5678' },
    { id: 'b5', name: 'Sucursal Nuñez', address: 'Av. del Libertador 8901' },
    { id: 'b6', name: 'Sucursal Villa Urquiza', address: 'Av. Triunvirato 2345' },
];
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
const bookingSteps = ['Mascota y Fecha', 'Sucursal', 'Confirmar'];

const BookingPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { pets } = usePets();

  const [selectedPetId, setSelectedPetId] = useState<string | null>(pets.length > 0 ? pets[0].id : null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const plan = MOCK_PLANS.find(p => p.id === planId);

  useEffect(() => {
    if (selectedPetId && selectedTime && selectedBranchId) {
        setCurrentStep(3);
    } else if (selectedPetId && selectedTime) {
        setCurrentStep(2);
    } else {
        setCurrentStep(1);
    }
  }, [selectedPetId, selectedTime, selectedBranchId]);

  const handleBooking = () => {
    const selectedBranch = MOCK_BRANCHES.find(b => b.id === selectedBranchId);
    if (!selectedPetId || !selectedDate || !selectedTime || !plan || !selectedBranch) {
      alert('Por favor, completa todos los campos para la reserva.');
      return;
    }
    navigate('/confirmation', {
      state: {
        petName: pets.find(p => p.id === selectedPetId)?.name,
        planName: plan.name,
        date: selectedDate.toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
        time: selectedTime,
        branchName: selectedBranch.name,
        appointmentTimestamp: selectedDate.toISOString(),
      },
    });
  };

  if (!plan) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Plan no encontrado</h2>
        <p>El plan que buscas no existe.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2 text-center">
        Reservar Turno para <span className="text-brand-dark">{plan.name}</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">Confirma los detalles para el aseo de tu mascota.</p>

      <div className="mb-12">
        <Stepper steps={bookingSteps} currentStep={currentStep} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Form Steps */}
        <div className="md:col-span-2 space-y-8">
            {/* Step 1: Pet & Date/Time */}
            <div className="bg-[#FFF3E0] p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Paso 1: Detalles del Turno</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Mascota</label>
                        <select
                            id="pet"
                            name="pet"
                            value={selectedPetId ?? ''}
                            onChange={(e) => setSelectedPetId(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-dark focus:border-brand-dark sm:text-sm rounded-md bg-white text-gray-900"
                            >
                            {pets.length > 0 ? (
                                pets.map(pet => (
                                <option key={pet.id} value={pet.id} className="text-gray-900 bg-white">{pet.name}</option>
                                ))
                            ) : (
                                <option disabled className="text-gray-500 bg-white">Por favor, añade una mascota primero.</option>
                            )}
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Elige Fecha y Hora</label>
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {timeSlots.map(time => (
                                <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                                    selectedTime === time
                                    ? 'bg-brand-dark text-white border-brand-dark'
                                    : 'bg-white hover:bg-brand-light border-gray-300'
                                }`}
                                >
                                {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2: Branch Selection */}
            <div className="bg-[#FFF3E0] p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Paso 2: Selecciona una Sucursal</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_BRANCHES.map(branch => (
                         <button
                            key={branch.id}
                            onClick={() => setSelectedBranchId(branch.id)}
                            className={`p-4 rounded-lg border text-left transition-all ${
                                selectedBranchId === branch.id
                                ? 'bg-brand-light border-brand-dark ring-2 ring-brand-dark'
                                : 'bg-white hover:border-brand-dark hover:bg-brand-light/50 border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <LocationMarkerIcon className="h-6 w-6 text-brand-dark flex-shrink-0"/>
                                <div>
                                    <p className="font-semibold text-sm">{branch.name}</p>
                                    <p className="text-xs text-gray-500">{branch.address}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Booking Summary */}
        <div className="space-y-6">
          <div className="bg-[#FFF3E0] p-6 rounded-lg space-y-4 sticky top-24">
              <h3 className="text-xl font-semibold border-b pb-2">Resumen de la Reserva</h3>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Mascota:</span>
                <span className="font-bold">{pets.find(p => p.id === selectedPetId)?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Fecha:</span>
                <span className="font-bold">{selectedDate.toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Hora:</span>
                <span className="font-bold">{selectedTime || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Sucursal:</span>
                <span className="font-bold text-right">{MOCK_BRANCHES.find(b => b.id === selectedBranchId)?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t mt-2">
                <span className="font-medium text-gray-700">Total:</span>
                <span className="font-bold text-brand-dark">${plan.price}</span>
              </div>
              <button
                onClick={handleBooking}
                disabled={!selectedPetId || !selectedTime || !selectedBranchId}
                className="w-full bg-brand-DEFAULT text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CalendarIcon className="h-5 w-5" />
                Confirmar y Pagar
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
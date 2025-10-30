import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { usePets } from '../contexts/PetContext';
import { useBookings } from '../contexts/BookingContext';
import { Plan } from '../types';
import PlanCard from '../components/PlanCard';
import { CalendarIcon, TrashIcon } from '../components/Icons';

// Mock Data
const MOCK_PLANS: Plan[] = [
  { id: 'plan1', name: 'Aseo Básico', description: 'Cuidado esencial para una mascota feliz.', price: 45, features: ['1 Sesión de Aseo', 'Corte de Uñas', 'Limpieza de Oídos', 'Corte de Pelo'] },
  { id: 'plan2', name: 'Mimo Premium', description: 'La experiencia de spa definitiva.', price: 75, features: ['2 Sesiones de Aseo', 'Champú Premium', 'Tratamiento de Bálsamo para Patas', 'Cepillado de Dientes', 'Corte de Pelo Estilizado'] },
  { id: 'plan3', name: 'Bienestar Mensual', description: 'Cuidado constante para una salud duradera.', price: 120, features: ['4 Sesiones de Aseo', 'Paquete de Spa Completo', 'Revisión de Salud Mensual', 'Reserva Prioritaria', 'Cortes de Pelo a Demanda'] },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { pets } = usePets();
  const { bookings, cancelBooking } = useBookings();

  const handleCancelBooking = (bookingId: string) => {
      if (window.confirm('¿Estás seguro de que quieres cancelar este turno?')) {
          cancelBooking(bookingId);
      }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ¡Bienvenido de vuelta, {user?.name}!
      </h1>
      <p className="mt-2 text-lg text-gray-600">Gestiona tus mascotas y suscripciones.</p>

      {/* Upcoming Appointments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Próximos Turnos</h2>
        {bookings.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map(booking => (
                    <div key={booking.id} className="bg-[#FFF3E0] p-4 rounded-lg shadow-xl border border-orange-300 flex flex-col justify-between">
                        <div>
                            <p className="font-bold text-lg text-brand-dark">{booking.planName} para {booking.petName}</p>
                            <p className="text-sm text-gray-600 mt-1">{booking.branchName}</p>
                            <p className="text-sm text-gray-800 font-medium mt-2">{booking.date} a las {booking.time}</p>
                        </div>
                        <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-red-600 bg-red-100 hover:bg-red-200 transition-colors py-2 px-3 rounded-md"
                        >
                            <TrashIcon className="h-4 w-4" />
                            Cancelar Turno
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="mt-4 text-center py-8 bg-[#FFF3E0] rounded-lg shadow-xl border border-orange-300">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400"/>
                <p className="mt-2 text-gray-600">No tienes turnos pendientes.</p>
            </div>
        )}
      </div>

      {/* My Pets Summary Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Mis Mascotas ({pets.length})</h2>
            <Link to="/profile" className="rounded-lg bg-[#FFF3E0] border border-orange-200 px-4 py-2 text-gray-700 hover:bg-[#FBEAD5] transition-colors">
                Gestionar Mascotas
            </Link>
        </div>
         <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {pets.slice(0, 6).map(pet => (
            <div key={pet.id} className="text-center">
              <img src={pet.photoUrl} alt={pet.name} className="w-24 h-24 rounded-full mx-auto object-cover shadow-md border-2 border-white transition-transform duration-300 hover:scale-110"/>
              <p className="mt-2 text-sm font-medium">{pet.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Plans Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900">Elige un Plan</h2>
        <p className="mt-2 text-center text-gray-600">Selecciona el plan de aseo perfecto para tu amigo peludo.</p>
        <motion.div
          className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {MOCK_PLANS.map(plan => (
            <motion.div key={plan.id} variants={itemVariants}>
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
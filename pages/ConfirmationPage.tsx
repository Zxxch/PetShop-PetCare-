import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [notificationStatus, setNotificationStatus] = useState<'default' | 'granted' | 'denied' | 'unsupported'>('default');
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    // If state is not available, redirect to dashboard.
    if (!state) {
      navigate('/dashboard');
      return;
    }

    // --- Notification Logic ---
    const scheduleReminder = () => {
      if (!state.appointmentTimestamp || !state.time || reminderSet) return;

      const { appointmentTimestamp, time, petName, branchName } = state;
      const appointmentDate = new Date(appointmentTimestamp);

      // Parse time string e.g., '02:00 PM'
      const [timePart, modifier] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);

      if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0; // Midnight case

      appointmentDate.setHours(hours, minutes, 0, 0);

      const reminderTime = appointmentDate.getTime() - 60 * 60 * 1000; // 1 hour before
      const now = Date.now();

      if (reminderTime > now) {
        const delay = reminderTime - now;
        setTimeout(() => {
          new Notification('Recordatorio de Cita - PetCare+', {
            body: `Tu turno para ${petName} en ${branchName} es en una hora. ¡Te esperamos!`,
            icon: '/favicon.svg', // Assumes favicon is available at the root
          });
        }, delay);
        setReminderSet(true);
      } else {
        // Appointment is too soon or in the past, no reminder needed.
        setReminderSet(true); // Mark as "set" to avoid retrying
      }
    };

    if (!('Notification' in window)) {
      setNotificationStatus('unsupported');
      return;
    }
    
    const currentPermission = Notification.permission;
    setNotificationStatus(currentPermission);

    if (currentPermission === 'granted') {
      scheduleReminder();
    }
  }, [state, navigate, reminderSet]);
  
  const handleRequestNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    // The useEffect will handle scheduling if permission is granted
  };
  
  if (!state) {
    return null; // or a loading spinner while redirecting
  }

  const { petName, planName, date, time, branchName } = state;

  const renderNotificationUI = () => {
    switch(notificationStatus) {
      case 'granted':
        return <p className="text-sm text-green-800 mt-1">¡Todo listo! Te enviaremos un recordatorio una hora antes de tu cita.</p>;
      case 'denied':
        return <p className="text-sm text-red-800 mt-1">Las notificaciones están bloqueadas. Puedes habilitarlas en la configuración de tu navegador para recibir recordatorios.</p>;
      case 'unsupported':
        return <p className="text-sm text-gray-600 mt-1">Tu navegador no es compatible con las notificaciones.</p>;
      case 'default':
      default:
        return (
          <>
            <p className="text-sm text-gray-700 mt-1">
                Recibe un aviso una hora antes de tu cita.
            </p>
            <button
                onClick={handleRequestNotificationPermission}
                className="mt-3 w-full sm:w-auto rounded-md border border-transparent bg-accent-DEFAULT px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2"
            >
                Activar Recordatorios
            </button>
          </>
        );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-lg mx-auto">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">¡Reserva Confirmada!</h1>
        <p className="mt-2 text-gray-600">
          Tu turno ha sido agendado con éxito. Te hemos enviado un correo electrónico con los detalles.
        </p>
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border">
          <h2 className="text-lg font-semibold mb-3">Detalles de la Reserva</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Mascota:</span>
              <span className="font-medium text-gray-800">{petName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan:</span>
              <span className="font-medium text-gray-800">{planName}</span>
            </div>
             <div className="flex justify-between">
              <span className="text-gray-500">Sucursal:</span>
              <span className="font-medium text-gray-800">{branchName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fecha:</span>
              <span className="font-medium text-gray-800">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Hora:</span>
              <span className="font-medium text-gray-800">{time}</span>
            </div>
          </div>
        </div>

        {/* --- Notification Section --- */}
        <div className="mt-6 text-left bg-accent-light/50 p-4 rounded-lg border border-accent-DEFAULT/50">
          <h3 className="font-semibold text-accent-dark">¿Quieres un recordatorio?</h3>
          {renderNotificationUI()}
        </div>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-block w-full rounded-md border border-transparent bg-brand-DEFAULT py-3 px-4 text-center font-medium text-white hover:bg-brand-dark"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
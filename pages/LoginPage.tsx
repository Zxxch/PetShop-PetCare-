import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PawPrintIcon, SpinnerIcon } from '../components/Icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('lionel.messi@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    try {
      // The login is mocked and will always succeed with any non-empty strings
      await login(email, password);
      // App.tsx will handle the redirect to /dashboard upon successful login
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mx-auto flex h-12 w-auto items-center justify-center">
            <PawPrintIcon className="h-12 w-12 text-brand-DEFAULT" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Bienvenido a PetCare+
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión para gestionar a tus mascotas
          </p>
        </div>
        <div className="bg-white p-8 shadow-xl rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-dark focus:outline-none focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
               <div className="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-dark focus:outline-none focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <SpinnerIcon className="h-5 w-5 mr-2" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        </div>
         <p className="mt-4 text-center text-sm text-gray-500">
            Usa los datos pre-cargados para iniciar sesión.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
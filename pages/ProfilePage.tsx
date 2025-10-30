import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePets } from '../contexts/PetContext';
import { Pet } from '../types';
import PetCard from '../components/PetCard';
import PetFormModal from '../components/PetFormModal';
import { PlusIcon, UserCircleIcon } from '../components/Icons';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { pets, deletePet } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petToEdit, setPetToEdit] = useState<Pet | null>(null);

  const handleAddPet = () => {
    setPetToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setPetToEdit(pet);
    setIsModalOpen(true);
  };
  
  const handleDeletePet = (pet: Pet) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${pet.name}?`)) {
      deletePet(pet.id);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="Perfil" className="h-16 w-16 rounded-full object-cover shadow-md" />
            ) : (
              <UserCircleIcon className="h-16 w-16 text-gray-400"/>
            )}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Perfil de {user?.name}
                </h1>
                <p className="mt-1 text-lg text-gray-600">{user?.email}</p>
            </div>
        </div>

      {/* My Pets Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Mis Mascotas</h2>
            <button onClick={handleAddPet} className="flex items-center gap-2 rounded-lg bg-brand-DEFAULT px-4 py-2 text-white hover:bg-brand-dark transition-colors">
                <PlusIcon className="h-5 w-5" />
                Añadir Mascota
            </button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.length > 0 ? pets.map(pet => (
            <PetCard 
                key={pet.id} 
                pet={pet}
                onEdit={handleEditPet}
                onDelete={handleDeletePet}
            />
          )) : (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-12 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700">Aún no has añadido ninguna mascota</h3>
                <p className="text-gray-500 mt-1">¡Añade tu primera mascota para empezar a reservar!</p>
                 <button onClick={handleAddPet} className="mt-4 flex items-center mx-auto gap-2 rounded-lg bg-brand-DEFAULT px-4 py-2 text-white hover:bg-brand-dark transition-colors">
                    <PlusIcon className="h-5 w-5" />
                    Añadir Mascota
                </button>
            </div>
          )}
        </div>
      </div>
      
      <PetFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        petToEdit={petToEdit}
      />
    </div>
  );
};

export default ProfilePage;
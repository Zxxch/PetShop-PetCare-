import React from 'react';
import { Pet } from '../types';
import { PencilIcon, TrashIcon } from './Icons';

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onEdit, onDelete }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:scale-105">
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(pet)} className="p-2 rounded-full bg-white/70 hover:bg-white">
            <PencilIcon className="h-4 w-4 text-gray-700" />
        </button>
        <button onClick={() => onDelete(pet)} className="p-2 rounded-full bg-white/70 hover:bg-white">
            <TrashIcon className="h-4 w-4 text-red-600" />
        </button>
      </div>
      <img className="h-56 w-full object-cover" src={pet.photoUrl} alt={pet.name} />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
        <p className="text-sm text-gray-600">{pet.breed}</p>
        <p className="mt-2 text-xs text-gray-500">{pet.age} años</p>
      </div>
    </div>
  );
};

export default PetCard;
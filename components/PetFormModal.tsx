import React, { useState, useEffect } from 'react';
import { Pet } from '../types';
import { usePets } from '../contexts/PetContext';

interface PetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  petToEdit: Pet | null;
}

const PetFormModal: React.FC<PetFormModalProps> = ({ isOpen, onClose, petToEdit }) => {
  const { addPet, updatePet } = usePets();
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    photoUrl: ''
  });

  useEffect(() => {
    if (petToEdit) {
      setFormData({
        name: petToEdit.name,
        breed: petToEdit.breed,
        age: petToEdit.age.toString(),
        photoUrl: petToEdit.photoUrl,
      });
    } else {
      setFormData({ name: '', breed: '', age: '', photoUrl: '' });
    }
  }, [petToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const petData = {
      name: formData.name,
      breed: formData.breed,
      age: parseInt(formData.age, 10),
      photoUrl: formData.photoUrl || 'https://www.svgrepo.com/show/532392/dog.svg'
    };
    if (petToEdit) {
      updatePet({ ...petData, id: petToEdit.id, userId: petToEdit.userId });
    } else {
      addPet(petData);
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{petToEdit ? 'Editar Mascota' : 'Añadir Mascota'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Raza</label>
              <input
                type="text"
                name="breed"
                id="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad (años)</label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">URL de la Foto</label>
              <input
                type="url"
                name="photoUrl"
                id="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm bg-white text-gray-900"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-brand-DEFAULT border border-transparent rounded-md shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark"
            >
              {petToEdit ? 'Guardar Cambios' : 'Añadir Mascota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetFormModal;
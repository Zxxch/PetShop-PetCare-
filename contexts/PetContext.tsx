import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Pet } from '../types';
import { useAuth } from './AuthContext';

// Mock Data
const MOCK_PETS: Pet[] = [
  { id: 'pet1', userId: '1', name: 'Buddy', breed: 'Golden Retriever', age: 3, photoUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3414.jpg' },
  { id: 'pet2', userId: '1', name: 'Lucy', breed: 'Labrador', age: 5, photoUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_7802.jpg' },
  { id: 'pet3', userId: '1', name: 'Rocky', breed: 'Pitbull', age: 2, photoUrl: 'https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg' },
];

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id' | 'userId'>) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (petId: string) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);

  // In a real app, you would fetch pets based on the logged-in user.
  // Here we'll just load the mock pets if a user is logged in.
  React.useEffect(() => {
    if (user) {
      // Filter mock pets for the current user
      setPets(MOCK_PETS.filter(p => p.userId === user.id));
    } else {
      setPets([]);
    }
  }, [user]);

  const addPet = (petData: Omit<Pet, 'id' | 'userId'>) => {
    if (!user) return;
    const newPet: Pet = {
      ...petData,
      id: `pet${Date.now()}`, // simple unique id generation
      userId: user.id,
    };
    setPets(prevPets => [...prevPets, newPet]);
  };

  const updatePet = (updatedPet: Pet) => {
    setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
  };

  const deletePet = (petId: string) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};

"use client";

import { Pet } from "@/lib/types";
import React, { useState } from "react";

type TPetContextProps = {
  children: React.ReactNode,
  data: Pet[]
};

type TPetContext = {
  pets: Pet[],
  selectedPetId: string | null,
  selectedPet: Pet | undefined,
  numberOfPets: number,
  handleChangeSelectedPet: (id: string) => void;
  handleCheckout: (id: string) => void;
  handleAddPet: (pet: Omit<Pet, "id">) => void;
};

export const PetContext = React.createContext<TPetContext | null>(null);


export default function PetContextProvider({ children, data }: TPetContextProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleChangeSelectedPet = (id: string) => {
    setSelectedPetId(id);
  }

  const handleAddPet = (pet: Omit<Pet, "id">) => {
    setPets(prev => [...prev, 
      {
        ...pet,
        id: Date.now().toString()
      }
    ]);
  }

  const handleCheckout = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    setSelectedPetId(null);
  }

  return (
    <PetContext.Provider value={{
      pets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleChangeSelectedPet,
      handleCheckout,
      handleAddPet
    }}>{children}</PetContext.Provider>
  )
}

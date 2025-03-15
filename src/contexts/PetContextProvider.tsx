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
};

export const PetContext = React.createContext<TPetContext | null>(null);


export default function PetContextProvider({ children, data }: TPetContextProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  const handleChangeSelectedPet = (id: string) => {
    setSelectedPetId(id);
  }

  const numberOfPets = pets.length;

  return (
    <PetContext.Provider value={{
      pets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleChangeSelectedPet
    }}>{children}</PetContext.Provider>
  )
}

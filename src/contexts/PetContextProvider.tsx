"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { useOptimistic, useState } from "react";
import { toast } from "sonner";

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
  handleCheckout: (id: string) => Promise<void>;
  handleAddPet: (pet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, newPet: Omit<Pet, "id">) => Promise<void>;
};

export const PetContext = React.createContext<TPetContext | null>(null);


export default function PetContextProvider({ children, data }: TPetContextProps) {

  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, newPet) => {
    return [...state, {
      ...newPet, id: Date.now().toString()
    }];
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleChangeSelectedPet = (id: string) => {
    setSelectedPetId(id);
  }

  const handleAddPet = async (pet: Omit<Pet, "id">) => {
    setOptimisticPets(pet);
    const error = await addPet(pet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  const handleEditPet = async (petId: string, newPet: Omit<Pet, "id">) => {
    const error = await editPet(petId, newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  const handleCheckout = async (id: string) => {
    await deletePet(id)
    setSelectedPetId(null);
  }

  return (
    <PetContext.Provider value={{
      pets: optimisticPets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleChangeSelectedPet,
      handleCheckout,
      handleAddPet,
      handleEditPet
    }}>{children}</PetContext.Provider>
  )
}

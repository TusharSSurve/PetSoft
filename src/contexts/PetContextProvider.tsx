"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import React, { useOptimistic, useState } from "react";
import { toast } from "sonner";

type TPetContextProps = {
  children: React.ReactNode,
  data: Pet[]
};

type TPetContext = {
  pets: Pet[],
  selectedPetId: Pet['id'] | null,
  selectedPet: Pet | undefined,
  numberOfPets: number,
  handleChangeSelectedPet: (id: Pet['id']) => void;
  handleCheckout: (id: Pet['id']) => Promise<void>;
  handleAddPet: (pet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPet: PetEssentials) => Promise<void>;
};

export const PetContext = React.createContext<TPetContext | null>(null);


export default function PetContextProvider({ children, data }: TPetContextProps) {

  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, {action,payload}) => {
    switch (action) {
      case "add":
        return [...state, { ...payload, id: Date.now().toString() }];
      case "edit":
        return state.map((pet) => pet.id === payload.id ? { ...pet, ...payload.pet } : pet);
      case "delete":
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleChangeSelectedPet = (id: Pet['id']) => {
    setSelectedPetId(id);
  }

  const handleAddPet = async (pet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: pet });
    const error = await addPet(pet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  const handleEditPet = async (petId: Pet['id'], newPet: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, pet: newPet } });
    const error = await editPet(petId, newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  const handleCheckout = async (id: Pet['id']) => {
    setOptimisticPets({ action: "delete", payload: id });
    const error = await deletePet(id)
    if (error) {
      toast.warning(error.message);
      return;
    }
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

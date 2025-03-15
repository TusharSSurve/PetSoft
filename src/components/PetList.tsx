"use client";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPet } = usePetContext();
  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className={cn("flex h-[70px] w-full cursor-pointer px-5 text-base items-center gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",{
            'bg-[#EFF1F2]': selectedPetId === pet.id
          })} onClick={() => handleChangeSelectedPet(pet.id)}>
            <Image src={pet.imageUrl} alt="Pet Image" width={45} height={45} className="rounded-full object-cover w-[45px] h-[45px]" />
            <p className="">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

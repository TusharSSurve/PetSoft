"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import PetButton from "./PetButton";

export default function PetDetails() {
  const { selectedPet, handleCheckout } = usePetContext();
  return (
    <section className="flex flex-col w-full h-full">
      {
        !selectedPet ?
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-2xl font-medium">No pet selected</p>
          </div>
          : <>
            <div className="flex items-center bg-white px-8 py-5 border-b border-light">
              <Image src={selectedPet?.imageUrl || ""} alt="Selected Pet Image" width={75} height={75} className="rounded-full object-cover w-[75px] h-[75px]" />
              <h2 className="text-3xl font-semibold leading-7 ml-5">{selectedPet?.name}</h2>
              <div className="ml-auto space-x-2">
                <PetButton actionType="edit" />
                <PetButton actionType="checkout" onClick={() => { handleCheckout(selectedPet.id) }} />
              </div>
            </div>
            <div className="flex justify-around py-10 px-5 text-center">
              <div>
                <h3 className="text-[13px] font-medium text-zinc-700 uppercase">Owner name</h3>
                <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
              </div>
              <div>
                <h3 className="text-[13px] font-medium text-zinc-700 uppercase">Age</h3>
                <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
              </div>
            </div>
            <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
              {selectedPet?.notes}
            </section>
          </>

      }
    </section>
  )
}

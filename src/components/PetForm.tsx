"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petFormSchema, TPetForm } from "@/lib/validations";

type PetFormProps = {
  type: "edit" | "add";
  onFormSubmission: () => void;
}

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: type === "edit" ? {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes
    } : undefined
  });

  return (
    <form action={async () => {
      const result = await trigger();
      if (!result) return;
      const petData = getValues();
      petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;
      onFormSubmission();
      if (type === "edit") {
        await handleEditPet(selectedPet!.id, petData);
      } else if (type === "add") {
        await handleAddPet(petData);
      }

    }} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} required />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register('ownerName')} />
          {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageURL">Image URL</Label>
          <Input id="imageURL" {...register('imageUrl')} />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register('age')} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register('notes')} />
          {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
        </div>
      </div>
      <PetFormBtn type={type} />
    </form>
  )
}

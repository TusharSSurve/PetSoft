"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { PetEssentials } from "@/lib/types";

type PetFormProps = {
  type: "edit" | "add";
  onFormSubmission: () => void;
}

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<PetEssentials>();

  return (
    <form action={async (formData) => {
      const result = await trigger();
      if(!result) return;
      const petData = {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: (formData.get("imageUrl") as string) || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: Number(formData.get("age")) ,
        notes: formData.get("notes") as string
      }
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
          <Input id="name" {...register('name', {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long"
            }
          })} required />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register('ownerName', {
            required: "Owner Name is required",
            maxLength: {
              value: 20,
              message: "Owner Name should be at most 20 characters long"
            }
          })} />
          {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageURL">Image URL</Label>
          <Input id="imageURL" {...register('imageUrl',{
            required: "Image URL is required",
            pattern: {
              value: /^https?:\/\/.+\.(png|jpe?g|gif)$/i,
              message: "Please enter a valid image URL"
            }
          })} />
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

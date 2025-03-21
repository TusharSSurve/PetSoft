"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./PetFormBtn";

type PetFormProps = {
  type: "edit" | "add";
  onFormSubmission: () => void;
}

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form action={async (formData) => {
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
          <Input id="name" name="name" type="text" required defaultValue={type === "edit" ? selectedPet?.name : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" name="ownerName" type="text" required defaultValue={type === "edit" ? selectedPet?.ownerName : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageURL">Image URL</Label>
          <Input id="imageURL" name="imageURL" type="text" defaultValue={type === "edit" ? selectedPet?.imageUrl : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" required defaultValue={type === "edit" ? selectedPet?.age : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} required defaultValue={type === "edit" ? selectedPet?.notes : ""} />
        </div>
      </div>
      <PetFormBtn type={type} />
    </form>
  )
}

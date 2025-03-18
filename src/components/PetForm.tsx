"use client";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet } from "@/actions/actions";

type PetFormProps = {
  type: "edit" | "add";
  onFormSubmission: () => void;
}

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet } = usePetContext();

  return (
    <form action={addPet} className="flex flex-col">
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
      <Button type="submit" className="mt-5 self-end">{
        type === "add" ? "Add a new pet" : "Edit  pet"
      }</Button>
    </form>
  )
}

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function PetFormBtn({ type }: { type: "edit" | "add" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">{
      type === "add" ? "Add a new pet" : "Edit  pet"
    }</Button>
  )
}

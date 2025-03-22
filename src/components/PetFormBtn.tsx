
import { Button } from "./ui/button";

export default function PetFormBtn({ type }: { type: "edit" | "add" }) {
  return (
    <Button type="submit" className="mt-5 self-end">{
      type === "add" ? "Add a new pet" : "Edit  pet"
    }</Button>
  )
}

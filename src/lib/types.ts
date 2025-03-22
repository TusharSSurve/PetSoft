import { Pet } from "@prisma/client";

export type PetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt">;
export type TChild = {
  children: React.ReactNode
}

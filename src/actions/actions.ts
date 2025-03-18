"use server";
import prisma from "@/lib/db";

export async function addPet(pet) {
  await prisma.pet.create({
    data: {
      name: pet.get("name"),
      ownerName: pet.get("ownerName"),
      imageUrl: pet.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: parseInt(pet.get("age")),
      notes: pet.get("notes")
    }
  })
}
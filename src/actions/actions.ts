"use server";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);
  if(!validatedPet.success) {
    return {
      message: "Invalid pet data",
    }
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data
    })
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add pet",
    }
  }
  revalidatePath("/app", 'layout');
}

export async function editPet(petId: unknown, newPet: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPet);
  if(!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    }
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data
      },
      data: validatedPet.data
    })
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to edit pet",
    }
  }
  revalidatePath("/app", 'layout');
} 

export async function deletePet(petId: unknown) {
  await sleep(1000);
  const validatedPetId = petIdSchema.safeParse(petId);
  if(!validatedPetId.success) {
    return {
      message: "Invalid pet id",
    }
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data
      }
    })
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete pet",
    }
  }
  revalidatePath("/app", 'layout');
}

export async function logIn(authData: FormData) {
  await signIn('credentials', authData)
}

export async function logOut() {
  await signOut({ redirectTo: '/' });
}

export async function signUp(authData: FormData) {
  const hashedPassword = await bcrypt.hash(authData.get('password') as string, 10)
  await prisma.user.create({
    data: {
      email: authData.get('email') as string,
      hashedPassword: hashedPassword
    }
  })
  await signIn('credentials', authData)
}
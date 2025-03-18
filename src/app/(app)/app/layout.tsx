import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Background from "@/components/Background";
import PetContextProvider from "@/contexts/PetContextProvider";
import SearchContextProvider from "@/contexts/SearchContextProvider";
import { TChild } from "@/lib/types";
import prisma from "@/lib/db";

export default async function Layout({ children }: TChild) {
  const pets = await prisma.pet.findMany();
  return (
    <>
      <Background />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={pets}>
          <SearchContextProvider>
            {children}
          </SearchContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  )
}

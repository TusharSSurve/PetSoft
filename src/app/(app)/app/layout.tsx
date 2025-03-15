import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Background from "@/components/Background";
import PetContextProvider from "@/contexts/PetContextProvider";
import { Pet, TChild } from "@/lib/types";

export default async function Layout({ children }: TChild) {
  const response = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets")
  if (!response.ok) {
    throw new Error("Failed to fetch pets")
  }
  const data: Pet[] = await response.json();
  return (
    <>
      <Background />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={data}>
          {children}
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  )
}

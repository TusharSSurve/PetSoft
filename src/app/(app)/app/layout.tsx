import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Background from "@/components/Background";
import { TChild } from "@/lib/types";

export default function Layout({ children }: TChild) {
  return (
    <>
      <Background />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  )
}

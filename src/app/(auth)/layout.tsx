import Logo from "@/components/logo";
import { TChild } from "@/lib/types";

export default function Layout({ children }: TChild) {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-y-5">
      <Logo />
      {children}
    </div>
  )
}
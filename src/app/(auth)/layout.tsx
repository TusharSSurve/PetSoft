import { TChild } from "@/lib/types";

export default function Layout({ children }: TChild) {
  return (
    <div>header {children}</div>
  )
}
import { TChild } from "@/lib/types";

export default function H1({ children }: TChild) {
  return (
    <h1 className="font-medium text-2xl leading-6">{children}</h1>
  )
}

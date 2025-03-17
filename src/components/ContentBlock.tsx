import { cn } from "@/lib/utils";

type TContentBlock = {
  children: React.ReactNode;
  className?: string;
}
export default function ContentBlock({ children, className }: TContentBlock) {
  return (
    <div className={cn("bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full", className)}>{children}</div>
  )
}

import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "PetSoft - Pet Daycare",
  description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-background min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

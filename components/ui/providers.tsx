"use client";  // this tells Next.js this file runs on the client

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/ui/Header";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Header />   {/* Header uses hooks, so it goes here */}
      {children}   {/* Pages will render here */}
    </ClerkProvider>
  );
}

"use client";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

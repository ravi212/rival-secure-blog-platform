"use client";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </AuthProvider>
  );
}

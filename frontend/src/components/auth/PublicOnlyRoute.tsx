"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {Loader} from "../ui/Loader";

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/my-space");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <Loader />;

  return <>{children}</>;
}
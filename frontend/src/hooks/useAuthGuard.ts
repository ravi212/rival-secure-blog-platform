import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook to redirect authenticated users away from auth pages (login, register)
 * Use this in login/register pages to redirect already authenticated users
 */
export const useAuthRedirect = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;

    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isInitializing, router]);

  return isInitializing;
};

/**
 * Hook for accessing auth context with TypeScript safety
 * Includes common auth operations
 */
export const useAuthActions = () => {
  const auth = useAuth();
  const router = useRouter();

  return {
    ...auth,
    goToLogin: () => router.push("/login"),
    goToRegister: () => router.push("/register"),
    goToDashboard: () => router.push("/dashboard"),
  };
};

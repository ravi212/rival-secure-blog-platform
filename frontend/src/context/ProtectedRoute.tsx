import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <div className="space-y-4 text-center">
      <div className="inline-block">
        <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

/**
 * ProtectedRoute component wraps pages/components that require authentication
 * Redirects to login if user is not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { isAuthenticated, isInitializing, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Add role-based access control if needed
    if (
      requiredRoles.length > 0 &&
      user &&
      !requiredRoles.includes(user.id)
    ) {
      router.push("/");
    }
  }, [isAuthenticated, isInitializing, requiredRoles, user, router]);

  if (isInitializing) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

/**
 * withProtectedRoute HOC for wrapping components
 */
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[]
) => {
  return (props: P) => (
    <ProtectedRoute requiredRoles={requiredRoles}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

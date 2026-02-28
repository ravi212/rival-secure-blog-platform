import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayoutComponent from "@/components/dashboard/DahboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </ProtectedRoute>
  );
}

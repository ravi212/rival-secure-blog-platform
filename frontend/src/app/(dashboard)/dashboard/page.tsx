
import DashboardLayout from "@/components/dashboard/DahboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Overview</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard title="Total Posts" value="12" />
          <StatsCard title="Total Views" value="3,420" />
          <StatsCard title="Followers" value="245" />
        </div>
      </div>
    </DashboardLayout>
  );
}
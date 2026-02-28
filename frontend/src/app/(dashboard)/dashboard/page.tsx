'use client';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-sm font-semibold text-neutral-600 uppercase">Total Blogs</h3>
          <p className="text-3xl font-bold text-neutral-900 mt-2">—</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-sm font-semibold text-neutral-600 uppercase">Total Likes</h3>
          <p className="text-3xl font-bold text-neutral-900 mt-2">—</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-sm font-semibold text-neutral-600 uppercase">Total Comments</h3>
          <p className="text-3xl font-bold text-neutral-900 mt-2">—</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Recent Activity</h2>
        <p className="text-neutral-600">No activity yet. Create your first blog post to get started.</p>
      </div>
    </div>
  );
}

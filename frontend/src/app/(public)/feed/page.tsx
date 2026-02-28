"use client";
import BlogList from "@/components/blog/BlogList";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function FeedPage() {
  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore Articles</h1>
          <p className="text-muted-foreground">
            Discover insights from developers around the world.
          </p>
        </div>

        {/* Search (UI only for now) */}
        <div className="flex gap-2">
          <Input placeholder="Search articles..." />
          <Button>Search</Button>
        </div>
      </div>

      {/* Blog Grid */}
      <BlogList />
    </div>
  );
}
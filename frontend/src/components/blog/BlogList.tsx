'use client';

import { useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import BlogCard from "./BLogCard";
import Pagination from "@/components/common/Pagination";

export default function BlogList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFeed(page);

  if (isLoading) return <p>Loading articles...</p>;

  const blogs = data?.data ?? [];
  const meta = data?.meta;

  if (blogs.length === 0) return <p>No articles found.</p>;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      <Pagination
        currentPage={meta?.page ?? 1}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
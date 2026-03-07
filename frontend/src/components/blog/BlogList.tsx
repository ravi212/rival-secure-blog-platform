"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useFeed } from "@/hooks/useFeed";
import BlogCard from "./BLogCard";

export default function BlogList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<any[]>([]);

  const { data, isLoading } = useFeed(page);

  const newBlogs = data?.data ?? [];
  const meta = data?.meta;

  // append blogs
  useEffect(() => {
    if (!newBlogs.length) return;

    setBlogs((prev) => {
      const existingIds = new Set(prev.map((b) => b.id));
      const filtered = newBlogs.filter((b) => !existingIds.has(b.id));
      return [...prev, ...filtered];
    });
  }, [newBlogs]);

  const rowVirtualizer = useVirtualizer({
    count: blogs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220,
    overscan: 2,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // infinite loading
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];

    if (!lastItem) return;

    if (
      lastItem.index >= blogs.length - 1 &&
      !isLoading &&
      page < (meta?.totalPages ?? 1)
    ) {
      setPage((prev) => prev + 1);
    }
  }, [virtualItems, blogs.length, isLoading, meta?.totalPages, page]);

  return (
    <div ref={parentRef} className="h-[80vh] overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => {
          const blog = blogs[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {blog && <BlogCard {...blog} />}
            </div>
          );
        })}
      </div>

      {isLoading && (
        <p className="text-center py-4">Loading more articles...</p>
      )}
    </div>
  );
}

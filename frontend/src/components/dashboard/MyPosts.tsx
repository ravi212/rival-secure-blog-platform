"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMyBlogs, useDeleteBlog } from "@/hooks/useBlog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function MyPosts() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<any[]>([]);

  const { data, isLoading } = useMyBlogs(page);
  const { mutate, isPending } = useDeleteBlog();

  const router = useRouter();

  const newBlogs = data?.data ?? [];
  const meta = data?.meta;

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
    estimateSize: () => 90,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  // infinite loading
  useEffect(() => {
    const lastItem = items[items.length - 1];

    if (!lastItem) return;

    if (
      lastItem.index >= blogs.length - 1 &&
      !isLoading &&
      page < (meta?.totalPages ?? 1)
    ) {
      setPage((prev) => prev + 1);
    }
  }, [items, blogs.length, isLoading, meta?.totalPages, page]);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    mutate(id);
  };

  if (blogs.length === 0 && isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button onClick={() => router.push("/my-space/create")}>
          Create New Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-muted-foreground">
          You haven't created any posts yet.
        </p>
      ) : (
        <div
          ref={parentRef}
          className="h-[70vh] overflow-auto border rounded-lg"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {items.map((virtualRow) => {
              const blog = blogs[virtualRow.index];

              if (!blog) return null;

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
                  className="p-4"
                >
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold">{blog.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {blog.isPublished ? (
                        <span className="text-green-600 text-sm">
                          Published
                        </span>
                      ) : (
                        <span className="text-yellow-600 text-sm">Draft</span>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/my-space/edit/${blog.id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                        disabled={isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isLoading && (
            <p className="text-center py-4 text-sm text-muted-foreground">
              Loading more posts...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

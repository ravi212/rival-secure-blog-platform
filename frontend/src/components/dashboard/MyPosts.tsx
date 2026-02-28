"use client";

import { useState } from "react";
import { useMyBlogs, useDeleteBlog } from "@/hooks/useBlog";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function MyPosts() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyBlogs(page);
  const {mutate, isPending} = useDeleteBlog();
  const router = useRouter();

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  const blogs = data?.data ?? [];
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    mutate(id);
  };

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
        <>
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {blog.isPublished ? (
                    <span className="text-green-600 text-sm">Published</span>
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
            ))}
          </div>

          <Pagination
            currentPage={meta?.page ?? 1}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
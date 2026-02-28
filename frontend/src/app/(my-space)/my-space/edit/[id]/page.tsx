"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useBlog, useUpdateBlog } from "@/hooks/useBlog";
import CreateBlogForm from "@/components/dashboard/CreateBlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: blogData, isLoading } = useBlog(id as string);
  const updateBlog = useUpdateBlog();

  const [initialValues, setInitialValues] = useState<{
    title: string;
    content: string;
    isPublished: boolean;
  } | null>(null);

  useEffect(() => {
    if (blogData) {
      setInitialValues({
        title: blogData.title,
        content: blogData.content,
        isPublished: blogData.isPublished ?? false,
      });
    }
  }, [blogData]);

  if (isLoading || !initialValues) return <p>Loading blog...</p>;
  if (!blogData) return <p>Blog not found.</p>;

  const handleSubmit = (values: typeof initialValues) => {
    updateBlog.mutate(
      { id: id as string, data: values },
      {
        onSuccess: () => {
          router.push("/my-space"); // Redirect to My Posts page
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <CreateBlogForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isPending={updateBlog.isPending}
        submitLabel={updateBlog.isPending ? "Updating..." : "Update Blog"}
      />
    </div>
  );
}
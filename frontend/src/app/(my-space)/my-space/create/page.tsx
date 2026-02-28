"use client";
import CreateBlogForm from "@/components/dashboard/CreateBlogForm";
import { useCreateBlog } from "@/hooks/useBlog";
import { Blog, CreateBlogPayload } from "@/services/blog.service";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const createBlog = useCreateBlog();
    const handleSubmit = (values: CreateBlogPayload) => {
    createBlog.mutate(
      { ...values},
      {
        onSuccess: () => {
          router.push("/my-space"); // Redirect to My Posts page
        },
      }
    );
  };
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Create Blog</h1>
        <p className="text-muted-foreground">
          Write and publish a new post.
        </p>
      </div>

      <CreateBlogForm onSubmit={handleSubmit} isPending={createBlog.isPending} submitLabel={createBlog.isPending ? "Creating..." : "Create Blog"}/>
    </div>
  );
}
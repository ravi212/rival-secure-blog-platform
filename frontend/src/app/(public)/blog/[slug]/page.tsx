'use client';

import BlogDetails from "@/components/blog/BlogDetails";
import { useBlogBySlug } from "@/hooks/useBlog";
import { useParams } from "next/navigation";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const { data: blog, isLoading, isError } = useBlogBySlug(slug as string);

  if (isLoading) return <p>Loading blog...</p>;
  if (isError || !blog) return <p>Blog not found.</p>;

  return <BlogDetails {...blog} />;
}
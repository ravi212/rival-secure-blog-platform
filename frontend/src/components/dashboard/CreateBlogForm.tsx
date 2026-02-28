"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";

interface CreateBlogFormProps {
  initialValues?: {
    title: string;
    content: string;
    isPublished: boolean;
  };
  onSubmit: (values: {
    title: string;
    content: string;
    isPublished: boolean;
  }) => void;
  isPending?: boolean;
  submitLabel?: string;
}

export default function CreateBlogForm({
  initialValues,
  onSubmit,
  isPending = false,
  submitLabel = "Create Blog",
}: CreateBlogFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [isPublished, setIsPublished] = useState(
    initialValues?.isPublished ?? false
  );

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
      setIsPublished(initialValues.isPublished);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, isPublished });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <span className="text-sm">Publish immediately</span>
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Card>
  );
}
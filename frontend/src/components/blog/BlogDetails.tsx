'use client';

import { Badge } from "@/components/ui/badge";

export interface BlogDetailsProps {
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
}

export default function BlogDetails({
  title,
  content,
  createdAt,
  tags = [],
}: BlogDetailsProps) {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      
      <div className="space-y-4">
        {tags.length > 0 && <Badge>{tags[0]}</Badge>}

        <h1 className="text-4xl font-bold leading-tight">{title}</h1>

        <div className="flex items-center gap-3">
          <div className="text-sm">
            {/* <p className="font-medium">{author.email}</p> */}
            <p className="text-muted-foreground">
              {new Date(createdAt).toLocaleDateString()} · 8 min read
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none">
        <p>{content}</p>
      </div>
    </article>
  );
}
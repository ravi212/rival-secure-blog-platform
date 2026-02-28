import { Badge } from "@/components/ui/badge";

export default function BlogDetailsPage() {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      
      <div className="space-y-4">
        <Badge>Tech</Badge>

        <h1 className="text-4xl font-bold leading-tight">
          Building Scalable React Applications
        </h1>

        <div className="flex items-center gap-3">
          {/* <Avatar>
            <AvatarFallback>RR</AvatarFallback>
          </Avatar> */}
          <div className="text-sm">
            <p className="font-medium">Rav Rai</p>
            <p className="text-muted-foreground">Feb 2026 · 8 min read</p>
          </div>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none">
        <p>
          This is where your blog content will appear. Later this will
          be dynamic markdown or rich text content.
        </p>

        <p>
          The layout is clean, readable, and optimized for long-form content.
        </p>
      </div>

    </article>
  );
}
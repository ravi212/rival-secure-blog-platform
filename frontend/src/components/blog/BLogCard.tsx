
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/Button";

interface BlogCardProps {
  title: string;
  summary: string;
  author: {
    id: string;
    email: string;
  };
  createdAt: string;
  slug: string;
  _count: {
    likes: number;
    comments: number;
  };
}


export default function BlogCard({
  title,
  summary,
  author,
  createdAt,
  slug,
  _count,
}: BlogCardProps) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <Badge variant="secondary">Tech</Badge>
        <h3 className="text-xl font-semibold pt-2">{title}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{summary}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-sm">
            <p>{author.email}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <span className="text-sm text-muted-foreground">
            {_count?.likes} ❤️ {_count?.comments} 💬
          </span> */}

          <Link href={`/blog/${slug}`}>
            <Button variant="ghost" size="sm">
              Read
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
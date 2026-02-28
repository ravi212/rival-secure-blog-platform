import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/Button";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  author,
  date,
  slug,
}: BlogCardProps) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <Badge variant="secondary">Tech</Badge>
        <h3 className="text-xl font-semibold pt-2">{title}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <Avatar className="h-8 w-8">
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar> */}
          <div className="text-sm">
            <p>{author}</p>
            <p className="text-muted-foreground text-xs">{date}</p>
          </div>
        </div>

        <Link href={`/blog/${slug}`}>
          <Button variant="ghost" size="sm">
            Read
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
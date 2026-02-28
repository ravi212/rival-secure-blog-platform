import BlogCard from "./BLogCard";


export default function BlogList() {
  const mockBlogs = Array.from({ length: 9 }).map((_, i) => ({
    title: `Sample Blog Post ${i + 1}`,
    excerpt:
      "This is a preview of the blog content. It gives a quick overview of what the article covers.",
    author: "Rav Rai",
    date: "Feb 2026",
    slug: `sample-blog-${i + 1}`,
  }));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {mockBlogs.map((blog) => (
        <BlogCard key={blog.slug} {...blog} />
      ))}
    </div>
  );
}
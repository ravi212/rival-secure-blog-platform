import BlogCard from "../blog/BLogCard";

export default function FeaturedBlogs() {
  const mockBlogs = [
    {
      title: "Building Scalable React Apps",
      excerpt: "Learn how to structure large React applications like a senior engineer...",
      author: "Rav Rai",
      date: "Feb 2026",
      slug: "building-scalable-react-apps",
    },
    {
      title: "Mastering System Design Basics",
      excerpt: "Understanding scalability, caching, and distributed systems fundamentals...",
      author: "Rav Rai",
      date: "Feb 2026",
      slug: "mastering-system-design",
    },
    {
      title: "JWT Authentication Deep Dive",
      excerpt: "Access tokens, refresh tokens, and production-ready authentication strategy...",
      author: "Rav Rai",
      date: "Feb 2026",
      slug: "jwt-authentication-deep-dive",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <p className="text-muted-foreground">
            Insights and practical guides from experienced developers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mockBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
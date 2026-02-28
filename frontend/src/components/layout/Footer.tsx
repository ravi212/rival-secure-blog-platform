import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20 py-10 bg-muted/30">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="font-bold text-lg">RivalBlog</h3>
          <p className="text-sm text-muted-foreground mt-2">
            A modern blogging platform for developers and creators.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/feed">Explore</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground mt-10">
        © {new Date().getFullYear()} RivalBlog. All rights reserved.
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="py-24 text-center">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Write. Share. Inspire.
        </h1>

        <p className="text-lg text-muted-foreground">
          A modern platform for developers and creators to publish ideas,
          share knowledge, and grow their audience.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link href="/register">
            <Button size="lg">Start Writing</Button>
          </Link>
          <Link href="/feed">
            <Button variant="outline" size="lg">
              Explore Blogs
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
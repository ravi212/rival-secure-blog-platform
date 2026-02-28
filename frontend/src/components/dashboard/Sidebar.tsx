"use client";

import Link from "next/link";
import { Home, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white hidden md:flex flex-col p-6 gap-6">
      <h2 className="text-xl font-bold">My Space</h2>

      <nav className="flex flex-col gap-4 text-sm">
        <Link href="/my-space" className="flex items-center gap-2">
          <Home size={16} /> Overview
        </Link>

        <Link href="/my-space/posts" className="flex items-center gap-2">
          <FileText size={16} /> My Posts
        </Link>

        {/* <Link href="/my-space/settings" className="flex items-center gap-2">
          <Settings size={16} /> Settings
        </Link> */}
      </nav>
    </aside>
  );
}
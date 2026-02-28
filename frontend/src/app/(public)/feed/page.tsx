'use client';

import { useState } from 'react';
import { MainLayout, Container } from '@/components/layout/MainLayout';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BlogListSkeleton } from '@/components/ui/LoadingSkeletons';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';

// Mock data - replace with actual API call
const mockBlogs = [
  {
    id: '1',
    userId: 'user-1',
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-nextjs-15',
    content: 'Learn the basics of Next.js 15...',
    summary: 'A comprehensive guide to building modern web applications with Next.js 15',
    isPublished: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    likeCount: 234,
    commentCount: 45,
    author: { id: 'user-1', email: 'dev@example.com', createdAt: '', updatedAt: '' },
  },
  {
    id: '2',
    userId: 'user-2',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    content: 'Deep dive into TypeScript...',
    summary: 'Master advanced TypeScript patterns for enterprise-grade applications',
    isPublished: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    likeCount: 456,
    commentCount: 78,
    author: { id: 'user-2', email: 'typescript@example.com', createdAt: '', updatedAt: '' },
  },
  {
    id: '3',
    userId: 'user-3',
    title: 'Building Scalable APIs with NestJS',
    slug: 'building-scalable-apis-nestjs',
    content: 'NestJS framework for building scalable APIs...',
    summary: 'Learn how to build production-ready APIs using NestJS framework',
    isPublished: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    likeCount: 123,
    commentCount: 34,
    author: { id: 'user-3', email: 'nestjs@example.com', createdAt: '', updatedAt: '' },
  },
];

export default function FeedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const itemsPerPage = 10;

  const filteredBlogs = mockBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="py-12 bg-linear-to-br from-brand-50 to-green-50 border-b border-neutral-200">
        <Container size="lg">
          <div className="mb-8">
            <Badge variant="primary" size="md">
              Discover Stories
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Explore the Feed
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Discover engaging content from creators, developers, and thinkers around the world.
          </p>
        </Container>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-sm">
        <Container size="lg">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search blogs by title or topic..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>
            <Button variant="secondary" size="md">
              Filter
            </Button>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container size="lg">
          {isLoading ? (
            <BlogListSkeleton />
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                No blogs found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search or check back later for new content.
              </p>
              <Button variant="secondary">Clear Search</Button>
            </div>
          ) : (
            <>
              {/* Results Info */}
              <div className="mb-8">
                <p className="text-sm font-medium text-neutral-600">
                  Found <span className="text-brand-600">{filteredBlogs.length}</span> blog
                  {filteredBlogs.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Blog Grid */}
              <div className="space-y-6 mb-12">
                {paginatedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-neutral-200">
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`
                          w-10 h-10 rounded-lg font-medium transition-all duration-200
                          ${
                            currentPage === i + 1
                              ? 'bg-brand-600 text-white'
                              : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                          }
                        `}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* Featured/Trending Section */}
      {paginatedBlogs.length > 0 && (
        <section className="py-12 bg-neutral-50 border-t border-neutral-200">
          <Container size="lg">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-8">
              📈 Trending This Week
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {mockBlogs.slice(0, 2).map((blog) => (
                <BlogCard key={blog.id} blog={blog} featured />
              ))}
            </div>
          </Container>
        </section>
      )}
    </MainLayout>
  );
}

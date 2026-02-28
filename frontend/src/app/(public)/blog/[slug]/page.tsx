'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LikeButton } from '@/components/blog/LikeButton';
import { CommentItem } from '@/components/blog/CommentItem';
import { TextArea } from '@/components/ui/TextArea';
import { formatDistanceToNow } from 'date-fns';

// Mock data - will replace with API call
const mockBlog = {
  id: '1',
  title: 'Building Production-Grade React Applications',
  excerpt: 'A comprehensive guide to building scalable React applications with best practices.',
  content: `
    <h2>Introduction</h2>
    <p>React has become one of the most popular frameworks for building user interfaces. In this guide, we'll explore best practices for building production-grade React applications.</p>
    
    <h2>Key Principles</h2>
    <ul>
      <li>Component composition and reusability</li>
      <li>State management patterns</li>
      <li>Performance optimization</li>
      <li>Testing strategies</li>
      <li>Deployment considerations</li>
    </ul>

    <h2>Getting Started</h2>
    <p>To build a production-grade React application, you need to consider several factors...</p>
  `,
  slug: 'building-production-react',
  author: {
    id: '1',
    email: 'author@example.com',
    name: 'John Doe',
    bio: 'Full-stack developer with 10+ years of experience',
  },
  authorId: '1',
  featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80',
  published: true,
  publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  likesCount: 42,
  commentsCount: 8,
  isLiked: false,
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
};

const mockComments = [
  {
    id: '1',
    content: 'This is a great article! Really helpful tips.',
    author: {
      id: '2',
      email: 'reader1@example.com',
      name: 'Jane Smith',
      bio: 'React developer',
    },
    authorId: '2',
    blog: mockBlog,
    blogId: '1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    content: 'Looking forward to more content like this!',
    author: {
      id: '3',
      email: 'reader2@example.com',
      name: 'Mike Johnson',
      bio: 'Frontend engineer',
    },
    authorId: '3',
    blog: mockBlog,
    blogId: '1',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment = {
      id: String(Date.now()),
      content: newComment,
      author: {
        id: 'current-user',
        email: 'user@example.com',
        name: 'Current User',
        bio: 'You',
      },
      authorId: 'current-user',
      blog: mockBlog,
      blogId: mockBlog.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{mockBlog.published ? 'Published' : 'Draft'}</Badge>
            <span className="text-sm text-neutral-600">
              {formatDistanceToNow(new Date(mockBlog.publishedAt || mockBlog.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">{mockBlog.title}</h1>
          <p className="text-lg text-neutral-700 mb-6">{mockBlog.excerpt}</p>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-4 border-y border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold">
              {mockBlog.author.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{mockBlog.author.name}</p>
              <p className="text-sm text-neutral-600">{mockBlog.author.bio}</p>
            </div>
            <Button variant="secondary" size="sm">
              Follow
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {mockBlog.featuredImage && (
          <div className="mb-12 -mx-4 md:mx-0 md:rounded-lg overflow-hidden">
            <img
              src={mockBlog.featuredImage}
              alt={mockBlog.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{
              __html: mockBlog.content.replace(
                /<(h[1-6]|p|ul|li|strong|em)>/g,
                '<$1 class="prose-element">'
              ),
            }}
            className="space-y-6 text-neutral-800"
          >
            {/* Content will be rendered via dangerouslySetInnerHTML */}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 py-6 border-y border-neutral-200 mb-12">
          <LikeButton
            isLiked={mockBlog.isLiked}
            likeCount={mockBlog.likesCount}
            onToggle={async () => {}}
          />
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="text-sm font-medium">{mockBlog.commentsCount}</span>
            <span className="text-sm">Comments</span>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Comments ({comments.length})</h2>

          {/* New Comment Form */}
          <Card variant="flat" className="mb-8 p-6">
            <form onSubmit={handleCommentSubmit}>
              <TextArea
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                maxLength={500}
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setNewComment('')}
                  disabled={!newComment.trim()}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-center text-neutral-600 py-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

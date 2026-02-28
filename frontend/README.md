# Rival Secure Blog Platform - Frontend

> Modern, responsive React frontend for the Rival Secure Blog Platform built with Next.js and TypeScript

## 📋 Overview

The frontend provides a beautiful, responsive user interface for the Rival Secure Blog Platform. Built with Next.js 13+ App Router, it delivers excellent performance, SEO, and user experience. Features include authentication flows, blog creation/reading, comments, and social interactions.

### Architecture Decisions & Tradeoffs

#### 1. **Next.js 13+ with App Router**
- **Rationale**: Modern approach replacing Pages Router with better file-based routing and Server Components
- **Benefits**:
  - Server Components for better performance (no JavaScript sent to client)
  - Built-in optimization (image, font, script)
  - Better SEO with automatic meta tags
  - Incremental Static Regeneration (ISR) support
- **Tradeoff**: Learning curve compared to Pages Router; fewer third-party integrations available

#### 2. **React Query (TanStack Query)**
- **Rationale**: Dedicated library for managing server state (API data)
- **Benefits**:
  - Automatic caching and refetching
  - Request deduplication (multiple components requesting same data get single request)
  - Optimistic updates for better UX
  - Background synchronization
- **Tradeoff**: Additional dependency; overkill for simple data fetching

#### 3. **Context API for Authentication**
- **Rationale**: Lightweight state management for auth state without Redux
- **Benefits**: 
  - No external dependencies
  - Built into React
  - Sufficient for authentication state
- **Tradeoff**: Not ideal for deeply nested component trees (uses Context Selectors pattern to optimize)

#### 4. **Tailwind CSS**
- **Rationale**: Utility-first CSS framework instead of CSS Modules or Styled Components
- **Benefits**:
  - Small final CSS bundle (unused styles removed)
  - Consistent design system
  - Fast development (no naming decisions)
  - Dark mode support built-in
- **Tradeoff**: HTML markup can look cluttered with many utility classes

#### 5. **Shadcn/UI Components**
- **Rationale**: Headless UI component library with full customization
- **Benefits**:
  - Source code owned by the project (not black box)
  - Full control over component behavior
  - Uses Radix UI under the hood (accessible)
  - Tailwind CSS integrated
- **Tradeoff**: Manual component installation; updates require manual updates

#### 6. **App Router Layout System**
- **Rationale**: Use grouped routes `(auth)`, `(dashboard)`, `(public)` for shared layouts
- **Benefits**:
  - Shared layouts without URL segments
  - Route-based permission checks
  - Better code organization
- **Tradeoff**: Less intuitive than traditional routing hierarchy

### Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 13+ with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: [React Query](https://tanstack.com/query/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Forms**: React Hook Form
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables (see Configuration section)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Setup

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Add any other public variables with NEXT_PUBLIC_ prefix
```

**Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. The page auto-updates as you edit files.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Code Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint --fix
```

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (auth)/             # Authentication routes
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── (public)/           # Public routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── providers.tsx       # App providers (context, query client, etc.)
│   │   └── not-found.tsx       # 404 page
│   ├── components/             # Reusable components
│   │   ├── auth/               # Authentication components
│   │   ├── blog/               # Blog-related components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── landing/            # Landing page components
│   │   ├── layout/             # Layout components (NavBar, etc.)
│   │   └── ui/                 # UI framework components
│   ├── config/                 # Configuration files
│   │   ├── axios.ts            # Axios client setup
│   │   └── query-client.ts     # React Query configuration
│   ├── constants/              # Application constants
│   │   ├── endpoints.ts        # API endpoints
│   │   └── query-keys.ts       # React Query keys
│   ├── context/                # React Context
│   │   └── AuthContext.tsx     # Authentication context
│   ├── hooks/                  # Custom React hooks
│   │   ├── useBlog.ts          # Blog data hooks
│   │   ├── useComments.ts      # Comments hooks
│   │   ├── useLike.ts          # Likes hooks
│   │   └── useAuth.ts          # Auth hooks
│   ├── lib/                    # Utility functions
│   │   ├── api.ts              # API utilities
│   │   └── utils.ts            # General utilities
│   ├── providers/              # Provider components
│   │   └── query-provider.tsx  # Query client provider
│   ├── services/               # API service functions
│   │   ├── auth.service.ts     # Authentication service
│   │   ├── blog.service.ts     # Blog service
│   │   ├── comment.service.ts  # Comment service
│   │   └── like.service.ts     # Like service
│   └── types/                  # TypeScript type definitions
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
└── package.json
```

## 🔐 Authentication

The frontend includes a complete authentication system:

### Authentication Flow

1. **Register**: New users create an account
2. **Login**: Users authenticate with credentials
3. **Token Storage**: JWT stored in localStorage
4. **Protected Routes**: Routes require authentication via `AuthContext`
5. **Auto-refresh**: Tokens automatically refreshed when needed

### Auth Context

The `AuthContext` manages:
- Current user state
- Login/logout functions
- Token management
- Protected route access

### Protected Routes

Routes in `(dashboard)/` require authentication and will redirect unauthenticated users to login.

## 🎣 Custom Hooks

### Blog Hooks

```typescript
// Fetch all blogs
const { data: blogs, isLoading } = useBlog();

// Fetch single blog
const { data: blog } = useBlog(blogId);
```

### Comment Hooks

```typescript
// Get blog comments
const { data: comments } = useComments(blogId);

// Create comment
const { mutate: createComment } = useCreateComment();
```

### Like Hooks

```typescript
// Add/remove like
const { mutate: toggleLike } = useLike();
```

## 📦 State Management

### React Query

React Query manages server state (API data):

```typescript
// Queries
const { data, isLoading, error } = useQuery(['key'], fetchFn);

// Mutations
const { mutate, isPending } = useMutation(mutationFn);
```

### Context API

`AuthContext` manages authentication state globally.

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with a custom configuration:

```typescript
// Example component
<div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
  <h1 className="text-2xl font-bold text-gray-900">Blog Title</h1>
</div>
```

### Global Styles

Global styles in `app/globals.css`

## 🧩 Component Organization

### Example Component Structure

```typescript
// components/blog/BlogCard.tsx
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
  onRead?: () => void;
}

export function BlogCard({ blog, onRead }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Component content */}
    </div>
  );
}
```

## 📡 API Integration

### Axios Configuration

Axios client pre-configured with:
- Base URL from `NEXT_PUBLIC_API_URL`
- Request/response interceptors
- Error handling

### Service Functions

API calls organized in service files:

```typescript
// services/blog.service.ts
export const getBlog = async (id: string) => {
  const { data } = await api.get(`/blogs/${id}`);
  return data;
};
```

## 🚀 Performance Optimization

### Next.js Features

- **Image Optimization**: `next/image` component
- **Font Optimization**: `next/font`
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: ISR where applicable

### React Query Benefits

- Request deduplication
- Background refetching
- Automatic caching
- Optimistic updates

## 📚 Project Templates

### Creating a New Page

```typescript
// app/(dashboard)/my-page/page.tsx
'use client';

export default function MyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">My Page</h1>
    </div>
  );
}
```

### Creating a New Component

```typescript
// components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <div className="bg-white p-4">{title}</div>;
}
```

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- -p 3001
```

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS settings on backend

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors

```bash
# Generate types from API
npm run type-check
```

## � Scaling Strategies

### Performance Optimization

#### 1. **Code Splitting & Lazy Loading**
```typescript
// Dynamically load heavy components only when needed
import dynamic from 'next/dynamic';

const BlogEditor = dynamic(() => import('@/components/blog/BlogEditor'), {
  loading: () => <p>Loading editor...</p>,
});
```

#### 2. **Image Optimization**
```typescript
// Use next/image for automatic optimization
import Image from 'next/image';

export function BlogThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={200}
      placeholder="blur"  // Show blur while loading
      priority={false}    // Set true for above-the-fold images
    />
  );
}
```

#### 3. **Incremental Static Regeneration (ISR)**
```typescript
// app/blogs/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogsPage() {
  const blogs = await fetchBlogs();
  return <BlogList blogs={blogs} />;
}
```

#### 4. **React Query Configuration**
```typescript
// config/query-client.ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,        // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

#### 5. **Bundle Analysis**
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

### Deployment & Scaling

#### 1. **Vercel Deployment** (Recommended)
```bash
# Deploy with Vercel (Next.js creators)
npm install -g vercel
vercel
# Automatic:
# - Serverless functions for API routes
# - Edge caching for static assets
# - Automatic certificate setup
# - Environment variables management
```

#### 2. **Self-Hosted Deployment (Docker)**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./.next
COPY public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. **Content Delivery Network (CDN)**
```typescript
// next.config.ts
export default {
  images: {
    domains: ['cdn.example.com', 'cloudinary.com'],
  },
};
```

### Scaling Milestones

#### Phase 1: Load Testing (0-10K users)
- Identify bottlenecks using Chrome DevTools
- Monitor Core Web Vitals (LCP, FID, CLS)
- Optimize bundle size (<100KB gzipped)

#### Phase 2: Regional Distribution (10K-100K users)
- Deploy to multiple regions using Vercel
- Enable Edge Caching with Cloudflare
- Implement Service Workers for offline support

#### Phase 3: Advanced Optimization (100K+ users)
- Use Static Generation for blog listings
- Implement virtual scrolling for large lists
- Add prefetching strategies for common user flows
- Use WebAssembly for compute-heavy operations

### Monitoring Frontend Performance

```typescript
// Analytics setup using Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function registerWebVitals() {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}
```

Use monitoring services:
- **Vercel Analytics**: Built-in with Vercel deployment
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error logging

### Recommended Optimizations Checklist

- [ ] Enable Gzip compression in server
- [ ] Implement service worker caching
- [ ] Use CSS-in-JS or utility CSS (Tailwind)
- [ ] Lazy load images and components
- [ ] Minify and compress assets
- [ ] Use CDN for static assets
- [ ] Implement infinite scroll or pagination
- [ ] Enable request deduplication (React Query does this)
- [ ] Monitor Web Vitals regularly
- [ ] Use Lighthouse CI in CI/CD pipeline

## �📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

When contributing to the frontend:

1. Follow the established project structure
2. Use TypeScript for type safety
3. Follow Tailwind CSS conventions
4. Test components thoroughly
5. Write clean, readable code
6. Create descriptive pull requests

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js**

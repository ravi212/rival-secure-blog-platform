# Rival Secure Blog Platform - Frontend

> Modern, responsive React frontend for the Rival Secure Blog Platform built with Next.js and TypeScript

## 📋 Overview

The frontend provides a beautiful, responsive user interface for the Rival Secure Blog Platform. Built with Next.js 13+ App Router, it delivers excellent performance, SEO, and user experience. Features include authentication flows, blog creation/reading, comments, and social interactions.

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

## 📚 Additional Resources

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

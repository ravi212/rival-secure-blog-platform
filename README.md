# Rival Secure Blog Platform

> A modern, secure, and scalable full-stack blog platform built with cutting-edge web technologies.

## 📋 Overview

Rival Secure Blog Platform is a comprehensive blogging application featuring robust authentication, real-time content management, and interactive social features. The platform leverages a modern tech stack to deliver a seamless user experience with enterprise-grade security.

### Key Features

- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- ✍️ **Blog Management** - Create, read, update, and delete blog posts
- 💬 **Comments System** - Nested comment discussions on blog posts
- ❤️ **Like Feature** - Social engagement with post and comment likes
- 👥 **User Profiles** - Comprehensive user management system
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- ⚡ **High Performance** - Optimized backend with caching strategies
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## 🏗️ Architecture

The project follows a monorepo structure with clearly separated concerns:

```
rival-secure-blog-platform/
├── backend/          # NestJS REST API
├── frontend/         # Next.js React Application
└── README.md        # Project Documentation
```

### Architecture Overview

The Rival Secure Blog Platform employs a **client-server architecture** with clear separation of concerns:

- **Frontend (Next.js)**: Handles UI/UX, client-side state management, and server-side rendering for SEO/performance
- **Backend (NestJS)**: RESTful API providing business logic, database operations, and authentication
- **Database (PostgreSQL)**: Persistent data storage with Prisma as the ORM for type safety

### Architecture Decisions & Tradeoffs

#### 1. **Monorepo Structure**
- **Decision**: Use monorepo pattern with `/backend` and `/frontend` folders
- **Benefits**: Shared configuration, easier deployment, unified versioning
- **Tradeoff**: More complex setup initially, but better for cohesive full-stack development

#### 2. **NestJS Backend**
- **Decision**: Chose NestJS over raw Express/Fastify
- **Benefits**: Built-in dependency injection, modular architecture, excellent TypeScript support, enterprise-grade structure
- **Tradeoff**: Slightly more opinionated and heavier than minimalist frameworks

#### 3. **Next.js Frontend**
- **Decision**: Chose Next.js 13+ with App Router over plain React
- **Benefits**: SSR/SSG capabilities, built-in optimization, file-based routing, API routes, better SEO
- **Tradeoff**: Vendor lock-in to Vercel ecosystem, learning curve for App Router

#### 4. **Prisma ORM**
- **Decision**: Used Prisma instead of raw SQL or Query builders
- **Benefits**: Type-safe queries, automatic migrations, excellent DX, schema-driven development
- **Tradeoff**: Not ideal for complex raw SQL operations, dependency on Prisma's generated client

#### 5. **JWT Authentication**
- **Decision**: Implemented JWT tokens (stateless) instead of session-based auth
- **Benefits**: Stateless, scalable across multiple servers, works well with SPAs and mobile apps
- **Tradeoff**: Token revocation is complex, requires careful expiration management

#### 6. **React Query for State Management**
- **Decision**: Used React Query (TanStack Query) for async state instead of Redux
- **Benefits**: Minimal boilerplate, automatic caching/refetching, excellent for server state
- **Tradeoff**: Not ideal for complex client-state logic (use Context API instead)

### Technology Stack

#### Backend
- **Runtime**: Node.js
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT Strategy
- **Validation**: Class Validators

#### Frontend
- **Framework**: Next.js 13+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **API Client**: Axios
- **UI Components**: Custom components + Shadcn/UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 12+
- Git

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rival-secure-blog-platform.git
cd rival-secure-blog-platform
```

#### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure your `.env` file with database credentials and other settings.

```bash
# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

The backend will run on `http://localhost:3001` (or configured port)

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Configure your `.env.local` file (if needed):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

### Backend (`/backend`)

See [Backend README](./backend/README.md) for detailed documentation including:
- API endpoints
- Authentication flow
- Database schema
- Development guidelines

### Frontend (`/frontend`)

See [Frontend README](./frontend/README.md) for detailed documentation including:
- Component structure
- Page organization
- Custom hooks
- State management
- Styling guidelines

## 🔗 API Endpoints

Key API endpoints (see backend docs for complete list):

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /blogs` - List all blogs
- `POST /blogs` - Create new blog
- `GET /blogs/:id` - Get blog details
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog
- `POST /comments` - Add comment
- `POST /likes` - Add like

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm run test
```

## 🔒 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Prisma ORM prevents SQL injection

## 📦 Environment Variables

### Backend

Create `.env` in the backend folder:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/blog_platform
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=7d
NODE_ENV=development
```

### Frontend

Create `.env.local` in the frontend folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./backend/README.md#-api-documentation)

## � Scaling the System

### Current Architecture Limitations
- Single PostgreSQL database (bottleneck for high write loads)
- No caching layer (every request hits the database)
- No CDN for static assets
- Single backend instance

### Scaling Strategies

#### Phase 1: Optimization (0-1M users)
1. **Database Optimization**
   - Add indexes on frequently queried fields (userId, slug, createdAt)
   - Implement query pagination with cursor-based pagination for large datasets
   - Use read replicas for analytics queries

2. **Caching Layer**
   - Add Redis for caching blog posts, comments, and user profiles
   - Implement cache invalidation strategies (TTL + event-based)
   - Cache frequently accessed data: trending blogs, user profiles

3. **CDN Integration**
   - Use Cloudflare or AWS CloudFront for static assets
   - Cache images and media files
   - Enable compression and minimize payloads

4. **Application Optimization**
   - Enable database query optimization in Prisma
   - Implement rate limiting to prevent abuse
   - Add API response compression

#### Phase 2: Horizontal Scaling (1M-10M users)
1. **Backend Scaling**
   - Deploy multiple NestJS instances behind a load balancer (AWS ELB, HAProxy, Nginx)
   - Use auto-scaling groups for automatic instance management
   - Implement health checks and graceful shutdown

2. **Database Scaling**
   - Consider database sharding by userId or date range
   - Implement read-write separation with replication
   - Use managed services (AWS RDS Multi-AZ, Google Cloud SQL)

3. **Message Queues**
   - Add Bull/RabbitMQ for async notifications
   - Process heavy operations (email, analytics) asynchronously
   - Implement retry logic for failed jobs

4. **Frontend Optimization**
   - Next.js automatic code splitting
   - Implement ISR (Incremental Static Regeneration) for blog listing
   - Use dynamic imports for heavy components

#### Phase 3: Advanced Scaling (10M+ users)
1. **Microservices Architecture**
   - Separate auth service, blog service, notification service
   - Use API Gateway (Kong, AWS API Gateway)
   - Implement inter-service communication (gRPC, message queues)

2. **Search & Analytics**
   - Implement Elasticsearch for advanced blog search
   - Add analytics database (ClickHouse, BigQuery)
   - Separate OLTP from OLAP workloads

3. **Content Delivery**
   - Implement edge computing with Cloudflare Workers or AWS Lambda@Edge
   - Cache blog pages at edge locations
   - Serve from nearest geographic location

4. **Database Specialization**
   - Use specialized databases: Redis (cache), MongoDB (user activity), ClickHouse (analytics)
   - Implement CQRS (Command Query Responsibility Segregation)

### Performance Monitoring

```bash
# Monitor metrics
- Response time (p50, p95, p99)
- Database query performance
- Cache hit rates
- Error rates (4xx, 5xx)
- Resource utilization (CPU, memory, disk)
```

Use tools like:
- Prometheus + Grafana for monitoring
- New Relic or DataDog for APM
- AWS CloudWatch for infrastructure metrics

```bash
# Verify your DATABASE_URL in .env
# Reset migrations if needed
npx prisma migrate reset
```

### Port Already in Use

Change the port in backend configuration or kill the process using the port.

### CORS Errors

Ensure the frontend URL is properly configured in backend CORS settings.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Development Team - Initial work

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Blogging! 🎉**
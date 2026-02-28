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

## 🐛 Troubleshooting

### Database Connection Issues

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
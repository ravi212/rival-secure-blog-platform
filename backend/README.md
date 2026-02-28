# Rival Secure Blog Platform - Backend API

> REST API backend for the Rival Secure Blog Platform built with NestJS and Prisma

## 📋 Overview

The backend serves as the core API layer for the Rival Secure Blog Platform. It provides RESTful endpoints for authentication, blog management, comments, and user interactions. Built with NestJS, it offers excellent performance, scalability, and type safety with TypeScript.

### Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js Framework
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Class Validator & Class Transformer

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Setup environment variables (see Configuration section)
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 📋 Project Setup

### Install Dependencies

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blog_platform

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRATION=7d

# CORS (for frontend development)
FRONTEND_URL=http://localhost:3000
```

## 🏃 Running the Application

### Development Mode

```bash
# Start with hot reload
npm run start:dev
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Watch Mode

```bash
npm run start:watch
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

## 🗄️ Database

### Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# View migration history
npx prisma migrate status
```

### Prisma Studio

Open interactive database browser:

```bash
npx prisma studio
```

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| GET | `/auth/profile` | Get current user profile |
| PUT | `/auth/profile` | Update user profile |

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs (paginated) |
| POST | `/blogs` | Create new blog |
| GET | `/blogs/:id` | Get blog details |
| PUT | `/blogs/:id` | Update blog |
| DELETE | `/blogs/:id` | Delete blog |
| GET | `/blogs/user/:userId` | Get user's blogs |

### Comment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/comments` | Add comment |
| GET | `/comments/blog/:blogId` | Get blog comments |
| PUT | `/comments/:id` | Update comment |
| DELETE | `/comments/:id` | Delete comment |

### Like Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/likes` | Add like |
| DELETE | `/likes/:id` | Remove like |
| GET | `/likes/blog/:blogId/count` | Get blog like count |

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   ├── common/                 # Shared utilities
│   │   ├── constants/          # Application constants
│   │   ├── filters/            # Global exception filters
│   │   ├── guards/             # Auth guards
│   │   └── utils/              # Utility functions
│   ├── config/                 # Configuration
│   ├── database/               # Database layer
│   │   └── prisma/             # Prisma service & module
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Authentication
│   │   ├── blogs/              # Blog management
│   │   ├── comments/           # Comments system
│   │   ├── likes/              # Likes feature
│   │   ├── users/              # User management
│   │   └── public/             # Public routes
│   └── strategies/             # Authentication strategies
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── test/                       # E2E tests
└── package.json
```

## 🔐 Authentication

The API uses JWT-based authentication:

1. User registers or logs in
2. Server returns JWT token
3. Client includes token in `Authorization: Bearer <token>` header
4. JWT Guard validates token on protected routes

### Protected Routes

All routes except `/auth/register` and `/auth/login` require valid JWT token.

## 🎯 Module Organization

Each feature module follows NestJS best practices:

```
module/
├── controllers/          # HTTP request handlers
├── services/            # Business logic
├── dto/                 # Data transfer objects
├── entities/            # Database models (generated)
├── module.ts            # Module definition
└── *.spec.ts           # Tests
```

## 🛠️ Development Guidelines

### Code Style

- Follow TypeScript strict mode
- Use ESLint configuration provided
- Use Prettier for code formatting

### Naming Conventions

- **Controllers**: `*.controller.ts`
- **Services**: `*.service.ts`
- **DTOs**: `*.dto.ts`
- **Modules**: `*.module.ts`

### Error Handling

Global exception filter automatically handles errors and returns standardized error responses.

## 📋 Environment Configuration

Refer to `.env.example` for all available configuration options.

### Key Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRATION` - Token expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment (development, staging, production)

## 🚨 Troubleshooting

### Database Connection Issues

```bash
# Verify connection string
# Check PostgreSQL is running
# Reset migrations
npx prisma migrate reset
```

### Port Already in Use

```bash
# Change PORT in .env or kill process using the port
# On Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Guide](https://en.wikipedia.org/wiki/JSON_Web_Token)

## 🤝 Contributing

When contributing to the backend:

1. Follow the established project structure
2. Write tests for new features
3. Ensure all tests pass
4. Follow code style guidelines
5. Create descriptive pull requests

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using NestJS**
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

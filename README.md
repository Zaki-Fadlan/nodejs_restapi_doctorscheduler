## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- CORS Protection
- Comprehensive Logging System
- Swagger API Documentation
- PostgreSQL Database

##  Dependencies
- JWT (jsonwebtoken) - Authentication
- bcryptjs  - Password hashing
- CORS  - Cross-Origin Resource Sharing
- Swagger - API documentation
- node-pg-migrate - Database migrations
- Winston & Morgan(Http) - Logging

## Project Architecture
```
src/
├── app.ts                 # Application entry point
├── config/               # Configuration files
├── controllers/         # Request handlers
├── services/           # Business logic
├── models/             # Database models
├── routes/             # API routes
├── middlewares/        # Express middlewares
├── database/           # Database related files
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```
## Flow 

   ```
   Client Request 
   Global Middleware (CORS, Morgan Logger, Express JSON)
   Router
   Route Middleware (Authentication, RBAC)
   Controller (Request handling, validation)
   Service (Business logic)
   Model (Database operations)
   Database
   ```

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   make `.env` file and fill with your own config like `.env.example` file with:
   ```
    URI_APP=http://localhost:8080/api
    PORT=8080
    DATABASE_URL=postgres://username:password@localhost:5432/db_name
    JWT_SECRET=example_jwt_secret_key
    JWT_EXPIRES_IN=1d
    ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

   Run this command on terminal for generate your jwt secret
   ```
   node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('base64'));"
   ```

4. **Database Setup**
   ```bash
   npm run migrate:up
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Endpoints
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - User login

### Doctor Schedule Endpoints
All endpoints require JWT Authentication header: `Authorization: Bearer <token>`

- GET `/api/doctor_schedule` - Get all doctor schedules
- POST `/api/doctor_schedule` - Create new doctor schedule

### API Documentation UI 
- Access Swagger UI at Broser `http://localhost:8080/api/api-docs`

# Blog Backend API

NestJS REST API for blog management with authentication and user management.

## 🛠️ Tech Stack

- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **SQLite + TypeORM** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **class-validator** - Input validation

## 🚀 Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

API runs on `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── auth/           # Authentication module
├── blog/           # Blog CRUD operations
├── app.module.ts   # Root module
└── main.ts         # Entry point
```

## ✨ Features

- **Blog CRUD**: Create, read, update, delete blog posts
- **JWT Authentication**: Secure login/register
- **User Management**: Admin can manage users
- **Role-based Access**: Admin vs User permissions
- **Input Validation**: DTO validation with class-validator
- **Auto Admin**: Default admin user created on startup

## 🔐 Default Admin

- **Username**: `admin`
- **Password**: `admin123`
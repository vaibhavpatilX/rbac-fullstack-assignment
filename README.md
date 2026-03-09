<div align="center">

# 🔐 Full Stack Authentication & RBAC System

<p align="center">
  <i>A production-ready JWT-based Authentication and Role-Based Access Control system</i>
</p>

<p align="center">
  <strong>Spring Boot</strong> • <strong>React</strong> • <strong>TypeScript</strong> • <strong>JWT</strong>
</p>

[![Java](https://img.shields.io/badge/Java-21+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 Overview

A complete enterprise-grade authentication and authorization system demonstrating modern full-stack development practices. This project implements JWT-based stateless authentication with granular role-based access control, featuring a Spring Boot backend with Spring Security and a responsive React frontend with TypeScript.

**Key Highlights:**
- 🔒 Secure JWT authentication with BCrypt password hashing
- 👥 Role-Based Access Control (USER/ADMIN)
- 🎨 Modern, responsive UI with TailwindCSS
- 📝 Comprehensive API documentation with Swagger
- ✅ Form validation and error handling
- 🚀 Production-ready architecture

---

## 🚀 Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21+ | Programming Language |
| **Spring Boot** | 3.3.0 | Application Framework |
| **Spring Security** | 6.x | Authentication & Authorization |
| **JWT (jjwt)** | 0.11.5 | Token Generation & Validation |
| **Spring Data JPA** | — | ORM & Data Access |
| **Hibernate** | 6.5.2 | JPA Implementation |
| **H2 Database** | — | In-Memory Database (Development) |
| **Maven** | 3.8+ | Dependency Management |
| **SpringDoc OpenAPI** | 2.3.0 | API Documentation (Swagger UI) |
| **Bean Validation** | — | Request Validation |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI Library |
| **TypeScript** | 5.2 | Type-Safe JavaScript |
| **Vite** | 5.4.21 | Build Tool & Dev Server |
| **React Router** | v6.21 | Client-Side Routing |
| **TanStack Query** | 5.17 | Server State Management |
| **Axios** | 1.6 | HTTP Client |
| **React Hook Form** | 7.49 | Form Management & Validation |
| **TailwindCSS** | 3.4 | Utility-First Styling |

---

## 📁 Project Structure

```
rbac-project/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/com/botmakers/rbac/
│   │   ├── config/                   # Security, CORS, OpenAPI configuration
│   │   ├── controller/               # REST Controllers
│   │   │   ├── AuthController        # /api/auth/* endpoints
│   │   │   └── ContentController     # /api/{public|user|admin} endpoints
│   │   ├── dto/
│   │   │   ├── request/              # Login/Register DTOs
│   │   │   └── response/             # Response wrapper DTOs
│   │   ├── entity/                   # JPA Entities (User, Role enum)
│   │   ├── exception/                # Global exception handling
│   │   ├── repository/               # Spring Data JPA repositories
│   │   ├── security/
│   │   │   ├── jwt/                  # JWT utility & filter
│   │   │   └── service/              # UserDetailsService implementation
│   │   └── service/
│   │       └── impl/                 # Business logic (AuthService)
│   ├── src/main/resources/
│   │   └── application.properties    # App configuration
│   └── pom.xml                       # Maven dependencies
│
└── frontend/                         # React SPA
    ├── src/
    │   ├── api/                      # Axios instance & API clients
    │   │   ├── axiosInstance.ts      # HTTP interceptors for JWT
    │   │   └── authApi.ts            # Auth endpoints
    │   ├── hooks/                    # Custom React hooks
    │   │   └── useAuth.ts            # Authentication hook
    │   ├── pages/                    # Route components
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   └── DashboardPage.tsx
    │   ├── router/                   # Route protection
    │   │   └── ProtectedRoute.tsx
    │   ├── types/                    # TypeScript interfaces
    │   ├── App.tsx                   # Root component & routing
    │   ├── main.tsx                  # React entry point
    │   └── index.css                 # Global styles + Tailwind
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts                # Vite config with proxy
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- ☕ **Java 21+** (tested with Java 21 & Java 25) — [Download](https://www.oracle.com/java/technologies/downloads/)
  - **Note:** Java 25 may show deprecation warnings (safe to ignore)
  - **Recommended:** Java 21 LTS for production deployments
- 📦 **Maven 3.8+** — [Download](https://maven.apache.org/download.cgi)
- 🟢 **Node.js 18+** — [Download](https://nodejs.org/)
- 📦 **npm 9+** (comes with Node.js)

**Verify installations:**
```bash
java -version   # Should show Java 21.x or higher
mvn -version    # Should show Maven 3.8+
node -version   # Should show v18+
npm -version    # Should show v9+
```

> **⚠️ IMPORTANT:** This is a **multi-module project**. The backend and frontend are **separate applications** in their own directories. There is NO `package.json` in the root directory. Always run commands from the respective `backend/` or `frontend/` directories.

---

### 🔧 Backend Setup

```bash
# 1. Navigate to backend directory
cd rbac-project/backend

# 2. Install dependencies and build
mvn clean install

# 3. Run the Spring Boot application
mvn spring-boot:run
```

**Backend will start at:** `http://localhost:8080`

#### Available Endpoints:
- 📚 **Swagger UI:** http://localhost:8080/swagger-ui.html
- 🗄️ **H2 Database Console:** http://localhost:8080/h2-console
  - **JDBC URL:** `jdbc:h2:mem:rbacdb`
  - **Username:** `sa`
  - **Password:** *(leave empty)*

---

### 🎨 Frontend Setup

```bash
# 1. Navigate to frontend directory
cd rbac-project/frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**Frontend will start at:** `http://localhost:5173`

> **Note:** Vite automatically proxies `/api/*` requests to `http://localhost:8080`

---

## ✅ Verifying Successful Startup

### Backend Success Indicators

After running `mvn spring-boot:run`, look for these messages:

```
✓ Tomcat initialized with port 8080 (http)
✓ H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:rbacdb'
✓ Tomcat started on port 8080 (http) with context path '/'
✓ Started RbacApplication in ~6-7 seconds
```

**Database Schema Created Successfully:**
```sql
create table users (
    id bigint generated by default as identity,
    email varchar(255) not null unique,
    name varchar(255) not null,
    password varchar(255) not null,
    role enum ('ADMIN','USER') not null,
    primary key (id)
)
```

### Frontend Success Indicators

After running `npm run dev`, you should see:

```
✓ VITE v5.4.21  ready in ~1000 ms
✓ Local:   http://localhost:5173/
✓ Network: use --host to expose
```

**Verification Steps:**
1. Open http://localhost:8080/swagger-ui.html (Backend API docs)
2. Open http://localhost:5173 (Frontend application)
3. Both should load without errors

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | 🌍 Public | Register new user account |
| `POST` | `/api/auth/login` | 🌍 Public | Authenticate & receive JWT |

### Protected Content Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/public` | 🌍 Public | Public content (no auth required) |
| `GET` | `/api/user` | 👤 USER, ADMIN | User-level protected content |
| `GET` | `/api/admin` | 👑 ADMIN only | Admin-level protected content |

---

### 📝 Request/Response Examples

#### Register a New User

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123",
  "role": "USER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwOTY...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER"
  }
}
```

#### Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwOTY...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER"
  }
}
```

#### Access Protected Resource

**Request:**
```http
GET /api/user
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "User content retrieved successfully",
  "data": "This is user-level content. Welcome, John Doe!"
}
```

---

## ✨ Features

### 🔐 Authentication

- ✅ **User Registration** — Name, email, password with role selection (USER/ADMIN)
- ✅ **Secure Login** — Email/password authentication
- ✅ **JWT Token Generation** — Issued on successful login/registration
- ✅ **Token Persistence** — Stored in localStorage, attached to all API requests
- ✅ **Auto-Redirect** — Unauthorized users redirected to login (401 handling)
- ✅ **Password Security** — BCrypt hashing before database storage

### 👥 Authorization (RBAC)

- ✅ **USER Role** — Access to `/api/public` and `/api/user`
- ✅ **ADMIN Role** — Full access including `/api/admin`
- ✅ **Route Protection** — Frontend routes secured with ProtectedRoute wrapper
- ✅ **Conditional UI** — Admin-only content hidden for USER role
- ✅ **Permissions Matrix** — Visual table showing role-based access

### 🎨 Frontend Experience

- ✅ **Responsive Design** — Mobile-first, works on all screen sizes
- ✅ **Form Validation** — Real-time validation with React Hook Form
  - Minimum 6 characters for passwords
  - Must contain letters AND numbers
  - Email format validation
  - Confirm password matching
- ✅ **Loading States** — Skeleton screens & spinners during data fetching
- ✅ **Error Handling** — User-friendly error messages
- ✅ **Role-Based Dashboard** — Dynamic content based on user role
- ✅ **Logout Functionality** — Clear token & redirect to login
- ✅ **TypeScript** — Full type safety across the application

### 🎁 Bonus Features

- ✅ **API Documentation** — Interactive Swagger UI for testing
- ✅ **Global Exception Handling** — Consistent error responses
- ✅ **H2 Database Console** — Database inspection during development
- ✅ **CORS Configuration** — Secure cross-origin requests
- ✅ **Stateless Sessions** — No server-side session storage (JWT-only)

---

## 🔒 Security Features

### Backend Security

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | BCrypt with salt (strength 10) |
| **JWT Signing** | HMAC-SHA256 algorithm |
| **Token Expiration** | 24 hours (configurable in `application.properties`) |
| **CORS** | Restricted to `http://localhost:5173` |
| **Session Management** | Stateless (no server-side sessions) |
| **SQL Injection** | Protected via JPA/Hibernate parameterized queries |
| **XSS Protection** | Content-Type validation, secure headers |

### Frontend Security

| Feature | Implementation |
|---------|---------------|
| **Token Storage** | localStorage (cleared on logout) |
| **Axios Interceptors** | Automatic JWT injection in Authorization header |
| **Protected Routes** | Unauthorized access redirects to login |
| **Form Validation** | Client-side validation before submission |
| **Error Handling** | Sanitized error messages (no sensitive data leak) |

> **Production Note:** For production deployments, consider:
> - Using HTTP-only cookies instead of localStorage for JWT storage
> - Implementing refresh token rotation
> - Adding rate limiting
> - Enabling HTTPS
> - Using environment-specific secrets

---

## 🧪 Testing the Application

### Step-by-step Test Flow

1. **Start Backend** — `mvn spring-boot:run` in `/backend`
2. **Start Frontend** — `npm run dev` in `/frontend`
3. **Register as USER** — Create account with role "USER"
4. **Test USER Access:**
   - ✅ Can access `/api/public`
   - ✅ Can access `/api/user`
   - ❌ Cannot access `/api/admin` (403 Forbidden)
5. **Register as ADMIN** — Create new account with role "ADMIN"
6. **Test ADMIN Access:**
   - ✅ Can access all endpoints including `/api/admin`
7. **Test Logout** — Verify token cleared and redirect to login

### Using Swagger UI

1. Navigate to http://localhost:8080/swagger-ui.html
2. Expand `/api/auth/login` endpoint
3. Click "Try it out"
4. Enter credentials and execute
5. Copy the JWT token from response
6. Click "Authorize" button (🔓 icon at top)
7. Paste token and test protected endpoints

---

## ⚠️ Troubleshooting

### Backend Warnings (Safe to Ignore)

When running the backend with Java 21+, you may see these warnings:

```
WARNING: A terminally deprecated method in sun.misc.Unsafe has been called
WARNING: sun.misc.Unsafe::staticFieldBase will be removed in a future release
```

**Cause:** Maven Guice library compatibility with newer Java versions  
**Impact:** None - application runs normally  
**Solution:** No action needed (warnings will be addressed in future Maven updates)

---

```
WARNING: A restricted method in java.lang.System has been called
WARNING: Use --enable-native-access=ALL-UNNAMED to avoid a warning
```

**Cause:** Tomcat native library access in Java 21+  
**Impact:** None - just a future compatibility notice  
**Solution:** Optional - add `--enable-native-access=ALL-UNNAMED` to JVM args

---

### Frontend Security Vulnerabilities

When running `npm install`, you might see:

```
2 moderate severity vulnerabilities
To address all issues, run: npm audit fix
```

**Cause:** Known vulnerabilities in development dependencies (Vite, Rollup, etc.)  
**Impact:** None - these are dev dependencies and don't affect production builds  

**Fix non-breaking issues:**
```bash
npm audit fix
```

**Force fix (may cause breaking changes):**
```bash
npm audit fix --force  # Use with caution
```

---

### Common Issues

#### Running npm install in Root Directory

**Error:** `npm install` in project root does nothing or creates unwanted files

**Cause:** There is NO `package.json` in the root directory - this is intentional!  
**Solution:** Always navigate to the **frontend** directory first:
```bash
cd rbac-project/frontend  # Navigate to frontend FIRST
npm install               # Then install dependencies
```

---

#### Port Already in Use

**Error:** `Port 8080 is already in use`

**Solution (Windows):**
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Solution (Linux/Mac):**
```bash
lsof -ti:8080 | xargs kill -9
```

---

#### Frontend Can't Connect to Backend

**Error:** `Network Error` or `CORS policy error`

**Solutions:**
1. Verify backend is running on port 8080
2. Check CORS configuration in `SecurityConfig.java`:
   ```java
   configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
   ```
3. Ensure proxy is configured in `vite.config.ts`:
   ```typescript
   proxy: {
     '/api': {
       target: 'http://localhost:8080',
       changeOrigin: true
     }
   }
   ```

---

#### H2 Console Not Accessible

**Error:** 404 on `/h2-console`

**Solution:** Ensure these properties in `application.properties`:
```properties
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

#### Maven Build Errors

**Error:** `Could not find or load main class`

**Solution:**
```bash
mvn clean install -U
```

---

## 🛠️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:rbacdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.show-sql=true
spring.h2.console.enabled=true

# JWT Configuration
jwt.secret=your-256-bit-secret-key-change-in-production
jwt.expiration=86400000  # 24 hours in milliseconds

# CORS Origins (add production domain for deployment)
cors.allowed.origins=http://localhost:5173
```

### Frontend Configuration

Edit `frontend/vite.config.ts` to change proxy settings:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

---

## 📦 Building for Production

### Backend

```bash
cd backend
mvn clean package
java -jar target/rbac-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
# Output will be in the 'dist' folder
# Serve with any static file server (nginx, Apache, etc.)
```

---

## 🚧 Future Enhancements

- [ ] Email verification on registration
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] User profile management
- [ ] Audit logging
- [ ] PostgreSQL/MySQL integration for production
- [ ] Docker containerization
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Unit & integration tests (JUnit, Jest)
- [ ] Role hierarchy (e.g., SUPER_ADMIN, MODERATOR)
- [ ] Multi-factor authentication (MFA)
- [ ] Activity logs and session management

---

## 📄 License

This project is licensed under the MIT License — feel free to use it for learning or commercial purposes.

---

## 👤 Author

**Vaibhav Patil**

- GitHub: [@vaibhavpatilX](https://github.com/vaibhavpatilX)
- Repository: [rbac-fullstack-assignment](https://github.com/vaibhavpatilX/rbac-fullstack-assignment)

---

## 🙏 Acknowledgments

Built as part of a full-stack development assignment for **BotMakers Pvt Ltd** to demonstrate:
- Modern authentication patterns with JWT
- Role-based access control (RBAC)
- Clean architecture principles
- Type-safe frontend development with TypeScript
- RESTful API design best practices
- Enterprise-grade security implementations

---

<div align="center">

### ⭐ If you found this helpful, please give it a star!

**Made with ❤️ using Spring Boot & React**

*Submission for Full Stack Developer Intern Position at BotMakers Pvt Ltd*

</div>

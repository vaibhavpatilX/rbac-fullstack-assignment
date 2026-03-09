# Full Stack Authentication & RBAC System

A complete JWT-based Authentication and Role-Based Access Control (RBAC) system built with **Spring Boot** (backend) and **React + TypeScript** (frontend).

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Language |
| Spring Boot 3.2 | Framework |
| Spring Security + JWT (jjwt 0.11.5) | Auth & Authorization |
| Spring Data JPA + Hibernate | ORM |
| H2 (in-memory) | Database |
| MapStruct | DTO mapping |
| Lombok | Boilerplate reduction |
| Maven | Build tool |
| SpringDoc OpenAPI (Swagger UI) | API docs |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| TanStack React Query | Server state / data fetching |
| Axios | HTTP client with JWT interceptors |
| React Hook Form | Form management + validation |
| TailwindCSS | Styling |

---

## 📁 Project Structure

```
rbac-project/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/botmakers/rbac/
│   │   ├── config/                   # Security, OpenAPI, MapStruct configs
│   │   ├── controller/               # AuthController, ContentController
│   │   ├── dto/
│   │   │   ├── request/              # RegisterRequest, LoginRequest
│   │   │   └── response/             # AuthResponse, UserResponse, ApiResponse
│   │   ├── entity/                   # User.java, Role.java (enum)
│   │   ├── exception/                # GlobalExceptionHandler, custom exceptions
│   │   ├── repository/               # UserRepository
│   │   ├── security/
│   │   │   ├── jwt/                  # JwtUtil, JwtAuthFilter
│   │   │   └── service/              # UserDetailsServiceImpl
│   │   └── service/
│   │       └── impl/                 # AuthServiceImpl
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                         # React + TypeScript application
    ├── src/
    │   ├── api/                      # axiosInstance.ts, authApi.ts
    │   ├── hooks/                    # useAuth.ts
    │   ├── pages/                    # LoginPage, RegisterPage, DashboardPage
    │   ├── router/                   # ProtectedRoute.tsx
    │   ├── types/                    # TypeScript interfaces
    │   ├── App.tsx                   # Routes
    │   ├── main.tsx
    │   └── index.css                 # Tailwind + custom styles
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Java 17+** (verify: `java -version`)
- **Maven 3.8+** (verify: `mvn -version`)
- **Node.js 18+** (verify: `node -version`)
- **npm 9+** (verify: `npm -version`)

---

### Backend Setup

```bash
# Navigate to backend directory
cd rbac-project/backend

# Build and run
mvn spring-boot:run
```

The backend will start at **http://localhost:8080**

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:rbacdb`
  - Username: `sa`, Password: *(empty)*

---

### Frontend Setup

```bash
# Navigate to frontend directory
cd rbac-project/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at **http://localhost:5173**

> Vite is configured to proxy `/api/*` requests to `http://localhost:8080` automatically.

---

## 🔐 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login, receive JWT |
| `GET` | `/api/public` | Public | Public content |
| `GET` | `/api/user` | USER, ADMIN | User-level content |
| `GET` | `/api/admin` | ADMIN only | Admin-level content |

### Sample Register Request
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "USER"
}
```

### Sample Login Request
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Sample Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

## 🎯 Features

### Authentication
- ✅ User registration with name, email, password, and role (USER / ADMIN)
- ✅ Login with email and password
- ✅ JWT token returned on successful login/register
- ✅ Token attached to all protected API calls via Axios interceptor
- ✅ Auto-redirect to login on 401 responses

### Authorization (RBAC)
- ✅ `USER` role: access to `/api/public` and `/api/user`
- ✅ `ADMIN` role: access to all endpoints including `/api/admin`
- ✅ Protected frontend routes — redirect to login if not authenticated

### Frontend
- ✅ Register Page with validation (min password length, letter+number requirement, confirm password)
- ✅ Login Page
- ✅ Dashboard with role-based content cards
- ✅ Admin content card hidden for USER role
- ✅ Access matrix table showing permissions
- ✅ Logout button clears token and redirects to login
- ✅ Loading and error states on all data fetches
- ✅ JWT stored in `localStorage`, attached to requests

### Bonus
- ✅ Logout functionality
- ✅ Password validation rules (min 6 chars, must contain letter + number)
- ✅ Loading & error states
- ✅ Responsive UI

---

## 🔒 Security Notes

- Passwords are hashed with **BCrypt** before storing
- JWT is signed with **HMAC-SHA256**
- JWT expiration: **24 hours** (configurable in `application.properties`)
- CORS configured for `localhost:5173` (frontend dev server)
- Spring Security stateless session (no server-side sessions)

---

## 📸 Screenshots

> Add screenshots of Register, Login, and Dashboard (USER/ADMIN views) here.

---

## 📬 Submission

GitHub: *(https://github.com/vaibhavpatilX/rbac-fullstack-assignment)*  
Submitted by: *(Vaibhav Patil)*

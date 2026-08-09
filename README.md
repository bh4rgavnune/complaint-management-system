# Complaint Management System

A full-stack web application for submitting, tracking, and managing complaints. Users can file complaints with a title, description, and category, track their status in real time, and administrators can review, update statuses, and generate reports from a dedicated dashboard.

## Features

- **User authentication** — register and log in with username and password (USER / ADMIN roles).
- **Submit complaints** — create complaints with title, description, and category.
- **Track complaints** — look up a complaint by its ID and view its current status.
- **My complaints** — list all complaints submitted by the logged-in user.
- **Admin dashboard** — view every complaint, update statuses, and manage the queue.
- **Reports** — aggregated reporting over the complaint data.
- **Status lifecycle** — complaints flow through `NEW` → in-progress → resolved states.

## Tech Stack

### Backend
- **Spring Boot 4.0.4** (Java 17)
- **Spring Data JPA** + Hibernate
- **H2** in-memory database (with H2 console)
- **Lombok** (configured via annotation processor)
- REST API with CORS enabled for the frontend dev server

### Frontend
- **React 19**
- **Vite 8** build tooling
- **React Router 7** for client-side routing
- **Axios** for API communication
- **ESLint** for linting

## Project Structure

```
complaint-management-system/
├── backend/                       # Spring Boot REST API
│   └── src/main/java/com/bhargav/complaint_management_system/
│       ├── controller/            # AuthController, ComplaintController
│       ├── model/                 # User, Complaint (JPA entities)
│       └── repository/            # UserRepository, ComplaintRepository
│   └── src/main/resources/
│       └── application.properties # H2 datasource & JPA config
├── frontend/                      # React + Vite SPA
│   └── src/
│       ├── components/            # Navbar, Footer, ComplaintCard, StatusBadge
│       ├── pages/                 # Home, Login, Register, Submit/Track Complaint,
│       │                          # MyComplaints, AdminDashboard, Reports
│       ├── services/api.js        # Axios API client
│       └── styles/                # Global, layout, and component styles
├── complaint-management-system/   # (empty directory)
├── DESIGN.md                      # Design system reference (colors, type, layout)
└── package.json                   # Root-level shared dependencies (axios, react-router-dom)
```

## Prerequisites

- **Java 17** or later
- **Node.js** 18+ and npm
- **Maven** (or use the included `mvnw` / `mvnw.cmd` wrappers)

## Getting Started

### 1. Run the Backend

```bash
cd backend
./mvnw spring-boot:run        # macOS / Linux
mvnw.cmd spring-boot:run      # Windows
```

The API will be available at `http://localhost:8080`. The H2 console is enabled at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`, user: `sa`, no password).

### 2. Run the Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/api/auth/register` | Register a new user                  |
| POST   | `/api/auth/login`    | Authenticate a user                  |
| GET    | `/api/complaints`    | List all complaints                  |
| GET    | `/api/complaints/{id}` | Get a single complaint             |
| POST   | `/api/complaints`    | Create a complaint (defaults to `NEW`) |
| PUT    | `/api/complaints/{id}` | Update title / description / category |
| PATCH  | `/api/complaints/{id}` | Update complaint status            |
| DELETE | `/api/complaints/{id}` | Delete a complaint                 |

## Design

Visual design decisions are driven by `DESIGN.md`, an inspired interpretation of the Vercel design language: a near-white canvas, ink-black primary actions, a multi-color mesh gradient as the only decorative chrome, and a geometric sans + monospace typographic pairing. The frontend implements these tokens across its pages and components.

## Scripts

Frontend (`frontend/`):

```bash
npm run dev      # Start the Vite dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

## Notes

- The backend currently uses an **in-memory H2 database**, so data resets on restart. Swap the datasource config in `backend/src/main/resources/application.properties` for a persistent database (the `frontend/pom.xml` already references a MySQL connector if you want to migrate the build there).
- Authentication is intentionally simple (plain password comparison). For production, use Spring Security with password hashing.

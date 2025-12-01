## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** 22+ ([download](https://nodejs.org/))
- **npm** 11.6+ (comes with Node)
- **Docker** 28+ and **Docker Buildx** ([install Docker](https://docs.docker.com/get-docker/))
- **Git**

Verify installations:
```bash
node --version   # v24+
npm --version    # 11.6+
docker --version # 28+
```

## 📁 Project Structure

```
protfolio-v2/
├── frontend/                 # Angular 21 application
│   ├── src/
│   │   ├── app/             # Standalone components, services, models
│   │   ├── styles/          # Global SCSS
│   │   └── main.ts          # App bootstrap
│   ├── Dockerfile           # Production build (multi-stage)
│   ├── Dockerfile.dev       # Development (with live reload)
│   └── package.json
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database access (SQL)
│   │   ├── middleware/      # Express middleware
│   │   └── main.ts          # Server entry point
│   ├── Dockerfile           # Production build
│   └── package.json
│
├── docker-compose.yaml      # Development environment (both services)
├── docker-compose.prod.yml  # Production environment
├── CLAUDE.md                # Project guidelines & roadmap
└── README.md                # This file
```
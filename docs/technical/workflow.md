## 🛠️ Development Workflow

### Making changes

Both frontend and backend support **live reload** in development mode:

- **Frontend**: Edit files in `frontend/src/` → changes appear instantly at localhost:4200
- **Backend**: Edit files in `backend/src/` → nodemon auto-restarts the server

### Running tests

**Frontend** (Angular + Vitest):
```bash
cd frontend
npm test
```

**Backend** (Node + Vitest):
```bash
cd backend
npm test
```

### Building for production

**Frontend**:
```bash
cd frontend
npm run build   # Output: dist/
```

**Backend**:
```bash
cd backend
npm run build   # Output: dist/
```

## 🔧 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Angular | 21 |
| **Frontend Build** | Vite | Latest |
| **Backend** | Express | 5.x |
| **Runtime** | Node.js | 22 LTS |
| **Language** | TypeScript | 5.9+ |
| **Styling** | SCSS | Custom |
| **Testing** | Vitest | 4.x |
| **Container** | Docker | 28+ |

## 📚 Code Conventions

All code follows the guidelines in **CLAUDE.md**:

- **Language**: English (code, commits, docs)
- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Standalone (Angular 21 default)
- **State**: Signals for reactivity
- **Styling**: SCSS with BEM naming
- **Git**: Conventional commits (`feat:`, `fix:`, `docs:`, etc.)

## 🚦 Common Tasks

### Add a new Angular component

```bash
cd frontend
ng generate component path/to/my-component
```

### Add a new backend route

Create files in:
- `backend/src/routes/my-route.ts`
- `backend/src/controllers/my-controller.ts`
- `backend/src/services/my-service.ts`

Then register in `backend/src/main.ts`

### Run backend in Docker only

```bash
sudo docker build -t portfolio-backend ./backend
sudo docker run -p 3000:3000 portfolio-backend
```

## 🐛 Troubleshooting

### Frontend not loading at localhost:4200

1. **Check Docker logs**:
   ```bash
   sudo docker-compose logs frontend
   ```

2. **Ensure port 4200 is free**:
   ```bash
   lsof -i :4200
   ```

3. **Restart containers**:
   ```bash
   sudo docker-compose restart frontend
   ```

### Backend not responding

1. **Check if API is running**:
   ```bash
   curl http://localhost:3000
   ```

2. **View backend logs**:
   ```bash
   sudo docker-compose logs backend
   ```

3. **Ensure port 3000 is free**:
   ```bash
   lsof -i :3000
   ```

### npm dependencies issues in Docker

If you get rollup/optional dependency errors:

```bash
sudo docker-compose down -v
sudo docker-compose build --no-cache
sudo docker-compose up
```

The `-v` removes volumes; `--no-cache` forces a fresh build.

## 📖 Next Steps

See **CLAUDE.md** for the detailed roadmap:

- **Phase 1**: ✅ Setup (completed)
- **Phase 2**: Backend API (MySQL, CRUD, validation)
- **Phase 3**: Frontend pages (routing, services, components)
- **Phase 4**: Integration & styling
- **Phase 5**: Authentication & admin panel
- **Phase 6**: Deployment to OVH
- **Phase 7**: Hosting secondary projects

## 📝 Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes, then commit
git add .
git commit -m "feat: add my feature"

# Push and create a PR
git push origin feature/my-feature
```

**Commit message format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `chore:` - Build, deps, config
- `refactor:` - Code reorganization (no behavior change)

## 📞 Support

For questions, refer to:
- **CLAUDE.md** - Project guidelines and learning notes
- **Angular docs** - https://angular.dev
- **Express docs** - https://expressjs.com
- **Docker docs** - https://docs.docker.com

---

**Happy coding!** 🚀
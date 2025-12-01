# Guide Docker sur Ubuntu

## 1. Installation de Docker 🐳 

### Désinstaller les anciennes versions (si présentes)

```bash
sudo apt remove docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc
```

### Installer via le dépôt apt officiel

```bash
# Ajouter la clé GPG officielle
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Ajouter le dépôt
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

# Installer Docker Engine + plugins
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Vérifier l'installation

```bash
sudo docker run hello-world
```

### Utiliser Docker sans sudo (recommandé)

```bash
sudo usermod -aG docker $USER
```

Puis déconnecte-toi et reconnecte-toi, ou utilise :

```bash
newgrp docker
```

---

## 2. Workflow pour un projet cloné

### Cloner le projet

```bash
git clone https://github.com/user/mon-projet.git
cd mon-projet
```

### Fichiers à repérer

| Fichier | Rôle |
|---------|------|
| `Dockerfile` | Instructions pour construire l'image |
| `docker-compose.yml` ou `compose.yml` | Orchestration multi-conteneurs |

### Avec Docker Compose (cas le plus courant)

```bash
# Construire et lancer
docker compose up --build

# En arrière-plan (detached)
docker compose up -d --build

# Voir les logs
docker compose logs -f

# Arrêter
docker compose down
```

### Avec Dockerfile seul

```bash
# Construire l'image (le "." = dossier courant)
docker build -t mon-app .

# Lancer le conteneur
docker run -p 8080:80 mon-app

# Avec variables d'environnement et volume
docker run -p 8080:80 -v $(pwd):/app -e NODE_ENV=development mon-app
```

---

## 3. Commandes pour ce projet (Portfolio)

### Convention de nommage des fichiers

```
frontend/
  Dockerfile.dev    # Build de dev avec hot-reload
  Dockerfile.prod   # Build optimisé pour production

backend/
  Dockerfile.dev
  Dockerfile.prod

docker-compose.dev.yml   # Orchestration dev
docker-compose.prod.yml  # Orchestration production
```

### Workflow développement (quotidien)

```bash
# Construire les images (après modif des Dockerfiles)
docker compose -f docker-compose.dev.yml build

# Lancer l'environnement de dev
docker compose -f docker-compose.dev.yml up

# Lancer en arrière-plan
docker compose -f docker-compose.dev.yml up -d

# Voir les logs en temps réel
docker compose -f docker-compose.dev.yml logs -f

# Voir les logs d'un service spécifique
docker compose -f docker-compose.dev.yml logs -f frontend
docker compose -f docker-compose.dev.yml logs -f backend

# Arrêter et supprimer les conteneurs
docker compose -f docker-compose.dev.yml down
```

### Production (pré-déploiement)

```bash
# Build et test en local
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up
```

### Rebuild complet (si problème)

```bash
# Rebuild sans cache (force la reconstruction complète)
docker compose -f docker-compose.dev.yml build --no-cache

# Supprimer tout et reconstruire
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up --build
```

---

## 4. Setup du proxy Angular (Frontend ↔ Backend)

### Pourquoi un proxy ?

En développement, le frontend (`localhost:4200`) et le backend (`localhost:3000`) sont sur des ports différents. Le navigateur bloque les requêtes cross-origin par défaut (CORS).

**Solution recommandée** : Configurer un proxy Angular qui redirige les appels API.

### Configuration

**1. Créer `frontend/proxy.conf.json` :**

```json
{
  "/api": {
    "target": "http://backend:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

> **Note** : On utilise `http://backend:3000` car à l'intérieur du réseau Docker, les services se parlent par leur nom (défini dans docker-compose).

**2. Modifier `frontend/angular.json` :**

Ajouter l'option `proxyConfig` dans la section `serve` :

```json
"serve": {
  "builder": "@angular/build:dev-server",
  "options": {
    "proxyConfig": "proxy.conf.json"
  },
  "configurations": {
    // ...
  }
}
```

**3. Mettre à jour le Dockerfile.dev pour copier le proxy.conf.json :**

```dockerfile
# Copy Angular config files (needed for ng serve to work)
COPY angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json proxy.conf.json ./
```

**4. Rebuild et relancer :**

```bash
docker compose -f docker-compose.dev.yml build frontend
docker compose -f docker-compose.dev.yml up
```

### Utilisation dans le code

```typescript
// ✅ Appel avec proxy (recommandé)
this.http.get('/api/projects')  // Redirigé automatiquement vers http://backend:3000/api/projects

// ❌ Appel direct (CORS error)
this.http.get('http://localhost:3000/api/projects')
```

### Alternative : CORS sur le backend

Si tu préfères gérer CORS côté backend au lieu d'un proxy :

```typescript
// backend/src/main.ts
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

> **Note** : Le proxy est généralement préféré en dev car plus proche du setup de production.

---

## 5. Commandes utiles

| Action | Commande |
|--------|----------|
| Lister les conteneurs actifs | `docker ps` |
| Lister tous les conteneurs | `docker ps -a` |
| Entrer dans un conteneur | `docker exec -it <container_id> bash` |
| Voir les logs | `docker logs -f <container_id>` |
| Arrêter un conteneur | `docker stop <container_id>` |
| Supprimer un conteneur | `docker rm <container_id>` |
| Lister les images | `docker images` |
| Supprimer une image | `docker rmi <image_id>` |
| Nettoyer le système | `docker system prune` |

---

## 6. Résolution de problèmes courants

### Erreur "permission denied" sur docker.sock

```
permission denied while trying to connect to the Docker daemon socket
```

**Cause :** Ton utilisateur n'a pas accès au socket Docker.

**Solution :**

```bash
# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER

# Appliquer immédiatement
newgrp docker

# Ou se déconnecter/reconnecter
```

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

## 3. Commandes utiles

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

## 4. Résolution de problèmes courants

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

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production    # Pas de devDependencies

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
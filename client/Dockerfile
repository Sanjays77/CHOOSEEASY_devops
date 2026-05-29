# Build Stage
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# We use the env variable in build step if we want, but since Vite injects it at build time
# we should ideally provide it here or just serve the static files with it replaced.
# In a real CI/CD, we might inject it during build. For now we will run the dev server or build.
RUN npm run build

# Production Stage (Serve with a lightweight server like serve or Nginx)
# For simplicity in this devops setup, we can use 'serve'
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install
COPY server/ .
RUN npm run build

# Stage 3: Final Runner
FROM node:20-alpine
WORKDIR /app
# Copy backend production dependencies
COPY server/package*.json ./
RUN npm install --omit=dev
# Copy compiled backend
COPY --from=backend-builder /app/server/dist ./dist
# Copy built frontend into backend's static folder
COPY --from=frontend-builder /app/dist ./dist/public

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["npm", "start"]

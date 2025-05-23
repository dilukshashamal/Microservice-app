# frontend/Dockerfile

# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set build-time environment variable 
RUN npm run build

# Stage 2: Serve the application using a lean Node.js server 
FROM node:20-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV production

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public 

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
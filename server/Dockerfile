# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies in a separate layer
COPY package*.json ./

RUN npm ci --omit=dev --no-optional

# Copy the rest of the source code
COPY . .

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 5000

# Start app
CMD ["npm", "start"]

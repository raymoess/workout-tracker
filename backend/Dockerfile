# Use official lightweight Node.js image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first for efficient layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port Express runs on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]

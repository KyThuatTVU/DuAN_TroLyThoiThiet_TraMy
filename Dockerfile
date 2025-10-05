FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY Backend/ ./

# Copy frontend code
COPY Frontend/ ./Frontend/

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
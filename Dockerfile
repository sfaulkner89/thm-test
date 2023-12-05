# # Dockerfile
# FROM mongo:latest

# # Copy mock data and population script into the container
# # COPY ./mockdata /docker-entrypoint-initdb.d/mock-data
# # COPY ./mockdata/populate-db.js /docker-entrypoint-initdb.d/populate-db.js

# # Set permissions for the script
# # RUN chmod +x /docker-entrypoint-initdb.d/populate-db.js

# # Expose the MongoDB port
# EXPOSE 27017

# # Specify the entry point to run the script when the container starts
# CMD ["mongod"]

# Use a base Node.js image suitable for your application
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy your application code and package.json into the container
COPY package*.json ./
COPY dist/ ./dist/

# Install application dependencies
RUN npm install

# Specify the command to run your application
CMD ["node", "dist/index.js"]
# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the 'spe-frontend' directory to the working directory
COPY spe-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the 'spe-frontend' directory to the working directory
COPY spe-frontend .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

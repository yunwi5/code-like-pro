FROM node:16-alpine

# Working directory
WORKDIR /usr/app

# Copying our dependencies to the container
COPY package*.json ./

# Intall the dependencies we copied
RUN npm install

# Copy the source files
COPY . .

# Exposing the port 
EXPOSE 8080

# Start the server app
CMD ["npm", "run", "start"]
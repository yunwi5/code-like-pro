FROM node:18-alpine

# Working directory
WORKDIR /user/src/app

# Copying our dependencies to the container
COPY package.json package.json

# Intall the dependencies we copied
RUN npm install

# Copy the source files
COPY . .

# Exposing the port 
EXPOSE 8080

# Start the server app
CMD ["npm", "run", "dev"]
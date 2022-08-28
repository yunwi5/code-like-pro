FROM node:latest

# Working directory
WORKDIR /user/src/app

# Copying our dependencies to the container
COPY package.json package.json

# Intall the dependencies we copied
RUN npm install

# Copy the source files
COPY . .

# Exposing the port 
EXPOSE 3000

# Start the client app
CMD ["npm", "run", "dev"]
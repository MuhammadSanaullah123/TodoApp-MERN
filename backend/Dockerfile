FROM node:16.15.1 AS Production

ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install server dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port that the server will listen on
EXPOSE 5000

# Set the command to start the server
CMD ["sh","-c","npm run server"] 
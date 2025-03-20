# Step 1: Use the official Node.js image as a base
FROM node:22.13.1

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install the application dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the application port dynamically (based on the PORT environment variable)
EXPOSE $PORT

# Step 7: Set the command to run the app (default is "npm start")
# CMD ["npm", "start"]
RUN npm install -g pm2

CMD ["pm2-runtime", "process.config.js"]

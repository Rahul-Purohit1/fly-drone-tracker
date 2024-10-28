FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of your application files
COPY . .

# Build the NestJS application
RUN npm run build

# RUN rm -rf ./src 

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm","run", "start:prod"]

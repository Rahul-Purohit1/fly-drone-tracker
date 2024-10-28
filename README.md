**Features**:  
User Management: Create, update, delete, and retrieve user information.  
Authentication: Secure login functionality using JWT (JSON Web Token) authentication. 
Drone Tracking: Manage and track drone details (future modules can be added).  
Swagger Documentation: Integrated API documentation using Swagger.(Availabt at /api/docs)


**Getting Started**  
Prerequisites  
To run this project, ensure you have the following installed:  

Node.js (node version : 20.18.0)  
MongoDB (Ensure it’s installed and running locally or use a MongoDB Atlas URL)  

**MONGODB_URI=mongodb://localhost:27017/flydrone**

**Installation**  

Install dependencies, use :   

```bash
npm install 
```

To Run the Application , use :  
**Standard Mode**: 
```bash 
npm run start 
``` 
**Development Mode (with watching)**: 
```bash
npm run start:dev   
```



**Swagger Usage**  

To get the JWT token, call the login API using the example below:  

**Example Request to Obtain JWT Token**  

```bash
curl -X 'POST' \
  'http://localhost:3000/api/users/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "example@gmail.com",
  "password": "1234"
}'
```

This will return a JWT token that must be included in the Authorization header as Bearer <token> for all further requests.



**Using Docker**  
Prerequisites  
Ensure that you have Docker desktop installed on your machine.  

Building and Running with Docker  
To build and run the application using Docker, follow these steps:  

Build the Docker image: 
```bash
docker-compose build
```

Start the containers:
```bash
docker-compose up
```

This command will start the NestJS application and the MongoDB service.The application will be accessible at **http://localhost:3000**



Stopping the Application
To stop the running containers, use:
```bash
docker-compose down
```
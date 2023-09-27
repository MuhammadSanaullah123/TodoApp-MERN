# MERN Stack Todo App with REST API
Todo application is built using react.js as Frontend and Node.js, Express.js for backend integrated with MongoDB. 
This application allows the user to create account and create their todo task and complete them and delete them.
## Folder Structure
- `frontend`: Contains the frontend client implementation using React.js with Redux Toolkit.
* `backend`: Contains the backend server implementation using Express.js and REST API's.
## Folder Structure
Follow the steps below to install and set up the application:
1. Clone the repository to your local machine:

   ```bash
   
   git clone https://github.com/MuhammadSanaullah123/TodoApp-MERN.git
   
1. Go to the project frontend directory:
   
   ```bash
   cd frontend
   ```
   ```bash
   npm install
   
2. Go to the project backend directory:
   
   ```bash
   cd backend
   ```
   ```bash
   npm install

## Run the application
Go to the project backend directory and `npm run dev` will start both the client and the server:

 ```bash
 cd backend
 ```
 ```bash
 npm run dev
```
## To dockerize the app follow the below instructions
1. Download Docker for your host operating system.
  
2. Go to root of the application where both `frontend` and `backend` folders are present.

3. Firstly, build the images by:
   ```bash
   docker-compose build

4. Then start the container by:
   ```bash
   docker-compose up
   
Now the App can be accessed at http://localhost:3000 in your web browser

5. To stop the containers:
   
   ```bash
   docker-compose down

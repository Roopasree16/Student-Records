StudentDesk
StudentDesk is a student and course management application built using React, Node.js, Express.js, and MongoDB.

Features
Add, view, update, and delete students.
Add, view, update, and delete courses.
REST API development using Express.js.
Middleware for logging, CORS, and API-key checking.
Automated testing using Jest, Mocha, Chai.
Tech Stack
Frontend: React, Vite
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Testing: Jest, Supertest, Mocha, Chai
Installation
Clone the repository:

git clone https://github.com/YOUR_USERNAME/student-records.git
cd student-records
Install frontend dependencies:

npm install
Install backend dependencies:

cd server
npm install
Create a .env file inside server/ with your MongoDB connection string and API key.

Run the Project
Start the backend from the server folder:

npm run dev
Start the frontend from the root folder in another terminal:

npm run dev
Run Tests
From the server folder:

npm test
npm run test:mocha
Security
Do not upload your .env file or expose database credentials and API keys.
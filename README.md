# COMPSCI 399 CodeLikePro

## About
A practice website for programming students where they create their own exercises, solve exercises from other programmers, 
and showcase their solutions. <br />

Deployed on Vercel [https://code-like-pro.vercel.app](https://code-like-pro.vercel.app)

<br />

## Getting Started

### Client
For the development mode on the client,

```bash
# Go to client directory
$ cd client
# Install the dependencies on /client/package.json
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the client application.

### Server
For the development mode on the server,

```bash
# Go to server directory
$ cd server
# Install the dependencies on /server/package.json
$ npm install
$ npm run dev
```

Server runs on [http://localhost:8080](http://localhost:8080) on your computer by default.

### Server Environment Variables Set Up
* MongoDB Atlas - Connection to cloud database requires MONGO_USERNAME and MONGO_PASSWORD environment variables set up in <code>/server/.env</code> file for a successful connection.
* Google OAuth - For google authentication, Google cloud requires client credentials GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables in <code>/server/.env</code> file.

<br />

## Project Management
![jiady_2022-10-23_01 14pm](https://user-images.githubusercontent.com/86972879/197367056-59f1243a-1911-4c54-9e7d-f479fa0e3b38.png)

### Jira Board 
We took an Agile approach with SCRUM framework. 
We used Jira board to run each sprint of two weeks interval, define product backlogs to achieve the goals we set up at the beginning of each sprint.


### Jira roadmap
We used Jira roadmap as a Gantt chart to define the tasks for each sprint and track the progress.
We defined main tasks for each feature, break it down into subtasks and allocate those tasks to each member for efficient task management.
<br />
[Roadmap link](https://399team7.atlassian.net/jira/software/projects/JIAD/boards/1/roadmap)


### Link to Jira management tool
[https://399team7.atlassian.net/jira/software/projects/JIAD/boards/1/roadmap](https://399team7.atlassian.net/jira/software/projects/JIAD/boards/1/roadmap)

<br />

## Technologies Used

This is the list of programming languages, frameworks and libraries we used for both frontend and backend. <br />
For each dependency, we list human readable package name, followed by official package name and its version.

### Frontend

#### Programming Language
1. TypeScript - typescript 4.6.3

#### Libraries
1. React JS - react 18.0.0
2. TailwindCSS -tailwindcss 3.1.8
3. React Router - react-router-dom 6.3.0
4. React Query - @tanstack/react-query 4.2.3
5. Monaco Editor - monaco-editor 0.34.0
6. Quill Editor - react-quill 2.0.0
7. Chart JS - chart.js 3.9.1
8. Framer Motion - framer-motion 7.4.0
9. Redux Toolkit - @reduxjs/toolkit 1.8.5
10. React Icons - react-icons 4.4.0
11. Luxon - luxon 3.0.3
12. Sass - sass 1.54.5 

The full dependencies of the frontend is available on `/client/package.json` file. <br />
Please revise `/client/package.json` if you want to view the available scripts, full dependencies and dev dependencies.

<br />

### Backend

#### Programming Language
1. Node JS (JavaScript) v16.17.0

#### Framework
1. Express JS - express 4.18.1

#### Libraries
1. Axios - axios 0.27.2
2. BcryptJs - bcryptjs 2.4.3
3. Mongoose ORM - mongoose 6.4.0
4. Express Session - express-session 1.17.3
5. Passport JS - passport 0.6.0
6. Passport Google OAuth - passport-google-oauth20 2.0.0
7. Passport Logal - passport-local 1.0.0
8. Dotenv - dotenv 16.0.1
9. Cloudinary - cloudinary 1.32.0
10. Yup - yup 0.32.11

#### Testing Libraries
1. Jest - jest 29.1.2
2. Supertest - supertest 6.3.0

The full dependencies of the backend is available on `/server/package.json` file. <br />
Please revise `/server/package.json` if you want to view the available scripts, full dependencies and dev dependencies. <br />
Dependencies for testing libraries and nodemon which is the tool for the development server, are devDependencies.

<br />

## Deployment

### Frontend Deployment
<img src="https://user-images.githubusercontent.com/86972879/197367662-cc9bc36a-c380-4c78-b7b2-a3a87721aa9d.png" height="150px" />
We used <strong>Vercel</strong> for production deployment of our frontend React application.

<br />

### Backend Deployment
<img src="https://user-images.githubusercontent.com/86972879/197367698-61940313-1ed3-428b-92db-22dc846d90cb.png" height="150px" />
We used <strong>Railway.app</strong> for production deployment of our backend Node Js application.

<br />

### Production Application URL
Our application has been deployed to the following URL: <br />
[https://code-like-pro.vercel.app/](https://code-like-pro.vercel.app/)

<br />

## Future Plan & Improvements

Our app currently offers various features to help students improve their programming skills, 
but there are several extensions ideas for future releases based on the feedback from our users.

### User Adding Their Own Test Cases
This extension would let users add more test cases while attempting the exercise. 
Currently, only the author of the exercise can create test cases. 
A new feature allows users to add their own test cases while attempting the exercise, and possibly add them to the existing exercise if they pass all the existing tests. 
This will improve the testing aspect of our programming exercises.

### Programming Competitions  
This extension is to have programming competitions where participants attempt to solve multiple sets of programming problems. 
Awards are given as special badges and are decided by the fastest time for completion. 
This will improve the gamification aspect that would make our platform more enjoyable.


### Exercise Difficulty Judged By The User
Third improvement would be to let users decide the difficulty of the exercise by rating the difficulty. 
Currently, only the author of the exercise decides the difficulty, but it can be subjective. 
In order to derive accurate difficulty and make it as useful information, we are planning to let users rate the difficulty for each exercise and we take the average of those ratings for difficulty adjustments.

We are delightened to implement new features to suit futher needs from our users. 
These extensions will be implemented one by one in the future releases!

<br />

## Team Members

| Member                                               | Roles                                            |
| ---------------------------------------------------- | -------------------------------------------------|
| [JD Briones](https://github.com/jeed02)              | Team Leader, Frontend Developer, UI/UXDesigner   |
| [Yunkeun Jo](https://github.com/yunwi5)              | Fullstack Developer, UI/UX Designer              |
| [Amo Li](https://github.com/Amotys)                  | Frontend Developer                               |
| [Daniel McAnulty](https://github.com/DanielMcAnulty) | Backend Developer                                |
| [Irene Chen](https://github.com/irenechen20015)      | Backend Developer                                |

<br />

## Acknowledgements

Special acknowledgement to our client Paul Denny who gave us an amazing project opportunity.
<br />
Acknowledgement to COMPSCI 399 lecturers and tutors who gave us an amazing opportunity throughout the course.
<br />
Acknowledgement to everyone for having interests on our CodeLikePro capstone project.


# COMPSCI 399 CodeLikePro

## About
A practice website for programming students where they create their own exercises, solve exercises from other programmers, 
and showcase their solutions. <br />

Deployed on Vercel [https://code-like-pro.vercel.app](https://code-like-pro.vercel.app)

<br />

## Project Presentation & Report
We have created a presentation video that explains the features of the application with a demo video, and a report that explains application design, implementations, testing, results, conlucions and future works in detail.

### Project presentation link
[https://www.youtube.com/watch?v=sou5i3j2AHM](https://www.youtube.com/watch?v=sou5i3j2AHM)

### Project report link
[https://docs.google.com/document/d/1aDNSr4h9E48OY81hSTE8PAy4G4AxVh-A/edit#heading=h.8qr8o3pkkyg6](https://docs.google.com/document/d/1aDNSr4h9E48OY81hSTE8PAy4G4AxVh-A/edit#heading=h.8qr8o3pkkyg6)

<br />

## Getting Started

Both frontend and backend require Node.js JavaScript runtime environment to run the application locally. <br />
The application requires `npm` commands to set up and start, therefore, please make sure you have Node.js installed on your machine before starting the application. <br />
Node.js version 16 is highly recommended even though other versions would also be fine. We mainly used Node.js version `16.17.0` for local development.

We recommend starting the backend server first and then the frontend, because the frontend has to consumre the APIs from the backend. <br />
We recommend using `VS Code` editor for set up the development environment and view the content of the project.

### Server
For the development mode on the backend server,

```bash
# From the project root directory, go to server directory
$ cd server
# Install the dependencies on /server/package.json
$ npm install
$ npm run dev
```

Server runs on [http://localhost:8080](http://localhost:8080) on your computer by default.


### Client
For the development mode on the client,

```bash
# From the project root directory, go to client directory
$ cd client
# Install the dependencies on /client/package.json
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the client application.


### Server Environment Variables Set Up

We have several environment variables to be set up on the backend directory in order to use full backend services such as Google authentication with google oauth2. <br />
Please make the .env file inside the `/server` directory (if it does not exist already), and insert the following environment variables for successful server set up. 

* MongoDB Atlas - Connection to cloud database requires MONGO_USERNAME and MONGO_PASSWORD environment variables set up in <code>/server/.env</code> file for a successful connection.
* Google OAuth - For google authentication, Google cloud requires client credentials GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables in <code>/server/.env</code> file.
* Cloudinary - For image uploading, place cloudinary credentials CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY and CLOUDINARY_SECRET in <code>/server/.env</code> file for cloudinary image uploading set up. The backend application still runs without these variables but cannot use image uploading functionality in that case.
* Session - For cookie session name and secret, environment variables SESSION_NAME and SESSION_SECRET can be added in <code>/server/.env</code> file. However, these variables are optional and the server gives default values for session name and secret if there are no corresponding environment variables. These variables are recommended for production environment for security purpose. 


### Testing

If you want to run the tests on the backend, the guidance is the following.
```bash
# From the project root directory, go to server directory
$ cd server
# Install the dependencies on /server/package.json if you haven't already
$ npm install
# Test command is npm test which will run all unit and e2e tests on the backend
$ npm test
```

We used `Jest` and `Supertest` for backend unit and e2e testing.


<br />

## Usage Examples

### Exercise Creation
<img src="https://user-images.githubusercontent.com/86972879/197369846-83ccc9e1-68fe-4d3a-8258-e3b40e490d09.jpg" height="350px" />

Users can create their own programming exercise with the above UI. User can specify exercise name, difficulty, language, prompt, solution code and test cases. 
User can run the test cases to check the output of their code before publishing it. <br />

User should write at least three test cases including at least one hidden tests before the publish. The solution code has to pass all test cases as well.
If these requirements are not met, the server will not allow this exercise to be published.


### Exercise Browsing
<img src="https://user-images.githubusercontent.com/86972879/197370183-7505fff5-49ef-43a4-921c-73bcbb9c9708.jpg" height="350px" />

Users can browse the exercise with various search, sorting and filtering functionalities. 
When the user clicks one of the exercisees, they can start solving that particular exercise.


### Exercise Attempt & Code Editor Workspace
<img src="https://user-images.githubusercontent.com/86972879/197370085-bf9b59e5-cc9e-4607-b5fd-31c0743f21fa.jpg" height="350px" />

Users can solve the exercise by clicking the exercise they want to attempt. They can view the prompt, test cases, issue reports regarding the exercise, and submission history.
Users can write the solution code in the coding workspace. They can run the code to run the test cases, and submit the code that would make an official submission history. 


### User Solution Showcasing
<img src="https://user-images.githubusercontent.com/86972879/197370247-71da0d86-87d2-4dfe-a1e4-1b545fa6fff2.png" height="350px" />

Once the user solves the exercise, they can move on to the exercise showcase page. Users can showcase their solution so that other users can view.
Users can upvote or downvote the existing showcase, and make comments to the showcase as well if there is anything to discuss further.

### Global Forum Discussions
<img src="https://user-images.githubusercontent.com/86972879/197370350-cfe246e2-f6c0-4f41-8b9c-52320aeab4b0.png" height="350px" />

Users can view the forum posts across 7 different categories such as algorithms, technologies, and interviews which are all related to computer science and software engineering. 

Users can view the post such as "Why use NextJs", they can like or dislike the post, and can make comments. Users can create their own software engineering related posts as well by clicking the <strong>New Post</strong> button.

### User Profile
<div style="display: flex; gap: 30px;">
<img src="https://user-images.githubusercontent.com/86972879/197370521-0aa7d034-c536-485e-8939-8addd5e5d752.png" width="450px" />
<img src="https://user-images.githubusercontent.com/86972879/197370543-93803efa-445f-4d87-a463-f8ae8793591b.png" width="450px" />
</div>

Users can view their profile information and edit username, description and profile picture. <br />
They can also view the badges they obtained through their activities. As the user creates and solve more exercises and showcase more solutions, they gain more badges of higher prestige.


<br />

These are the key functionalities that our CodeLikepro application provides. <br />
There are certainly other functionalities to introduce such as rankign system, profile statistics etc. However, we would not introduce all of them here so that the usage content does not get too long.

<br />


## Project Management
![jiady_2022-10-23_05 32pm](https://user-images.githubusercontent.com/86972879/197373941-b6281066-0818-4f8a-baa4-aaf39cadd9aa.png)

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
For each dependency, we list human readable package name, followed by official `npm` package name and its version.

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

We used <strong>[Vercel](https://vercel.com/)</strong> for production deployment of our frontend React application.

<br />

### Backend Deployment
<img src="https://user-images.githubusercontent.com/86972879/197367698-61940313-1ed3-428b-92db-22dc846d90cb.png" height="150px" />

We used <strong>[Railway](https://railway.app/)</strong> for production deployment of our backend Node Js application.


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

Special acknowledgement to our client <strong>Paul Denny</strong> who gave us an amazing project opportunity and constantly gave us great feedback.
<br />
Acknowledgement to COMPSCI 399 lecturer <strong>Asma Shakil</strong> who gave us great feedback on our project throughout the semester.
<br />
Acknowledgement to Vercel that powers our frontend application. 
<br />
Acknowledgement to Railway that powers our backend application. 
<br />
Acknowledgement to everyone for having interests on our CodeLikePro capstone project.


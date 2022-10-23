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

## Technologies used

### Frontend
1. TypeScript
2. React Js
3. Tailwind CSS
4. Sass
5. React-Query
6. React-Quill (text editor)
7. Monaco-Editor (code editor)
8. Luxon

### Backend
1. Node Js
2. Express Js
3. Passport Js (authentication)
4. passport-google-oauth2
5. Mongoose
6. MongoDB
7. Yup

<br />

## Team Members

| Member                                               | Roles                                            |
| ---------------------------------------------------- | -------------------------------------------------|
| [JD Briones](https://github.com/jeed02)              | Team Leader, Frontend Developer, Designer        |
| [Yunkeun Jo](https://github.com/yunwi5)              | Frontend Developer, Backend Developer, Designer  |
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


# Course-Website

## Description

This project is a web application built with React for showcasing a list of courses and their details. It includes a course listing page, a course details page, and a student dashboard for displaying enrolled courses. Additionally, it features a course like functionality.

## Features

- Users can enroll in courses and view them in the "My Courses" section.
- Built with React.js and Tailwind CSS for a responsive, user-friendly interface.
- Utilizes Firebase for authentication and for fetching and updating courses in Firestore.
- Includes a course like feature.
- Manages state using Redux, particularly for user authentication and course enrollment.

## View Website

Visit the deployed site here: [Deployed Link](https://6680590d5941573681d69d2f--dashing-toffee-0fdf41.netlify.app/)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository from GitHub:

   ```bash
     `git clone https://github.com/ankita685/course_project.git`







2. Navigate into the project directory:

```bash
   `cd course`
```

## Important

4. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.

```bash
   `npm install -g npm@latest`
```

5. Install `dependencies` (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

6. Create a .env file in the directory and add your **firebase** credentials accordingly

7. In your firestore database create two collections named **courses** and **users** and add dummy courses to use locally

8. Run the below command to start the project

```bash
   `npm run dev`
```

8. Open `http://localhost:5173` on your browser to view the project locally



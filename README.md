# Full Stack Blog Application

## Project Overview
The Full Stack Blog Application is a modern platform designed to create and manage blogs using the MERN (MongoDB, Express, React, Node.js) stack. This application enables users to write, edit, and interact with blog posts seamlessly through features such as comments, likes, and image uploads.

## Key Features

### User Authentication
- **Secure Login and Registration**: Implemented using JSON Web Tokens (JWT).
- **Profile Management**: Users can update their profile details.

### Blog Features
- **Create and Edit Posts**: Users can create new blog posts or update existing ones.
- **Delete Posts**: Authors have the option to remove their posts.
- **Image Uploads**: Add images to blog posts for visual enhancement.

### Interactivity
- **Comment System**: Readers can leave comments on blog posts.
- **Likes**: Users can like posts to show appreciation.

### Search and Navigation
- **Home Feed**: Displays all posts in a feed format.
- **Individual Post View**: Dedicated page for viewing individual posts.
- **Search**: Users can search posts by keywords.

### Responsive Design
- Optimized for desktops, tablets, and mobile devices.

## Technology Stack

### Back-End
- **Node.js**: Handles application logic and server-side operations.
- **Express.js**: Framework for building REST APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for structured schema.
- **JWT**: Ensures secure user authentication.

### Front-End
- **React.js**: Dynamic component-based front-end library.
- **React Router**: For client-side routing.
- **Axios**: Handles API requests.
- **Context API**: Manages state across components.


## Folder Structure

The project is structured as follows:

1. /client - React application (front-end) 
1. /.api - Node.js back-end 
1. /.husky - Git hooks for pre-commit checks 
1. /cypress - End-to-End testing configuration
1. /jest - Unit testing configuration
1. /eslint - Linting configuration
1. /prettierrc - Code formatting configuration

### Folder Details:
- **/client**: Contains the React front-end application where users interact with the blog. This folder includes:
  - `src/` – Contains all React components, pages, and utilities.
  - `public/` – Static assets like images, icons, etc.
  - `package.json` – Front-end dependencies and scripts.
  - `.env` – React-specific environment variables, including API URLs.

- **/api**: Contains the Node.js back-end application. It handles authentication, CRUD operations for blog posts, and serves the API requests. This folder includes:
  - `controllers/` – Defines the logic for handling API requests.
  - `models/` – Defines Mongoose schemas for database collections.
  - `routes/` – Contains routes for different API endpoints.
  - `index.js` – Main entry point for the back-end server.
  - `.env` – Back-end-specific environment variables, including database connection details.

- **/.husky**: Contains hooks to enforce checks before commits (e.g., running linters or tests).
  - `pre-commit` – Ensures that the code passes linting checks before committing.

- **/cypress**: Holds the configuration for End-to-End (E2E) tests. This folder includes:
  - `integration/` – Stores the E2E tests for the application.
  - `support/` – Includes utilities and custom commands for E2E tests.
  - `cypress.json` – Main configuration file for Cypress.

- **/jest**: Contains the configuration for unit testing. This folder includes:
  - `tests/` – Unit tests for back-end code, such as controllers, models, and routes.
  - `jest.config.js` – Configuration for Jest.

- **/eslint**: Contains the configuration file for ESLint, ensuring that code follows consistent style and quality.
  - `.eslintrc.js` – The main configuration file for linting.

- **/prettierrc**: Contains the configuration for Prettier, a tool used for code formatting.
  - `.prettierrc` – Defines formatting options like line width, tab width, etc.


### Conclusion
This Full Stack Blog Application provides a comprehensive platform for users to create, interact with, and manage blogs. By leveraging the MERN stack, the app offers a seamless and dynamic user experience with robust back-end functionality. The included tests ensure the quality and reliability of both the front-end and back-end code.

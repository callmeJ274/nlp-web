# Project Instructions
The project is like a web demo app for an artile evaluation using public API Meaning Cloud.

## Folder description
- scr/ : contains client/ , server/ , test/ folders which contain code to run the interface and call API response
- babelrc/ : to set up babel
- package.json: the required version for module used in web
- package-lock.json: the module versions installed in package.json
- webpack.dev.js: web development environment
- webpack.prod.js: web production environment
- README.md: project description

## Requirement: 
To test the web succesfully, you should sign up for the API_KEY for development of [Meaning Cloud](https://www.meaningcloud.com/developer/login). Then, create a new ```.env``` file in the root of the project with correspoding of the key is KEY = ""
## Getting started

`cd` into project folder and run:
- `npm install`
- `npm run build-dev` : runs in development environment or `npm run build-prod`: runs in production environment
- in case running in production, we need to take to another step in the command: `npm run start` and open https://localhost:7012 
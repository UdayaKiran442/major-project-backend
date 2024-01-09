# Campus Management System API's

## Tech Stack used

- NodeJs
- ExpressJs
- MongoDB
- Docker
- AWS codepipeline and code deploy

## Project Details
- Created a campus management app to streamline and automate the tasks such as gate pass requests, mess attendance.
- Some of the features include social media type screen for placement team to post new job oppurtunities or any technical events or hackathons.
- Students can request for gate pass and wardens have the access to accept the request.
- Teachers have the access to update their cabin number and free time so that students can refer the app for faculty cabins.

## Folder Structure

- `index.js` is the main file where server is running.
- `models` folder is where database schema is defined.
- `routes` folder is where different route handles are defined.
- `controllers` folder is where the business logic is defined.
- `config` folder to store the details of server configuration such as database connection, sercret variables and tokens.
- `utils` folder to define functions that can be re-used.

## Infrastructure Details

- Containarised the server along with secret variables, logic and the database.
- Pushed the image to docker hub.
- Docker configuration is defined in `compose.yaml` and commands to execute containarisation along with dependency installments is defined in `Dockerfile`.
- Utilised AWS code pipeline to configure CI/CD. Hence whenever there is a commit AWS will automate the build and deployment process.

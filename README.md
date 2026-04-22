# Setting up a CRUD App with Node.js, Express, and MySQL 

## Project Setup 
- Create a repository on git hub and clone it via:

`git clone` `REPOURL`

Initialize the project with npm:
- `npm init -y`

Install the necessary dependencies if you have not already:
- `npm install express mysql2 dotenv`

## Structure you project files 
Directories and Files: 
- config
    - database.js
- controllers
    - todoController.js
- middleware
    - errorMiddleware.js
- models
    - todo.js
- routes
    - todoRoute.js
- .env
- index.js
- package.json

## Configure the dotenv file for backend

PORT = **the port number that your express server will listen on.**

DB_HOST = **The hostname or IP address of the machine running MySQL. Use localhost if running on the same machine.**

DB_USER = **The Username credential used to sign in to the account that manages the database.**

DB_PASSWORD = **The Password credential used to sign in to the account that manages the database.**

DB_DATABASE = **Variable used to signify what database will be used.**

## Important Acronyms

# REST (Representational State Transfer)
* GET - /workouts (Fetches data) 
* POST /workouts (Creates data)
* PUT /workouts/:id (Updates data)
* DELETE /workouts/:id (Deletes data)

## Coding up our backend files

- database.js: 

Setting up our connection to our MySQL DB. We create a constant that will import mysql2 and also import dotenv to read our env file.

We then create a constant variable that will contain our MySQL connection info. Hostname, Username, Password, etc. 

We will then try to connect to the MySQL database, throwing an error if any of the information in the connection is incorrect - otherwise, well have a successful connection.

Lastly, we export our connection in the event that another one of our file requires it.

- workouts.js:

We will use this file to query our database. We start off by creating a constant "DB" to import our connection to our MySQL database by requiring database.js.

Now we will create a callback function that is available to other files via **exports.** We will then create the MySQL query to get all of our workouts from the workouts table.

The rest of our functions will be similar to our initial function, but take different parameters. The other functions will create, update, or delete workouts from our workout table.

- workoutController.js

As you might have guessed, we will import the previous file we worked on. We will create a constant called Workout to import our wokrkouts.js exports. 

We will then create functions that will be available to other files. These functions will request information from the database by receiving HTTP requests from our front end to retrieve responses by having our model interact with the DB. 

We will create a function that gets all workouts and on that gets workouts based on their ID for editing or deleting.  

Creating workouts will be similar except, we will create a constant that will store the workout and will read the workout data from our req.body, which is the json our frontend sent in the POST request. The update will work similarly.

Deleting workouts will work very similar to getting info, but obviously the opposition, and it will send a message once a workout is deleted.

- workoutRoute.js:

We will now route all the info by creating constants to import our express server. This import will allow us to route info between the controller and the frontend. The router will receive HTTP requests and directs them to the right controller.

We then clarify our routes, mapping each HTTP method and URL path to its corresponding controller function: 

GET / > getAllWorkouts
POST / > createWorkout
DELETE /:id > deleteWorkout (:id is a dynamic parameter that captures whatever ID is in the URL and makes it avaible as req.params.id in the controller)

Lastly, we export our router.

- errorMiddleware.js

Function that will throw an error if something in the program breaks.

Express recognizes a function with four parameters (err, req, res, next) as error handling middleware.





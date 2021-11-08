# project3-backend

###

Backend server for the Tinier Bananas collaborative storytelling app.

## Technologies Used

### Node + Express

The backend server is built with Node and Express. Express is used to route and respond to incoming requests.

### MongoDB Atlas + Mongoose

The server connects to a MongoDB database, hosted by Atlas. Mongoose is used on the server to connect to the database, and to make Create, Find, Update, and Delete calls to the database. A Mongoose schema governs the user data model when interacting with the database.

### Socket.io

Socket.io is implemented on the server to receive connections from the front end, to coordinate the rooms used in the front end functionality, and control the flow of messages between users.

###

## Approach Taken

The server uses a single controller to route requests concerning user creation, user login, user updates, and user deletion. The socket.io portion of the server governs connections from the front end. Users connect via a specified room name, and the server keeps track of which room names are active, and which users are in them by username. The server listens for incoming socket signals from the front end client, including "sent-message," "begin-game," and "end-game." The server also listens for "disconnect" signals from the client, and manages the rooms accordingly.

###

## Unsolved Problems

- Prevent a user from joining a room if that room currently has a game in progress.
- Properly handle a user leaving a game in progress, potentially with the ability to rejoin. Currently, the turn order breaks if a user leaves during a game.
- Add funcitonality for the user to be able to save a story to their "favorite stories" collection.

###

## User Stories

- As a user, I want to create an account so I can log in
- As a user, I want to select an avatar to customize my look
- As a user, I want to join a lobby with other users
- As a user, I want to chat with other users in my room, to coordinate starting a game





## How to build a persistent realtime database with Pusher

The idea behind this repository is to build a persistent real-time database using MongoDB and Pusher. MongoDB's change streams allow us to listen for changes in collections, and Pusher gives us the real-time broadcast service that makes the data changes available to all connected clients.

## Prerequisite
1. [MongoDB]('https://www.mongodb.com/')
2. [Npm]('https://www.npmjs.com')
3. [Node]('https://nodejs.org')

## Getting Started

1. Clone or download the project.
2. Open three terminal instances.
3. In the first terminal, create a new directory for a replica set `mkdir ~/srv/mongodb/rs0` and start the replica set `mongod --replSet rs0 --port 27010 --dbpath ~/srv/mongodb/rs0`.
4. In the second terminal, start the backend server `node server`.
5. In the third terminal, navigate into the client directory `cd client` and start the frontend server `npm start`.

## Testing
1. Once the servers are running, navigate to `http://localhost:3000/` on your web browser.
2. Play around with the application.

## Built With
Angular - MongoDB is a cross-platform document-oriented database program.
Pusher - Pusher empowers developers with APIs to create collaboration & communication features in their web and mobile apps.
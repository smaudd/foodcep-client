# ScandalApp

The goal of this app is to create an ideal enviroment for the management and administration of restaurant's kitchens, providing the user with essential planning and organization tools 
to keep track of the expenditures of any common restaurant kitchen.

### Frameworks and Libraries:

- Angular 7.1.2
- Angular Material 7.3.1
- Express 4.16.4
- Mongoose 5.4.13

### Provides: 

- CRUD
- JWT-Cookie Authentication
- Login System

## Development server:

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Configuration & Installation:

Run `npm install`

You need to create your enviroment variables for development.

Create a .env file on the root directory with 
- `PORT` 
- `NODE_ENV` 
- `BASE_URL` 
- `MONGODB_URI`
- `JWT_SECRET`

If you don't use `PORT` 3000. You'll need to change it on the `proxy.config.json` base url.

If you run `nodemon index.js` to start the server, .env will not be available. Instead use `nodemon server/index.js` from the root directory

This app is not ready for production!



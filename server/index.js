// Enviroment variables cofiguration
const config = require('../config');

// Framework imports
const express = require('express');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// App imports
const api = require('./api/api');
const user = require('./api/routes/user');
const refresh = require('./api/refresh');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist/ScandalApp')));

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next();
});

app.use(exjwt({
    secret: config.JWT_SECRET,
    // Take the cookie with the token from the request
    getToken: (req) => {
        const token = req.cookies.TOKEN;
        return token;
    }
}).unless({path: ['/api/auth', '/api/refresh', '/api/logout']}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.sendFile(path.join(__dirname, '../dist/ScandalApp/index.html'))
      }
});

app.use('/api/refresh', refresh);
app.use('/api/', user);
app.use('/api/', api);

app.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err, 'Cannot connect to DB. Check your connection string');
})


db.once('open', () => {
    console.log(`Server listening on port ${config.PORT}`);
})

// Default every route except the above to serve the index.html of front-end app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/ScandalApp/index.html'))
});

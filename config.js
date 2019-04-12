require('dotenv').config()

module.exports = {
    ENV: process.env.NODE_ENV,
    URL: process.env.BASE_URL,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
} 
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI);
        console.log('Connection Established');
    } catch (error) {
        console.log('Unable to connect Database');
    }
}

module.exports = connectToDatabase;
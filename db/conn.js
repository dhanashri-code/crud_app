
const mongoose = require('mongoose');
mongoose.set('debug', true);

const DB = process.env.DATABASE;

mongoose.connect(DB)
    .then(() => console.log("Connection started"))
    .catch((error) => console.log(error.message));


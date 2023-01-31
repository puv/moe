const mongoose = require('mongoose');
require("dotenv").config();

module.exports = mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
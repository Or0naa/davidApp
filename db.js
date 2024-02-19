const mongoose = require('mongoose')
require('dotenv').config()
const mongo = process.env.MONG0_URL
async function connect() {
    try {
        mongoose.connect(mongo)
            .then(() => { console.log("DB - Connection Success") })
    }
    catch (err) {
        console.log("MongoDB Error:", err);
    }
}
module.exports = { connect }
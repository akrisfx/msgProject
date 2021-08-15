const mongoose = require('mongoose');
const config = require('config.json')
const { Schema } = mongoose;

function createConnection(){
    const mongoAtlasUri = config.token;
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: false
            },
            () => console.log(" Mongoose is connected")
            
        );
        return "Succesfully";
    } catch (e) {
        console.log("could not connect");
        return "Error";
    }
}

createConnection();

module.exports = createConnection;
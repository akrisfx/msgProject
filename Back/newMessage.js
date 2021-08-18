const Message = require("./messageModel")
const moment = require("moment")

function newMessage(message, users) {

    let date = new Date();

    let newMessage = new Message({
        id: 0,
        username: message.content.username.replace(/</gi, ""),
        content: message.content.content.replace(/</gi, ""),
        time: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    })

    newMessage.save();

    let obj = {
        key: 2,
        content: {
            username: message.content.username.replace(/</gi, ""),
            message: message.content.content.replace(/</gi, ""),
            time: moment.utc().format('YYYY-MM-DD HH:mm:ss')
        }
    };
    let json_obj = JSON.stringify(obj); // creating json object

    for (let u of users) {
        u.connection.send(json_obj);
    }
}

module.exports = newMessage;
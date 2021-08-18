const Message = require("./messageModel")

function newMessage(message, users) {

    let date = new Date();

    let newMessage = new Message({
        id: 0,
        username: message.content.username.replace(/</gi, ""),
        content: message.content.content.replace(/</gi, ""),
        time: {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDay(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
    })

    newMessage.save();

    let obj = {
        key: 2,
        content: {
            username: message.content.username.replace(/</gi, ""),
            message: message.content.content.replace(/</gi, ""),
            time: {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth(),
                day: date.getUTCDay(),
                hours: date.getUTCHours(),
                minutes: date.getUTCMinutes(),
                seconds: date.getUTCSeconds()
            }
        }

    };
    let json_obj = JSON.stringify(obj); // creating json object

    for (let u of users) {
        u.connection.send(json_obj);
    }
}

module.exports = newMessage;
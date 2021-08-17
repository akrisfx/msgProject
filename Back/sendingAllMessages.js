const Message = require("./messageModel")

function sendingAllMessages(user){
    var query = Message.find({});
    query.exec(function (err, smt) {
        let json = {
            key: 1,
            content: smt
        }
        user.connection.send(JSON.stringify(json))
    })
}

module.exports = sendingAllMessages;
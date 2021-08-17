const WebSocket = require('ws');
const mongoose = require('mongoose');

const createConnection = require("./databaseUse")
const Message = require("./messageModel")

function creatingServer() {
    createConnection();
    console.log("Connection created!")
    // Создаём подключение к WS
    let wsServer = new WebSocket.Server({
        port: 5678
    });
    console.log("Server started!")
    return wsServer;
}

const wsServer = creatingServer();

let users = []


wsServer.on('connection', async function (ws) {
    let user = {
        connection: ws,
        id: users.length + 1
    }
    console.log("User connected: " + user.id)

    users.push(user)

    var query = Message.find({});
    query.exec(function (err, smt) {
        let json = {
            key: 1,
            content: smt
        }
        user.connection.send(JSON.stringify(json))
    })

    ws.on('message', function (message) {

        message = JSON.parse(message);

        if (message.key == 2)
        {
            let newMessage = new Message({
                id: 0,
                username: message.content.username.replace(/</gi, ""),
                content: message.content.content.replace(/</gi, "")
            })
    
            newMessage.save(function (err) {
                console.log('saved');
            });
    
    
            let obj = {
                key: 2,
                content: {
                    username: message.content.username.replace(/</gi, ""),
                    message: message.content.content.replace(/</gi, "")
                }
    
            };
            let json_obj = JSON.stringify(obj); // создаём json объект
    
            for (let u of users) {
                u.connection.send(json_obj);
            }
    
        }
        

    })

    ws.on('close', function () {
        let id = users.indexOf(user)
        // Убираем этого пользователя
        users.splice(id, 1)
    })
})

// 1 - отправка всех сообщений
// 2 - отправка одного сообщения
// 3 - отправка ников
const WebSocket = require('ws');
const mongoose = require('mongoose');

const sendOnlineUsersToAll = require("./sendOnlineUsersToAll")
const sendingAllMessages = require("./sendingAllMessages")
const newMessage = require("./newMessage")
const createConnection = require("./databaseUse")
const Message = require("./messageModel")

function creatingServer() {
    createConnection();
    console.log("Connection with database created!")
    let wsServer = new WebSocket.Server({
        port: 5678
    });
    console.log("Server started!")
    return wsServer;
}

const wsServer = creatingServer();

let users = [];


wsServer.on('connection', async function (ws) {
    let user = {
        connection: ws,
        id: users.length + 1,
        username: "Guest"
    }
    users.push(user)

    console.log("User connected: " + user.id)

    sendingAllMessages(user);
    sendOnlineUsersToAll(users);

    ws.on('message', function (message) {
        message = JSON.parse(message);

        if (message.key == 2) {
            newMessage(message, users)
        }

    })
    ws.on('close', function () {
        let id = users.indexOf(user)
        users.splice(id, 1)
        sendOnlineUsersToAll(users)
    })
})


// 1 - sending all messages to new user
// 2 - sending new message to all users
// 3 - sending amount of all users to all users
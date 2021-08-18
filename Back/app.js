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

    sendIDandUsername(user);
    sendingAllMessages(user);
    sendOnlineUsersToAll(users);
    sendListofUsers(users);

    ws.on('message', function (message) {
        message = JSON.parse(message);

        if (message.key == 2) {
            newMessage(message, users)
        }
        else if (message.key == 5 && message.content.username != "")
        {
            users[message.content.id-1].username = message.content.username
            console.log("Changed username: " + users[message.content.id-1].username)
            sendListofUsers(users)
        }

    })
    ws.on('close', function () {
        let id = users.indexOf(user)
        users.splice(id, 1)
        
        sendOnlineUsersToAll(users)
        sendListofUsers(users)
    })
})

function sendIDandUsername(user){
        let json = {
            key: 4,
            content: {
                id: user.id,
                username: user.username
            }
        }
        user.connection.send(JSON.stringify(json))
}

function sendListofUsers(users){
    listOfUsers = []
    for (let i = 0; i < users.length; i++) {
        listOfUsers.push({
            id: users[i].id,
            username: users[i].username
        })
    }
    console.log(listOfUsers)
    let json = {
        key: 6,
        content: listOfUsers
    }
    for (let u of users) {
        u.connection.send(JSON.stringify(json));
    }
}

// 1 - sending all messages to new user
// 2 - sending new message to all users
// 3 - sending amount of all users to all users
// 4 - sending id and username to new user
// 5 - get new username
// 6 - send all Users
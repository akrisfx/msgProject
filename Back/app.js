const WebSocket = require('ws');
const mongoose = require('mongoose');

const sendListofUsers = require("./sendToFront/sendListofUsers")
const sendIDandUsername = require("./sendToFront/sendIDandUsername")
const sendOnlineUsersToAll = require("./sendToFront/sendOnlineUsersToAll")
const sendingAllMessages = require("./sendToFront/sendingAllMessages")
const newMessage = require("./sendToFront/newMessage")

const createConnection = require("./database/databaseUse")

const getUniqueID = require("./getUniqueID")


const sendingNewMessageToAllUsers = 2;
const getNewUsername = 5;


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
        id: getUniqueID(),
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

        if (message.key == sendingNewMessageToAllUsers) {
            newMessage(message, users)
        }

        else if (message.key == getNewUsername)
        {
            for(let u of users){
                if (u.id == message.content.id){
                    u.username = message.content.username
                    sendListofUsers(users)
                }
            }
        }

    })
    ws.on('close', function () {
        let id = users.indexOf(user)
        users.splice(id, 1)
        
        sendOnlineUsersToAll(users)
        sendListofUsers(users)
    })
})

// 1 - sending all messages to new user
// 2 - sending new message to all users
// 3 - sending amount of all users to all users
// 4 - sending id and username to new user
// 5 - get new username
// 6 - send all Users
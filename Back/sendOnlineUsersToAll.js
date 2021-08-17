

function sendOnlineUsersToAll(users) {
    let json = {
        key: 3,
        onlineUsers: users.length
    }
    for (let u of users) {
        u.connection.send(JSON.stringify(json))
    }
}

module.exports = sendOnlineUsersToAll;
function sendListofUsers(users){
    listOfUsers = []
    for (let i = 0; i < users.length; i++) {
        listOfUsers.push({
            id: users[i].id,
            username: users[i].username
        })
    }
    let json = {
        key: 6,
        content: listOfUsers
    }
    for (let u of users) {
        u.connection.send(JSON.stringify(json));
    }
}

module.exports = sendListofUsers;
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

module.exports = sendIDandUsername;
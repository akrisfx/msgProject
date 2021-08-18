var uuid = require('uuid');

function getUniqueID() {
    return uuid.v4();;
}

module.exports = getUniqueID;